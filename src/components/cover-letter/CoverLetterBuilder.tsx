import { useState, useEffect, useCallback } from "react";
import { CoverLetterTopNav } from "./CoverLetterTopNav";
import { CoverLetterEditor } from "./CoverLetterEditor";
import { CoverLetterPreview } from "./CoverLetterPreview";
import { CoverLetterCustomizePanel } from "./CoverLetterCustomizePanel";
import { useCoverLetterStore } from "./useCoverLetterStore";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { getDocument, updateDocument, getAllDocuments, SavedDocument } from "@/lib/documentStore";
import { CoverLetterData, CoverLetterCustomize, DEFAULT_COVER_LETTER_DATA, DEFAULT_COVER_LETTER_CUSTOMIZE } from "./types";
import { exportToPdf } from "@/lib/pdfExport";
import MicroSurvey from "@/components/feedback/MicroSurvey";

interface CoverLetterBuilderProps {
  docId?: string | null;
}

export function CoverLetterBuilder({ docId }: CoverLetterBuilderProps) {
  const store = useCoverLetterStore();
  const [activeTab, setActiveTab] = useState("write");
  const [downloading, setDownloading] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);

  // Load data from multi-doc store if docId provided
  useEffect(() => {
    if (!docId) return;
    const doc = getDocument(docId);
    if (doc && doc.type === "cover_letter") {
      store.updateData(doc.data as CoverLetterData);
      store.updateCustomize(doc.settings as CoverLetterCustomize);
    }
  }, [docId]);

  // Save back to multi-doc store on changes
  useEffect(() => {
    if (!docId) return;
    const timer = setTimeout(() => {
      updateDocument(docId, { data: store.data, settings: store.customize });
    }, 800);
    return () => clearTimeout(timer);
  }, [docId, store.data, store.customize]);

  const { data, customize, updateData, updatePersonalDetails, updateRecipient, updateSignature, updateCustomize } = store;

  const allLetters = getAllDocuments().filter((d) => d.type === "cover_letter");
  const activeDoc = docId ? allLetters.find((d) => d.id === docId) : null;

  const handleDownload = async () => {
    if (downloading) return;
    setDownloading(true);
    const name = data.personalDetails.fullName || "Cover_Letter";
    await exportToPdf({
      elementId: "cover-letter-pdf-target",
      fileName: `${name.replace(/\s+/g, "_")}_Cover_Letter.pdf`,
      pageFormat: (customize.pageFormat || "a4") as "a4" | "letter",
    });
    setDownloading(false);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <CoverLetterTopNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        docName={activeDoc?.name || "Letter 1"}
        onDownload={handleDownload}
        downloading={downloading}
      />

      {activeTab === "write" || activeTab === "customize" ? (
        <div className="flex-1 overflow-hidden">
          <div className="hidden md:block h-full">
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize={55} minSize={35}>
                {activeTab === "write" ? (
                  <CoverLetterEditor data={data} updatePersonalDetails={updatePersonalDetails} updateData={updateData} updateRecipient={updateRecipient} updateSignature={updateSignature} />
                ) : (
                  <CoverLetterCustomizePanel settings={customize} onChange={updateCustomize} />
                )}
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={45} minSize={30}>
                <CoverLetterPreview data={data} customize={customize} pdfTargetId="cover-letter-pdf-target" />
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
          <div className="md:hidden h-full overflow-y-auto" style={{ backgroundColor: "#F5F0E8" }}>
            {activeTab === "write" ? (
              <div>
                <CoverLetterEditor data={data} updatePersonalDetails={updatePersonalDetails} updateData={updateData} updateRecipient={updateRecipient} updateSignature={updateSignature} />
                <div className="p-4">
                  <CoverLetterPreview data={data} customize={customize} pdfTargetId="cover-letter-pdf-target" />
                </div>
              </div>
            ) : (
              <CoverLetterCustomizePanel settings={customize} onChange={updateCustomize} />
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-400 text-lg">
          {activeTab === "dashboard" ? "Dashboard" : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} — Coming soon
        </div>
      )}
    </div>
  );
}

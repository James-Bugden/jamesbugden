import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Loader2, ClipboardPaste } from "lucide-react";
import { extractTextFromDocx, extractTextFromPdf, mapTextToResumeSections } from "@/lib/documentImport";
import { createDocument, SavedDocument, DocType } from "@/lib/documentStore";
import { DEFAULT_RESUME_DATA } from "@/components/resume-builder/types";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

interface ImportModalProps {
  open: boolean;
  onClose: () => void;
  type: DocType;
  onImported: (doc: SavedDocument) => void;
}

type ImportTab = "upload" | "paste";

export function ImportModal({ open, onClose, type, onImported }: ImportModalProps) {
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<ImportTab>("upload");
  const [pastedText, setPastedText] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const buildDoc = (text: string, name: string) => {
    const parsed = mapTextToResumeSections(text);
    return createDocument(type, name, {
      data: {
        ...DEFAULT_RESUME_DATA,
        personalDetails: {
          ...DEFAULT_RESUME_DATA.personalDetails,
          fullName: parsed.fullName,
          email: parsed.email,
          phone: parsed.phone,
          ...(parsed.linkedin ? { linkedin: parsed.linkedin } : {}),
          ...(parsed.website ? { website: parsed.website } : {}),
        },
        sections: parsed.sections,
      },
    });
  };

  const handleFile = async (file: File) => {
    setLoading(true);
    try {
      let text = "";
      const ext = file.name.split(".").pop()?.toLowerCase();

      if (ext === "pdf") {
        text = await extractTextFromPdf(file);
      } else if (ext === "docx" || ext === "doc") {
        text = await extractTextFromDocx(file);
      } else {
        toast({ title: "Unsupported format", description: "Please upload a PDF or DOCX file.", variant: "destructive" });
        setLoading(false);
        return;
      }

      const doc = buildDoc(text, file.name.replace(/\.[^.]+$/, ""));
      toast({ title: "Imported!", description: `${file.name} has been imported. Review and edit your sections.` });
      onImported(doc);
      handleClose();
    } catch (err) {
      console.error("Import error:", err);
      toast({ title: "Import failed", description: "Could not extract text from the file.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handlePaste = () => {
    const trimmed = pastedText.trim();
    if (!trimmed) {
      toast({ title: "Empty text", description: "Please paste your resume text first.", variant: "destructive" });
      return;
    }
    const doc = buildDoc(trimmed, "Imported Resume");
    toast({ title: "Imported!", description: "Resume text has been imported. Review and edit your sections." });
    onImported(doc);
    handleClose();
  };

  const handleClose = () => {
    setPastedText("");
    setTab("upload");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Import Resume</DialogTitle>
        </DialogHeader>

        {/* Tab switcher */}
        <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
          <button
            onClick={() => setTab("upload")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-sm font-medium transition-colors ${tab === "upload" ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"}`}
          >
            <Upload className="w-4 h-4" /> Upload File
          </button>
          <button
            onClick={() => setTab("paste")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-sm font-medium transition-colors ${tab === "paste" ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"}`}
          >
            <ClipboardPaste className="w-4 h-4" /> Paste Text
          </button>
        </div>

        <input
          ref={fileRef}
          type="file"
          accept=".pdf,.docx,.doc"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />

        {tab === "upload" ? (
          loading ? (
            <div className="flex flex-col items-center gap-3 py-8">
              <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
              <span className="text-sm text-gray-500">Extracting text...</span>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-500">Upload a PDF or DOCX file. We'll extract the text and map it to resume sections.</p>
              <button
                onClick={() => fileRef.current?.click()}
                className="w-full py-12 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center gap-3 text-gray-400 hover:border-purple-300 hover:text-purple-500 transition-colors"
              >
                <Upload className="w-10 h-10" />
                <span className="text-sm font-semibold">Click to upload PDF or DOCX</span>
              </button>
            </>
          )
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-gray-500">Paste your resume text below and we'll map it into editable sections.</p>
            <Textarea
              value={pastedText}
              onChange={(e) => setPastedText(e.target.value)}
              placeholder={"John Doe\njohn@example.com\n\nExperience\nSoftware Engineer at Acme Corp..."}
              className="min-h-[200px] text-sm font-mono"
            />
            <Button onClick={handlePaste} className="w-full" disabled={!pastedText.trim()}>
              <FileText className="w-4 h-4 mr-2" /> Import Text
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

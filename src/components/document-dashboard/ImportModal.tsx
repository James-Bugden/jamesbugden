import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Loader2 } from "lucide-react";
import { extractTextFromDocx, extractTextFromPdf, mapTextToResumeSections } from "@/lib/documentImport";
import { createDocument, SavedDocument, DocType } from "@/lib/documentStore";
import { DEFAULT_RESUME_DATA } from "@/components/resume-builder/types";
import { toast } from "@/hooks/use-toast";

interface ImportModalProps {
  open: boolean;
  onClose: () => void;
  type: DocType;
  onImported: (doc: SavedDocument) => void;
}

export function ImportModal({ open, onClose, type, onImported }: ImportModalProps) {
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

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

      const parsed = mapTextToResumeSections(text);

      const doc = createDocument(type, file.name.replace(/\.[^.]+$/, ""), {
        data: {
          ...DEFAULT_RESUME_DATA,
          personalDetails: {
            ...DEFAULT_RESUME_DATA.personalDetails,
            fullName: parsed.fullName,
            email: parsed.email,
            phone: parsed.phone,
          },
          sections: parsed.summary ? [{
            id: crypto.randomUUID(),
            type: "summary",
            title: "Summary",
            entries: [{ id: crypto.randomUUID(), fields: { description: `<p>${parsed.summary}</p>` } }],
            collapsed: false,
          }] : [],
        },
      });

      toast({ title: "Imported!", description: `${file.name} has been imported. Review and edit your sections.` });
      onImported(doc);
      onClose();
    } catch (err) {
      console.error("Import error:", err);
      toast({ title: "Import failed", description: "Could not extract text from the file.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Import Resume</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-500 mb-4">
          Upload a PDF or DOCX file. We'll extract the text and map it to resume sections for you to edit.
        </p>

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

        {loading ? (
          <div className="flex flex-col items-center gap-3 py-8">
            <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
            <span className="text-sm text-gray-500">Extracting text...</span>
          </div>
        ) : (
          <button
            onClick={() => fileRef.current?.click()}
            className="w-full py-12 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center gap-3 text-gray-400 hover:border-purple-300 hover:text-purple-500 transition-colors"
          >
            <Upload className="w-10 h-10" />
            <span className="text-sm font-semibold">Click to upload PDF or DOCX</span>
          </button>
        )}
      </DialogContent>
    </Dialog>
  );
}

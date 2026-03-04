import { LayoutGrid, FileText, Palette, Sparkles, Download, MoreVertical, ChevronDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SavedDocument } from "@/lib/documentStore";
import { useState, useRef, useEffect } from "react";

interface ResumeTopNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  docName?: string;
  allDocs?: SavedDocument[];
  onDocSwitch?: (id: string) => void;
  onDownload?: (filename: string) => void;
  downloading?: boolean;
  pageFormat?: string;
}

const tabs = [
  { id: "content", label: "Content", icon: FileText },
  { id: "customize", label: "Customize", icon: Palette },
  { id: "ai-tools", label: "AI Tools", icon: Sparkles },
];

export function ResumeTopNav({ activeTab, onTabChange, docName, allDocs, onDocSwitch, onDownload, downloading, pageFormat = "a4" }: ResumeTopNavProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dlDropdownOpen, setDlDropdownOpen] = useState(false);
  const [filename, setFilename] = useState("");
  const dlRef = useRef<HTMLDivElement>(null);

  // Sync filename with docName
  useEffect(() => {
    const base = docName || "Resume";
    setFilename(base.replace(/\s+/g, "_") + "_Resume");
  }, [docName]);

  // Close dropdown on outside click
  useEffect(() => {
    if (!dlDropdownOpen) return;
    const handler = (e: MouseEvent) => {
      if (dlRef.current && !dlRef.current.contains(e.target as Node)) {
        setDlDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [dlDropdownOpen]);

  const handleDownloadClick = () => {
    setDlDropdownOpen(false);
    onDownload?.(filename || "Resume");
  };

  return (
    <div className="sticky top-0 z-30 flex items-center justify-between bg-white border-b border-gray-200 px-4 h-14">
      <div className="flex items-center gap-1">
        {tabs.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors",
                active ? "bg-pink-50 text-pink-600" : "text-gray-500 hover:bg-gray-100"
              )}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        {/* Doc switcher */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            {docName || "Resume 1"}
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          {dropdownOpen && allDocs && allDocs.length > 0 && (
            <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-20 min-w-[180px]">
              {allDocs.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => { onDocSwitch?.(doc.id); setDropdownOpen(false); }}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 truncate"
                >
                  {doc.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Download button with dropdown */}
        <div className="relative" ref={dlRef}>
          <Button
            size="sm"
            className="bg-purple-600 hover:bg-purple-700 text-white gap-1.5"
            onClick={() => {
              if (downloading) return;
              setDlDropdownOpen(!dlDropdownOpen);
            }}
            disabled={downloading}
          >
            {downloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            {downloading ? "Generating..." : "Download"}
          </Button>

          {dlDropdownOpen && !downloading && (
            <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-gray-200 z-30 w-[280px] p-4">
              <div className="space-y-3">
                {/* Filename */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Filename</label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={filename}
                      onChange={(e) => setFilename(e.target.value)}
                      className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-l-lg outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 bg-white"
                    />
                    <span className="px-3 py-2 text-sm text-gray-400 bg-gray-50 border border-l-0 border-gray-200 rounded-r-lg">.pdf</span>
                  </div>
                </div>

                {/* Paper size display */}
                <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                  <span className="text-xs font-medium text-gray-600">Paper size</span>
                  <span className="text-xs font-semibold text-gray-800">
                    {pageFormat === "letter" ? "US Letter (8.5×11in)" : "A4 (210×297mm)"}
                  </span>
                </div>

                {/* Download button */}
                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={handleDownloadClick}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          )}
        </div>

        <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

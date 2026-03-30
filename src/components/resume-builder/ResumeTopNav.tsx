import { LayoutGrid, FileText, Palette, Sparkles, Download, MoreVertical, ChevronDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SavedDocument } from "@/lib/documentStore";
import { ResumeData } from "@/components/resume-builder/types";
import { formatDistanceToNow } from "date-fns";
import { useState, useRef, useEffect } from "react";

const BRAND = {
  green: "#2b4734",
  greenHover: "#1f3a28",
  greenLight: "#e8f0eb",
  greenLighter: "#f2f7f4",
  text: "#1A1A1A",
  textSec: "#6B6B6B",
  border: "#e5e7eb",
};

interface ResumeTopNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  docName?: string;
  activeDocId?: string;
  allDocs?: SavedDocument[];
  onDocSwitch?: (id: string) => void;
  onDownload?: (filename: string) => void;
  downloading?: boolean;
  pageFormat?: string;
}

const tabs = [
  { id: "content", label: "Content", icon: FileText },
  { id: "customize", label: "Customize", icon: Palette },
];

export function ResumeTopNav({ activeTab, onTabChange, docName, activeDocId, allDocs, onDocSwitch, onDownload, downloading, pageFormat = "a4" }: ResumeTopNavProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dlDropdownOpen, setDlDropdownOpen] = useState(false);
  const [filename, setFilename] = useState("");
  const dlRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const base = docName || "Resume";
    setFilename(base.replace(/\s+/g, "_") + "_Resume");
  }, [docName]);

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
    <div className="sticky top-0 z-30 flex items-center justify-between bg-white border-b px-4 h-14" style={{ borderColor: BRAND.border }}>
      <div className="flex items-center gap-1">
        {tabs.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors",
                active ? "" : "hover:bg-gray-100"
              )}
              style={
                active
                  ? { backgroundColor: BRAND.greenLighter, color: BRAND.green }
                  : { color: BRAND.textSec }
              }
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
            className="flex items-center gap-1 px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50"
            style={{ color: BRAND.text, borderColor: BRAND.border }}
          >
            {docName || "Resume 1"}
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          {dropdownOpen && allDocs && allDocs.length > 0 && (
            <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border py-1 z-20 min-w-[240px] max-w-[calc(100vw-2rem)]" style={{ borderColor: BRAND.border }}>
              {allDocs.map((doc) => {
                const isActive = doc.id === activeDocId;
                const rd = doc.data as ResumeData;
                const name = rd?.personalDetails?.fullName || "";
                const title = rd?.personalDetails?.professionalTitle || "";
                const subtitle = [name, title].filter(Boolean).join(" · ");
                const ago = formatDistanceToNow(new Date(doc.updatedAt), { addSuffix: true });
                return (
                  <button
                    key={doc.id}
                    onClick={() => { onDocSwitch?.(doc.id); setDropdownOpen(false); }}
                    className={cn("w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors", isActive && "bg-[hsl(142_25%_96%)]")}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium truncate" style={{ color: BRAND.text }}>{doc.name}</span>
                      <span className="text-[11px] ml-2 shrink-0" style={{ color: BRAND.textSec }}>{ago}</span>
                    </div>
                    {subtitle && (
                      <div className="text-[11px] truncate mt-0.5" style={{ color: BRAND.textSec }}>{subtitle}</div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Download button with dropdown */}
        <div className="relative" ref={dlRef}>
          <Button
            size="sm"
            className="text-white gap-1.5"
            style={{ backgroundColor: BRAND.green }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BRAND.greenHover)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BRAND.green)}
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
            <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border z-30 w-[calc(100vw-2rem)] sm:w-[280px] max-w-[280px] p-4" style={{ borderColor: BRAND.border }}>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: BRAND.textSec }}>Filename</label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={filename}
                      onChange={(e) => setFilename(e.target.value)}
                      className="flex-1 px-3 py-2 text-sm border rounded-l-lg outline-none bg-white"
                      style={{ borderColor: BRAND.border, color: BRAND.text }}
                    />
                    <span className="px-3 py-2 text-sm bg-gray-50 border border-l-0 rounded-r-lg" style={{ color: BRAND.textSec, borderColor: BRAND.border }}>.pdf</span>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                  <span className="text-xs font-medium" style={{ color: BRAND.textSec }}>Paper size</span>
                  <span className="text-xs font-semibold" style={{ color: BRAND.text }}>
                    {pageFormat === "letter" ? "US Letter (8.5×11in)" : "A4 (210×297mm)"}
                  </span>
                </div>

                <Button
                  className="w-full text-white"
                  style={{ backgroundColor: BRAND.green }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BRAND.greenHover)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BRAND.green)}
                  onClick={handleDownloadClick}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          )}
        </div>

        <button className="p-2 rounded-lg hover:bg-gray-100" style={{ color: BRAND.textSec }}>
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

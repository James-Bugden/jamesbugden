import { LayoutGrid, FileText, Palette, Download, ChevronDown, MoreVertical, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CoverLetterTopNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  docName?: string;
  onDownload?: () => void;
  downloading?: boolean;
}

const tabs = [
  { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
  { id: "write", label: "Write", icon: FileText },
  { id: "customize", label: "Customize", icon: Palette },
];

export function CoverLetterTopNav({ activeTab, onTabChange, docName, onDownload, downloading }: CoverLetterTopNavProps) {
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
        <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50">
          {docName || "Letter 1"}
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
        <Button
          size="sm"
          className="bg-purple-600 hover:bg-purple-700 text-white gap-1.5"
          onClick={onDownload}
          disabled={downloading}
        >
          {downloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
          {downloading ? "Generating..." : "Download"}
        </Button>
        <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

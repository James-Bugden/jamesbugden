import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import * as Icons from "lucide-react";
import { SECTION_TYPES } from "./types";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface AddContentModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (type: string) => void;
  existingTypes: string[];
}

function getIcon(iconName: string) {
  const Icon = (Icons as any)[iconName];
  return Icon || Icons.FileText;
}

function SectionGrid({ onAdd, onClose, existingTypes }: { onAdd: (t: string) => void; onClose: () => void; existingTypes: string[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
      {SECTION_TYPES.map((section) => {
        const IconComponent = getIcon(section.icon);
        const exists = existingTypes.includes(section.type) && section.type !== "custom";
        return (
          <button
            key={section.type}
            onClick={() => {
              onAdd(section.type);
              onClose();
            }}
            disabled={exists}
            className={cn(
              "flex flex-col items-start gap-2 p-4 rounded-xl text-left transition-all active:scale-[0.98]",
              section.type === "custom"
                ? "border-2 border-dashed border-gray-300 hover:border-pink-400 hover:bg-pink-50"
                : "border border-gray-200 hover:border-pink-400 hover:bg-pink-50",
              exists && "opacity-40 cursor-not-allowed"
            )}
          >
            <div className="flex items-center gap-2">
              <IconComponent className="w-5 h-5 text-gray-700" />
              <span className="font-semibold text-sm text-gray-900">{section.title}</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">{section.description}</p>
          </button>
        );
      })}
    </div>
  );
}

export function AddContentModal({ open, onClose, onAdd, existingTypes }: AddContentModalProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={(o) => !o && onClose()}>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader>
            <DrawerTitle className="text-xl font-bold">Add content</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-6 overflow-y-auto">
            <SectionGrid onAdd={onAdd} onClose={onClose} existingTypes={existingTypes} />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Add content</DialogTitle>
        </DialogHeader>
        <SectionGrid onAdd={onAdd} onClose={onClose} existingTypes={existingTypes} />
      </DialogContent>
    </Dialog>
  );
}

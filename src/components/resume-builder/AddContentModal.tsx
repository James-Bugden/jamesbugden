import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useResumeBuilderLang, getLocalizedSectionTypes, useT } from "./i18n";

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
  const lang = useResumeBuilderLang();
  const sectionTypes = getLocalizedSectionTypes(lang);
  return (
    <div className="grid grid-cols-2 gap-2.5 mt-3">
      {sectionTypes.map((section) => {
        const IconComponent = getIcon(section.icon);
        const exists = existingTypes.includes(section.type) && section.type !== "custom";
        return (
          <button
            key={section.type}
            onClick={() => { onAdd(section.type); onClose(); }}
            disabled={exists}
            className={cn(
              "flex items-start gap-3 p-3.5 rounded-xl text-left transition-all group",
              exists
                ? "opacity-40 cursor-not-allowed bg-paper-alt"
                : "hover:bg-pink-50 hover:shadow-sm bg-white border border-gray-100 hover:border-pink-200"
            )}
          >
            <div className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors",
              exists ? "bg-muted" : "bg-muted group-hover:bg-pink-100"
            )}>
              <IconComponent className={cn("w-4 h-4", exists ? "text-muted-foreground/70" : "text-muted-foreground group-hover:text-pink-600")} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">{section.title}</p>
              <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5 line-clamp-2">{section.description}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export function AddContentModal({ open, onClose, onAdd, existingTypes }: AddContentModalProps) {
  const isMobile = useIsMobile();
  const t = useT();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={(o) => !o && onClose()}>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader>
            <DrawerTitle className="text-lg font-bold">{t("addContentTitle")}</DrawerTitle>
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
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-white p-6" style={{ borderRadius: "16px" }}>
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-foreground">{t("addContentTitle")}</DialogTitle>
        </DialogHeader>
        <SectionGrid onAdd={onAdd} onClose={onClose} existingTypes={existingTypes} />
      </DialogContent>
    </Dialog>
  );
}

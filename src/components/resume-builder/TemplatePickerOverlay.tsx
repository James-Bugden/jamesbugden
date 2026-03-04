import { TemplateGalleryModal } from "./TemplateGalleryModal";
import { ResumeData } from "./types";

interface TemplatePickerOverlayProps {
  open: boolean;
  onSelect: (templateId: string) => void;
  resumeData?: ResumeData;
}

/**
 * Full-screen overlay shown after import or new resume creation
 * to let user pick a template before entering the editor.
 */
export function TemplatePickerOverlay({
  open,
  onSelect,
  resumeData,
}: TemplatePickerOverlayProps) {
  return (
    <TemplateGalleryModal
      open={open}
      onClose={() => onSelect("modern")} // default if they close without picking
      selected=""
      onSelect={onSelect}
      resumeData={resumeData}
      showToast={true}
    />
  );
}

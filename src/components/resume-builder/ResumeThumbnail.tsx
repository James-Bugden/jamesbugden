import React from "react";
import { A4Page, getPageDims } from "./ResumePreview";
import { ResumeData, DEFAULT_RESUME_DATA } from "./types";
import { CustomizeSettings, DEFAULT_CUSTOMIZE } from "./customizeTypes";

interface ResumeThumbnailProps {
  data?: ResumeData;
  settings?: CustomizeSettings;
  className?: string;
}

/**
 * Renders a tiny live preview of a resume inside a card-sized container.
 * Uses the real A4Page component scaled down via CSS transform.
 */
export const ResumeThumbnail = React.memo(function ResumeThumbnail({
  data = DEFAULT_RESUME_DATA,
  settings = DEFAULT_CUSTOMIZE,
  className,
}: ResumeThumbnailProps) {
  const dims = getPageDims(settings?.pageFormat);
  // Scale the full A4 page to fit inside ~160px wide thumbnail
  const thumbWidth = 160;
  const scale = thumbWidth / dims.wPX;

  return (
    <div
      className={className}
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: `${dims.wPX}px`,
          height: `${dims.hPX}px`,
          overflow: "hidden",
          pointerEvents: "none",
          backgroundColor: settings?.a4Background || "#ffffff",
        }}
      >
        <A4Page data={data} customize={settings} />
      </div>
    </div>
  );
});

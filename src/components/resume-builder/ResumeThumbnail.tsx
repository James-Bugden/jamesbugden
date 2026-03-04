import React, { useRef, useState, useEffect } from "react";
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
 * Dynamically measures the container width to compute the correct scale.
 */
export const ResumeThumbnail = React.memo(function ResumeThumbnail({
  data = DEFAULT_RESUME_DATA,
  settings = DEFAULT_CUSTOMIZE,
  className,
}: ResumeThumbnailProps) {
  const dims = getPageDims(settings?.pageFormat);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      const w = el.clientWidth;
      if (w > 0) setScale(w / dims.wPX);
    };

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [dims.wPX]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {scale > 0 && (
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
      )}
    </div>
  );
});

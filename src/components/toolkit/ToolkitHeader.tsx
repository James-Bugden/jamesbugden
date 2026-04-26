import { SiteHeader } from "@/components/SiteHeader";

/**
 * Thin compatibility wrapper around <SiteHeader />.
 * Historical name; consumers can keep importing `ToolkitHeader` while
 * the underlying implementation is the unified site-wide header.
 */
const ToolkitHeader = () => (
  <SiteHeader variant="dark" lang="en" sticky={false} showSocials />
);

export default ToolkitHeader;

export const QBANK_SHARE_TEXT_ZH =
  "我在用這個網站準備面試，這些問題很有幫助！";

export interface CategoryShareLink {
  deepLinkUrl: string;
  shareText: string;
  lineHref: string;
}

export function buildCategoryShareLink(
  categoryKey: string,
  origin: string,
): CategoryShareLink {
  const cleanOrigin = origin.replace(/\/+$/, "");
  const deepLinkUrl = `${cleanOrigin}/zh-tw/interview-questions?cat=${encodeURIComponent(categoryKey)}`;
  const shareText = `${QBANK_SHARE_TEXT_ZH}${deepLinkUrl}`;
  const lineHref = `https://line.me/R/share?text=${encodeURIComponent(shareText)}`;
  return { deepLinkUrl, shareText, lineHref };
}

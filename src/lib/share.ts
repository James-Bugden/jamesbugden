export const nativeShare = async (title?: string) => {
  const url = window.location.href;
  if (navigator.share) {
    try {
      await navigator.share({ title: title || document.title, url });
      return true;
    } catch {
      // User cancelled or share failed — fall back to clipboard
    }
  }
  await navigator.clipboard.writeText(url);
  return false;
};

/** Get a shareable URL for a specific document */
export function getShareUrl(docId: string): string {
  return `${window.location.origin}/resume?doc=${docId}`;
}

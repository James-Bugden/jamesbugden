import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Check, QrCode, Eye, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useShareLinks } from "@/hooks/useShareLinks";
import { Skeleton } from "@/components/ui/skeleton";
import { trackEvent } from "@/lib/trackEvent";

interface ShareLinkModalProps {
  analysisId: string;
  lang: "en" | "zh-TW";
  isOpen: boolean;
  onClose: () => void;
}

const ShareLinkModal = ({ analysisId, lang, isOpen, onClose }: ShareLinkModalProps) => {
  const { createShareLink, deleteShareLink, shareLinks, isLoading } = useShareLinks();
  const [copied, setCopied] = useState(false);
  const [activeShareLink, setActiveShareLink] = useState<{
    id: string;
    share_id: string;
    url: string;
    views: number;
  } | null>(null);

  // Find existing active share link for this analysis
  const existingShareLink = shareLinks.find(
    link => link.analysis_id === analysisId && link.is_active
  );

  const t = (en: string, zh: string) => lang === "en" ? en : zh;

  const handleCreateShareLink = async () => {
    try {
      const result = await createShareLink.mutateAsync(analysisId);
      setActiveShareLink(result);
      toast({
        title: t("Share link created", "分享連結已建立"),
        description: t("Your analysis is now publicly accessible", "你的分析現在可以公開檢視"),
      });
    } catch (error) {
      console.error("Error creating share link:", error);
    }
  };

  const handleCopyLink = async () => {
    if (!activeShareLink?.url && !existingShareLink) return;

    const url = activeShareLink?.url || `${window.location.origin}/r/${existingShareLink?.share_id}`;
    await navigator.clipboard.writeText(url);
    
    setCopied(true);
    toast({
      title: t("Link copied!", "連結已複製！"),
      description: t("Share this link with others", "與他人分享此連結"),
    });
    
    // Track the share link copy event
    const shareId = activeShareLink?.share_id || existingShareLink?.share_id;
    trackEvent("share_link", "share_link_copied", {
      share_id: shareId,
      analysis_id: analysisId,
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDeleteShareLink = async () => {
    if (!activeShareLink?.share_id && !existingShareLink?.share_id) return;

    const shareId = activeShareLink?.share_id || existingShareLink?.share_id;
    try {
      await deleteShareLink.mutateAsync(shareId!);
      setActiveShareLink(null);
      toast({
        title: t("Share link deactivated", "分享連結已停用"),
        description: t("The public link is no longer accessible", "公開連結已無法存取"),
      });
    } catch (error) {
      console.error("Error deleting share link:", error);
    }
  };

  const currentShareLink = activeShareLink || existingShareLink;
  const displayUrl = currentShareLink 
    ? (activeShareLink?.url || `${window.location.origin}/r/${existingShareLink?.share_id}`)
    : null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("Share Public Link", "分享公開連結")}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {t(
              "Create a public link to share your resume analysis score. The link will show your score and recommendations without personal information.",
              "建立公開連結以分享你的履歷分析分數。連結將顯示你的分數和建議，不會包含個人資訊。"
            )}
          </p>

          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-6 w-32" />
            </div>
          ) : currentShareLink ? (
            <div className="space-y-4">
              <div className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      {t("Public Link", "公開連結")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Eye className="w-3 h-3" />
                    {currentShareLink.views} {t("views", "次檢視")}
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="flex-1 border rounded px-3 py-2 text-sm font-mono truncate bg-muted/50">
                    {displayUrl}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCopyLink}
                    className="flex-shrink-0"
                  >
                    {copied ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={handleDeleteShareLink}
                    disabled={deleteShareLink.isPending}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    {t("Deactivate", "停用")}
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={handleCopyLink}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    {t("Copy Link", "複製連結")}
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm">
                <p className="text-amber-800 font-medium">
                  {t("Privacy Note", "隱私提醒")}
                </p>
                <p className="text-amber-700 mt-1">
                  {t(
                    "This link is publicly accessible. Anyone with the link can view your score and recommendations.",
                    "此連結可公開存取。任何擁有連結的人都可以檢視你的分數和建議。"
                  )}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-lg border p-4 text-center">
                <QrCode className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-sm text-muted-foreground mb-4">
                  {t(
                    "No public link created yet. Create one to share your score.",
                    "尚未建立公開連結。建立一個以分享你的分數。"
                  )}
                </p>
                <Button
                  onClick={handleCreateShareLink}
                  disabled={createShareLink.isPending}
                  className="w-full"
                >
                  {createShareLink.isPending
                    ? t("Creating...", "建立中...")
                    : t("Create Public Link", "建立公開連結")}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareLinkModal;
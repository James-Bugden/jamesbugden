import { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SEO } from "@/components/SEO";

type Status = "loading" | "valid" | "already_unsubscribed" | "invalid" | "success" | "error";

export default function Unsubscribe() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const token = searchParams.get("token");
  // Prefer explicit ?lang=zh query param from the mailer, otherwise fall back
  // to the /zh-tw/... route prefix. Unsubscribe links from ZH email sends can
  // include either signal.
  const langParam = searchParams.get("lang");
  const isZhTw = langParam === "zh" || langParam === "zh-tw" || location.pathname.startsWith("/zh-tw");
  const [status, setStatus] = useState<Status>("loading");
  const [submitting, setSubmitting] = useState(false);

  const t = isZhTw
    ? {
        verifying: "正在驗證您的請求…",
        unsubscribeTitle: "取消訂閱",
        unsubscribePrompt: "點擊下方按鈕以取消訂閱未來的電子郵件。",
        processing: "處理中…",
        confirmBtn: "確認取消訂閱",
        successTitle: "您已取消訂閱",
        successMsg: "您將不再收到我們的電子郵件。",
        alreadyTitle: "已取消訂閱",
        alreadyMsg: "此電子郵件地址已經取消訂閱。",
        invalidTitle: "無效連結",
        invalidMsg: "此取消訂閱連結無效或已過期。",
        errorTitle: "發生錯誤",
        errorMsg: "請稍後再試。",
      }
    : {
        verifying: "Verifying your request…",
        unsubscribeTitle: "Unsubscribe",
        unsubscribePrompt: "Click the button below to unsubscribe from future emails.",
        processing: "Processing…",
        confirmBtn: "Confirm Unsubscribe",
        successTitle: "You've been unsubscribed",
        successMsg: "You will no longer receive emails from us.",
        alreadyTitle: "Already unsubscribed",
        alreadyMsg: "This email address has already been unsubscribed.",
        invalidTitle: "Invalid link",
        invalidMsg: "This unsubscribe link is invalid or has expired.",
        errorTitle: "Something went wrong",
        errorMsg: "Please try again later.",
      };

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }
    (async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${token}`,
          { headers: { apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY } }
        );
        const data = await res.json();
        if (!res.ok) {
          setStatus("invalid");
        } else if (data.valid === false && data.reason === "already_unsubscribed") {
          setStatus("already_unsubscribed");
        } else if (data.valid) {
          setStatus("valid");
        } else {
          setStatus("invalid");
        }
      } catch {
        setStatus("error");
      }
    })();
  }, [token]);

  const handleUnsubscribe = async () => {
    if (!token) return;
    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", {
        body: { token },
      });
      if (error) {
        setStatus("error");
      } else if (data?.success) {
        setStatus("success");
      } else if (data?.reason === "already_unsubscribed") {
        setStatus("already_unsubscribed");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <SEO />
      <div className="w-full max-w-md bg-card border border-border rounded-xl shadow-lg p-8 text-center">
        <p className="text-xs font-semibold tracking-[0.15em] text-executive-green mb-6">hiresign</p>

        {status === "loading" && (
          <p className="text-muted-foreground">{t.verifying}</p>
        )}

        {status === "valid" && (
          <>
            <h1 className="font-heading text-xl font-bold text-foreground mb-3">{t.unsubscribeTitle}</h1>
            <p className="text-sm text-muted-foreground mb-6">
              {t.unsubscribePrompt}
            </p>
            <button
              onClick={handleUnsubscribe}
              disabled={submitting}
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-executive-green text-cream font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {submitting ? t.processing : t.confirmBtn}
            </button>
          </>
        )}

        {status === "success" && (
          <>
            <h1 className="font-heading text-xl font-bold text-foreground mb-3">{t.successTitle}</h1>
            <p className="text-sm text-muted-foreground">{t.successMsg}</p>
          </>
        )}

        {status === "already_unsubscribed" && (
          <>
            <h1 className="font-heading text-xl font-bold text-foreground mb-3">{t.alreadyTitle}</h1>
            <p className="text-sm text-muted-foreground">{t.alreadyMsg}</p>
          </>
        )}

        {status === "invalid" && (
          <>
            <h1 className="font-heading text-xl font-bold text-foreground mb-3">{t.invalidTitle}</h1>
            <p className="text-sm text-muted-foreground">{t.invalidMsg}</p>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="font-heading text-xl font-bold text-foreground mb-3">{t.errorTitle}</h1>
            <p className="text-sm text-muted-foreground">{t.errorMsg}</p>
          </>
        )}
      </div>
    </div>
  );
}

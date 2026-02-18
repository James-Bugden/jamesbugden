import { useState, useMemo, useEffect } from "react";
import { X, Copy, Save, Send, CheckCircle2, XCircle, AlertTriangle, Settings } from "lucide-react";
import { Contact, Employer, UserProfile, STORAGE_KEYS } from "@/lib/tracker/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { toast } from "sonner";

/* ── Template types ───────────────────────────────────── */
interface EmailDraft {
  contactId: string;
  subject: string;
  body: string;
  savedAt: string;
}

type TemplateKey = "alumni" | "linkedin-1st" | "linkedin-2nd" | "linkedin-group" | "fan-mail" | "other";

const SOURCE_TO_TEMPLATE: Record<Contact["source"], TemplateKey> = {
  "alumni-db": "alumni",
  "linkedin-1st": "linkedin-1st",
  "linkedin-2nd": "linkedin-2nd",
  "linkedin-group": "linkedin-group",
  "fan-mail": "fan-mail",
  "facebook": "other",
  "cold-call": "other",
};

const TEMPLATE_LABELS: Record<TemplateKey, string> = {
  alumni: "Alumni",
  "linkedin-1st": "LinkedIn 1st°",
  "linkedin-2nd": "LinkedIn 2nd°",
  "linkedin-group": "LinkedIn Group",
  "fan-mail": "Fan Mail",
  other: "Cold / Other",
};

/* ── Templates ────────────────────────────────────────── */
function getTemplate(key: TemplateKey, contact: Contact, employer: Employer | undefined, profile: UserProfile) {
  const cn = contact.name || "[Contact Name]";
  const co = employer?.name || "[Company]";
  const yn = profile.name || "[Your Name]";
  const sc = profile.school || "[School]";
  const dg = profile.degree || "[degree]";
  const ia = profile.interestArea || "[Interest Area]";

  switch (key) {
    case "alumni":
      return {
        subject: `${sc} ${dg} seeking your advice`,
        body: `Dear ${cn},\n\nMy name is ${yn}, and I am a ${sc} ${dg} who found your profile through the ${sc} alumni network. May I have 20 minutes to ask about your experience at ${co}? I am exploring ${ia}, and your insights would be very helpful.\n\nIf this week doesn't work, I'll follow up next week to find a better time.\n\nThank you,\n${yn}`,
      };
    case "linkedin-1st":
      return {
        subject: `Seeking your advice about ${co}`,
        body: `Dear ${cn},\n\nMy name is ${yn}. Since we're already connected on LinkedIn, I wanted to reach out directly. May I have 20 minutes to ask about your experience at ${co}? I am exploring ${ia}, and your perspective would be very valuable.\n\nIf this week doesn't work, I'll follow up next week to find a better time.\n\nThank you,\n${yn}`,
      };
    case "linkedin-2nd":
      return {
        subject: `Introduction — seeking your advice`,
        body: `Dear ${cn},\n\nMy name is ${yn}, and I noticed we share a mutual connection on LinkedIn. May I have 20 minutes to ask about your experience at ${co}? I am exploring ${ia}, and your perspective would be invaluable.\n\nIf this week doesn't work, I'll follow up next week to find a better time.\n\nThank you,\n${yn}`,
      };
    case "linkedin-group":
      return {
        subject: `Fellow [Group Name] member seeking your advice`,
        body: `Dear ${cn},\n\nMy name is ${yn}. I noticed we're both members of [Group Name] on LinkedIn. May I have 20 minutes to ask about your experience at ${co}? I am exploring ${ia}, and your insights would be appreciated.\n\nIf this week doesn't work, I'll follow up next week to find a better time.\n\nThank you,\n${yn}`,
      };
    case "fan-mail":
      return {
        subject: `Your [article/interview] about [topic]`,
        body: `Dear ${cn},\n\nI found your thoughts on [topic] in [publication] very interesting. Would you be open to a brief phone chat to discuss your work further? I had a few follow-up questions and your insights would be invaluable.\n\nThank you for your time,\n${yn}`,
      };
    default:
      return {
        subject: `Seeking your advice about ${co}`,
        body: `Dear ${cn},\n\nMy name is ${yn}. May I have 20 minutes to ask about your experience at ${co}? I am exploring ${ia}, and your insights would be greatly appreciated.\n\nIf this week doesn't work, I'll follow up next week to find a better time.\n\nThank you,\n${yn}`,
      };
  }
}

function getFollowUpTemplate(contact: Contact, employer: Employer | undefined, profile: UserProfile) {
  const cn = contact.name || "[Contact Name]";
  const co = employer?.name || "[Company]";
  const yn = profile.name || "[Your Name]";
  const sc = profile.school || "[School]";
  const dg = profile.degree || "[degree]";

  return {
    subject: `Following up — ${sc} ${dg} seeking your advice`,
    body: `Dear ${cn},\n\nI wanted to follow up on my email from last week about learning more about your experience at ${co}.\n\nIf now is a better time, I would appreciate 20 minutes of your time. If not, no worries at all.\n\nBest regards,\n${yn}`,
  };
}

/* ── 5-Point Checklist logic ──────────────────────────── */
const JOB_WORDS = /\b(job|position|opening|apply|role|vacancy|hiring)\b/i;
const FOLLOW_UP_WORDS = /follow.?up|reach.?out/i;

interface CheckItem { label: string; pass: boolean; }

function getChecklist(body: string): CheckItem[] {
  const wordCount = body.trim().split(/\s+/).filter(Boolean).length;
  return [
    { label: "Under 100 words", pass: wordCount <= 100 },
    { label: "No job/position mentions", pass: !JOB_WORDS.test(body) },
    { label: "Connection stated first", pass: true },
    { label: "Interest is generalized", pass: !JOB_WORDS.test(body) },
    { label: "You control follow-up", pass: FOLLOW_UP_WORDS.test(body) },
  ];
}

/* ── Need follow-up? ──────────────────────────────────── */
function needsFollowUp(c: Contact): boolean {
  if (!c.emailSentDate || c.respondedDate || c.followUpSentDate) return false;
  const start = new Date(c.emailSentDate);
  const now = new Date();
  let count = 0;
  const cur = new Date(start);
  cur.setDate(cur.getDate() + 1);
  while (cur <= now) {
    const dow = cur.getDay();
    if (dow !== 0 && dow !== 6) count++;
    cur.setDate(cur.getDate() + 1);
  }
  return count >= 7;
}

/* ══════════════════════════════════════════════════════════
   Email Builder Panel
   ══════════════════════════════════════════════════════════ */
interface EmailBuilderProps {
  contact: Contact;
  employer: Employer | undefined;
  onClose: () => void;
  onUpdateContact: (updates: Partial<Contact>) => void;
  onOpenProfile: () => void;
}

export default function EmailBuilder({ contact, employer, onClose, onUpdateContact, onOpenProfile }: EmailBuilderProps) {
  const [profile] = useLocalStorage<UserProfile>(STORAGE_KEYS.userProfile, { name: "", school: "", degree: "", interestArea: "" });
  const [drafts, setDrafts] = useLocalStorage<EmailDraft[]>("lamp-email-drafts", []);

  const isFollowUp = needsFollowUp(contact);
  const defaultTemplate = SOURCE_TO_TEMPLATE[contact.source];
  const [templateKey, setTemplateKey] = useState<TemplateKey>(defaultTemplate);

  // Generate initial content
  const initial = useMemo(() => {
    if (isFollowUp) return getFollowUpTemplate(contact, employer, profile);
    return getTemplate(templateKey, contact, employer, profile);
  }, [templateKey, isFollowUp, contact.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const [subject, setSubject] = useState(initial.subject);
  const [body, setBody] = useState(initial.body);

  // Update when template changes (not on follow-up mode)
  useEffect(() => {
    if (isFollowUp) return;
    const t = getTemplate(templateKey, contact, employer, profile);
    setSubject(t.subject);
    setBody(t.body);
  }, [templateKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const wordCount = body.trim().split(/\s+/).filter(Boolean).length;
  const checklist = getChecklist(body);
  const profileEmpty = !profile.name && !profile.school;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`Subject: ${subject}\n\n${body}`);
    toast.success("Email copied ✓");
  };

  const saveDraft = () => {
    setDrafts((prev) => {
      const filtered = prev.filter((d) => d.contactId !== contact.id);
      return [...filtered, { contactId: contact.id, subject, body, savedAt: new Date().toISOString() }];
    });
    toast.success("Draft saved ✓");
  };

  const markAsSent = () => {
    const today = new Date().toISOString().slice(0, 10);
    if (isFollowUp) {
      onUpdateContact({ followUpSentDate: today });
      toast.success("Follow-up marked as sent — tracking continues ✓");
    } else {
      onUpdateContact({ emailSentDate: today });
      toast.success("Email marked as sent — 3-day timer started ✓");
    }
    onClose();
  };

  return (
    <>
      {/* Backdrop on mobile */}
      <div className="fixed inset-0 bg-black/40 z-40 md:bg-black/20" onClick={onClose} />

      {/* Panel */}
      <div
        className="fixed inset-0 md:inset-y-0 md:left-auto md:right-0 md:w-[480px] z-50 flex flex-col bg-white shadow-2xl animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: "#E5E0D8", backgroundColor: "#FAFAF7" }}>
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-base" style={{ fontFamily: "var(--font-heading)", color: "#1B3A2F" }}>
              {isFollowUp ? "Follow-Up Email" : "Draft Email"}
            </h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-medium text-white" style={{ backgroundColor: isFollowUp ? "#F59E0B" : "#3B82F6" }}>
              {isFollowUp ? "Follow-Up" : TEMPLATE_LABELS[templateKey]}
            </span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[#E5E0D8] transition-colors">
            <X className="w-4 h-4" style={{ color: "#2C2C2C" }} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Profile warning */}
          {profileEmpty && (
            <div className="flex items-start gap-2 p-3 rounded-lg text-xs" style={{ backgroundColor: "#FEF3C7", color: "#92400E" }}>
              <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                Fill in your profile (⚙️ Settings) to auto-populate templates.
                <button onClick={onOpenProfile} className="ml-2 font-semibold underline">Open Settings</button>
              </div>
            </div>
          )}

          {/* Template selector (not for follow-up) */}
          {!isFollowUp && (
            <div>
              <label className="text-xs font-medium block mb-1" style={{ color: "#888" }}>Template</label>
              <select
                value={templateKey}
                onChange={(e) => setTemplateKey(e.target.value as TemplateKey)}
                className="w-full px-3 py-2 rounded-md border text-sm bg-[#FBF7F0]"
                style={{ borderColor: "#E5E0D8" }}
              >
                {(Object.keys(TEMPLATE_LABELS) as TemplateKey[]).map((k) => (
                  <option key={k} value={k}>{TEMPLATE_LABELS[k]}</option>
                ))}
              </select>
            </div>
          )}

          {/* Subject */}
          <div>
            <label className="text-xs font-medium block mb-1" style={{ color: "#888" }}>Subject</label>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 rounded-md border text-sm"
              style={{ borderColor: "#E5E0D8", backgroundColor: "#FBF7F0" }}
            />
          </div>

          {/* Body */}
          <div>
            <label className="text-xs font-medium block mb-1" style={{ color: "#888" }}>Email Body</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full px-3 py-3 rounded-md border text-sm leading-relaxed resize-none"
              style={{
                borderColor: "#E5E0D8",
                backgroundColor: "white",
                fontFamily: "'Georgia', serif",
                minHeight: 220,
              }}
            />
          </div>

          {/* Word count */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium" style={{ color: wordCount <= 100 ? "#166534" : "#991B1B" }}>
              {wordCount} / 100 words
            </span>
            <div className="flex-1 h-1.5 rounded-full" style={{ backgroundColor: "#E5E0D8" }}>
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min((wordCount / 100) * 100, 100)}%`,
                  backgroundColor: wordCount <= 100 ? "#22C55E" : "#EF4444",
                }}
              />
            </div>
          </div>

          {/* 5-Point Checklist */}
          <div className="bg-[#FAFAF7] rounded-lg p-3 space-y-1.5">
            <p className="text-xs font-semibold mb-1" style={{ color: "#1B3A2F" }}>5-Point Checklist</p>
            {checklist.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-xs" style={{ color: item.pass ? "#166534" : "#991B1B" }}>
                {item.pass ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-4 py-3 border-t space-y-2" style={{ borderColor: "#E5E0D8" }}>
          <button
            onClick={copyToClipboard}
            className="w-full py-2.5 rounded-md text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.01]"
            style={{ backgroundColor: "#C9A961" }}
          >
            <Copy className="w-4 h-4" /> Copy to Clipboard
          </button>
          <div className="flex gap-2">
            <button
              onClick={saveDraft}
              className="flex-1 py-2 rounded-md border text-xs font-medium flex items-center justify-center gap-1.5 transition-colors hover:bg-[#FBF7F0]"
              style={{ borderColor: "#E5E0D8", color: "#2C2C2C" }}
            >
              <Save className="w-3.5 h-3.5" /> Save Draft
            </button>
            <button
              onClick={markAsSent}
              className="flex-1 py-2 rounded-md text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-all duration-200 hover:scale-[1.01]"
              style={{ backgroundColor: "#1B3A2F" }}
            >
              <Send className="w-3.5 h-3.5" /> {isFollowUp ? "Mark Follow-Up Sent" : "Mark as Sent"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

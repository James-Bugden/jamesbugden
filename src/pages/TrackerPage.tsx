import { useState, useMemo, useRef, useEffect } from "react";
import { Settings, Target, Mail, BarChart3, BookOpen, X, AlertTriangle } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Employer, Contact, UserProfile, STORAGE_KEYS } from "@/lib/tracker/types";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import LAMPListTab from "@/components/tracker/LAMPListTab";
import ContactsTab from "@/components/tracker/ContactsTab";
import PipelineTab from "@/components/tracker/PipelineTab";
import ResourcesTab from "@/components/tracker/ResourcesTab";
import { SEO } from "@/components/SEO";

const TABS = [
  { id: "lamp", label: "LAMP List", icon: Target },
  { id: "contacts", label: "Contacts", icon: Mail },
  { id: "pipeline", label: "Pipeline", icon: BarChart3 },
  { id: "resources", label: "Resources", icon: BookOpen },
] as const;

type TabId = (typeof TABS)[number]["id"];

const ADVANCED_STAGES: Employer["stage"][] = ["informational", "advocate", "applied", "interviewing", "offer"];

/* ── Progress Ring ─────────────────────────────────────── */
function ProgressRing({ current, max }: { current: number; max: number }) {
  const size = 56;
  const stroke = 5;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(current / max, 1);
  const offset = circ * (1 - pct);

  return (
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <SEO />
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E5E0D8" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#C9A961"
          strokeWidth={stroke} strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round" className="transition-all duration-700 ease-out"
        />
      </svg>
      <span className="absolute text-xs font-semibold transition-all duration-300" style={{ color: "#1B3A2F" }}>
        {current}/{max}
      </span>
    </div>
  );
}

/* ── User Profile Modal ───────────────────────────────── */
function ProfileModal({ profile, onChange, open, onOpenChange }: {
  profile: UserProfile; onChange: (p: UserProfile) => void; open: boolean; onOpenChange: (o: boolean) => void;
}) {
  const [local, setLocal] = useState(profile);
  useEffect(() => { if (open) setLocal(profile); }, [open, profile]);

  const save = () => { onChange(local); onOpenChange(false); toast.success("Profile saved ✓"); };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="font-heading text-lg" style={{ color: "#1B3A2F" }}>Your Profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 mt-2">
          {([["name", "Your Name"], ["school", "School"], ["degree", "Degree"], ["interestArea", "Interest Area (e.g. marketing at tech companies in Taiwan)"]] as const).map(([key, label]) => (
            <div key={key}>
              <label className="text-sm font-medium" style={{ color: "#2C2C2C" }}>{label}</label>
              <Input value={local[key]} onChange={(e) => setLocal((p) => ({ ...p, [key]: e.target.value }))} className="mt-1 bg-[#FBF7F0] border-[#E5E0D8]" />
            </div>
          ))}
          <button onClick={save} className="w-full py-2.5 rounded-md text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02]" style={{ backgroundColor: "#1B3A2F" }}>
            Save Profile
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ── Main Page ─────────────────────────────────────────── */
export default function TrackerPage() {
  const [activeTab, setActiveTab] = useState<TabId>("lamp");
  const [employers, setEmployers] = useLocalStorage<Employer[]>(STORAGE_KEYS.employers, []);
  const [contacts, setContacts] = useLocalStorage<Contact[]>(STORAGE_KEYS.contacts, []);
  const [profile, setProfile] = useLocalStorage<UserProfile>(STORAGE_KEYS.userProfile, { name: "", school: "", degree: "", interestArea: "" });
  const [bannerDismissed, setBannerDismissed] = useLocalStorage(STORAGE_KEYS.dismissedBanner, false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Cross-tab navigation state
  const [preselectedEmployerId, setPreselectedEmployerId] = useState<string | null>(null);
  const [highlightedEmployerId, setHighlightedEmployerId] = useState<string | null>(null);
  const prevTabRef = useRef(activeTab);

  // Clear highlights on tab change
  useEffect(() => {
    if (prevTabRef.current !== activeTab) {
      // Don't clear immediately — let the target tab pick it up
      const timer = setTimeout(() => {
        setHighlightedEmployerId(null);
      }, 3000);
      prevTabRef.current = activeTab;
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  // Reactive stats
  const boosterCount = useMemo(() => {
    return contacts.filter((c) => {
      if (!c.emailSentDate || !c.respondedDate) return false;
      const s = new Date(c.emailSentDate), e = new Date(c.respondedDate);
      let count = 0; const cur = new Date(s); cur.setDate(cur.getDate() + 1);
      while (cur <= e) { const dow = cur.getDay(); if (dow !== 0 && dow !== 6) count++; cur.setDate(cur.getDate() + 1); }
      return count <= 3;
    }).length;
  }, [contacts]);

  const advancedCount = useMemo(() => employers.filter((e) => ADVANCED_STAGES.includes(e.stage)).length, [employers]);

  // Cross-tab handlers
  const handleAddContactForEmployer = (employerId: string) => {
    setPreselectedEmployerId(employerId);
    setActiveTab("contacts");
  };

  const handleViewEmployerInLamp = (employerId: string) => {
    setHighlightedEmployerId(employerId);
    setActiveTab("lamp");
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FBF7F0" }}>
      {/* Skip to content */}
      <a href="#tracker-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:rounded-md focus:shadow-lg focus:text-sm focus:font-medium" style={{ color: "#1B3A2F" }}>
        Skip to content
      </a>

      {/* Header */}
      <header className="px-4 sm:px-6 pt-6 pb-4 max-w-5xl mx-auto" role="banner">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ fontFamily: "var(--font-heading)", color: "#1B3A2F" }}>
              Job Search Tracker
            </h1>
            <p className="text-sm mt-1 italic" style={{ color: "#2C2C2C" }}>
              Based on{" "}
              <a href="https://www.amazon.com/2-Hour-Job-Search-Technology-Faster/dp/1607741709" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80 transition-opacity" style={{ color: "#C9A961" }}>
                The 2-Hour Job Search
              </a>{" "}by Steve Dalton
            </p>
          </div>
          <button onClick={() => setProfileOpen(true)} className="mt-1 p-2 rounded-lg transition-all duration-200 hover:bg-[#E5E0D8]" aria-label="Open profile settings">
            <Settings className="w-5 h-5" style={{ color: "#1B3A2F" }} />
          </button>
        </div>

        {/* Stats bar */}
        <div className="mt-5 flex items-center gap-4 sm:gap-6 flex-wrap" role="status" aria-label="Job search progress">
          <ProgressRing current={employers.length} max={40} />
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm" style={{ color: "#2C2C2C" }}>
            <span className="font-medium">{employers.length} Employers</span>
            <span className="text-[#E5E0D8]" aria-hidden="true">·</span>
            <span>{contacts.length} Contacts</span>
            <span className="text-[#E5E0D8]" aria-hidden="true">·</span>
            <span>{boosterCount} Boosters</span>
            <span className="text-[#E5E0D8]" aria-hidden="true">·</span>
            <span>{advancedCount} Informationals+</span>
          </div>
        </div>
      </header>

      {/* Dismissable banner */}
      {!bannerDismissed && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-4">
          <div className="flex items-start gap-3 p-3 rounded-lg text-sm border" style={{ backgroundColor: "#FFF8E7", borderColor: "#E5D9B8", color: "#2C2C2C" }} role="alert">
            <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#C9A961" }} aria-hidden="true" />
            <p className="flex-1"><strong>Data is saved in this browser only.</strong> Use "Download CSV" to back up. Clearing browser data erases your tracker.</p>
            <button onClick={() => setBannerDismissed(true)} className="p-1 rounded hover:bg-[#E5E0D8] transition-colors flex-shrink-0" aria-label="Dismiss warning">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Tab navigation */}
      <nav className="max-w-5xl mx-auto px-4 sm:px-6" aria-label="Tracker sections">
        <div className="flex border-b" style={{ borderColor: "#E5E0D8" }} role="tablist">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-3 text-xs sm:text-sm font-medium transition-all duration-200 relative min-h-[44px]"
                style={{ color: active ? "#C9A961" : "#2C2C2C" }}
                role="tab"
                aria-selected={active}
                aria-controls={`panel-${tab.id}`}
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden text-[10px] leading-tight">{tab.label.split(" ")[0]}</span>
                {active && <span className="absolute bottom-0 left-2 right-2 h-[3px] rounded-t-full transition-all duration-300" style={{ backgroundColor: "#C9A961" }} />}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Tab content */}
      <main id="tracker-content" className="max-w-5xl mx-auto px-4 sm:px-6 py-6" role="tabpanel">
        <div key={activeTab} className="animate-fade-in">
          {activeTab === "lamp" ? (
            <LAMPListTab
              employers={employers}
              setEmployers={setEmployers}
              contacts={contacts}
              highlightedEmployerId={highlightedEmployerId}
              onAddContactForEmployer={handleAddContactForEmployer}
            />
          ) : activeTab === "contacts" ? (
            <ContactsTab
              employers={employers}
              contacts={contacts}
              setContacts={setContacts}
              onOpenProfile={() => setProfileOpen(true)}
              preselectedEmployerId={preselectedEmployerId}
              onConsumePreselection={() => setPreselectedEmployerId(null)}
            />
          ) : activeTab === "pipeline" ? (
            <PipelineTab
              employers={employers}
              contacts={contacts}
              onUpdateEmployer={(id, updates) => {
                setEmployers((prev) => prev.map((e) => (e.id === id ? { ...e, ...updates } : e)));
              }}
              onSwitchToLamp={() => setActiveTab("lamp")}
              onViewEmployer={handleViewEmployerInLamp}
            />
          ) : (
            <ResourcesTab />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-4 sm:px-6 pb-8 pt-4" role="contentinfo">
        <p className="text-xs text-center" style={{ color: "#9CA3AF" }}>
          Methodology from{" "}
          <a href="https://www.amazon.com/2-Hour-Job-Search-Technology-Faster/dp/1607741709" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">
            The 2-Hour Job Search
          </a>{" "}by Steve Dalton · Built by{" "}
          <a href="/" className="underline hover:opacity-80" style={{ color: "#C9A961" }}>james.careers</a>
        </p>
      </footer>

      <ProfileModal profile={profile} onChange={setProfile} open={profileOpen} onOpenChange={setProfileOpen} />
    </div>
  );
}

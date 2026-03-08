import { useState, useRef } from "react";
import { Pencil, Mail, Phone, MapPin, Camera, Trash2, ChevronDown, Globe, User } from "lucide-react";
import { PersonalDetails, EXTRA_DETAIL_OPTIONS } from "./types";
import { compressImage } from "@/lib/imageCompression";
import { cn } from "@/lib/utils";
import { useT } from "./i18n";

interface PersonalDetailsCardProps {
  details: PersonalDetails;
  onChange: (updates: Partial<PersonalDetails>) => void;
  collapsible?: boolean;
}

/* Clean field component */
function Field({ label, value, onChange, placeholder, type = "text", className }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-[11px] font-medium text-gray-500 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || label}
        className="w-full h-10 rounded-lg bg-gray-50 px-3 text-sm text-gray-900 border border-gray-200 outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-200 transition-colors placeholder-gray-400"
      />
    </div>
  );
}

export function PersonalDetailsCard({ details, onChange, collapsible }: PersonalDetailsCardProps) {
  const t = useT();
  const [editing, setEditing] = useState(true);
  const [showExtras, setShowExtras] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImage(file, 200);
      onChange({ photo: compressed });
    } catch {
      console.error("Failed to compress image");
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const addExtra = (type: string) => {
    if (details.extras.find((e) => e.type === type)) return;
    onChange({
      extras: [...details.extras, { id: crypto.randomUUID(), type, value: "" }],
    });
  };

  const updateExtra = (id: string, value: string) => {
    onChange({
      extras: details.extras.map((e) => (e.id === id ? { ...e, value } : e)),
    });
  };

  const removeExtra = (id: string) => {
    onChange({ extras: details.extras.filter((e) => e.id !== id) });
  };

  const usedTypes = new Set(details.extras.map((e) => e.type));
  const availableExtras = EXTRA_DETAIL_OPTIONS.filter((t) => !usedTypes.has(t));

  return (
    <div className="relative">
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />

      {!editing ? (
        /* ── Collapsed view ──────────────────────── */
        <div className="bg-white rounded-xl px-5 py-4" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          {/* Edit button - positioned above photo */}
          <button
            onClick={() => setEditing(true)}
            className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center transition-colors z-10"
            style={{ color: "#D4930D", backgroundColor: "rgba(212,147,13,0.15)" }}
          >
            <Pencil className="w-3 h-3" />
          </button>

          <div className="flex items-start gap-4 mt-1">
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-bold text-gray-900 leading-tight uppercase tracking-wide">
                {details.fullName || "Your Name"}
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                {details.professionalTitle || "Professional Title"}
              </p>

              {/* Contact column */}
              <div className="flex flex-col gap-1.5 mt-3">
                {details.email && (
                  <span className="flex items-center gap-2 text-xs text-gray-600">
                    <Mail className="w-3.5 h-3.5 text-gray-400" />
                    {details.email}
                  </span>
                )}
                {details.phone && (
                  <span className="flex items-center gap-2 text-xs text-gray-600">
                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                    {details.phone}
                  </span>
                )}
                {details.location && (
                  <span className="flex items-center gap-2 text-xs text-gray-600">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    {details.location}
                  </span>
                )}
                {details.extras.map((e) => (
                  <span key={e.id} className="flex items-center gap-2 text-xs text-gray-600">
                    <Globe className="w-3.5 h-3.5 text-gray-400" />
                    {e.value || e.type}
                  </span>
                ))}
              </div>
            </div>

            {/* Photo on the right */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden relative group cursor-pointer"
            >
              {details.photo ? (
                <img src={details.photo} className="w-full h-full object-cover" alt="" />
              ) : (
                <Camera className="w-6 h-6 text-gray-300" />
              )}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center">
                <Camera className="w-3.5 h-3.5 text-white" />
              </div>
            </button>
          </div>
        </div>
      ) : (
        /* ── Edit mode ───────────────────────────── */
        <div className="bg-white rounded-xl px-5 py-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          {/* Photo upload */}
          <div className="flex items-center gap-3 mb-5">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden relative group cursor-pointer"
            >
              {details.photo ? (
                <img src={details.photo} className="w-full h-full object-cover" alt="" />
              ) : (
                <Camera className="w-5 h-5 text-gray-400" />
              )}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center">
                <Camera className="w-3.5 h-3.5 text-white" />
              </div>
            </button>
            <div className="flex flex-col gap-0.5">
              <button onClick={() => fileInputRef.current?.click()} className="text-xs font-medium hover:opacity-80" style={{ color: "#2b4734" }}>
                {details.photo ? "Change photo" : "Upload photo"}
              </button>
              {details.photo && (
                <button onClick={() => onChange({ photo: "" })} className="text-xs text-gray-400 hover:text-red-500 flex items-center gap-1">
                  <Trash2 className="w-3 h-3" /> Remove
                </button>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <Field
              label="Full Name"
              value={details.fullName}
              onChange={(v) => onChange({ fullName: v })}
              placeholder="Enter your full name"
            />
            <Field
              label="Professional Title"
              value={details.professionalTitle}
              onChange={(v) => onChange({ professionalTitle: v })}
              placeholder="e.g. Software Engineer"
            />

            <div className="grid grid-cols-2 gap-3">
              <Field
                label="Email"
                value={details.email}
                onChange={(v) => onChange({ email: v })}
                type="email"
              />
              <Field
                label="Phone"
                value={details.phone}
                onChange={(v) => onChange({ phone: v })}
                type="tel"
              />
            </div>

            <Field
              label="Location"
              value={details.location}
              onChange={(v) => onChange({ location: v })}
              placeholder="e.g. San Francisco, CA"
            />

            {/* Extra fields */}
            {details.extras.map((extra) => (
              <div key={extra.id} className="flex items-end gap-2">
                <Field
                  label={extra.type}
                  value={extra.value}
                  onChange={(v) => updateExtra(extra.id, v)}
                  placeholder={extra.type}
                  className="flex-1"
                />
                <button
                  onClick={() => removeExtra(extra.id)}
                  className="h-10 w-10 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors flex-shrink-0"
                >
                  ✕
                </button>
              </div>
            ))}

            {/* Add details expandable */}
            {availableExtras.length > 0 && (
              <div>
                <button
                  onClick={() => setShowExtras(!showExtras)}
                  className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors py-1"
                >
                  <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", showExtras && "rotate-180")} />
                  Add more details
                </button>
                {showExtras && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {availableExtras.map((type) => (
                      <button
                        key={type}
                        onClick={() => addExtra(type)}
                        className="text-[11px] px-2.5 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors"
                      >
                        + {type}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Done button */}
            <button
              onClick={() => setEditing(false)}
              className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-colors mt-2"
              style={{ backgroundColor: "#2b4734" }}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

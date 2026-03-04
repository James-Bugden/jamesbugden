import { useState, useRef } from "react";
import { Pencil, Mail, Phone, MapPin, Camera, GripVertical, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PersonalDetails, EXTRA_DETAIL_OPTIONS } from "./types";
import { compressImage } from "@/lib/imageCompression";
import { cn } from "@/lib/utils";

interface PersonalDetailsCardProps {
  details: PersonalDetails;
  onChange: (updates: Partial<PersonalDetails>) => void;
  collapsible?: boolean;
}

export function PersonalDetailsCard({ details, onChange, collapsible }: PersonalDetailsCardProps) {
  const [editing, setEditing] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 relative transition-transform duration-150 hover:scale-[1.02] overflow-hidden">
      {/* Header with collapse toggle */}
      {collapsible && (
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors text-left"
        >
          <span className="font-bold text-gray-900 uppercase tracking-wide text-sm flex-1">Personal Details</span>
          {collapsed ? (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          )}
        </button>
      )}

      {/* Edit button */}
      {!collapsed && (
        <button
          onClick={() => setEditing(!editing)}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center hover:bg-pink-200 transition-colors"
          style={collapsible ? { top: "3rem" } : undefined}
        >
          <Pencil className="w-4 h-4" />
        </button>
      )}

      <div className={cn(
        "transition-all duration-200 ease-in-out overflow-hidden",
        collapsed ? "max-h-0 opacity-0" : "max-h-[3000px] opacity-100"
      )}>
        <div className="p-5">{!editing ? (
        /* View mode */
        <div className="flex items-start gap-5">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold tracking-wide text-gray-900 uppercase">
              {details.fullName || "Your Name"}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {details.professionalTitle || "Professional Title"}
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-sm text-gray-600">
              {details.email && (
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-gray-400" />
                  {details.email}
                </span>
              )}
              {details.phone && (
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-gray-400" />
                  {details.phone}
                </span>
              )}
              {details.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  {details.location}
                </span>
              )}
            </div>
            {details.extras.length > 0 && (
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-sm text-gray-600">
                {details.extras.map((e) => (
                  <span key={e.id}>{e.type}: {e.value}</span>
                ))}
              </div>
            )}
          </div>
          {/* Photo */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden hover:ring-2 hover:ring-pink-300 transition-all cursor-pointer relative group"
          >
            {details.photo ? (
              <img src={details.photo} className="w-full h-full object-cover" alt="" />
            ) : (
              <Camera className="w-6 h-6 text-gray-400" />
            )}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center">
              <Camera className="w-4 h-4 text-white" />
            </div>
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
        </div>
      ) : (
        /* Edit mode */
        <div className="space-y-3 pr-10">
          {/* Photo upload in edit mode */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden hover:ring-2 hover:ring-pink-300 transition-all cursor-pointer relative group"
            >
              {details.photo ? (
                <img src={details.photo} className="w-full h-full object-cover" alt="" />
              ) : (
                <Camera className="w-5 h-5 text-gray-400" />
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center">
                <Camera className="w-4 h-4 text-white" />
              </div>
            </button>
            <div className="flex flex-col gap-1">
              <button onClick={() => fileInputRef.current?.click()} className="text-xs font-medium text-pink-600 hover:text-pink-700">
                {details.photo ? "Change photo" : "Upload photo"}
              </button>
              {details.photo && (
                <button onClick={() => onChange({ photo: "" })} className="text-xs text-gray-400 hover:text-red-500 flex items-center gap-1">
                  <Trash2 className="w-3 h-3" /> Remove
                </button>
              )}
            </div>
          </div>
          <Input
            placeholder="Enter your title, first- and last name"
            value={details.fullName}
            onChange={(e) => onChange({ fullName: e.target.value })}
            className="bg-gray-50 border-gray-200"
          />
          <Input
            placeholder="Target position or current role"
            value={details.professionalTitle}
            onChange={(e) => onChange({ professionalTitle: e.target.value })}
            className="bg-gray-50 border-gray-200"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Email"
                value={details.email}
                onChange={(e) => onChange({ email: e.target.value })}
                className="bg-gray-50 border-gray-200"
              />
              <GripVertical className="w-4 h-4 text-gray-300 flex-shrink-0" />
            </div>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Phone"
                value={details.phone}
                onChange={(e) => onChange({ phone: e.target.value })}
                className="bg-gray-50 border-gray-200"
              />
              <GripVertical className="w-4 h-4 text-gray-300 flex-shrink-0" />
            </div>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Location"
                value={details.location}
                onChange={(e) => onChange({ location: e.target.value })}
                className="bg-gray-50 border-gray-200"
              />
              <GripVertical className="w-4 h-4 text-gray-300 flex-shrink-0" />
            </div>
          </div>

          {/* Extra fields */}
          {details.extras.map((extra) => (
            <div key={extra.id} className="flex items-center gap-2">
              <span className="text-xs text-gray-500 w-24 flex-shrink-0">{extra.type}</span>
              <Input
                placeholder={extra.type}
                value={extra.value}
                onChange={(e) => updateExtra(extra.id, e.target.value)}
                className="bg-gray-50 border-gray-200"
              />
              <button
                onClick={() => removeExtra(extra.id)}
                className="text-gray-400 hover:text-red-500 text-xs flex-shrink-0"
              >
                ✕
              </button>
            </div>
          ))}

          {/* Add detail chips */}
          {availableExtras.length > 0 && (
            <div className="pt-1">
              <p className="text-xs text-gray-400 mb-1.5">Add details</p>
              <div className="flex flex-wrap gap-1.5">
                {availableExtras.map((type) => (
                  <button
                    key={type}
                    onClick={() => addExtra(type)}
                    className="text-xs px-2.5 py-1 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    + {type}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        )}
        </div>
      </div>
    </div>
  );
}

import { Input } from "@/components/ui/input";
import { RichTextEditor } from "@/components/resume-builder/RichTextEditor";
import { PersonalDetailsCard } from "@/components/resume-builder/PersonalDetailsCard";
import { CoverLetterData } from "./types";
import { Plus } from "lucide-react";

interface CoverLetterEditorProps {
  data: CoverLetterData;
  updatePersonalDetails: (u: Partial<CoverLetterData["personalDetails"]>) => void;
  updateData: (u: Partial<CoverLetterData>) => void;
  updateRecipient: (u: Partial<CoverLetterData["recipient"]>) => void;
  updateSignature: (u: Partial<CoverLetterData["signature"]>) => void;
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <h3 className="text-sm font-bold text-gray-900 mb-3">{title}</h3>
      {children}
    </div>
  );
}

export function CoverLetterEditor({
  data,
  updatePersonalDetails,
  updateData,
  updateRecipient,
  updateSignature,
}: CoverLetterEditorProps) {
  return (
    <div className="h-full overflow-y-auto" style={{ backgroundColor: "#F5F0E8" }}>
      <div className="max-w-2xl mx-auto p-6 space-y-4">
        {/* Personal Details — reuse resume component */}
        <PersonalDetailsCard details={data.personalDetails} onChange={updatePersonalDetails} />

        {/* Date */}
        <Card title="Date">
          <Input
            value={data.date}
            onChange={(e) => updateData({ date: e.target.value })}
            className="bg-gray-50 border-gray-200"
          />
        </Card>

        {/* Recipient Details */}
        <Card title="Recipient Details">
          <div className="space-y-3">
            <Input
              placeholder="Enter name of recipient/department"
              value={data.recipient.recipientName}
              onChange={(e) => updateRecipient({ recipientName: e.target.value })}
              className="bg-gray-50 border-gray-200"
            />
            <Input
              placeholder="Enter Company Name"
              value={data.recipient.companyName}
              onChange={(e) => updateRecipient({ companyName: e.target.value })}
              className="bg-gray-50 border-gray-200"
            />
            <Input
              placeholder="Enter Company Address"
              value={data.recipient.companyAddress}
              onChange={(e) => updateRecipient({ companyAddress: e.target.value })}
              className="bg-gray-50 border-gray-200"
            />
          </div>
        </Card>

        {/* Body */}
        <Card title="Body">
          <RichTextEditor
            value={data.body}
            onChange={(v) => updateData({ body: v })}
            placeholder="Write your cover letter..."
          />
        </Card>

        {/* Signature */}
        <Card title="Signature">
          <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors mb-3 text-sm font-medium">
            <Plus className="w-4 h-4" />
            Create / Upload
          </button>
          <div className="space-y-3">
            <Input
              placeholder="Enter full name"
              value={data.signature.fullName}
              onChange={(e) => updateSignature({ fullName: e.target.value })}
              className="bg-gray-50 border-gray-200"
            />
            <Input
              placeholder="Enter place"
              value={data.signature.place}
              onChange={(e) => updateSignature({ place: e.target.value })}
              className="bg-gray-50 border-gray-200"
            />
            <Input
              placeholder="Enter date"
              value={data.signature.date}
              onChange={(e) => updateSignature({ date: e.target.value })}
              className="bg-gray-50 border-gray-200"
            />
          </div>
        </Card>
      </div>
    </div>
  );
}

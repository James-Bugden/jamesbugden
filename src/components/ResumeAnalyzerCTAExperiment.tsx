import { useState, useRef, DragEvent } from "react";
import { FileUp } from "lucide-react";

export default function ResumeAnalyzerCTAExperiment() {
  const [file, setFile] = useState<File | null>(null);
  const [email, setEmail] = useState("");
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (allowed.includes(f.type)) setFile(f);
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder — analysis will be wired up separately
  };

  return (
    <section className="py-12 md:py-20 px-5 md:px-6" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container mx-auto max-w-xl text-center">
        <h2
          className="font-heading mb-6"
          style={{ color: "#1A1A1A", fontSize: "clamp(2rem, 4vw, 2.625rem)" }}
        >
          Get Your Resume Scored in 60&nbsp;Seconds
        </h2>
        <p
          className="mb-10 mx-auto"
          style={{ color: "#6B6B6B", fontSize: "1.0625rem", maxWidth: 550 }}
        >
          Our free AI tool checks your resume the same way a recruiter at Google
          or Amazon would. Get your score and a list of what to fix — instantly.
        </p>

        {/* Tool card */}
        <form
          onSubmit={onSubmit}
          className="rounded-xl mx-auto"
          style={{
            maxWidth: 500,
            backgroundColor: "#FFFFFF",
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            padding: "32px 28px",
          }}
        >
          {/* Upload area */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => inputRef.current?.click()}
            onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            className="flex flex-col items-center justify-center gap-3 rounded-lg cursor-pointer transition-colors duration-200"
            style={{
              backgroundColor: "#FDFBF7",
              border: `2px dashed ${dragging ? "#2D3A2E" : "#D5D5D5"}`,
              padding: "36px 20px",
            }}
          >
            <FileUp
              className="w-12 h-12"
              style={{ color: "#2D3A2E" }}
              strokeWidth={1.5}
            />
            {file ? (
              <p className="text-base font-medium" style={{ color: "#2D3A2E" }}>
                {file.name}
              </p>
            ) : (
              <p className="text-base" style={{ color: "#1A1A1A" }}>
                Upload your resume (PDF or Word)
              </p>
            )}
            <p className="text-sm" style={{ color: "#6B6B6B" }}>
              Drag &amp; drop or click to browse
            </p>
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) handleFile(e.target.files[0]);
              }}
            />
          </div>

          {/* Email input */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email to get the full report"
            className="w-full h-12 px-4 rounded-lg border text-base mt-5 focus:outline-none focus:ring-2"
            style={{
              borderColor: "#D5D5D5",
              color: "#1A1A1A",
              backgroundColor: "#FFFFFF",
            }}
          />

          {/* CTA */}
          <button
            type="submit"
            className="w-full rounded-lg transition-colors duration-200 mt-4"
            style={{ backgroundColor: "#2D3A2E", color: "#FFFFFF", padding: '16px 32px', borderRadius: '8px', fontSize: '1rem', fontWeight: 600 }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor = "#3A4A3B")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor = "#2D3A2E")
            }
          >
            Analyze My Resume
          </button>

          <p className="mt-2" style={{ color: "#6B6B6B", fontSize: "0.8125rem" }}>
            Free · Takes 60 seconds · We never share your info
          </p>
        </form>
      </div>
    </section>
  );
}

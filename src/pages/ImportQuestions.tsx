import { useState } from "react";
import questionsData from "@/data/interview_questions_full.json";
import { supabase } from "@/integrations/supabase/client";
import { SEO } from "@/components/SEO";

export default function ImportQuestions() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImport = async () => {
    setLoading(true);
    setStatus("Sending data...");
    try {
      const { data, error } = await supabase.functions.invoke("bulk-upsert-questions", {
        body: questionsData,
      });
      if (error) {
        setStatus(`Error: ${error.message}`);
      } else {
        setStatus(`Done! Upserted: ${data.upserted}/${data.total}. Errors: ${JSON.stringify(data.errors)}`);
      }
    } catch (e: any) {
      setStatus(`Error: ${e.message}`);
    }
    setLoading(false);
  };

  return (
    <>
      <SEO />
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-2xl font-bold">Import Interview Questions</h1>
      <p className="text-muted-foreground">{questionsData.length} questions ready to import</p>
      <button
        onClick={handleImport}
        disabled={loading}
        className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium disabled:opacity-50"
      >
        {loading ? "Importing..." : "Import Now"}
      </button>
      {status && <pre className="mt-4 p-4 bg-muted rounded-lg text-sm max-w-lg whitespace-pre-wrap">{status}</pre>}
    </div>
  );
}

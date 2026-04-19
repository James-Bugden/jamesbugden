import { useState } from "react";
import { Copy, Check, ExternalLink, BookOpen, Play, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { SEO } from "@/components/SEO";

const FUNCTION_URL =
  "https://reahmeddjkivwzjsoqkn.supabase.co/functions/v1/analytics-export";

const TABLES = [
  "resume_leads",
  "email_gate_leads",
  "salary_checks",
  "event_tracks",
  "share_clicks",
  "feedback",
  "threads_posts",
  "threads_user_insights",
  "threads_demographics",
  "threads_link_clicks",
  "ai_usage_log",
  "resume_analyses",
  "interview_questions",
  "profiles",
];

const PARAMS: { name: string; required: boolean; values: string; description: string }[] = [
  {
    name: "range",
    required: false,
    values: "7d | 30d | 90d (omit = all time)",
    description: "Time window. Filters by each table's date column.",
  },
  {
    name: "tables",
    required: false,
    values: "comma-separated list (omit = all)",
    description: "Restrict the response to specific tables.",
  },
  {
    name: "limit",
    required: false,
    values: "1–5000 (default 1000)",
    description: "Max rows returned per table.",
  },
];

const EXAMPLES: { title: string; description: string; cmd: string }[] = [
  {
    title: "Last 7 days, all tables",
    description: "Quick health check across the whole product.",
    cmd: `curl -H "x-api-key: $ANALYTICS_API_KEY" \\
  "${FUNCTION_URL}?range=7d"`,
  },
  {
    title: "Last 30 days, leads only",
    description: "Pull recent funnel data for analysis.",
    cmd: `curl -H "x-api-key: $ANALYTICS_API_KEY" \\
  "${FUNCTION_URL}?range=30d&tables=resume_leads,email_gate_leads"`,
  },
  {
    title: "Threads performance, 90 days, capped at 500 rows",
    description: "Limit row count for faster responses.",
    cmd: `curl -H "x-api-key: $ANALYTICS_API_KEY" \\
  "${FUNCTION_URL}?range=90d&tables=threads_posts,threads_user_insights&limit=500"`,
  },
  {
    title: "Save response to a file",
    description: "Useful for piping into Claude Code or jq.",
    cmd: `curl -s -H "x-api-key: $ANALYTICS_API_KEY" \\
  "${FUNCTION_URL}?range=30d" > analytics.json`,
  },
  {
    title: "Pretty-print with jq",
    description: "Inspect a single table's rows quickly.",
    cmd: `curl -s -H "x-api-key: $ANALYTICS_API_KEY" \\
  "${FUNCTION_URL}?range=7d&tables=feedback" | jq '.feedback.rows'`,
  },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="h-7 gap-1.5 text-xs"
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? "Copied" : "Copy"}
    </Button>
  );
}

function CodeBlock({ code }: { code: string }) {
  return (
    <div className="relative group">
      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <CopyButton text={code} />
      </div>
      <pre className="bg-muted text-foreground rounded-lg p-4 text-xs font-mono overflow-x-auto whitespace-pre">
        {code}
      </pre>
    </div>
  );
}

export default function AdminApiDocs() {
  return (
    <div className="min-h-screen bg-background">
      <SEO title="Analytics API Docs | Admin" description="Reference for the analytics-export edge function." noIndex />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        <header className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BookOpen className="w-4 h-4" />
            <span>Admin · API reference</span>
          </div>
          <h1 className="font-heading text-3xl text-foreground">Analytics Export API</h1>
          <p className="text-muted-foreground">
            One JSON endpoint that returns rows from all tracked tables. Authenticated by API key. Use it to wire up Claude
            Code, dashboards, or ad-hoc analysis.
          </p>
        </header>

        {/* Endpoint */}
        <Card className="p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">GET</Badge>
            <h2 className="font-heading text-lg text-foreground">Endpoint</h2>
          </div>
          <CodeBlock code={FUNCTION_URL} />
        </Card>

        {/* Auth */}
        <Card className="p-5 space-y-3">
          <h2 className="font-heading text-lg text-foreground">Authentication</h2>
          <p className="text-sm text-muted-foreground">
            Send your key in the <code className="text-xs bg-muted px-1.5 py-0.5 rounded">x-api-key</code> header. The key is
            stored as the <code className="text-xs bg-muted px-1.5 py-0.5 rounded">ANALYTICS_API_KEY</code> secret in Lovable
            Cloud. Rotate it any time from the Cloud secrets panel.
          </p>
          <CodeBlock code={`x-api-key: <your ANALYTICS_API_KEY>`} />
          <Alert>
            <AlertTitle className="text-sm">Keep this key private</AlertTitle>
            <AlertDescription className="text-xs">
              Anyone with the key can read aggregated product data. Never paste it into client-side code or public repos.
            </AlertDescription>
          </Alert>
        </Card>

        {/* Query params */}
        <Card className="p-5 space-y-4">
          <h2 className="font-heading text-lg text-foreground">Query parameters</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="py-2 pr-4 font-medium">Name</th>
                  <th className="py-2 pr-4 font-medium">Required</th>
                  <th className="py-2 pr-4 font-medium">Values</th>
                  <th className="py-2 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                {PARAMS.map((p) => (
                  <tr key={p.name} className="border-b border-border last:border-0 align-top">
                    <td className="py-3 pr-4 font-mono text-xs">{p.name}</td>
                    <td className="py-3 pr-4 text-xs text-muted-foreground">{p.required ? "Yes" : "No"}</td>
                    <td className="py-3 pr-4 text-xs text-muted-foreground">{p.values}</td>
                    <td className="py-3 text-xs text-foreground">{p.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Tables */}
        <Card className="p-5 space-y-3">
          <h2 className="font-heading text-lg text-foreground">Available tables</h2>
          <p className="text-sm text-muted-foreground">
            Pass any of these as a comma-separated list to <code className="text-xs bg-muted px-1.5 py-0.5 rounded">tables=</code>.
            Omit the param to return all of them.
          </p>
          <div className="flex flex-wrap gap-2">
            {TABLES.map((t) => (
              <code key={t} className="text-xs bg-muted px-2 py-1 rounded font-mono text-foreground">
                {t}
              </code>
            ))}
          </div>
          <p className="text-xs text-muted-foreground pt-1">
            The response also includes a derived <code className="text-xs bg-muted px-1 py-0.5 rounded">career_phase_breakdown</code>{" "}
            object summarising user career phases.
          </p>
        </Card>

        {/* Examples */}
        <Card className="p-5 space-y-5">
          <h2 className="font-heading text-lg text-foreground">Example requests</h2>
          {EXAMPLES.map((ex) => (
            <div key={ex.title} className="space-y-2">
              <div>
                <h3 className="text-sm font-semibold text-foreground">{ex.title}</h3>
                <p className="text-xs text-muted-foreground">{ex.description}</p>
              </div>
              <CodeBlock code={ex.cmd} />
            </div>
          ))}
        </Card>

        {/* Response shape */}
        <Card className="p-5 space-y-3">
          <h2 className="font-heading text-lg text-foreground">Response shape</h2>
          <p className="text-sm text-muted-foreground">
            Top-level object keyed by table name. Each table has <code className="text-xs bg-muted px-1 py-0.5 rounded">total</code>{" "}
            and <code className="text-xs bg-muted px-1 py-0.5 rounded">rows</code>.
          </p>
          <CodeBlock
            code={`{
  "range": "7d",
  "queried_at": "2026-04-19T12:00:00.000Z",
  "resume_leads":      { "total": 42,  "rows": [ ... ] },
  "email_gate_leads":  { "total": 18,  "rows": [ ... ] },
  "feedback":          { "total": 7,   "rows": [ ... ] },
  "...":               { "total": ...,  "rows": [ ... ] },
  "career_phase_breakdown": {
    "total_users": 120,
    "phases": [
      { "phase": "exploring", "count": 60, "pct": 50 },
      { "phase": "active",    "count": 40, "pct": 33 }
    ]
  }
}`}
          />
        </Card>

        <div className="pt-2">
          <a
            href="/admin"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Back to admin dashboard
          </a>
        </div>
      </div>
    </div>
  );
}

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";
import { ExternalLink, ChevronLeft, ChevronRight, MousePointerClick, ChevronDown } from "lucide-react";
import { fmt } from "./analyticsShared";

const tipStyle = {
  background: "hsl(var(--background))",
  border: "1px solid hsl(var(--border))",
  borderRadius: 8,
  fontSize: 12,
};

const PIE_COLORS = ["hsl(var(--primary))", "#f59e0b", "#22c55e", "#8b5cf6", "#ef4444", "#06b6d4"];

// ── Link Clicks (collapsed by default) ─────────────────────────────
function LinkClicksSection() {
  const [open, setOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [page, setPage] = useState(0);
  const perPage = 20;

  const { data, isLoading } = useQuery({
    queryKey: ["threads-link-clicks"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("threads_link_clicks")
        .select("*")
        .order("clicks", { ascending: false })
        .limit(500);
      if (error) throw error;
      return data || [];
    },
  });

  const filtered = useMemo(() => {
    if (!data) return [];
    if (showAll) return data;
    return data.filter(r => r.link_url?.includes("jamesbugden"));
  }, [data, showAll]);

  const totalClicks = useMemo(() => filtered.reduce((s, r) => s + (r.clicks || 0), 0), [filtered]);
  const totalPages = Math.ceil(filtered.length / perPage);
  const pageData = filtered.slice(page * perPage, (page + 1) * perPage);

  if (isLoading) return <Skeleton className="h-16 rounded-lg" />;
  if (!data?.length) return null;

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <Card>
        <CollapsibleTrigger asChild>
          <button className="w-full flex items-center gap-3 p-4 text-left hover:bg-muted/30 transition-colors rounded-lg">
            <MousePointerClick className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium flex-1">Link Clicks</span>
            <span className="text-sm text-muted-foreground">{fmt(totalClicks)} total</span>
            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-4 pb-4 space-y-4">
            <div className="flex justify-end">
              <Button variant="outline" size="sm" onClick={() => { setShowAll(!showAll); setPage(0); }}>
                {showAll ? "Show jamesbugden.com only" : "Show all links"}
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="p-2">Date</th>
                    <th className="p-2">URL</th>
                    <th className="p-2 text-right">Clicks</th>
                  </tr>
                </thead>
                <tbody>
                  {pageData.map(r => (
                    <tr key={r.id} className="border-b">
                      <td className="p-2 whitespace-nowrap">{r.metric_date}</td>
                      <td className="p-2 max-w-[300px] truncate">
                        <a href={r.link_url} target="_blank" rel="noopener noreferrer"
                          className="text-primary hover:underline inline-flex items-center gap-1">
                          {r.link_url?.replace(/^https?:\/\//, "").slice(0, 50)}
                          <ExternalLink className="w-3 h-3 flex-shrink-0" />
                        </a>
                      </td>
                      <td className="p-2 text-right font-medium">{r.clicks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <Button variant="outline" size="sm" disabled={page === 0} onClick={() => setPage(page - 1)}>
                  <ChevronLeft className="w-3 h-3" />
                </Button>
                <span className="text-sm text-muted-foreground">{page + 1} / {totalPages}</span>
                <Button variant="outline" size="sm" disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)}>
                  <ChevronRight className="w-3 h-3" />
                </Button>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

// ── Demographics (collapsed by default) ────────────────────────────
function DemographicsSection() {
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["threads-demographics"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("threads_demographics")
        .select("*")
        .order("percentage", { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  if (isLoading) return <Skeleton className="h-16 rounded-lg" />;
  if (!data?.length) return (
    <Card>
      <CardContent className="p-6 text-center text-muted-foreground">
        <p className="text-sm">No demographics data yet. Click <strong>Demographics</strong> in Data Management to fetch.</p>
      </CardContent>
    </Card>
  );

  // Check if all values are 0 (API returned structure but no actual data)
  const hasRealData = data.some(d => Number(d.percentage) > 0);
  if (!hasRealData) return (
    <Card>
      <CardContent className="p-6 text-center text-muted-foreground">
        <p className="text-sm">Demographics data was fetched but all values are 0%.</p>
        <p className="text-xs mt-1">Try clicking <strong>Demographics</strong> in Data Management to re-sync. The Threads API may need more followers before providing breakdown data.</p>
      </CardContent>
    </Card>
  );

  const byType = (type: string) => data.filter(d => d.breakdown_type === type);
  const fetchedAt = data[0]?.fetched_at ? new Date(data[0].fetched_at).toLocaleDateString() : "—";

  const countryData = byType("country").slice(0, 10).map(d => ({ name: d.breakdown_value, value: Number(d.percentage) }));
  const cityData = byType("city").slice(0, 10).map(d => ({ name: d.breakdown_value, value: Number(d.percentage) }));
  const ageData = byType("age").map(d => ({ name: d.breakdown_value, value: Number(d.percentage) }));
  const genderData = byType("gender").map(d => ({ name: d.breakdown_value, value: Number(d.percentage) }));

  const topCountry = countryData[0];
  const topAge = ageData.sort((a, b) => b.value - a.value)[0];

  const HBarCard = ({ title, chartData }: { title: string; chartData: { name: string; value: number }[] }) => (
    <Card>
      <CardContent className="p-4 space-y-2">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-medium">{title}</h4>
          <span className="text-[10px] text-muted-foreground">Updated: {fetchedAt}</span>
        </div>
        <div className="h-[230px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis type="number" tick={{ fontSize: 10 }} tickFormatter={v => v + "%"} />
              <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={tipStyle} formatter={(v: number) => v.toFixed(1) + "%"} />
              <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <Card>
        <CollapsibleTrigger asChild>
          <button className="w-full flex items-center gap-3 p-4 text-left hover:bg-muted/30 transition-colors rounded-lg">
            <span className="text-sm font-medium flex-1">Audience Demographics</span>
            <span className="text-xs text-muted-foreground">
              {topCountry ? `${topCountry.name} ${topCountry.value.toFixed(0)}%` : ""}
              {topAge ? ` · ${topAge.name} ${topAge.value.toFixed(0)}%` : ""}
            </span>
            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-4 pb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <HBarCard title="🌍 Country" chartData={countryData} />
              <HBarCard title="🏙️ City" chartData={cityData} />
              <Card>
                <CardContent className="p-4 space-y-2">
                  <h4 className="text-sm font-medium">📊 Age</h4>
                  <div className="h-[230px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={ageData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                        <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} tickFormatter={v => v + "%"} />
                        <Tooltip contentStyle={tipStyle} formatter={(v: number) => v.toFixed(1) + "%"} />
                        <Bar dataKey="value" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 space-y-2">
                  <h4 className="text-sm font-medium">👤 Gender</h4>
                  <div className="h-[230px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={genderData} dataKey="value" nameKey="name" cx="50%" cy="50%"
                          innerRadius={50} outerRadius={80} paddingAngle={3}
                          label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}>
                          {genderData.map((_, i) => (
                            <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={tipStyle} formatter={(v: number) => v.toFixed(1) + "%"} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

// ── Export ──────────────────────────────────────────────────────────
export default function LinksDemographicsSections() {
  return (
    <div className="space-y-4">
      <LinkClicksSection />
      <DemographicsSection />
    </div>
  );
}

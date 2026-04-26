import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";
import { ExternalLink, ChevronLeft, ChevronRight, MousePointerClick } from "lucide-react";
import { fmt } from "./analyticsShared";

const tipStyle = { background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, fontSize: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" };
const gridStroke = "#f3f4f6";
const axisTickStyle = { fontSize: 11, fill: "#9ca3af" };
const PIE_COLORS = ["#3b82f6", "#f59e0b", "#22c55e", "#8b5cf6", "#ef4444", "#06b6d4"];

// ── Link Clicks ────────────────────────────────────────────────────
function LinkClicksSection() {
  const [showAll, setShowAll] = useState(false);
  const [page, setPage] = useState(0);
  const perPage = 20;

  const { data, isLoading } = useQuery({
    queryKey: ["threads-link-clicks"],
    queryFn: async () => {
      const { data, error } = await supabase.from("threads_link_clicks").select("*").order("clicks", { ascending: false }).limit(500);
      if (error) throw error;
      return data || [];
    },
  });

  const filtered = useMemo(() => {
    if (!data) return [];
    return showAll ? data : data.filter(r => r.link_url?.includes("jamesbugden"));
  }, [data, showAll]);

  const totalClicks = useMemo(() => filtered.reduce((s, r) => s + (r.clicks || 0), 0), [filtered]);
  const totalPages = Math.ceil(filtered.length / perPage);
  const pageData = filtered.slice(page * perPage, (page + 1) * perPage);

  if (isLoading) return <Skeleton className="h-16 rounded-xl" />;
  if (!data?.length) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-gray-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center">
            <MousePointerClick className="w-4 h-4 text-violet-500" />
          </div>
          <div>
            <span className="text-sm font-semibold text-gray-900">Link Clicks</span>
            <span className="text-xs text-gray-400 ml-2">{fmt(totalClicks)} total</span>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={() => { setShowAll(!showAll); setPage(0); }} className="text-xs h-8 border-gray-200 rounded-lg">
          {showAll ? "My links only" : "Show all"}
        </Button>
      </div>
      <div className="overflow-x-auto max-w-full">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-50 text-left text-gray-500">
              <th className="p-4 font-medium text-xs uppercase tracking-wider">Date</th>
              <th className="p-4 font-medium text-xs uppercase tracking-wider">URL</th>
              <th className="p-4 text-right font-medium text-xs uppercase tracking-wider">Clicks</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((r, i) => (
              <tr key={r.id} className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${i % 2 === 0 ? "bg-gray-50/30" : ""}`}>
                <td className="p-4 whitespace-nowrap text-xs text-gray-500">{r.metric_date}</td>
                <td className="p-4 max-w-[300px] truncate text-xs">
                  <a href={r.link_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 inline-flex items-center gap-1 transition-colors">
                    {r.link_url?.replace(/^https?:\/\//, "").slice(0, 50)}
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                </td>
                <td className="p-4 text-right font-semibold text-xs text-gray-900">{r.clicks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 p-4 border-t border-gray-50">
          <Button variant="outline" size="sm" disabled={page === 0} onClick={() => setPage(page - 1)} className="h-8 w-8 p-0 border-gray-200 rounded-lg">
            <ChevronLeft className="w-3.5 h-3.5" />
          </Button>
          <span className="text-xs text-gray-500 font-medium">{page + 1} / {totalPages}</span>
          <Button variant="outline" size="sm" disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)} className="h-8 w-8 p-0 border-gray-200 rounded-lg">
            <ChevronRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      )}
    </div>
  );
}

// ── Demographics ───────────────────────────────────────────────────
function DemographicsSection() {
  const { data, isLoading } = useQuery({
    queryKey: ["threads-demographics"],
    queryFn: async () => {
      const { data, error } = await supabase.from("threads_demographics").select("*").order("percentage", { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  if (isLoading) return <Skeleton className="h-16 rounded-xl" />;
  if (!data?.length) return (
    <div className="bg-white rounded-xl border border-gray-100 p-12 text-center shadow-sm">
      <p className="text-sm text-gray-500 font-medium">No demographics data yet</p>
      <p className="text-xs text-gray-400 mt-2">Go to Settings and run "Sync Demographics".</p>
    </div>
  );

  const hasRealData = data.some(d => Number(d.percentage) > 0);
  if (!hasRealData) return (
    <div className="bg-white rounded-xl border border-gray-100 p-12 text-center shadow-sm">
      <p className="text-sm text-gray-500 font-medium">Demographics data fetched but all values are 0%</p>
      <p className="text-xs text-gray-400 mt-2">Try re-syncing. The API may need more followers to provide breakdown data.</p>
    </div>
  );

  const byType = (type: string) => data.filter(d => d.breakdown_type === type);
  const fetchedAt = data[0]?.fetched_at ? new Date(data[0].fetched_at).toLocaleDateString() : ", ";

  const countryData = byType("country").slice(0, 10).map(d => ({ name: d.breakdown_value, value: Number(d.percentage) }));
  const cityData = byType("city").slice(0, 10).map(d => ({ name: d.breakdown_value, value: Number(d.percentage) }));
  const ageData = byType("age").map(d => ({ name: d.breakdown_value, value: Number(d.percentage) }));
  const genderData = byType("gender").map(d => ({ name: d.breakdown_value === "F" ? "Female" : d.breakdown_value === "M" ? "Male" : "Unknown", value: Number(d.percentage) }));

  const GENDER_COLORS = ["#3b82f6", "#f59e0b", "#94a3b8"];

  const HBarCard = ({ title, emoji, chartData, barColor }: { title: string; emoji: string; chartData: { name: string; value: number }[]; barColor: string }) => (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <span>{emoji}</span> {title}
        </h4>
        <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">Updated {fetchedAt}</span>
      </div>
      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ left: 0, right: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} horizontal={false} />
            <XAxis type="number" tick={axisTickStyle} tickFormatter={v => v + "%"} axisLine={false} tickLine={false} />
            <YAxis dataKey="name" type="category" width={90} tick={{ fontSize: 11, fill: "#374151" }} axisLine={false} tickLine={false} />
            <RechartsTooltip contentStyle={tipStyle} formatter={(v: number) => [v.toFixed(1) + "%", title]} />
            <Bar dataKey="value" fill={barColor} radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
      <h3 className="text-base font-semibold text-gray-900 mb-6">Audience Demographics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <HBarCard title="Country" emoji="🌍" chartData={countryData} barColor="#3b82f6" />
        <HBarCard title="City" emoji="🏙️" chartData={cityData} barColor="#8b5cf6" />
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <span>📊</span> Age
          </h4>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageData} margin={{ right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
                <XAxis dataKey="name" tick={axisTickStyle} axisLine={false} tickLine={false} />
                <YAxis tick={axisTickStyle} tickFormatter={v => v + "%"} axisLine={false} tickLine={false} />
                <RechartsTooltip contentStyle={tipStyle} formatter={(v: number) => [v.toFixed(1) + "%", "Age Group"]} />
                <Bar dataKey="value" fill="#f59e0b" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <span>👤</span> Gender
          </h4>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={genderData} dataKey="value" nameKey="name" cx="50%" cy="50%"
                  innerRadius={60} outerRadius={90} paddingAngle={4}
                  label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                  labelLine={{ strokeWidth: 1, stroke: "#d1d5db" }}>
                  {genderData.map((_, i) => <Cell key={i} fill={GENDER_COLORS[i % GENDER_COLORS.length]} />)}
                </Pie>
                <RechartsTooltip contentStyle={tipStyle} formatter={(v: number) => [v.toFixed(1) + "%"]} />
                <Legend iconType="circle" iconSize={8}
                  formatter={(value: string) => <span className="text-xs text-gray-600 ml-1">{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LinksDemographicsSections() {
  return (
    <div className="space-y-5">
      <DemographicsSection />
      <LinkClicksSection />
    </div>
  );
}

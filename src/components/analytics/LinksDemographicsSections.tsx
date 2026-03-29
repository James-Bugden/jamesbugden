import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";
import { ExternalLink, ChevronLeft, ChevronRight, MousePointerClick, ChevronDown } from "lucide-react";
import { fmt } from "./analyticsShared";

const tipStyle = { background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 12 };
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

  if (isLoading) return <Skeleton className="h-16 rounded-lg" />;
  if (!data?.length) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <MousePointerClick className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-900">Link Clicks</span>
          <span className="text-xs text-gray-500">{fmt(totalClicks)} total</span>
        </div>
        <Button variant="outline" size="sm" onClick={() => { setShowAll(!showAll); setPage(0); }} className="text-xs h-7 border-gray-200">
          {showAll ? "My links only" : "Show all"}
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left text-gray-500">
              <th className="p-3 font-medium text-xs">Date</th>
              <th className="p-3 font-medium text-xs">URL</th>
              <th className="p-3 text-right font-medium text-xs">Clicks</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((r, i) => (
              <tr key={r.id} className={i % 2 === 0 ? "bg-gray-50/50" : ""}>
                <td className="p-3 whitespace-nowrap text-xs text-gray-600">{r.metric_date}</td>
                <td className="p-3 max-w-[300px] truncate text-xs">
                  <a href={r.link_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline inline-flex items-center gap-1">
                    {r.link_url?.replace(/^https?:\/\//, "").slice(0, 50)}
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                </td>
                <td className="p-3 text-right font-medium text-xs text-gray-900">{r.clicks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 p-3 border-t border-gray-100">
          <Button variant="outline" size="sm" disabled={page === 0} onClick={() => setPage(page - 1)} className="h-7 border-gray-200">
            <ChevronLeft className="w-3 h-3" />
          </Button>
          <span className="text-xs text-gray-500">{page + 1} / {totalPages}</span>
          <Button variant="outline" size="sm" disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)} className="h-7 border-gray-200">
            <ChevronRight className="w-3 h-3" />
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

  if (isLoading) return <Skeleton className="h-16 rounded-lg" />;
  if (!data?.length) return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 text-center text-gray-400">
      <p className="text-sm">No demographics data yet.</p>
      <p className="text-xs mt-1">Go to Settings and run "Sync Demographics".</p>
    </div>
  );

  const hasRealData = data.some(d => Number(d.percentage) > 0);
  if (!hasRealData) return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 text-center text-gray-400">
      <p className="text-sm">Demographics data fetched but all values are 0%.</p>
      <p className="text-xs mt-1">Try re-syncing. The API may need more followers to provide breakdown data.</p>
    </div>
  );

  const byType = (type: string) => data.filter(d => d.breakdown_type === type);
  const fetchedAt = data[0]?.fetched_at ? new Date(data[0].fetched_at).toLocaleDateString() : "—";

  const countryData = byType("country").slice(0, 10).map(d => ({ name: d.breakdown_value, value: Number(d.percentage) }));
  const cityData = byType("city").slice(0, 10).map(d => ({ name: d.breakdown_value, value: Number(d.percentage) }));
  const ageData = byType("age").map(d => ({ name: d.breakdown_value, value: Number(d.percentage) }));
  const genderData = byType("gender").map(d => ({ name: d.breakdown_value, value: Number(d.percentage) }));

  const HBarCard = ({ title, chartData }: { title: string; chartData: { name: string; value: number }[] }) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium text-gray-900">{title}</h4>
        <span className="text-[10px] text-gray-400">Updated: {fetchedAt}</span>
      </div>
      <div className="h-[230px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis type="number" tick={{ fontSize: 10, fill: "#9ca3af" }} tickFormatter={v => v + "%"} />
            <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 10, fill: "#6b7280" }} />
            <RechartsTooltip contentStyle={tipStyle} formatter={(v: number) => v.toFixed(1) + "%"} />
            <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      <h3 className="text-sm font-medium text-gray-900 mb-4">Audience Demographics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <HBarCard title="🌍 Country" chartData={countryData} />
        <HBarCard title="🏙️ City" chartData={cityData} />
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-900">📊 Age</h4>
          <div className="h-[230px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#9ca3af" }} />
                <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} tickFormatter={v => v + "%"} />
                <RechartsTooltip contentStyle={tipStyle} formatter={(v: number) => v.toFixed(1) + "%"} />
                <Bar dataKey="value" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-900">👤 Gender</h4>
          <div className="h-[230px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={genderData} dataKey="value" nameKey="name" cx="50%" cy="50%"
                  innerRadius={50} outerRadius={80} paddingAngle={3}
                  label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}>
                  {genderData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <RechartsTooltip contentStyle={tipStyle} formatter={(v: number) => v.toFixed(1) + "%"} />
                <Legend />
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
    <div className="space-y-4">
      <DemographicsSection />
      <LinkClicksSection />
    </div>
  );
}

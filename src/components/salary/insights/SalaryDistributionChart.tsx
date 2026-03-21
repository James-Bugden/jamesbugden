import { useMemo } from "react";
import { salaryData, NATIONAL_MEDIAN } from "@/data/salaryData";
import { type SalaryLang } from "../salaryI18n";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { Link } from "react-router-dom";

const BUCKETS = [
  { label: "<500K", min: 0, max: 500_000 },
  { label: "500K–800K", min: 500_000, max: 800_000 },
  { label: "800K–1.2M", min: 800_000, max: 1_200_000 },
  { label: "1.2M–2M", min: 1_200_000, max: 2_000_000 },
  { label: "2M–3M", min: 2_000_000, max: 3_000_000 },
  { label: "3M–5M", min: 3_000_000, max: 5_000_000 },
  { label: "5M+", min: 5_000_000, max: Infinity },
];

export default function SalaryDistributionChart({ lang }: { lang: SalaryLang }) {
  const data = useMemo(() => {
    return BUCKETS.map(b => ({
      name: b.label,
      count: salaryData.filter(d => d.med >= b.min && d.med < b.max).length,
      mid: b.max === Infinity ? 6_000_000 : (b.min + b.max) / 2,
    }));
  }, []);

  // Find which bucket the national median falls in
  const medianBucketIdx = BUCKETS.findIndex(b => NATIONAL_MEDIAN >= b.min && NATIONAL_MEDIAN < b.max);

  return (
    <div className="space-y-4">
      <div className="h-48 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ left: 10, right: 10, top: 10, bottom: 5 }}>
            <defs>
              <linearGradient id="salaryGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(153, 38%, 30%)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(153, 38%, 30%)" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
            <ReferenceLine
              x={BUCKETS[medianBucketIdx]?.label}
              stroke="hsl(var(--destructive))"
              strokeDasharray="4 4"
              label={{ value: lang === "zh" ? "全國中位數" : "National Median", position: "top", fontSize: 10 }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.[0]) return null;
                const d = payload[0].payload;
                return (
                  <div className="bg-card border border-border rounded-lg p-3 shadow-lg text-xs">
                    <p className="font-bold">{d.name}</p>
                    <p>{d.count} {lang === "zh" ? "個職位" : "roles"}</p>
                  </div>
                );
              }}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="hsl(153, 38%, 25%)"
              fill="url(#salaryGrad)"
              strokeWidth={2}
              isAnimationActive
              animationDuration={400}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center">
        <Link
          to={lang === "zh" ? "/zh-tw/salary/compare?tab=underpaid" : "/salary/compare?tab=underpaid"}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-executive text-white rounded-xl font-medium text-sm hover:bg-executive-light transition-colors"
        >
          {lang === "zh" ? "你落在哪裡？查看 →" : "Where do you fall? Find out →"}
        </Link>
      </div>
    </div>
  );
}

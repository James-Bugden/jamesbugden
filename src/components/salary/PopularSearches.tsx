import { useSalaryT, type SalaryLang } from "./salaryI18n";

const POPULAR = [
  "Software Engineer", "IC Designer (Digital)", "HR Manager", "Finance Manager",
  "Data Scientist", "Full Stack Developer", "Marketing Manager", "Sales Manager",
  "Project Manager (IT)", "UX Designer",
];

interface Props {
  lang: SalaryLang;
  onSelect: (role: string) => void;
}

export default function PopularSearches({ lang, onSelect }: Props) {
  const t = useSalaryT(lang);

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <h2 className="font-heading text-xl font-bold mb-4">{t.popularSearches}</h2>
      <div className="flex flex-wrap gap-2">
        {POPULAR.map(role => (
          <button
            key={role}
            onClick={() => onSelect(role)}
            className="px-3 py-1.5 rounded-full text-sm border border-border bg-card hover:bg-executive hover:text-white transition-colors"
          >
            {role}
          </button>
        ))}
      </div>
    </section>
  );
}

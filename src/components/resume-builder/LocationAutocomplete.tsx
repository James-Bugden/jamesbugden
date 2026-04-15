import { useState, useRef, useEffect, useCallback } from "react";
import { MapPin } from "lucide-react";

/**
 * Curated list of ~500 major world cities with good coverage of
 * Taiwan, Southeast Asia, East Asia, Europe, Americas, and other regions.
 * Format: "City, Country"
 */
const CITIES: string[] = [
  // Taiwan
  "Taipei, Taiwan","New Taipei, Taiwan","Taichung, Taiwan","Kaohsiung, Taiwan","Taoyuan, Taiwan",
  "Tainan, Taiwan","Hsinchu, Taiwan","Keelung, Taiwan","Chiayi, Taiwan","Changhua, Taiwan",
  "Pingtung, Taiwan","Yilan, Taiwan","Miaoli, Taiwan","Nantou, Taiwan","Hualien, Taiwan",
  "Taitung, Taiwan","Zhongli, Taiwan","Banqiao, Taiwan",
  // China
  "Beijing, China","Shanghai, China","Guangzhou, China","Shenzhen, China","Chengdu, China",
  "Hangzhou, China","Nanjing, China","Wuhan, China","Xi'an, China","Suzhou, China",
  "Tianjin, China","Chongqing, China","Dongguan, China","Shenyang, China","Qingdao, China",
  "Dalian, China","Xiamen, China","Kunming, China","Zhengzhou, China","Changsha, China",
  // Japan
  "Tokyo, Japan","Osaka, Japan","Yokohama, Japan","Nagoya, Japan","Sapporo, Japan",
  "Kobe, Japan","Kyoto, Japan","Fukuoka, Japan","Hiroshima, Japan","Sendai, Japan",
  // South Korea
  "Seoul, South Korea","Busan, South Korea","Incheon, South Korea","Daegu, South Korea",
  "Daejeon, South Korea","Gwangju, South Korea","Suwon, South Korea",
  // Southeast Asia
  "Singapore, Singapore","Bangkok, Thailand","Ho Chi Minh City, Vietnam","Hanoi, Vietnam",
  "Jakarta, Indonesia","Kuala Lumpur, Malaysia","Manila, Philippines","Makati, Philippines",
  "Cebu City, Philippines","Phnom Penh, Cambodia","Yangon, Myanmar","Vientiane, Laos",
  "Johor Bahru, Malaysia","Penang, Malaysia","Bandung, Indonesia","Surabaya, Indonesia",
  "Da Nang, Vietnam","Chiang Mai, Thailand","Pattaya, Thailand",
  // India
  "Mumbai, India","New Delhi, India","Bangalore, India","Hyderabad, India","Chennai, India",
  "Kolkata, India","Pune, India","Ahmedabad, India","Gurgaon, India","Noida, India",
  // Hong Kong & Macau
  "Hong Kong, Hong Kong","Macau, Macau",
  // Middle East
  "Dubai, UAE","Abu Dhabi, UAE","Doha, Qatar","Riyadh, Saudi Arabia","Tel Aviv, Israel",
  "Jerusalem, Israel","Beirut, Lebanon","Amman, Jordan","Kuwait City, Kuwait","Muscat, Oman",
  "Manama, Bahrain",
  // Australia & New Zealand
  "Sydney, Australia","Melbourne, Australia","Brisbane, Australia","Perth, Australia",
  "Adelaide, Australia","Canberra, Australia","Auckland, New Zealand","Wellington, New Zealand",
  "Christchurch, New Zealand",
  // United States
  "New York, USA","Los Angeles, USA","Chicago, USA","Houston, USA","Phoenix, USA",
  "Philadelphia, USA","San Antonio, USA","San Diego, USA","Dallas, USA","San Jose, USA",
  "Austin, USA","Jacksonville, USA","San Francisco, USA","Seattle, USA","Denver, USA",
  "Washington D.C., USA","Nashville, USA","Boston, USA","Portland, USA","Las Vegas, USA",
  "Atlanta, USA","Miami, USA","Minneapolis, USA","Charlotte, USA","Raleigh, USA",
  "Salt Lake City, USA","Pittsburgh, USA","Detroit, USA","St. Louis, USA","Tampa, USA",
  "Honolulu, USA","Irvine, USA","Palo Alto, USA","Mountain View, USA",
  // Canada
  "Toronto, Canada","Vancouver, Canada","Montreal, Canada","Calgary, Canada","Ottawa, Canada",
  "Edmonton, Canada","Winnipeg, Canada","Halifax, Canada","Victoria, Canada","Waterloo, Canada",
  // United Kingdom
  "London, UK","Manchester, UK","Birmingham, UK","Edinburgh, UK","Glasgow, UK",
  "Bristol, UK","Leeds, UK","Liverpool, UK","Cambridge, UK","Oxford, UK",
  // Germany
  "Berlin, Germany","Munich, Germany","Frankfurt, Germany","Hamburg, Germany","Cologne, Germany",
  "Düsseldorf, Germany","Stuttgart, Germany",
  // France
  "Paris, France","Lyon, France","Marseille, France","Toulouse, France","Nice, France",
  "Bordeaux, France","Strasbourg, France",
  // Netherlands
  "Amsterdam, Netherlands","Rotterdam, Netherlands","The Hague, Netherlands","Utrecht, Netherlands",
  "Eindhoven, Netherlands",
  // Switzerland
  "Zurich, Switzerland","Geneva, Switzerland","Basel, Switzerland","Bern, Switzerland",
  "Lausanne, Switzerland",
  // Ireland
  "Dublin, Ireland","Cork, Ireland","Galway, Ireland",
  // Nordics
  "Stockholm, Sweden","Gothenburg, Sweden","Copenhagen, Denmark","Oslo, Norway",
  "Helsinki, Finland","Reykjavik, Iceland",
  // Southern Europe
  "Madrid, Spain","Barcelona, Spain","Lisbon, Portugal","Rome, Italy","Milan, Italy",
  "Athens, Greece","Istanbul, Turkey","Ankara, Turkey",
  // Central & Eastern Europe
  "Prague, Czech Republic","Warsaw, Poland","Krakow, Poland","Budapest, Hungary",
  "Bucharest, Romania","Vienna, Austria","Brussels, Belgium","Luxembourg, Luxembourg",
  // Latin America
  "São Paulo, Brazil","Rio de Janeiro, Brazil","Mexico City, Mexico","Buenos Aires, Argentina",
  "Lima, Peru","Bogotá, Colombia","Santiago, Chile","Medellín, Colombia","Montevideo, Uruguay",
  "Panama City, Panama","San José, Costa Rica","Quito, Ecuador","Guadalajara, Mexico",
  // Africa
  "Lagos, Nigeria","Nairobi, Kenya","Cape Town, South Africa","Johannesburg, South Africa",
  "Cairo, Egypt","Accra, Ghana","Addis Ababa, Ethiopia","Casablanca, Morocco","Tunis, Tunisia",
  "Kigali, Rwanda","Dar es Salaam, Tanzania",
  // Russia & CIS
  "Moscow, Russia","Saint Petersburg, Russia","Almaty, Kazakhstan","Tbilisi, Georgia",
];

// Build a lowercase lookup for fast filtering
const CITIES_LOWER = CITIES.map(c => c.toLowerCase());

interface LocationAutocompleteProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export function LocationAutocomplete({ label, value, onChange, placeholder }: LocationAutocompleteProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Sync external value changes
  useEffect(() => { setQuery(value); }, [value]);

  const filtered = query.length >= 2
    ? CITIES.filter((_, i) => CITIES_LOWER[i].includes(query.toLowerCase())).slice(0, 8)
    : [];

  const showDropdown = open && filtered.length > 0;

  const select = useCallback((city: string) => {
    setQuery(city);
    onChange(city);
    setOpen(false);
    setHighlightIndex(-1);
  }, [onChange]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex(prev => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && highlightIndex >= 0) {
      e.preventDefault();
      select(filtered[highlightIndex]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightIndex < 0 || !listRef.current) return;
    const item = listRef.current.children[highlightIndex] as HTMLElement;
    item?.scrollIntoView({ block: "nearest" });
  }, [highlightIndex]);

  return (
    <div ref={containerRef} className="relative">
      <label className="block text-[11px] font-medium text-gray-500 mb-1">{label}</label>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onChange(e.target.value);
            setOpen(true);
            setHighlightIndex(-1);
          }}
          onFocus={() => { if (query.length >= 2) setOpen(true); }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || label}
          className="w-full h-10 rounded-lg bg-gray-50 pl-8 pr-3 text-sm text-gray-900 border border-gray-200 outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-200 transition-colors placeholder-gray-400"
          autoComplete="off"
        />
      </div>
      {showDropdown && (
        <ul
          ref={listRef}
          className="absolute z-50 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto"
        >
          {filtered.map((city, i) => (
            <li
              key={city}
              onMouseDown={(e) => { e.preventDefault(); select(city); }}
              onMouseEnter={() => setHighlightIndex(i)}
              className={`flex items-center gap-2 px-3 py-2 text-sm cursor-pointer transition-colors ${
                i === highlightIndex ? "bg-gray-100" : "hover:bg-gray-50"
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              <span className="text-gray-900">{city}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

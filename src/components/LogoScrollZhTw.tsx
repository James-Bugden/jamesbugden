import googleLogo from "@/assets/logos/google.svg";
import microsoftLogo from "@/assets/logos/microsoft.png";
import metaLogo from "@/assets/logos/meta.png";
import amazonLogo from "@/assets/logos/amazon.svg";
import sapLogo from "@/assets/logos/sap.svg";
import shopeeLogo from "@/assets/logos/shopee.svg";
import appleLogo from "@/assets/logos/apple.svg";
import nvidiaLogo from "@/assets/logos/nvidia.svg";
import unileverLogo from "@/assets/logos/unilever.svg";
import tsmcLogo from "@/assets/logos/tsmc.jpg";
import agodaLogo from "@/assets/logos/agoda.png";
import appierLogo from "@/assets/logos/appier.png";
import pgLogo from "@/assets/logos/pg.png";
import teslaLogo from "@/assets/logos/tesla.png";
import mckinseyLogo from "@/assets/logos/mckinsey.svg";
import bcgLogo from "@/assets/logos/bcg.png";

interface Company {
  name: string;
  color: string;
  logo?: string;
  wide?: boolean;
  small?: boolean;
  large?: boolean;
  rounded?: boolean;
  inlineSvg?: React.ReactNode;
}

const companies: Company[] = [
  { name: "Google", color: "#4285F4", logo: googleLogo },
  { name: "Microsoft", color: "#737373", logo: microsoftLogo, wide: true },
  { name: "Meta", color: "#0081FB", logo: metaLogo, wide: true, small: true },
  { name: "Amazon", color: "#FF9900", logo: amazonLogo, wide: true },
  { name: "Apple", color: "#555555", logo: appleLogo },
  { name: "TSMC", color: "#CC0000", logo: tsmcLogo, rounded: true },
  { name: "NVIDIA", color: "#76B900", logo: nvidiaLogo },
  { name: "Tesla", color: "#CC0000", logo: teslaLogo, large: true },
  { name: "Agoda", color: "#5392F9", logo: agodaLogo, wide: true, large: true },
  { name: "SAP", color: "#1661BE", logo: sapLogo, large: true },
  { name: "Shopee", color: "#EE4D2D", inlineSvg: (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-5 md:h-6 w-auto">
      <path fill="#EE4D2D" d="M15.9414 17.9633c.229-1.879-.981-3.077-4.1758-4.0969-1.548-.528-2.277-1.22-2.26-2.1719.065-1.056 1.048-1.825 2.352-1.85a5.2898 5.2898 0 0 1 2.8838.89c.116.072.197.06.263-.039.09-.145.315-.494.39-.62.051-.081.061-.187-.068-.281-.185-.1369-.704-.4149-.983-.5319a6.4697 6.4697 0 0 0-2.5118-.514c-1.909.008-3.4129 1.215-3.5389 2.826-.082 1.1629.494 2.1078 1.73 2.8278.262.152 1.6799.716 2.2438.892 1.774.552 2.695 1.5419 2.478 2.6969-.197 1.047-1.299 1.7239-2.818 1.7439-1.2039-.046-2.2878-.537-3.1278-1.19l-.141-.11c-.104-.08-.218-.075-.287.03-.05.077-.376.547-.458.67-.077.108-.035.168.045.234.35.293.817.613 1.134.775a6.7097 6.7097 0 0 0 2.8289.727 4.9048 4.9048 0 0 0 2.0759-.354c1.095-.465 1.8029-1.394 1.9449-2.554zM11.9986 1.4009c-2.068 0-3.7539 1.95-3.8329 4.3899h7.6657c-.08-2.44-1.765-4.3899-3.8328-4.3899zm7.8516 22.5981-.08.001-15.7843-.002c-1.074-.04-1.863-.91-1.971-1.991l-.01-.195L1.298 6.2858a.459.459 0 0 1 .45-.494h4.9748C6.8448 2.568 9.1607 0 11.9996 0c2.8388 0 5.1537 2.5689 5.2757 5.7898h4.9678a.459.459 0 0 1 .458.483l-.773 15.5883-.007.131c-.094 1.094-.979 1.9769-2.0709 2.0059z"/>
    </svg>
  ) },
  { name: "Appier", color: "#1A00B8", logo: appierLogo, wide: true },
  { name: "momo", color: "#D6006E" },
  { name: "P&G", color: "#003DA5", logo: pgLogo, large: true },
  { name: "Unilever", color: "#1F36C7", logo: unileverLogo },
  { name: "L'Oréal", color: "#000000" },
  { name: "McKinsey", color: "#051C2C", logo: mckinseyLogo, wide: true },
  { name: "BCG", color: "#1A7B5A", logo: bcgLogo, rounded: true, large: true },
];

function LogoItem({ company }: { company: Company }) {
  const sizeClass = company.small
    ? "h-4 md:h-5 w-auto"
    : company.large
      ? "h-7 md:h-8 w-auto"
      : company.wide
        ? "h-5 md:h-6 w-auto"
        : "h-6 md:h-7 w-auto";

  return (
    <span className="logo-mono mx-7 md:mx-10 flex-shrink-0 select-none whitespace-nowrap flex items-center h-9 md:h-10">
      {company.inlineSvg ? (
        company.inlineSvg
      ) : company.logo ? (
        <img
          src={company.logo}
          alt={company.name}
          className={`flex-shrink-0 object-contain ${sizeClass} ${company.rounded ? "rounded-sm bg-white mix-blend-multiply" : ""}`}
        />
      ) : (
        <span
          role="img"
          aria-label={company.name}
          className="text-lg md:text-xl font-bold tracking-tight"
          style={{ color: company.color }}
        >
          {company.name}
        </span>
      )}
    </span>
  );
}

export default function LogoScrollZhTw() {
  return (
    <div className="overflow-hidden relative">
      <p
        className="text-center mb-8 px-4 uppercase"
        style={{
          fontFamily: 'Geist, sans-serif',
          fontSize: '0.6875rem',
          letterSpacing: '0.18em',
          fontWeight: 600,
          color: 'hsl(var(--muted-foreground))',
        }}
      >
        <span style={{ color: 'hsl(var(--gold))' }}>★</span>{' '}
        錄取於這些公司的求職者都信任
      </p>

      {/* Fade edges, tuned to paper-alt */}
      <div className="absolute left-0 top-8 bottom-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, hsl(var(--paper-alt)), transparent)' }} />
      <div className="absolute right-0 top-8 bottom-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, hsl(var(--paper-alt)), transparent)' }} />

      {/* Seamless infinite scroll */}
      <div className="overflow-hidden">
        <div className="flex w-max animate-logo-scroll items-center">
          {companies.map((company, i) => (
            <LogoItem key={`${company.name}-a-${i}`} company={company} />
          ))}
          {companies.map((company, i) => (
            <LogoItem key={`${company.name}-b-${i}`} company={company} />
          ))}
        </div>
      </div>
    </div>
  );
}

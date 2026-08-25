/**
 * Brand marks for the "Built with" strip.
 *
 * These are hand-drawn simplified versions, not the official vector files —
 * accurate enough to be recognisable at 28-32px, which is all this strip needs.
 * To use the real thing, drop each vendor's official SVG into public/images/
 * and swap the component body for an <img>.
 *
 * Each mark is decorative on its own, so the accessible name comes from the
 * <title> and the aria-label on the wrapper in Services.tsx.
 */
type LogoProps = { className?: string };

const box = "0 0 24 24";

function React_({ className }: LogoProps) {
  return (
    <svg viewBox={box} className={className} aria-hidden="true">
      <g fill="none" stroke="#61DAFB" strokeWidth="1.3">
        <ellipse cx="12" cy="12" rx="10.5" ry="4" />
        <ellipse cx="12" cy="12" rx="10.5" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10.5" ry="4" transform="rotate(120 12 12)" />
      </g>
      <circle cx="12" cy="12" r="2.1" fill="#61DAFB" />
    </svg>
  );
}

function NextJs({ className }: LogoProps) {
  return (
    <svg viewBox={box} className={className} aria-hidden="true">
      <defs>
        <clipPath id="uebi-next-clip">
          <circle cx="12" cy="12" r="11.2" />
        </clipPath>
      </defs>
      <circle cx="12" cy="12" r="11.2" fill="#000" />
      <g clipPath="url(#uebi-next-clip)" stroke="#fff" strokeWidth="1.5" fill="none">
        <path d="M8.7 16.6V7.4" strokeLinecap="round" />
        <path d="M8.7 7.4 18 19.4" strokeLinecap="round" />
        <path d="M15.9 7.4v5.2" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function TypeScript({ className }: LogoProps) {
  return (
    <svg viewBox={box} className={className} aria-hidden="true">
      <rect width="24" height="24" rx="2.5" fill="#3178C6" />
      <text
        x="12.4"
        y="17.4"
        textAnchor="middle"
        fontSize="11.5"
        fontWeight="700"
        fill="#fff"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        TS
      </text>
    </svg>
  );
}

function NodeJs({ className }: LogoProps) {
  return (
    <svg viewBox={box} className={className} aria-hidden="true">
      <path d="M12 1.85 21.2 7.2v9.6L12 22.15 2.8 16.8V7.2z" fill="#5FA04E" />
      <path
        d="M11 9.4h1.5c1.5 0 2.3.7 2.3 2v3.2"
        fill="none"
        stroke="#fff"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <path
        d="M9.4 9.4v4.3c0 .8-.5 1.2-1.3 1.2"
        fill="none"
        stroke="#fff"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Postgres({ className }: LogoProps) {
  return (
    <svg viewBox={box} className={className} aria-hidden="true">
      {/* Simplified elephant head: dome, ear, trunk. */}
      <path
        d="M12.2 2.6c4 0 6.9 2.6 6.9 6.1 0 1.6-.5 2.9-1.4 4.1-.6.8-.8 1.4-.8 2.3v3.3c0 1.6-1 2.9-2.6 2.9-1.3 0-2.2-.9-2.2-2.2v-3.2c0-.8-.5-1.3-1.2-1.3-.6 0-1.1.5-1.1 1.2v1.4c0 .8-.6 1.4-1.4 1.4s-1.4-.6-1.4-1.4v-2.3c0-1-.3-1.6-1-2.4-.9-1-1.4-2.3-1.4-3.8 0-3.6 3.3-6.1 7.6-6.1z"
        fill="#336791"
      />
      <circle cx="15.4" cy="8.2" r="1" fill="#fff" />
      <path
        d="M8.4 7.4c.9-.9 2.2-1.3 3.5-1.2"
        fill="none"
        stroke="#fff"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.75"
      />
    </svg>
  );
}

function Tailwind({ className }: LogoProps) {
  return (
    <svg viewBox={box} className={className} aria-hidden="true">
      <path
        fill="#38BDF8"
        d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.09 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C15.61 7.15 14.5 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.91 1.35C8.39 16.85 9.5 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C10.61 13.15 9.5 12 7 12z"
      />
    </svg>
  );
}

function Cloudflare({ className }: LogoProps) {
  return (
    <svg viewBox={box} className={className} aria-hidden="true">
      <path
        d="M17.6 18.4H7.1C4.8 18.4 3 16.6 3 14.4c0-2 1.5-3.7 3.5-4C7 8 9.1 6.3 11.6 6.3c2.4 0 4.5 1.6 5.2 3.9h.5c2.2 0 4 1.8 4 4.1s-1.6 4.1-3.7 4.1z"
        fill="#F38020"
      />
      <path
        d="M8.6 15.2h9.2"
        stroke="#fff"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  );
}

function Aws({ className }: LogoProps) {
  return (
    <svg viewBox={box} className={className} aria-hidden="true">
      <text
        x="12"
        y="12.6"
        textAnchor="middle"
        fontSize="9"
        fontWeight="700"
        fill="currentColor"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        aws
      </text>
      <path
        d="M4.2 16.4c4.4 2.7 11.2 2.7 15.6 0"
        fill="none"
        stroke="#FF9900"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path d="m18.2 15.1 2.2 1.1-1.4 1.9z" fill="#FF9900" />
    </svg>
  );
}

export const techLogos = {
  React: React_,
  "Next.js": NextJs,
  TypeScript: TypeScript,
  "Node.js": NodeJs,
  PostgreSQL: Postgres,
  "Tailwind CSS": Tailwind,
  Cloudflare: Cloudflare,
  AWS: Aws,
} as const;

export type TechName = keyof typeof techLogos;

export function TechLogo({ name, className }: { name: TechName; className?: string }) {
  const Mark = techLogos[name];
  return <Mark className={className} />;
}

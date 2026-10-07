// Small, chunky inline icons for the bus ministry page. All are decorative
// (aria-hidden) — the text next to them carries the meaning.

type IconProps = { className?: string };

const base = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 3.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export function MusicIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M18 36V10l22-5v26" />
      <circle cx="12" cy="36" r="6" fill="currentColor" />
      <circle cx="34" cy="31" r="6" fill="currentColor" />
    </svg>
  );
}

export function DiceIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="6" y="6" width="36" height="36" rx="9" />
      <circle cx="16" cy="16" r="2.6" fill="currentColor" stroke="none" />
      <circle cx="32" cy="16" r="2.6" fill="currentColor" stroke="none" />
      <circle cx="24" cy="24" r="2.6" fill="currentColor" stroke="none" />
      <circle cx="16" cy="32" r="2.6" fill="currentColor" stroke="none" />
      <circle cx="32" cy="32" r="2.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SmileIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="24" cy="24" r="18" />
      <path d="M15 27c2 5 6 8 9 8s7-3 9-8" />
      <circle cx="17.5" cy="19" r="2" fill="currentColor" stroke="none" />
      <circle cx="30.5" cy="19" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function HeartIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M24 41S6 30 6 18a9.5 9.5 0 0 1 18-4.2A9.5 9.5 0 0 1 42 18c0 12-18 23-18 23Z" fill="currentColor" />
    </svg>
  );
}

export function StarIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path
        d="m24 5 5.6 11.6 12.7 1.8-9.2 8.9 2.2 12.6L24 33.9 12.7 39.9l2.2-12.6-9.2-8.9 12.7-1.8L24 5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function TrophyIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M14 6h20v12a10 10 0 0 1-20 0V6Z" fill="currentColor" />
      <path d="M14 10H6v3a8 8 0 0 0 8 8M34 10h8v3a8 8 0 0 1-8 8" />
      <path d="M24 28v9M16 42h16" />
    </svg>
  );
}

export function PinIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M24 44S9 30 9 19a15 15 0 0 1 30 0c0 11-15 25-15 25Z" fill="currentColor" />
      <circle cx="24" cy="19" r="5" fill="#fff" stroke="none" />
    </svg>
  );
}

export function ShieldCheckIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M24 4 8 10v12c0 10 7 18 16 22 9-4 16-12 16-22V10L24 4Z" />
      <path d="m16 24 6 6 11-12" />
    </svg>
  );
}

export function IdBadgeIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="8" y="6" width="32" height="38" rx="6" />
      <path d="M19 6V3h10v3" />
      <circle cx="24" cy="21" r="5" />
      <path d="M15 36c1-5 5-7 9-7s8 2 9 7" />
    </svg>
  );
}

export function MedicalIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="6" y="6" width="36" height="36" rx="10" />
      <path d="M24 14v20M14 24h20" strokeWidth={5} />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 6h8l3 10-5 3a24 24 0 0 0 11 11l3-5 10 3v8a4 4 0 0 1-4 4C21 40 8 27 8 10a4 4 0 0 1 4-4Z" fill="currentColor" />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="5" y="9" width="38" height="30" rx="6" />
      <path d="m7 14 17 13 17-13" />
    </svg>
  );
}

export function ChevronIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m12 18 12 12 12-12" strokeWidth={5} />
    </svg>
  );
}

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M8 24h30M26 12l12 12-12 12" strokeWidth={5} />
    </svg>
  );
}

/** Cartoon side-view of our bus. Used on the road and as a small mascot. */
export function BusIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 160 76"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect x="4" y="6" width="146" height="54" rx="14" fill="#ffc61a" />
      <path d="M150 34h-30V6h16a14 14 0 0 1 14 14v14Z" fill="#ffc61a" />
      <rect x="4" y="38" width="146" height="6" fill="#0b2740" opacity=".85" />
      <g fill="#e4f5fb" stroke="#0b2740" strokeWidth="2.5">
        <rect x="14" y="14" width="22" height="20" rx="5" />
        <rect x="42" y="14" width="22" height="20" rx="5" />
        <rect x="70" y="14" width="22" height="20" rx="5" />
        <rect x="98" y="14" width="22" height="20" rx="5" />
      </g>
      <path d="M126 12h14a8 8 0 0 1 8 8v14h-22V12Z" fill="#e4f5fb" stroke="#0b2740" strokeWidth="2.5" />
      <rect x="2" y="50" width="152" height="8" rx="4" fill="#0b2740" />
      <circle cx="40" cy="58" r="12" fill="#0b2740" />
      <circle cx="40" cy="58" r="5" fill="#cbd5dc" />
      <circle cx="116" cy="58" r="12" fill="#0b2740" />
      <circle cx="116" cy="58" r="5" fill="#cbd5dc" />
      <circle cx="152" cy="44" r="3.5" fill="#fff6d6" />
    </svg>
  );
}

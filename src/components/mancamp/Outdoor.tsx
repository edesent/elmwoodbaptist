// A mountain ridgeline used to divide sections on the Man Camp pages.
// "className" sets the color of the mountains (e.g. "text-pine").
export function MountainRidge({ className = "text-pine" }: { className?: string }) {
  return (
    <div className={`w-full leading-none ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-16 md:h-24 block">
        <path
          fill="currentColor"
          fillOpacity="0.45"
          d="M0 120 L0 70 L90 40 L170 75 L260 20 L360 72 L450 45 L540 80 L640 30 L740 70 L820 50 L910 85 L1010 25 L1110 70 L1200 42 L1300 78 L1380 50 L1440 65 L1440 120 Z"
        />
        <path
          fill="currentColor"
          d="M0 120 L0 95 L120 60 L210 92 L320 55 L430 98 L520 70 L610 100 L720 58 L830 96 L930 72 L1040 104 L1150 62 L1260 96 L1360 74 L1440 90 L1440 120 Z"
        />
      </svg>
    </div>
  );
}

// A simple pine tree mark.
export function PineMark({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="currentColor">
      <path d="M16 2 L9 12 H13 L7 20 H12 L5 28 H27 L20 20 H25 L19 12 H23 Z" />
      <rect x="14.5" y="27" width="3" height="4" />
    </svg>
  );
}

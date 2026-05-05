/**
 * Lightweight, JS-free hero fallback. Pure SVG / CSS. Used:
 *  - while the R3F bundle is loading (Suspense fallback)
 *  - on small screens (`md:` breakpoint) to skip 3D entirely
 *  - when `prefers-reduced-motion: reduce` is on
 *
 * Renders the same composition as the 3D scene at a glance: layered pond
 * gradients, lotus pads, and a couple of stylized koi.
 */
export default function HeroFallback({
  ariaHidden = true,
}: {
  ariaHidden?: boolean;
}) {
  return (
    <svg
      role={ariaHidden ? "presentation" : "img"}
      aria-hidden={ariaHidden ? "true" : undefined}
      aria-label={ariaHidden ? undefined : "A stylized koi pond at dusk"}
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="hero-water" cx="50%" cy="55%" r="80%">
          <stop offset="0%" stopColor="var(--pond-100)" />
          <stop offset="60%" stopColor="var(--pond-200)" />
          <stop offset="100%" stopColor="var(--pond-300)" />
        </radialGradient>
        <radialGradient id="hero-glow" cx="50%" cy="30%" r="55%">
          <stop offset="0%" stopColor="var(--canvas-soft)" stopOpacity="0.85" />
          <stop offset="100%" stopColor="var(--canvas-soft)" stopOpacity="0" />
        </radialGradient>
        <pattern
          id="hero-ripples"
          x="0"
          y="0"
          width="240"
          height="240"
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx="60"
            cy="60"
            r="40"
            fill="none"
            stroke="var(--pond-300)"
            strokeOpacity="0.18"
          />
          <circle
            cx="180"
            cy="180"
            r="60"
            fill="none"
            stroke="var(--pond-300)"
            strokeOpacity="0.12"
          />
        </pattern>
      </defs>

      <rect width="1200" height="800" fill="url(#hero-water)" />
      <rect width="1200" height="800" fill="url(#hero-ripples)" />
      <rect width="1200" height="800" fill="url(#hero-glow)" />

      {/* Lotus leaves */}
      <g opacity="0.85">
        <ellipse cx="220" cy="640" rx="160" ry="44" fill="var(--leaf-soft)" />
        <ellipse cx="220" cy="640" rx="160" ry="44" fill="none" stroke="var(--leaf)" strokeOpacity="0.25" />
        <ellipse cx="980" cy="220" rx="120" ry="34" fill="var(--leaf-soft)" />
        <ellipse cx="980" cy="220" rx="120" ry="34" fill="none" stroke="var(--leaf)" strokeOpacity="0.25" />
        <ellipse cx="1040" cy="600" rx="180" ry="50" fill="var(--leaf-soft)" />
        <ellipse cx="1040" cy="600" rx="180" ry="50" fill="none" stroke="var(--leaf)" strokeOpacity="0.25" />
      </g>

      {/* Lotus blossoms */}
      <g>
        <circle cx="1040" cy="600" r="22" fill="var(--lotus-soft)" />
        <circle cx="1040" cy="600" r="10" fill="var(--lotus)" />
        <circle cx="220" cy="640" r="16" fill="var(--lotus-soft)" />
        <circle cx="220" cy="640" r="6" fill="var(--lotus)" />
      </g>

      {/* Koi #1 */}
      <g
        transform="translate(440 380) rotate(-12)"
        style={{ animation: "drift 8s ease-in-out infinite" }}
      >
        <ellipse rx="80" ry="22" fill="var(--koi)" opacity="0.9" />
        <path d="M-90 0 q-22 -14 -36 -2 q6 6 0 12 q14 12 36 -2 z" fill="var(--koi)" opacity="0.7" />
        <circle cx="40" cy="-6" r="5" fill="var(--canvas-soft)" />
        <circle cx="20" cy="6" r="6" fill="var(--canvas-soft)" />
        <circle cx="0" cy="-4" r="5" fill="var(--canvas-soft)" />
      </g>

      {/* Koi #2 */}
      <g
        transform="translate(740 540) rotate(18)"
        style={{ animation: "drift 11s ease-in-out infinite reverse" }}
      >
        <ellipse rx="68" ry="20" fill="var(--koi-soft)" opacity="0.95" />
        <path d="M-78 0 q-20 -12 -32 -2 q5 5 0 10 q12 10 32 -2 z" fill="var(--koi-soft)" opacity="0.8" />
        <circle cx="-10" cy="-5" r="5" fill="var(--koi)" />
        <circle cx="14" cy="4" r="4" fill="var(--koi)" />
      </g>
    </svg>
  );
}

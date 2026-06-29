/**
 * Painterly SVG scenery for the koi pond hero. Recreates the cover-image
 * composition with pure SVG so it stays SSR-renderable and zero-JS:
 *
 *   far back   →   sky gradient + three soft mountain ridges + mist
 *   middle     →   waterfall on the right, bamboo grove on the left,
 *                  flowering cherry branches and hanging lanterns top-right
 *   foreground →   rock clusters at the bottom edges (framing the central
 *                  parchment card), bamboo water spout on the left, lotus
 *                  blossoms + pads on the right, ground grass
 *
 * All colors come from `SEASON_SCENE` so the scenery re-tints with the
 * active season palette without remounting. The component itself is a
 * server component (no client state).
 *
 * Layout note: this SVG is `preserveAspectRatio="xMidYMid slice"` so the
 * 1600×900 canvas is letterboxed-then-cropped to fill whatever hero size
 * we drop it into. The interior R3F koi canvas is sized separately to
 * align roughly with the depicted pond area in the middle.
 */
import type { Season } from "@/lib/season/types";

import { SEASON_SCENE } from "@/lib/season/types";

interface Props {
  season: Season;
  className?: string;
  /**
   * When `true` the foreground (rocks / lotus / grass) is omitted; useful
   * if we want a "background only" pass painted behind the canvas, then
   * the foreground painted in front of the canvas separately.
   */
  background?: boolean;
  /**
   * When `true` only the foreground layers (rocks, lotus, grass, lantern
   * highlights, bamboo spout) are painted so this SVG can sit on top of
   * the WebGL canvas.
   */
  foreground?: boolean;
}

export default function HeroScenery({
  season,
  className,
  background = false,
  foreground = false,
}: Props) {
  // Default behaviour: paint everything in a single SVG (used by the
  // SSR fallback / mobile). Hero uses background + foreground passes
  // so the koi canvas can sit between them.
  const renderAll = !background && !foreground;
  const p = SEASON_SCENE[season];

  return (
    <svg
      aria-hidden="true"
      role="presentation"
      className={className}
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.skyTop} />
          <stop offset="100%" stopColor={p.skyBottom} />
        </linearGradient>

        <linearGradient id="hero-mist" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.mist} stopOpacity="0.0" />
          <stop offset="60%" stopColor={p.mist} stopOpacity="0.6" />
          <stop offset="100%" stopColor={p.mist} stopOpacity="0.95" />
        </linearGradient>

        <radialGradient id="hero-water" cx="50%" cy="55%" r="60%">
          <stop offset="0%" stopColor={p.water} stopOpacity="0.95" />
          <stop offset="100%" stopColor={p.waterDeep} stopOpacity="0.55" />
        </radialGradient>

        <radialGradient id="hero-lantern" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={p.lantern} stopOpacity="0.9" />
          <stop offset="100%" stopColor={p.lantern} stopOpacity="0" />
        </radialGradient>

        <radialGradient id="hero-blossom" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={p.blossom} stopOpacity="0.9" />
          <stop offset="100%" stopColor={p.blossom} stopOpacity="0" />
        </radialGradient>

        <pattern
          id="hero-water-stipple"
          x="0"
          y="0"
          width="180"
          height="180"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="50" cy="50" r="38" fill="none" stroke={p.water} strokeOpacity="0.14" />
          <circle cx="140" cy="130" r="55" fill="none" stroke={p.water} strokeOpacity="0.1" />
          <circle cx="20" cy="160" r="20" fill="none" stroke={p.water} strokeOpacity="0.12" />
        </pattern>

        <filter id="hero-soft-blur" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>

        <filter id="hero-strong-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>

      {(renderAll || background) && (
        <>
          {/* Sky */}
          <rect width="1600" height="900" fill="url(#hero-sky)" />

          {/* Distant mountain layers, back to front. Higher opacity +
              stronger color stepping than before so the ridges actually
              register against the sky. */}
          <Mountain
            d="M0 400 C 180 280, 320 240, 460 320 C 600 380, 720 320, 880 350 C 1040 380, 1180 300, 1320 350 C 1440 390, 1540 360, 1600 400 L 1600 560 L 0 560 Z"
            fill={p.mountainBack}
            opacity={0.78}
          />
          <Mountain
            d="M-40 470 C 140 380, 280 400, 460 440 C 620 480, 740 400, 920 440 C 1080 480, 1240 400, 1420 450 C 1520 480, 1580 460, 1640 490 L 1640 580 L -40 580 Z"
            fill={p.mountainMid}
            opacity={0.85}
          />
          <Mountain
            d="M-60 540 C 120 460, 320 480, 520 510 C 680 530, 800 470, 980 500 C 1140 530, 1320 480, 1500 510 C 1580 525, 1620 515, 1660 530 L 1660 660 L -60 660 Z"
            fill={p.mountainFront}
            opacity={0.7}
          />

          {/* Atmospheric mist over the mountain bases — pulls the front
              ridge into the water so the horizon feels hazy. */}
          <rect y="430" width="1600" height="200" fill="url(#hero-mist)" />

          {/* Pond water plane (the painted base). The WebGL canvas sits on
              top of this and adds koi + ripples. */}
          <rect y="540" width="1600" height="360" fill="url(#hero-water)" />
          <rect
            y="540"
            width="1600"
            height="360"
            fill="url(#hero-water-stipple)"
            opacity="0.45"
          />

          {/* Bamboo grove — left edge, behind the foreground rocks. */}
          <BambooGrove color={p.bamboo} />

          {/* Cherry / flowering branch arching from the top-right corner. */}
          <CherryBranch
            blossom={p.blossom}
            branch="#5a3725"
            lantern={p.lantern}
          />

          {/* Waterfall + cliff on the right side. */}
          <Waterfall water={p.water} stone={p.stone} shadow={p.stoneShadow} />

          {/* Soft floating motes / petals over the back-mid layer. */}
          <Motes color={p.petal} />
        </>
      )}

      {(renderAll || foreground) && (
        <>
          {/* Bamboo water spout pouring into the pond from the lower-left. */}
          <BambooSpout bamboo={p.bamboo} water={p.water} />

          {/* Foreground rocks frame the central card on left and right. */}
          <ForegroundRocks stone={p.stone} shadow={p.stoneShadow} />

          {/* Lotus pads + blossoms on the right pond edge. */}
          <LotusPatch
            leaf={p.leaf}
            lotus={p.lotus}
            highlight={p.parchment}
          />

          {/* Soft grass tufts in the lower-right corner. */}
          <Grass color={p.leaf} />
        </>
      )}
    </svg>
  );
}

/* --------------------------------------------------------------------------
 * Sub-components — kept inside the same file for now because they're tightly
 * coupled to this one SVG composition. Each is small and stateless.
 * -------------------------------------------------------------------------- */

function Mountain({
  d,
  fill,
  opacity,
}: {
  d: string;
  fill: string;
  opacity: number;
}) {
  return <path d={d} fill={fill} opacity={opacity} filter="url(#hero-soft-blur)" />;
}

function BambooGrove({ color }: { color: string }) {
  // Cluster of bamboo stalks running up the left edge. We vary tint per
  // stalk and add looser leaf sprays so the grove feels painted rather
  // than geometric. SVG `fill` does not support CSS color-mix, so we
  // use opacity layering over a white "shine" rect to soften.
  const darker = color;

  return (
    <g opacity="0.95">
      {/* Hazy backdrop suggesting deeper foliage. */}
      <ellipse cx="100" cy="450" rx="240" ry="420" fill={color} opacity="0.22" filter="url(#hero-strong-blur)" />

      {/* Back row — softer, smaller stalks */}
      {[
        { x: -10, scale: 0.7, lean: -4, tint: 0.55 },
        { x: 75, scale: 0.6, lean: 2, tint: 0.55 },
        { x: 150, scale: 0.55, lean: -2, tint: 0.55 },
      ].map((s, i) => (
        <BambooStalk key={`b-${i}`} {...s} color={darker} />
      ))}

      {/* Front row — fuller, slightly varied stalks */}
      {[
        { x: 40, scale: 1.05, lean: 4, tint: 0.95 },
        { x: 110, scale: 0.88, lean: -3, tint: 0.92 },
        { x: 200, scale: 0.78, lean: 5, tint: 0.9 },
      ].map((s, i) => (
        <BambooStalk key={`f-${i}`} {...s} color={darker} />
      ))}

      {/* Leaf sprays in front of the grove — a generous handful so the
          top of the grove feels foliage-rich. */}
      <g>
        {[
          { x: 30, y: 40, r: -20 },
          { x: 90, y: 70, r: 14 },
          { x: 160, y: 100, r: -10 },
          { x: 50, y: 160, r: 22 },
          { x: 120, y: 180, r: -18 },
          { x: 200, y: 200, r: 8 },
          { x: 70, y: 270, r: -12 },
          { x: 170, y: 300, r: 16 },
          { x: 40, y: 360, r: -6 },
          { x: 130, y: 410, r: 10 },
          { x: 195, y: 460, r: -16 },
          { x: 60, y: 500, r: 6 },
        ].map((p, i) => (
          <g key={i} transform={`translate(${p.x} ${p.y}) rotate(${p.r})`}>
            <path
              d="M0 0 Q 18 -6 32 -2 Q 20 4 0 0 Z"
              fill={darker}
              opacity={0.9}
            />
            <path
              d="M-2 8 Q 18 4 30 8 Q 18 14 -2 8 Z"
              fill={darker}
              opacity={0.6}
            />
            <path
              d="M-4 -8 Q 14 -16 28 -10 Q 18 -4 -4 -8 Z"
              fill={darker}
              opacity={0.7}
            />
            <path
              d="M-2 8 Q 18 4 30 8 Q 18 14 -2 8 Z"
              fill="#ffffff"
              opacity={0.15}
            />
          </g>
        ))}
      </g>
    </g>
  );
}

function BambooStalk({
  x,
  scale,
  lean,
  color,
}: {
  x: number;
  scale: number;
  lean: number;
  color: string;
}) {
  const height = 720 * scale;
  const width = 18 * scale;
  return (
    <g transform={`translate(${x} 30) skewX(${lean})`}>
      {/* Body */}
      <rect x={0} y={0} width={width} height={height} rx={width / 2} fill={color} opacity={0.9} />
      {/* Subtle gradient down one side */}
      <rect
        x={width * 0.55}
        y={0}
        width={width * 0.45}
        height={height}
        rx={width / 2}
        fill="#000000"
        opacity={0.14}
      />
      {/* Joints */}
      {[0.16, 0.32, 0.5, 0.66, 0.82, 0.95].map((t) => (
        <g key={t}>
          <line
            x1={-2}
            x2={width + 2}
            y1={height * t}
            y2={height * t}
            stroke="#000000"
            strokeOpacity={0.25}
            strokeWidth={1.5}
          />
          <line
            x1={-2}
            x2={width + 2}
            y1={height * t + 2}
            y2={height * t + 2}
            stroke="#ffffff"
            strokeOpacity={0.25}
            strokeWidth={1}
          />
        </g>
      ))}
      {/* Light side highlight */}
      <line
        x1={width * 0.22}
        x2={width * 0.22}
        y1={0}
        y2={height}
        stroke="#ffffff"
        strokeOpacity={0.32}
        strokeWidth={1.5}
      />
    </g>
  );
}

function CherryBranch({
  blossom,
  branch,
  lantern,
}: {
  blossom: string;
  branch: string;
  lantern: string;
}) {
  // Arcing branch entering from the top-right with three flowering clusters
  // and two paper lanterns hanging beneath.
  return (
    <g>
      {/* Branch */}
      <path
        d="M1620 -20 C 1480 60, 1320 100, 1180 80 C 1100 70, 1040 60, 970 100"
        stroke={branch}
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M1420 80 C 1380 130, 1340 160, 1280 170"
        stroke={branch}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M1180 80 C 1170 130, 1150 170, 1080 180"
        stroke={branch}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />

      {/* Blossom clouds (radial gradient blobs) */}
      <BlossomCloud cx={1560} cy={20} r={120} color={blossom} />
      <BlossomCloud cx={1420} cy={120} r={110} color={blossom} />
      <BlossomCloud cx={1280} cy={180} r={95} color={blossom} />
      <BlossomCloud cx={1080} cy={190} r={75} color={blossom} />

      {/* Discrete blossom petals for definition */}
      {[
        [1520, 60, 7],
        [1480, 30, 5],
        [1560, 100, 6],
        [1380, 150, 6],
        [1340, 90, 5],
        [1240, 200, 6],
        [1180, 160, 5],
        [1100, 200, 5],
      ].map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill={blossom} opacity={0.85} />
      ))}

      {/* Lanterns */}
      <Lantern x={1440} y={170} color={lantern} cord={branch} />
      <Lantern x={1320} y={230} color={lantern} cord={branch} scale={0.85} />
      <Lantern x={1120} y={250} color={lantern} cord={branch} scale={0.75} />
    </g>
  );
}

function BlossomCloud({
  cx,
  cy,
  r,
  color,
}: {
  cx: number;
  cy: number;
  r: number;
  color: string;
}) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="url(#hero-blossom)" />
      <circle cx={cx - r * 0.4} cy={cy + r * 0.2} r={r * 0.7} fill="url(#hero-blossom)" />
      <circle cx={cx + r * 0.45} cy={cy - r * 0.1} r={r * 0.55} fill="url(#hero-blossom)" />
      {/* A faint ring of opaque petals for definition. */}
      <circle cx={cx} cy={cy} r={r * 0.55} fill={color} opacity="0.45" />
    </g>
  );
}

function Lantern({
  x,
  y,
  color,
  cord,
  scale = 1,
}: {
  x: number;
  y: number;
  color: string;
  cord: string;
  scale?: number;
}) {
  const w = 40 * scale;
  const h = 56 * scale;
  return (
    <g transform={`translate(${x} ${y})`}>
      {/* Cord from branch to lantern */}
      <line x1={0} y1={-40 * scale} x2={0} y2={0} stroke={cord} strokeWidth={1.4} />
      {/* Top cap */}
      <rect x={-w * 0.45} y={-2} width={w * 0.9} height={4} fill="#3a2418" />
      {/* Lamp body */}
      <ellipse cx={0} cy={h * 0.4} rx={w / 2} ry={h * 0.4} fill={color} opacity="0.95" />
      <ellipse cx={0} cy={h * 0.4} rx={w / 2.4} ry={h * 0.35} fill="#ffffff" opacity="0.25" />
      {/* Bottom cap */}
      <rect x={-w * 0.45} y={h * 0.78} width={w * 0.9} height={4} fill="#3a2418" />
      {/* Tassel */}
      <line x1={0} y1={h * 0.82} x2={0} y2={h} stroke="#3a2418" strokeWidth={1.4} />
      {/* Glow halo */}
      <circle cx={0} cy={h * 0.4} r={w * 1.4} fill="url(#hero-lantern)" opacity={0.7} />
    </g>
  );
}

function Waterfall({
  water,
  stone,
  shadow,
}: {
  water: string;
  stone: string;
  shadow: string;
}) {
  // A vertical cliff anchored to the right edge, with a single curtain
  // of water spilling over its inner edge (i.e. *in front of* the cliff
  // face), into the pond. Sits above the foreground lotus patch so the
  // two don't collide.
  return (
    <g>
      {/* Wide cliff that spans the right corner. Bulky enough to read as
          a stone face, with a curved silhouette like a painted rock. */}
      <path
        d="M1400 540 C 1380 460, 1410 320, 1480 240 C 1540 190, 1620 190, 1620 240 L 1620 580 L 1400 580 Z"
        fill={stone}
        opacity={0.98}
      />
      {/* Shadow side */}
      <path
        d="M1400 540 C 1380 460, 1410 320, 1480 240 L 1480 580 L 1400 580 Z"
        fill={shadow}
        opacity={0.4}
      />
      {/* Stone shelf where the water originates */}
      <ellipse cx={1500} cy={250} rx={110} ry={12} fill={stone} opacity={1} />
      <ellipse cx={1500} cy={250} rx={110} ry={12} fill={shadow} opacity={0.35} />

      {/* Mist column behind the water curtain — sells depth */}
      <ellipse
        cx={1455}
        cy={400}
        rx={50}
        ry={150}
        fill="#ffffff"
        opacity={0.22}
        filter="url(#hero-soft-blur)"
      />

      {/* Water curtain — a single broad sheet of falling water in front of
          the cliff face. Implemented as a tapered path with a thin overlay
          of streaks. */}
      <path
        d="M1430 250 C 1428 380, 1418 480, 1430 555 L 1500 555 C 1500 480, 1510 380, 1502 250 Z"
        fill="#ffffff"
        opacity={0.9}
      />
      <path
        d="M1430 250 C 1428 380, 1418 480, 1430 555 L 1500 555 C 1500 480, 1510 380, 1502 250 Z"
        fill={water}
        opacity={0.3}
      />
      {/* Streaks down the curtain */}
      {[1440, 1452, 1466, 1480, 1492].map((x, i) => (
        <path
          key={x}
          d={`M${x} 260 Q ${x - 1 + i} 400 ${x + 1 + i} 540`}
          stroke="#ffffff"
          strokeOpacity={0.85 - i * 0.1}
          strokeWidth={2.4}
          strokeLinecap="round"
          fill="none"
        />
      ))}

      {/* Splash plume at the bottom — a generous pool */}
      <ellipse cx={1465} cy={560} rx={110} ry={20} fill="#ffffff" opacity={0.8} filter="url(#hero-soft-blur)" />
      <ellipse cx={1465} cy={572} rx={75} ry={12} fill={water} opacity={0.75} />
      {/* Spray particles */}
      {[
        [1410, 540],
        [1520, 540],
        [1440, 575],
        [1500, 565],
        [1465, 585],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={2.8} fill="#ffffff" opacity={0.75} />
      ))}
    </g>
  );
}

function Motes({ color }: { color: string }) {
  // A scatter of soft motes / petals across the upper hero — gives the
  // scene a sense of floating particles without animation cost.
  const motes = [
    [220, 180, 4],
    [310, 90, 3],
    [480, 230, 5],
    [620, 130, 3],
    [780, 80, 4],
    [870, 200, 3],
    [990, 130, 4],
    [1140, 230, 3],
    [410, 360, 3],
    [620, 320, 4],
    [880, 380, 3],
    [1090, 360, 4],
  ];
  return (
    <g>
      {motes.map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill={color} opacity={0.55} />
      ))}
    </g>
  );
}

function BambooSpout({ bamboo, water }: { bamboo: string; water: string }) {
  // A small bamboo "shishi-odoshi" style spout on the lower-left,
  // pouring a thin stream of water onto the rocks.
  return (
    <g transform="translate(110 520)">
      {/* Vertical bamboo support */}
      <rect x={0} y={-180} width={20} height={200} rx={10} fill={bamboo} opacity={0.95} />
      <line x1={0} x2={20} y1={-130} y2={-130} stroke={bamboo} strokeWidth={2} opacity={0.6} />
      <line x1={0} x2={20} y1={-60} y2={-60} stroke={bamboo} strokeWidth={2} opacity={0.6} />
      {/* Horizontal spout */}
      <g transform="rotate(15 10 -10)">
        <rect x={-30} y={-22} width={150} height={22} rx={11} fill={bamboo} opacity={0.95} />
        {/* Open end */}
        <ellipse cx={120} cy={-11} rx={5} ry={11} fill="#3a2418" opacity={0.6} />
      </g>
      {/* Water stream */}
      <path
        d="M138 8 Q 142 60 130 130"
        stroke="#ffffff"
        strokeOpacity={0.9}
        strokeWidth={6}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M138 8 Q 142 60 130 130"
        stroke={water}
        strokeOpacity={0.55}
        strokeWidth={3}
        strokeLinecap="round"
        fill="none"
      />
      {/* Splash */}
      <ellipse cx={128} cy={140} rx={28} ry={6} fill="#ffffff" opacity={0.6} />
      <ellipse cx={128} cy={146} rx={20} ry={4} fill={water} opacity={0.6} />
    </g>
  );
}

function ForegroundRocks({
  stone,
  shadow,
}: {
  stone: string;
  shadow: string;
}) {
  // Cluster of rocks framing the bottom of the hero on both sides,
  // leaving a clear "stage" in the middle where the parchment card sits.
  return (
    <g>
      {/* Left cluster */}
      <Rock
        d="M-20 800 C 40 700, 160 690, 240 720 C 320 750, 280 820, 200 830 C 100 840, 0 850, -20 800 Z"
        stone={stone}
        shadow={shadow}
      />
      <Rock
        d="M150 760 C 220 700, 320 700, 380 740 C 430 780, 360 830, 280 830 C 210 830, 130 810, 150 760 Z"
        stone={stone}
        shadow={shadow}
        highlight
      />
      <Rock
        d="M40 700 C 80 660, 160 660, 200 690 C 230 720, 180 750, 130 750 C 80 750, 30 730, 40 700 Z"
        stone={stone}
        shadow={shadow}
      />

      {/* Right cluster */}
      <Rock
        d="M1620 800 C 1560 700, 1440 690, 1360 720 C 1280 750, 1320 820, 1400 830 C 1500 840, 1600 850, 1620 800 Z"
        stone={stone}
        shadow={shadow}
      />
      <Rock
        d="M1450 760 C 1380 700, 1280 700, 1220 740 C 1170 780, 1240 830, 1320 830 C 1390 830, 1470 810, 1450 760 Z"
        stone={stone}
        shadow={shadow}
        highlight
      />
      <Rock
        d="M1560 700 C 1520 660, 1440 660, 1400 690 C 1370 720, 1420 750, 1470 750 C 1520 750, 1570 730, 1560 700 Z"
        stone={stone}
        shadow={shadow}
      />

      {/* Center scatter — a single small rock to anchor the middle bottom */}
      <Rock
        d="M740 850 C 770 820, 830 820, 860 840 C 890 860, 860 880, 820 880 C 780 880, 720 870, 740 850 Z"
        stone={stone}
        shadow={shadow}
      />
    </g>
  );
}

function Rock({
  d,
  stone,
  shadow,
  highlight = false,
}: {
  d: string;
  stone: string;
  shadow: string;
  highlight?: boolean;
}) {
  return (
    <g>
      <path d={d} fill={stone} />
      <path d={d} fill={shadow} opacity={0.35} transform="translate(2 4)" />
      {highlight && (
        <path
          d={d}
          fill="#ffffff"
          opacity={0.18}
          transform="translate(-3 -3) scale(0.98)"
          style={{ mixBlendMode: "screen" as const }}
        />
      )}
    </g>
  );
}

function LotusPatch({
  leaf,
  lotus,
  highlight,
}: {
  leaf: string;
  lotus: string;
  highlight: string;
}) {
  // Lotus blossoms + pads on the right pond edge. We sit them in the
  // lower-right band (y > 640) so they don't collide with the waterfall
  // mist cloud (y ~290-540).
  return (
    <g>
      {/* Big lotus, far right corner */}
      <g transform="translate(1380 760)">
        <Pad cx={0} cy={0} rx={150} ry={44} color={leaf} />
        <Bloom cx={20} cy={-12} r={75} color={lotus} highlight={highlight} />
      </g>
      {/* Mid lotus, slightly higher and inward */}
      <g transform="translate(1250 690)">
        <Pad cx={0} cy={0} rx={100} ry={30} color={leaf} />
        <Bloom cx={-10} cy={-8} r={42} color={lotus} highlight={highlight} />
      </g>
      {/* Small accent lotus on the left foreground */}
      <g transform="translate(360 760)">
        <Pad cx={0} cy={0} rx={80} ry={22} color={leaf} />
        <Bloom cx={6} cy={-6} r={28} color={lotus} highlight={highlight} />
      </g>
      {/* A few lily pads scattered on the water surface */}
      {[
        { x: 700, y: 700, r: 28 },
        { x: 940, y: 720, r: 34 },
        { x: 1100, y: 670, r: 22 },
        { x: 250, y: 680, r: 22 },
      ].map((p, i) => (
        <Pad key={i} cx={p.x} cy={p.y} rx={p.r * 2.2} ry={p.r * 0.6} color={leaf} />
      ))}
    </g>
  );
}

function Pad({
  cx,
  cy,
  rx,
  ry,
  color,
}: {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  color: string;
}) {
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={color} opacity={0.85} />
      {/* Notch suggesting the leaf's split */}
      <path
        d={`M${cx + rx * 0.4} ${cy} L ${cx} ${cy} L ${cx + rx * 0.35} ${cy - ry * 0.7}`}
        stroke="#ffffff"
        strokeOpacity={0.4}
        strokeWidth={1.5}
        fill="none"
      />
      {/* Highlight stripe */}
      <ellipse
        cx={cx}
        cy={cy - ry * 0.4}
        rx={rx * 0.8}
        ry={ry * 0.2}
        fill="#ffffff"
        opacity={0.25}
      />
    </g>
  );
}

function Bloom({
  cx,
  cy,
  r,
  color,
  highlight,
}: {
  cx: number;
  cy: number;
  r: number;
  color: string;
  highlight: string;
}) {
  // Five-petal lotus blossom rendered as overlapping ovals.
  const petals = Array.from({ length: 6 }, (_, i) => i);
  return (
    <g>
      {petals.map((i) => {
        const angle = (i / petals.length) * Math.PI * 2;
        const px = cx + Math.cos(angle) * r * 0.45;
        const py = cy + Math.sin(angle) * r * 0.45;
        return (
          <ellipse
            key={i}
            cx={px}
            cy={py}
            rx={r * 0.55}
            ry={r * 0.8}
            transform={`rotate(${(angle * 180) / Math.PI} ${px} ${py})`}
            fill={color}
            opacity={0.85}
          />
        );
      })}
      {/* Bright center heart */}
      <circle cx={cx} cy={cy} r={r * 0.35} fill={highlight} opacity={0.95} />
      <circle cx={cx} cy={cy} r={r * 0.15} fill={color} opacity={0.7} />
    </g>
  );
}

function Grass({ color }: { color: string }) {
  // Soft grass tufts in the lower-right corner.
  return (
    <g opacity={0.85}>
      {[
        [1430, 870, -10],
        [1450, 880, 4],
        [1475, 875, -6],
        [1500, 880, 8],
        [1525, 870, -4],
        [1550, 880, 10],
      ].map(([x, y, rot], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${rot})`}>
          <path d="M0 0 Q 2 -32 0 -48 Q -3 -34 -6 0 Z" fill={color} />
          <path d="M4 0 Q 10 -28 14 -40 Q 8 -28 6 0 Z" fill={color} opacity={0.85} />
          <path d="M-6 0 Q -12 -24 -16 -34 Q -10 -24 -8 0 Z" fill={color} opacity={0.85} />
        </g>
      ))}
    </g>
  );
}

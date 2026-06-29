"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowDownIcon,
  BriefcaseIcon,
  GithubIcon,
  LinkedinIcon,
  LotusIcon,
  MailIcon,
  UserIcon,
} from "@/components/icons";
import { PROFILE } from "@/lib/site/profile";
import { cn } from "@/utils/cn";

import Me from "@/assets/images/me3.png";

/**
 * The central parchment-card UI for the koi pond hero, plus the title text
 * that floats above it and the portrait medallion in the lower-left.
 *
 * Composition (matches the cover reference):
 *   - "Hi, I'm" subtitle line
 *   - large display name
 *   - pill subtitle ("Software Engineer · Building AI, Graphics, and Web Experiences")
 *   - parchment card with small lotus motif at top
 *       - three icon cards (About / Projects / Contact) inside the card
 *       - large CTA pill button
 *       - row of social icons at the bottom
 *   - circular portrait medallion in the lower-left
 *
 * Kept as a client component so we can use Framer Motion for the entrance
 * cascade and hover micro-interactions; the data still comes from the
 * server-evaluated `PROFILE` constant.
 */

interface PanelProps {
  /** Anchor id of the section the CTA should scroll to. */
  ctaTargetId: string;
}

const NAV_CARDS = [
  {
    href: "#about",
    title: "About Me",
    subtitle: "Story, education, stack",
    Icon: UserIcon,
  },
  {
    href: "#projects",
    title: "My Projects",
    subtitle: "JobRadar · Graphics · Jovana",
    Icon: BriefcaseIcon,
  },
  {
    href: "#contact",
    title: "Get In Touch",
    subtitle: "Email · LinkedIn · GitHub",
    Icon: MailIcon,
  },
] as const;

const SOCIALS = [
  {
    href: `mailto:${PROFILE.email}`,
    label: "Email",
    Icon: MailIcon,
  },
  {
    href: PROFILE.contact.find((c) => c.kind === "linkedin")?.href ?? "#",
    label: "LinkedIn",
    Icon: LinkedinIcon,
  },
  {
    href: PROFILE.contact.find((c) => c.kind === "github")?.href ?? "#",
    label: "GitHub",
    Icon: GithubIcon,
  },
];

export default function HeroPanel({ ctaTargetId }: PanelProps) {
  const reduce = useReducedMotion();

  // Variants for the entrance cascade. When the user prefers reduced
  // motion, render the panel statically (no transforms).
  const fade = reduce
    ? { initial: false, animate: undefined, transition: undefined }
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-5 text-center sm:px-8">
      {/* Title block */}
      <motion.p
        {...fade}
        transition={{ ...fade.transition, delay: 0.05 }}
        className="font-display text-base text-ink-soft/90 sm:text-lg"
      >
        Hi! I&apos;m
      </motion.p>
      <motion.h1
        {...fade}
        transition={{ ...fade.transition, delay: 0.12 }}
        className="mt-1 font-display text-5xl leading-[1.05] text-ink drop-shadow-[0_2px_6px_rgba(255,255,255,0.55)] sm:text-6xl md:text-7xl"
      >
        {PROFILE.name}
      </motion.h1>

      <motion.div
        {...fade}
        transition={{ ...fade.transition, delay: 0.2 }}
        className="mt-5 inline-flex max-w-full items-center gap-2 rounded-full border border-parchment-edge/40 bg-parchment/90 px-5 py-2 shadow-stone backdrop-blur"
        style={{
          // Parchment colors are not in the Tailwind palette — we apply them
          // inline so the panel re-tints when the season changes (driven by
          // the CSS variables defined in globals.css).
          backgroundColor: "color-mix(in oklab, var(--parchment, #fff5e1) 92%, transparent)",
          borderColor: "var(--parchment-edge, #cdb98a)",
        }}
      >
        <PetalGlyph />
        <span className="font-display text-sm tracking-wide text-ink sm:text-base">
          {PROFILE.title} · {PROFILE.subtitle}
        </span>
        <PetalGlyph flipped />
      </motion.div>

      {/* Parchment card */}
      <motion.div
        {...fade}
        transition={{ ...fade.transition, delay: 0.28 }}
        className="relative mt-8 w-full max-w-3xl"
      >
        <Parchment>
          {/* Small lotus motif at the top */}
          <div
            aria-hidden="true"
            className="absolute -top-7 left-1/2 -translate-x-1/2 rounded-full bg-[var(--parchment,#fff5e1)] p-2 text-lotus shadow-stone"
            style={{ border: "1px solid var(--parchment-edge,#cdb98a)" }}
          >
            <LotusIcon className="text-3xl" />
          </div>

          {/* Three nav cards */}
          <div className="mt-4 grid grid-cols-3 gap-3 sm:gap-6">
            {NAV_CARDS.map((card, i) => (
              <NavCard
                key={card.href}
                {...card}
                delay={reduce ? 0 : 0.38 + i * 0.08}
              />
            ))}
          </div>

          {/* CTA pill */}
          <motion.a
            {...fade}
            transition={{ ...fade.transition, delay: 0.58 }}
            href={`#${ctaTargetId}`}
            className="group mt-7 inline-flex items-center gap-2 self-center rounded-full bg-pond-700 px-7 py-3 text-base font-medium text-canvas-soft shadow-water transition-all hover:-translate-y-0.5 hover:bg-pond-800"
            style={{
              backgroundImage:
                "linear-gradient(135deg, var(--pond-600) 0%, var(--pond-800) 100%)",
            }}
          >
            <span>Explore My Work</span>
            <motion.span
              aria-hidden
              initial={{ x: 0 }}
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex"
            >
              <ArrowDownIcon className="-rotate-90 text-lg" />
            </motion.span>
          </motion.a>

          {/* Social row */}
          <motion.div
            {...fade}
            transition={{ ...fade.transition, delay: 0.68 }}
            className="mt-5 flex items-center justify-center gap-3 text-ink"
          >
            {SOCIALS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--parchment-edge,#cdb98a)] bg-[var(--parchment,#fff5e1)]/80 text-base text-ink/80 transition-transform hover:-translate-y-0.5 hover:text-pond-700"
              >
                <Icon />
              </a>
            ))}
          </motion.div>
        </Parchment>
      </motion.div>

      {/* Portrait — positioned absolutely so it overlaps the rocks at
          lower-left, like the cover reference. */}
      <motion.div
        {...fade}
        transition={{ ...fade.transition, delay: 0.42 }}
        className="pointer-events-none absolute -bottom-2 left-2 sm:left-6 md:-bottom-6 md:left-8 lg:-bottom-10 lg:left-12"
      >
        <Portrait />
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function Parchment({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center rounded-[2.4rem] px-6 pb-8 pt-10 shadow-water sm:px-10",
        "border border-[var(--parchment-edge,#cdb98a)]/60"
      )}
      style={{
        backgroundColor: "var(--parchment, #fff5e1)",
        backgroundImage:
          "radial-gradient(ellipse at 50% 0%, color-mix(in oklab, var(--parchment, #fff5e1) 100%, transparent) 0%, color-mix(in oklab, var(--parchment-edge, #cdb98a) 30%, transparent) 100%)",
      }}
    >
      {/* Subtle inner ring for a printed / lacquered feel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-2 rounded-[2.1rem]"
        style={{
          border: "1px dashed color-mix(in oklab, var(--parchment-edge, #cdb98a) 80%, transparent)",
        }}
      />
      {children}
    </div>
  );
}

function NavCard({
  href,
  title,
  subtitle,
  Icon,
  delay,
}: {
  href: string;
  title: string;
  subtitle: string;
  Icon: React.ComponentType<{ className?: string }>;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
    >
      <Link
        href={href}
        className="group relative flex flex-col items-center rounded-3xl px-3 py-4 text-ink transition-transform hover:-translate-y-1 sm:px-4"
      >
        {/* Lotus-rimmed icon circle */}
        <span
          aria-hidden="true"
          className="relative flex h-16 w-16 items-center justify-center rounded-full text-pond-700 shadow-stone transition-shadow group-hover:shadow-water sm:h-20 sm:w-20"
          style={{
            backgroundColor: "color-mix(in oklab, var(--parchment, #fff5e1) 96%, transparent)",
            border: "1px solid var(--parchment-edge, #cdb98a)",
          }}
        >
          {/* Decorative ring of soft petals */}
          <span
            className="absolute inset-0 rounded-full"
            style={{
              boxShadow:
                "0 0 0 4px color-mix(in oklab, var(--lotus-soft, #ffd0de) 60%, transparent)",
            }}
          />
          <Icon className="relative text-2xl sm:text-3xl" />
        </span>
        <span className="mt-3 font-display text-sm text-ink sm:text-base">
          {title}
        </span>
        <span className="mt-0.5 max-w-[12ch] text-[11px] leading-tight text-ink-soft/80 sm:text-xs">
          {subtitle}
        </span>
      </Link>
    </motion.div>
  );
}

function Portrait() {
  return (
    <div
      className="pointer-events-auto relative h-32 w-32 rounded-full p-1 shadow-water sm:h-36 sm:w-36 md:h-44 md:w-44"
      style={{
        backgroundColor: "var(--parchment, #fff5e1)",
        boxShadow:
          "0 16px 40px -16px color-mix(in oklab, var(--ink, #112b2a) 40%, transparent)",
      }}
    >
      <div
        className="relative h-full w-full overflow-hidden rounded-full"
        style={{
          border: "2px solid var(--parchment-edge, #cdb98a)",
        }}
      >
        <Image
          src={Me}
          alt={`${PROFILE.name}, portrait`}
          fill
          sizes="(min-width: 768px) 180px, 130px"
          className="object-cover object-top"
          priority
        />
      </div>
      {/* Tiny lotus accent on the lower right of the frame */}
      <div
        aria-hidden="true"
        className="absolute -right-1 bottom-0 grid h-7 w-7 place-items-center rounded-full text-lotus sm:h-8 sm:w-8"
        style={{
          backgroundColor: "var(--parchment, #fff5e1)",
          border: "1px solid var(--parchment-edge, #cdb98a)",
        }}
      >
        <LotusIcon className="text-base" />
      </div>
    </div>
  );
}

function PetalGlyph({ flipped = false }: { flipped?: boolean }) {
  // Small decorative flower used in the subtitle pill, matching the
  // little flower glyphs in the reference image.
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      className={cn("text-lotus", flipped && "scale-x-[-1]")}
      aria-hidden="true"
    >
      <g fill="currentColor" opacity="0.85">
        {Array.from({ length: 5 }).map((_, i) => {
          const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
          const px = 12 + Math.cos(angle) * 5;
          const py = 12 + Math.sin(angle) * 5;
          return <circle key={i} cx={px} cy={py} r="3.4" />;
        })}
        <circle cx="12" cy="12" r="2.2" fill="var(--lantern, #ffb56a)" />
      </g>
    </svg>
  );
}

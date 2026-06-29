import YinYangKoi from "@/components/animations/YinYangKoi";
import SiteFooter from "@/components/nav/SiteFooter";
import SiteNav from "@/components/nav/SiteNav";
import KoiPondHero from "@/components/pond/KoiPondHero";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";

/**
 * Home page — server component by design.
 *
 * Composition:
 *   1. <SiteNav>         — small client island for the sticky nav
 *   2. <KoiPondHero>     — the only place we mount the WebGL scene; it is a
 *                          dynamically imported client component, so the
 *                          page itself stays an RSC.
 *   3. <YinYangKoi>      — client transition between hero and About
 *   4. <About>           — server-rendered (story, education, skills,
 *                          portrait, contact)
 *   5. <Experience>      — server-rendered (timeline cards, 5 internships)
 *   6. <Projects>        — server-rendered (Graphics Town / JobRadar /
 *                          Jovana)
 *   7. <Contact>         — server-rendered (the CTA target for "Get in
 *                          touch" from the hero card)
 *   8. <SiteFooter>      — server-rendered
 *
 * Critically, only the small interactive islands are client components, so
 * SEO + LCP for the page content stays great.
 */
export default function Home() {
  return (
    <>
      <SiteNav />
      <main id="main">
        <KoiPondHero ctaTargetId="about" />
        <YinYangKoi />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}

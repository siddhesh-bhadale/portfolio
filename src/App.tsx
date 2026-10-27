import { useMemo } from 'react';
import { Footer, Header, TraceRail } from '@/components/layout';
import {
  About,
  Contact,
  Experience,
  Hero,
  OpenSource,
  Skills,
  Work,
} from '@/components/sections';
import { navItems } from '@/data/navigation';
import { useActiveSection } from '@/hooks';

export default function App() {
  const sectionIds = useMemo(() => navItems.map((item) => item.id), []);
  const activeId = useActiveSection(sectionIds);

  return (
    <>
      <a className="skipLink" href="#work">
        Skip to the work
      </a>

      <Header activeId={activeId} />
      <TraceRail activeId={activeId} />

      <main id="main">
        <Hero />
        <Work />
        <Experience />
        <OpenSource />
        <Skills />
        <About />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

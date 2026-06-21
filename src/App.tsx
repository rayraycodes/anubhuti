import { useState } from 'react';
import { Landing } from './pages/Landing';
import { Projects } from './pages/Projects';
import { About } from './pages/About';
import { Circle } from './pages/Circle';
import type { NavTarget, Page } from './types';

export default function App() {
  const [page, setPage] = useState<Page>('home');

  const onNav = (to: NavTarget) => {
    // The platform/Browse kit is a separate UI kit and is not part of this build.
    // Its CTAs ("Sign in", "Post an opportunity", "Explore", card clicks) are
    // intentionally inert here — wire them to the platform route once it's built.
    if (to === 'platform') return;

    setPage(to);
    window.scrollTo({ top: 0 });
  };

  switch (page) {
    case 'projects':
      return <Projects onNav={onNav} />;
    case 'about':
      return <About onNav={onNav} />;
    case 'circle':
      return <Circle onNav={onNav} />;
    default:
      return <Landing onNav={onNav} />;
  }
}

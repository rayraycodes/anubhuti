import { useState } from 'react';
import { Landing } from './pages/Landing';
import { About } from './pages/About';
import type { NavTarget } from './types';

type Page = 'home' | 'about';

export default function App() {
  const [page, setPage] = useState<Page>('home');

  const onNav = (to: NavTarget) => {
    // The platform/Browse kit is a separate UI kit and is not part of this
    // build (scope: marketing Landing + About). Its CTAs are intentionally
    // inert here — wire them to the platform route once that kit is built.
    if (to === 'platform') return;

    setPage(to);
    window.scrollTo({ top: 0 });
  };

  return page === 'about' ? <About onNav={onNav} /> : <Landing onNav={onNav} />;
}

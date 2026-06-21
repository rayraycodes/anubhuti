import { useMemo, useState } from 'react';
import { Landing } from './pages/Landing';
import { Browse } from './pages/Browse';
import { Projects } from './pages/Projects';
import { About } from './pages/About';
import { Circle } from './pages/Circle';
import { OpportunityModal } from './components/OpportunityModal';
import { PostOpportunityModal } from './components/PostOpportunityModal';
import { OPPORTUNITIES, type Opportunity, type OppFilters } from './data/opportunities';
import type { AppActions } from './app-actions';
import type { NavTarget, Page } from './types';

const STORAGE_KEY = 'anubhuti.posted.v1';

function loadPosted(): Opportunity[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Opportunity[]) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [posted, setPosted] = useState<Opportunity[]>(loadPosted);
  const [detail, setDetail] = useState<Opportunity | null>(null);
  const [postOpen, setPostOpen] = useState(false);
  const [browseFilters, setBrowseFilters] = useState<OppFilters>({});

  // User-posted opportunities first, then the curated real ones.
  const opportunities = useMemo(() => [...posted, ...OPPORTUNITIES], [posted]);

  const actions: AppActions = {
    onNav: (to: NavTarget) => {
      if (to === 'platform') return; // reserved (e.g. sign-in) — not built
      setPage(to);
      window.scrollTo({ top: 0 });
    },
    goBrowse: (filters = {}) => {
      setBrowseFilters(filters);
      setPage('browse');
      window.scrollTo({ top: 0 });
    },
    openDetail: (o) => setDetail(o),
    openPost: () => setPostOpen(true),
  };

  const addOpportunity = (o: Opportunity) => {
    setPosted((prev) => {
      const next = [o, ...prev];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore quota / privacy-mode errors */
      }
      return next;
    });
    setPostOpen(false);
    setBrowseFilters({});
    setPage('browse');
    window.scrollTo({ top: 0 });
    setDetail(o);
  };

  const renderPage = () => {
    switch (page) {
      case 'browse':
        return <Browse actions={actions} opportunities={opportunities} initial={browseFilters} />;
      case 'projects':
        return <Projects actions={actions} />;
      case 'about':
        return <About actions={actions} />;
      case 'circle':
        return <Circle actions={actions} />;
      default:
        return <Landing actions={actions} opportunities={opportunities} />;
    }
  };

  return (
    <>
      {renderPage()}
      {detail && <OpportunityModal opportunity={detail} onClose={() => setDetail(null)} />}
      {postOpen && (
        <PostOpportunityModal onClose={() => setPostOpen(false)} onAdd={addOpportunity} />
      )}
    </>
  );
}

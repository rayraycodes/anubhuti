import { useEffect, useMemo, useState } from 'react';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import { Eyebrow } from '../components/Eyebrow';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { OpportunityCard } from '../components/OpportunityCard';
import {
  CATEGORIES,
  REGIONS,
  filterOpportunities,
  sortByDeadline,
  type Category,
  type OppFilters,
  type Opportunity,
} from '../data/opportunities';
import type { AppActions } from '../app-actions';
import styles from './Browse.module.css';

const ANY_REGION = 'Any region';
// Global aggregator we point users to for opportunities beyond our curated list.
const YOUTH_OPPORTUNITIES_URL = 'https://www.youthop.com';

export function Browse({
  actions,
  opportunities,
  initial,
}: {
  actions: AppActions;
  opportunities: Opportunity[];
  initial: OppFilters;
}) {
  const [q, setQ] = useState(initial.q ?? '');
  const [region, setRegion] = useState(initial.region ?? ANY_REGION);
  const [category, setCategory] = useState<Category | 'All'>(initial.category ?? 'All');

  // When we arrive with a new set of filters (e.g. from a category tile, the hero
  // search, or after posting), re-sync. `initial` only changes reference when the
  // App-level filters change — typing here does not trigger this.
  useEffect(() => {
    setQ(initial.q ?? '');
    setRegion(initial.region ?? ANY_REGION);
    setCategory(initial.category ?? 'All');
  }, [initial]);

  const results = useMemo(
    () => sortByDeadline(filterOpportunities(opportunities, { q, region, category })),
    [opportunities, q, region, category],
  );

  const hasFilters = q.trim() !== '' || region !== ANY_REGION || category !== 'All';
  const clearAll = () => {
    setQ('');
    setRegion(ANY_REGION);
    setCategory('All');
  };

  return (
    <div style={{ background: 'var(--surface-page)' }}>
      <header style={{ background: 'var(--surface-page)' }}>
        <Nav onNav={actions.onNav} active="browse" onPost={actions.openPost} />
        <div className="container">
          <div className={styles.intro}>
            <Eyebrow>Explore opportunities</Eyebrow>
            <h1 className={styles.title}>
              Find your next <span className={styles.titleAccent}>opportunity</span>.
            </h1>
            <p className={styles.lede}>
              Real scholarships, fellowships, internships and more — search, filter by region, and
              apply at the source.
            </p>

            {/* Search bar */}
            <div className={styles.searchBar}>
              <div className={styles.searchField}>
                <Icon name="search" size={18} />
                <input
                  className={styles.searchInput}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search opportunities, organisations…"
                  aria-label="Search opportunities"
                />
              </div>
              <div className={styles.regionField}>
                <Icon name="map-pin" size={18} />
                <select
                  className={styles.regionSelect}
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  aria-label="Filter by region"
                >
                  <option value={ANY_REGION}>Any region</option>
                  {REGIONS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              {hasFilters && (
                <button className={styles.clear} onClick={clearAll} aria-label="Clear filters">
                  <span style={{ fontSize: 18, lineHeight: 1 }}>×</span>
                </button>
              )}
            </div>

            {/* Category chips */}
            <div className={styles.chips}>
              <button
                className={`${styles.chip} ${category === 'All' ? styles.chipActive : ''}`}
                onClick={() => setCategory('All')}
              >
                All
              </button>
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  className={`${styles.chip} ${category === c ? styles.chipActive : ''}`}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <section className={styles.results}>
        <div className="container">
          <div className={styles.toolbar}>
            <span className={styles.count}>
              <Icon name="sparkles" size={15} />
              <span>
                <span className={styles.countNum}>{results.length}</span>{' '}
                {results.length === 1 ? 'opportunity' : 'opportunities'}
                {hasFilters ? ' found' : ''}
              </span>
            </span>
            <Button
              size="sm"
              variant="primary"
              onClick={actions.openPost}
              iconLeft={<Icon name="arrow-right" size={15} />}
            >
              Post an opportunity
            </Button>
          </div>

          {results.length > 0 ? (
            <div className={styles.grid}>
              {results.map((o) => (
                <OpportunityCard key={o.id} opportunity={o} onOpen={actions.openDetail} />
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <span className={styles.emptyIcon}>
                <Icon name="search" size={40} />
              </span>
              <div className={styles.emptyTitle}>No opportunities match yet</div>
              <div className={styles.emptySub}>
                Try a different search or region,{' '}
                <a
                  onClick={clearAll}
                  style={{ color: 'var(--color-brand-strong)', cursor: 'pointer', fontWeight: 600 }}
                >
                  clear the filters
                </a>
                , or explore thousands more on{' '}
                <a
                  className={styles.extLink}
                  href={YOUTH_OPPORTUNITIES_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Youth Opportunities ↗
                </a>
                .
              </div>
            </div>
          )}
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaBand}>
            <div className={styles.ctaText}>
              <h2 className={styles.ctaTitle}>Know an opportunity we're missing?</h2>
              <p className={styles.ctaLede}>
                Post it in seconds — free — and it shows up here for everyone. Or explore
                thousands of global listings on{' '}
                <a
                  className={styles.extLinkOnDark}
                  href={YOUTH_OPPORTUNITIES_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Youth Opportunities ↗
                </a>
                .
              </p>
            </div>
            <Button
              size="lg"
              variant="sun"
              onClick={actions.openPost}
              iconRight={<Icon name="arrow-right" size={18} />}
            >
              Post an opportunity
            </Button>
          </div>
        </div>
      </section>

      <Footer onNav={actions.onNav} />
    </div>
  );
}

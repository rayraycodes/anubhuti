import { useMemo, useState } from 'react';
import { Button } from '../components/Button';
import { Eyebrow } from '../components/Eyebrow';
import { Badge } from '../components/Badge';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import { Icon } from '../components/Icon';
import { OppCard, type OppCardProps } from '../components/OppCard';
import { OpportunityCard } from '../components/OpportunityCard';
import {
  CATEGORY_META,
  REGIONS,
  categoryCounts,
  daysUntil,
  sortByDeadline,
  type Category,
  type Opportunity,
} from '../data/opportunities';
import { PARTNERS } from '../data/partners';
import type { AppActions } from '../app-actions';
import type { CSSProperties } from 'react';
import heroPeaks from '../assets/hero-peaks.svg';
import ridgeline from '../assets/ridgeline.svg';
import prayerFlags from '../assets/prayer-flags.svg';
import styles from './Landing.module.css';

const ANY_REGION = 'Any region';

// The eight headline categories shown as tiles (counts come from real data).
const LANDING_CATS: Category[] = [
  'Competitions',
  'Conferences',
  'Exchange',
  'Fellowships',
  'Internships',
  'Scholarships',
  'Workshops',
  'Volunteering',
];

// Sample marketplace projects (teaser for the Projects page).
const PROJECTS: OppCardProps[] = [
  {
    category: 'Project',
    title: 'Audio transcription for E-Pustakalaya',
    org: 'OLE Nepal × Rotaract Patan',
    location: 'Patan',
    daysLeft: 12,
    color: 'green',
  },
  {
    category: 'Project',
    title: 'Local market-trends research report',
    org: 'Sustainable Fish Co-op',
    location: 'Pokhara',
    daysLeft: 18,
    color: 'blue',
  },
  {
    category: 'Project',
    title: 'Brand identity for a youth-led NGO',
    org: 'Himalayan Climate Initiative',
    location: 'Kathmandu',
    daysLeft: 7,
    color: 'sun',
  },
];

const MOVES: [icon: string, title: string, desc: string, color: string][] = [
  [
    'compass',
    'Opportunity matching',
    'Curated scholarships & fellowships filtered by skill-match, not just by name.',
    'crimson',
  ],
  [
    'hammer',
    'Project marketplace',
    'Non-profits post real problems; student cohorts execute them for portfolio-grade experience.',
    'green',
  ],
  [
    'brain',
    'Systems-thinking lab',
    'Soft skills & interconnected thinking embedded into the projects themselves.',
    'blue',
  ],
  [
    'globe-2',
    'Diaspora bridge',
    'Virtual mentorship cycles with Nepali professionals abroad in AI, research & data.',
    'sun',
  ],
];

const MOVE_ACCENTS: Record<string, string> = {
  crimson: 'var(--anu-flag-red)',
  green: 'var(--anu-flag-green)',
  blue: 'var(--anu-flag-blue)',
  sun: 'var(--anu-sun-400)',
};

function Hero({ actions }: { actions: AppActions }) {
  const [q, setQ] = useState('');
  const [region, setRegion] = useState(ANY_REGION);

  const explore = () =>
    actions.goBrowse({
      q: q.trim() || undefined,
      region: region !== ANY_REGION ? region : undefined,
    });

  return (
    <header className={styles.hero}>
      <img className={styles.heroBg} src={heroPeaks} alt="" />
      <div className={styles.heroInner}>
        <Nav onNav={actions.onNav} active="home" dark onPost={actions.openPost} />
        <div className={styles.heroContent}>
          <Eyebrow light>अनुभूति · Youth opportunity platform</Eyebrow>
          <h1 className={styles.heroTitle}>
            Explore what's <span className={styles.heroAccent}>possible</span>.
          </h1>
          <p className={styles.heroLede}>
            Scholarships, fellowships, mentorship and real projects — matched to where you are and
            where you want to go. Or post an opportunity, <em>for free</em>.
          </p>
          <form
            className={styles.searchBar}
            onSubmit={(e) => {
              e.preventDefault();
              explore();
            }}
          >
            <div className={`${styles.searchField} ${styles.searchDivider}`}>
              <Icon name="search" size={18} />
              <input
                className={styles.searchInput}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Any opportunity"
                aria-label="Search opportunities"
              />
            </div>
            <div className={styles.searchField}>
              <Icon name="map-pin" size={18} />
              <select
                className={styles.regionSelect}
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                aria-label="Region"
              >
                <option value={ANY_REGION}>Any region</option>
                {REGIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
            <Button size="md" type="submit" iconRight={<Icon name="arrow-right" size={16} />}>
              Explore
            </Button>
          </form>
          <div className={styles.appBadges}>
            <span className={styles.appBadge}>
              <Icon name="apple" size={17} />
              App Store
            </span>
            <span className={styles.appBadge}>
              <Icon name="play" size={17} />
              Google Play
            </span>
          </div>
        </div>
      </div>
      <img className={styles.heroRidge} src={ridgeline} alt="" />
    </header>
  );
}

export function Landing({
  actions,
  opportunities,
}: {
  actions: AppActions;
  opportunities: Opportunity[];
}) {
  const counts = useMemo(() => categoryCounts(opportunities), [opportunities]);

  // Open opportunities (not closed), soonest deadline first.
  const feed = useMemo(
    () =>
      sortByDeadline(
        opportunities.filter((o) => {
          const d = daysUntil(o.deadline);
          return d === null || d >= 0;
        }),
      ).slice(0, 4),
    [opportunities],
  );

  // Honest, derived headline numbers — no invented stats.
  const liveCount = useMemo(
    () => opportunities.filter((o) => (daysUntil(o.deadline) ?? 0) >= 0).length,
    [opportunities],
  );
  const fundedCount = useMemo(
    () => opportunities.filter((o) => o.funded && (daysUntil(o.deadline) ?? 0) >= 0).length,
    [opportunities],
  );
  const stats: [string, string][] = [
    [String(liveCount), 'Open opportunities'],
    [String(fundedCount), 'Funded options'],
    [String(PARTNERS.length), 'Partner networks'],
    [String(LANDING_CATS.length), 'Categories'],
  ];

  return (
    <div style={{ background: 'var(--surface-page)' }}>
      <Hero actions={actions} />

      {/* Category row */}
      <section className={styles.sectionCats}>
        <div className="container">
          <div className={styles.catRow}>
            {LANDING_CATS.map((label) => (
              <button
                key={label}
                onClick={() => actions.goBrowse({ category: label })}
                className={styles.catBtn}
              >
                <span className={styles.catIcon}>
                  <Icon name={CATEGORY_META[label].icon} size={22} />
                </span>
                <span className={styles.catLabel}>{label}</span>
                <span className={styles.catCount}>{counts[label] ?? 0}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Feed */}
      <section className={styles.sectionFeed}>
        <div className="container">
          <div className={styles.feedGrid}>
            <div>
              <div className={styles.colHead}>
                <Icon name="sparkles" size={18} />
                <h2 className={styles.colTitle}>Open opportunities</h2>
                <a
                  onClick={() => actions.goBrowse()}
                  style={{
                    marginLeft: 'auto',
                    cursor: 'pointer',
                    fontSize: 14,
                    fontWeight: 600,
                    color: 'var(--color-brand-strong)',
                  }}
                >
                  See all →
                </a>
              </div>
              <div className={styles.cardList}>
                {feed.map((o) => (
                  <OpportunityCard key={o.id} opportunity={o} onOpen={actions.openDetail} />
                ))}
              </div>
            </div>
            <div>
              <div className={styles.colHead}>
                <Icon name="hammer" size={18} />
                <h2 className={styles.colTitle}>Live projects</h2>
                <Badge tone="success">Marketplace</Badge>
              </div>
              <div className={styles.cardList}>
                {PROJECTS.map((f, i) => (
                  <OppCard key={i} {...f} onClick={() => actions.onNav('projects')} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The model */}
      <section className={styles.sectionModel}>
        <div className="container">
          <div className={styles.modelHead}>
            <Eyebrow>Theory → impact</Eyebrow>
            <h2 className={styles.modelTitle}>
              We don't just share opportunities. We create them.
            </h2>
            <p className={styles.modelLede}>
              From a roadmap that turns aimlessness into direction, to a marketplace where real
              organisations post real work — Anubhuti is built around four moves.
            </p>
          </div>
          <div className={styles.modelGrid}>
            {MOVES.map(([icon, title, desc, color]) => (
              <div key={title} className={styles.moveCard}>
                <span
                  className={styles.moveIcon}
                  style={{ '--accent': MOVE_ACCENTS[color] } as CSSProperties}
                >
                  <Icon name={icon} size={22} />
                </span>
                <h3 className={styles.moveTitle}>{title}</h3>
                <p className={styles.moveDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats + partners */}
      <section className={styles.sectionStats}>
        <div className="container">
          <div className={styles.statsGrid}>
            {stats.map(([num, label]) => (
              <div key={label} className={styles.stat}>
                <div className={styles.statNum}>{num}</div>
                <div className={styles.statLabel}>{label}</div>
              </div>
            ))}
          </div>
          <div className={styles.partners}>
            <span className={styles.partnersLabel}>Partners</span>
            {PARTNERS.map((p) => (
              <span key={p.name} className={styles.partnerName}>
                {p.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className={styles.sectionCta}>
        <div className="container">
          <div className={styles.ctaBand}>
            <img className={styles.ctaFlags} src={prayerFlags} alt="" />
            <h2 className={styles.ctaTitle}>Your next opportunity is one search away.</h2>
            <p className={styles.ctaLede}>
              Join thousands of young Nepalis turning learning into real-world impact.
            </p>
            <div className={styles.ctaActions}>
              <Button
                size="lg"
                variant="sun"
                onClick={() => actions.goBrowse()}
                iconRight={<Icon name="arrow-right" size={18} />}
              >
                Explore opportunities
              </Button>
              <Button size="lg" variant="light" onClick={() => actions.onNav('about')}>
                Read our vision
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer onNav={actions.onNav} />
    </div>
  );
}

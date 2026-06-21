import { useState, type CSSProperties } from 'react';
import { Button } from '../components/Button';
import { Eyebrow } from '../components/Eyebrow';
import { Badge } from '../components/Badge';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import { Icon } from '../components/Icon';
import { OppCard, type OppCardProps } from '../components/OppCard';
import type { OnNav } from '../types';
import heroPeaks from '../assets/hero-peaks.svg';
import ridgeline from '../assets/ridgeline.svg';
import prayerFlags from '../assets/prayer-flags.svg';
import styles from './Landing.module.css';

const CATS: [icon: string, label: string, count: number][] = [
  ['trophy', 'Competitions', 128],
  ['mic', 'Conferences', 87],
  ['globe', 'Exchange', 54],
  ['users', 'Fellowships', 203],
  ['briefcase', 'Internships', 176],
  ['graduation-cap', 'Scholarships', 412],
  ['presentation', 'Workshops', 96],
  ['heart-handshake', 'Volunteering', 149],
];

const FEED: OppCardProps[] = [
  {
    category: 'Workshops',
    title: 'AWS AI & ML Scholars Workshop 2026',
    org: 'Amazon Web Services',
    location: 'Online',
    daysLeft: 3,
    color: 'yellow',
  },
  {
    category: 'Internships',
    title: 'CBCF State Farm Communications Internship',
    org: 'CBC Foundation',
    location: 'United States',
    daysLeft: 4,
    funded: true,
    color: 'blue',
  },
  {
    category: 'Fellowships',
    title: 'Royal Society Short Industry Fellowship',
    org: 'The Royal Society',
    location: 'United Kingdom',
    daysLeft: 5,
    color: 'crimson',
  },
  {
    category: 'Awards',
    title: 'The Young Climate Prize 2026',
    org: 'The World Around',
    location: 'Global',
    daysLeft: 9,
    color: 'green',
  },
];

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

const STATS: [num: string, label: string][] = [
  ['1,400+', 'Live opportunities'],
  ['62', 'Partner organisations'],
  ['8,900', 'Young people matched'],
  ['37', 'Diaspora mentors'],
];

const PARTNERS = ['OLE Nepal', 'Rotaract Himalaya', 'Toastmasters', 'Leo District', 'Code for Nepal'];

function Hero({ onNav }: { onNav: OnNav }) {
  return (
    <header className={styles.hero}>
      <img className={styles.heroBg} src={heroPeaks} alt="" />
      <div className={styles.heroInner}>
        <Nav onNav={onNav} dark />
        <div className={styles.heroContent}>
          <Eyebrow light>अनुभूति · Youth opportunity platform</Eyebrow>
          <h1 className={styles.heroTitle}>
            Explore what's <span className={styles.heroAccent}>possible</span>.
          </h1>
          <p className={styles.heroLede}>
            Scholarships, fellowships, mentorship and real projects — matched to where you are and
            where you want to go. Or post an opportunity, <em>for free</em>.
          </p>
          <div className={styles.searchBar}>
            <div className={`${styles.searchField} ${styles.searchDivider}`}>
              <Icon name="search" size={18} />
              <span>Any opportunity</span>
            </div>
            <div className={styles.searchField}>
              <Icon name="map-pin" size={18} />
              <span>Any region</span>
            </div>
            <Button
              size="md"
              onClick={() => onNav('platform')}
              iconRight={<Icon name="arrow-right" size={16} />}
            >
              Explore
            </Button>
          </div>
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

export function Landing({ onNav }: { onNav: OnNav }) {
  const [activeCat, setActiveCat] = useState('Scholarships');

  return (
    <div style={{ background: 'var(--surface-page)' }}>
      <Hero onNav={onNav} />

      {/* Category row */}
      <section className={styles.sectionCats}>
        <div className="container">
          <div className={styles.catRow}>
            {CATS.map(([icon, label, count]) => {
              const on = activeCat === label;
              return (
                <button
                  key={label}
                  onClick={() => setActiveCat(label)}
                  className={`${styles.catBtn} ${on ? styles.catBtnActive : ''}`}
                >
                  <span className={styles.catIcon}>
                    <Icon name={icon} size={22} />
                  </span>
                  <span className={styles.catLabel}>{label}</span>
                  <span className={styles.catCount}>{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feed */}
      <section className={styles.sectionFeed}>
        <div className="container">
          <div className={styles.feedGrid}>
            <div>
              <div className={styles.colHead}>
                <Icon name="hourglass" size={18} />
                <h2 className={styles.colTitle}>Deadline approaching</h2>
              </div>
              <div className={styles.cardList}>
                {FEED.map((f, i) => (
                  <OppCard key={i} {...f} onClick={() => onNav('platform')} />
                ))}
              </div>
            </div>
            <div>
              <div className={styles.colHead}>
                <Icon name="sparkles" size={18} />
                <h2 className={styles.colTitle}>Live projects</h2>
                <Badge tone="success">Marketplace</Badge>
              </div>
              <div className={styles.cardList}>
                {PROJECTS.map((f, i) => (
                  <OppCard key={i} {...f} onClick={() => onNav('platform')} />
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

      {/* Stats */}
      <section className={styles.sectionStats}>
        <div className="container">
          <div className={styles.statsGrid}>
            {STATS.map(([num, label]) => (
              <div key={label} className={styles.stat}>
                <div className={styles.statNum}>{num}</div>
                <div className={styles.statLabel}>{label}</div>
              </div>
            ))}
          </div>
          <div className={styles.partners}>
            <span className={styles.partnersLabel}>Partners</span>
            {PARTNERS.map((p) => (
              <span key={p} className={styles.partnerName}>
                {p}
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
                onClick={() => onNav('platform')}
                iconRight={<Icon name="arrow-right" size={18} />}
              >
                Get started free
              </Button>
              <Button size="lg" variant="light" onClick={() => onNav('about')}>
                Read our vision
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer onNav={onNav} />
    </div>
  );
}

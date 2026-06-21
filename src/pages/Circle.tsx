import type { CSSProperties } from 'react';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import { Eyebrow } from '../components/Eyebrow';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import type { OnNav } from '../types';
import prayerFlags from '../assets/prayer-flags.svg';
import styles from './Circle.module.css';

type PartnerColor = 'crimson' | 'blue' | 'green' | 'yellow' | 'sun';

interface Partner {
  name: string;
  role: string;
  location: string;
  desc: string;
  projects: number;
  color: PartnerColor;
}

const ACCENTS: Record<PartnerColor, string> = {
  crimson: 'var(--anu-flag-red)',
  blue: 'var(--anu-flag-blue)',
  green: 'var(--anu-flag-green)',
  yellow: 'var(--anu-sun-500)',
  sun: 'var(--anu-sun-400)',
};

// The partner network — chapters, NGOs and community orgs that post real work and
// opportunities. Grounded in the organisations referenced across the platform.
const PARTNERS: Partner[] = [
  {
    name: 'OLE Nepal',
    role: 'Education NGO',
    location: 'Kathmandu',
    desc: 'Open Learning Exchange — digital learning and the E-Pustakalaya library for schools across Nepal.',
    projects: 14,
    color: 'green',
  },
  {
    name: 'Rotaract Patan',
    role: 'Service chapter',
    location: 'Patan',
    desc: 'Young Rotaractors running community-service and skill-building projects around the Patan area.',
    projects: 9,
    color: 'crimson',
  },
  {
    name: 'Rotaract Himalaya',
    role: 'Service chapter',
    location: 'Kathmandu',
    desc: 'A Rotaract club turning youth energy into hands-on local impact and leadership.',
    projects: 11,
    color: 'crimson',
  },
  {
    name: 'Toastmasters Kathmandu',
    role: 'Communication',
    location: 'Kathmandu',
    desc: 'Public-speaking and leadership practice through regular, supportive meeting cycles.',
    projects: 6,
    color: 'blue',
  },
  {
    name: 'Leo District 325',
    role: 'Youth service',
    location: 'Nepal',
    desc: 'The youth wing of the Lions — volunteering, leadership and service drives nationwide.',
    projects: 8,
    color: 'yellow',
  },
  {
    name: 'Code for Nepal',
    role: 'Civic tech',
    location: 'Remote',
    desc: 'Advancing digital literacy and open data for a more informed, connected Nepal.',
    projects: 7,
    color: 'blue',
  },
  {
    name: 'Himalayan Climate Initiative',
    role: 'Climate NGO',
    location: 'Kathmandu',
    desc: 'Youth-led climate action, circular-economy work and sustainability campaigns.',
    projects: 10,
    color: 'green',
  },
  {
    name: 'Sustainable Fish Co-op',
    role: 'Livelihoods',
    location: 'Pokhara',
    desc: 'A fishing cooperative building sustainable local livelihoods around Phewa Lake.',
    projects: 3,
    color: 'blue',
  },
];

const STATS: [num: string, label: string][] = [
  ['62', 'Partner organisations'],
  ['37', 'Diaspora mentors'],
  ['18', 'Districts reached'],
];

const MENTOR_FIELDS = ['AI', 'ML', 'RS', 'DS', 'UX', '+32'];

// Initials for the monogram — first letters of the first two significant words.
const STOPWORDS = new Set(['for', 'of', 'the', 'and', '&', '×']);
function initials(name: string): string {
  return name
    .split(/[\s×]+/)
    .filter((w) => w && !STOPWORDS.has(w.toLowerCase()))
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('');
}

function PartnerCard({ partner, onOpen }: { partner: Partner; onOpen: () => void }) {
  const { name, role, location, desc, projects, color } = partner;
  const style = { '--accent': ACCENTS[color] } as CSSProperties;
  return (
    <article className={styles.partner} style={style} onClick={onOpen}>
      <div className={styles.partnerHead}>
        <span className={styles.monogram}>{initials(name)}</span>
        <div>
          <h3 className={styles.partnerName}>{name}</h3>
          <div className={styles.role}>{role}</div>
        </div>
      </div>
      <p className={styles.partnerDesc}>{desc}</p>
      <div className={styles.partnerMeta}>
        <span className={styles.metaItem}>
          <Icon name="map-pin" size={13} />
          {location}
        </span>
        <span>
          <span className={styles.projectsCount}>{projects}</span> projects posted
        </span>
      </div>
    </article>
  );
}

export function Circle({ onNav }: { onNav: OnNav }) {
  return (
    <div style={{ background: 'var(--surface-page)' }}>
      <header style={{ background: 'var(--surface-page)' }}>
        <Nav onNav={onNav} active="circle" />
        <div className="container container--narrow">
          <div className={styles.intro}>
            <img className={styles.flags} src={prayerFlags} alt="" />
            <Eyebrow>The Circle · हाम्रो मण्डली</Eyebrow>
            <h1 className={styles.title}>
              The circle behind every <span className={styles.titleAccent}>opportunity</span>.
            </h1>
            <p className={styles.lede}>
              Anubhuti is built with partners — Rotaract and Leo chapters, OLE Nepal, Toastmasters,
              Code for Nepal and more — plus a bridge of diaspora mentors. Together they post real
              work and open real doors.
            </p>
            <div className={styles.stats}>
              {STATS.map(([num, label]) => (
                <div key={label} className={styles.stat}>
                  <div className={styles.statNum}>{num}</div>
                  <div className={styles.statLabel}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Partner organisations */}
      <section className={styles.section}>
        <div className="container container--narrow">
          <div className={styles.sectionHead}>
            <Eyebrow>Our partners</Eyebrow>
            <h2 className={styles.sectionTitle}>The organisations in our circle</h2>
          </div>
          <div className={styles.grid}>
            {PARTNERS.map((p, i) => (
              <PartnerCard key={i} partner={p} onOpen={() => onNav('projects')} />
            ))}
          </div>
        </div>
      </section>

      {/* Diaspora bridge */}
      <section className={styles.diasporaSection}>
        <div className="container container--narrow">
          <div className={styles.diaspora}>
            <Eyebrow light>Diaspora bridge</Eyebrow>
            <h2 className={styles.diasporaTitle}>Mentors who've been there.</h2>
            <p className={styles.diasporaLede}>
              Thirty-seven Nepali professionals abroad run virtual mentorship cycles in AI, research
              and data science — turning brain-drain into knowledge-gain.
            </p>
            <div className={styles.mentorChips}>
              {MENTOR_FIELDS.map((m) => (
                <span key={m} className={styles.mentorChip}>
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className="container container--narrow">
          <div className={styles.ctaBand}>
            <h2 className={styles.ctaTitle}>Bring your organisation into the circle.</h2>
            <p className={styles.ctaLede}>
              Post opportunities, share real projects, or mentor from abroad — and help a generation
              realise what's possible.
            </p>
            <div className={styles.ctaActions}>
              <Button
                size="lg"
                variant="sun"
                onClick={() => onNav('projects')}
                iconRight={<Icon name="arrow-right" size={18} />}
              >
                Become a partner
              </Button>
              <Button size="lg" variant="light" onClick={() => onNav('about')}>
                Read our story
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer onNav={onNav} />
    </div>
  );
}

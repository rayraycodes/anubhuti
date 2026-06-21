import type { CSSProperties } from 'react';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import { Eyebrow } from '../components/Eyebrow';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { PARTNERS, initials, type Partner } from '../data/partners';
import { CATEGORIES, OPPORTUNITIES, accentVar } from '../data/opportunities';
import type { AppActions } from '../app-actions';
import prayerFlags from '../assets/prayer-flags.svg';
import styles from './Circle.module.css';

const MENTOR_FIELDS = ['AI', 'ML', 'Research', 'Data', 'Design', 'Policy'];

// Honest, derived figures only — counts of what's actually in the platform.
const STATS: [num: string, label: string][] = [
  [String(PARTNERS.length), 'Partner networks'],
  [String(OPPORTUNITIES.length), 'Curated opportunities'],
  [String(CATEGORIES.length), 'Categories'],
];

function PartnerCard({ partner, onOpen }: { partner: Partner; onOpen: () => void }) {
  const { name, role, location, desc, color } = partner;
  const style = { '--accent': accentVar(color) } as CSSProperties;
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
        <span className={styles.metaItem}>
          Explore
          <Icon name="arrow-right" size={13} />
        </span>
      </div>
    </article>
  );
}

export function Circle({ actions }: { actions: AppActions }) {
  return (
    <div style={{ background: 'var(--surface-page)' }}>
      <header style={{ background: 'var(--surface-page)' }}>
        <Nav onNav={actions.onNav} active="circle" onPost={actions.openPost} />
        <div className="container container--narrow">
          <div className={styles.intro}>
            <img className={styles.flags} src={prayerFlags} alt="" />
            <Eyebrow>The Circle · हाम्रो मण्डली</Eyebrow>
            <h1 className={styles.title}>
              The circle behind every <span className={styles.titleAccent}>opportunity</span>.
            </h1>
            <p className={styles.lede}>
              Anubhuti is built with partners — Rotary, Rotaract, Leo and Lions clubs, Toastmasters
              and Open Learning Exchange Nepal — plus a bridge of diaspora mentors. Together they
              open real doors.
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
            <h2 className={styles.sectionTitle}>The networks in our circle</h2>
          </div>
          <div className={styles.grid}>
            {PARTNERS.map((p) => (
              <PartnerCard key={p.name} partner={p} onOpen={() => actions.goBrowse()} />
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
              Nepali professionals abroad run virtual mentorship cycles in AI, research and data
              science — turning brain-drain into knowledge-gain.
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
                onClick={actions.openPost}
                iconRight={<Icon name="arrow-right" size={18} />}
              >
                Post an opportunity
              </Button>
              <Button size="lg" variant="light" onClick={() => actions.onNav('about')}>
                Read our story
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer onNav={actions.onNav} />
    </div>
  );
}

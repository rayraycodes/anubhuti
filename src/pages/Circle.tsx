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

const VIRAL_PILLARS: [icon: string, title: string, detail: string][] = [
  [
    'compass',
    'One clear promise',
    'Focus on one audience and one transformation so people can instantly repeat it.',
  ],
  [
    'play',
    'Build in public daily',
    'Post short progress clips and screenshots every day so people follow the journey, not just the result.',
  ],
  [
    'trophy',
    'Challenge + referral loop',
    'Run a 7-day challenge and reward referrals with templates, shoutouts, and early access.',
  ],
  [
    'users',
    'Community onboarding',
    'Bring everyone into one Discord/Telegram hub with a clear welcome flow and first action.',
  ],
  [
    'sparkles',
    'Social proof cadence',
    'Share member wins every day and run weekly live Q&A/demo sessions that become fresh clips.',
  ],
  [
    'heart-handshake',
    'Ambassador flywheel',
    'DM your most active members, promote them to ambassadors/mods, and let them lead new members.',
  ],
];

const VIRAL_LOOP = [
  'Content',
  'Free resource',
  'Join community',
  'Take challenge',
  'Share result',
  'Create more content',
];

const REFERRAL_REWARDS = ['Template bundle', 'Public shoutout', 'Early-access invites'];

const VIRAL_SPRINT: [day: string, action: string][] = [
  ['Day 1', 'Define your one-line promise and audience.'],
  ['Day 2', 'Set up Discord/Telegram channels and welcome message.'],
  ['Day 3', 'Publish the first short build-in-public post.'],
  ['Day 4', 'Launch your free resource and capture sign-ups.'],
  ['Day 5', 'Announce the 7-day challenge with clear rules.'],
  ['Day 6', 'Activate referral rewards and invite tracking.'],
  ['Day 7', 'Share first participant wins and testimonials.'],
  ['Day 8', 'Run live Q&A/teardown and clip highlights.'],
  ['Day 9', 'Feature top members and tag their results.'],
  ['Day 10', 'DM high-activity users to become ambassadors.'],
  ['Day 11', 'Post challenge leaderboard and momentum update.'],
  ['Day 12', 'Publish a community success story thread.'],
  ['Day 13', 'Host a second live session focused on wins.'],
  ['Day 14', 'Review metrics and double down on best channel/format.'],
];

const METRICS: [metric: string, reason: string][] = [
  ['Invite rate', 'Tells you whether members are actively pulling in others.'],
  ['Activation rate', 'Shows whether new joins complete their first meaningful action.'],
  ['7-day retention', 'Confirms whether people stay engaged after week one.'],
];

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

      {/* Viral growth playbook */}
      <section className={styles.playbookSection}>
        <div className="container container--narrow">
          <div className={styles.playbookHead}>
            <Eyebrow>Free + fast growth</Eyebrow>
            <h2 className={styles.playbookTitle}>Viral community playbook</h2>
            <p className={styles.playbookLede}>
              A practical growth system to turn daily content into a community that keeps inviting
              more people.
            </p>
          </div>

          <div className={styles.pillarGrid}>
            {VIRAL_PILLARS.map(([icon, title, detail]) => (
              <article key={title} className={styles.pillarCard}>
                <span className={styles.pillarIcon}>
                  <Icon name={icon} size={20} />
                </span>
                <h3 className={styles.pillarTitle}>{title}</h3>
                <p className={styles.pillarDetail}>{detail}</p>
              </article>
            ))}
          </div>

          <div className={styles.loopBand}>
            {VIRAL_LOOP.map((step, idx) => (
              <div key={step} className={styles.loopStep}>
                <span>{step}</span>
                {idx < VIRAL_LOOP.length - 1 ? <Icon name="arrow-right" size={14} /> : null}
              </div>
            ))}
          </div>

          <div className={styles.rewardRow}>
            <span className={styles.rewardLabel}>Referral rewards</span>
            {REFERRAL_REWARDS.map((reward) => (
              <span key={reward} className={styles.rewardChip}>
                {reward}
              </span>
            ))}
          </div>

          <div className={styles.sprintGrid}>
            {VIRAL_SPRINT.map(([day, action]) => (
              <article key={day} className={styles.sprintCard}>
                <div className={styles.sprintDay}>{day}</div>
                <p className={styles.sprintAction}>{action}</p>
              </article>
            ))}
          </div>

          <div className={styles.metricsGrid}>
            {METRICS.map(([metric, reason]) => (
              <article key={metric} className={styles.metricCard}>
                <h3 className={styles.metricTitle}>{metric}</h3>
                <p className={styles.metricReason}>{reason}</p>
              </article>
            ))}
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

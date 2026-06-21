import type { CSSProperties } from 'react';
import { Button } from '../components/Button';
import { Eyebrow } from '../components/Eyebrow';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import { Icon } from '../components/Icon';
import type { OnNav } from '../types';
import prayerFlags from '../assets/prayer-flags.svg';
import styles from './About.module.css';

const PROBLEMS: [icon: string, title: string, desc: string][] = [
  [
    'layers',
    'No multidisciplinary lens',
    'Youth rarely get a holistic, interconnected view of real-world problems and of life itself.',
  ],
  [
    'eye-off',
    'Hidden opportunities',
    'Scholarships, fellowships, Rotaract, Leo, Toastmasters and volunteering exist — but stay invisible to those they would fit best.',
  ],
  [
    'network',
    'Unaware of systems thinking',
    'Economics, global politics, human history, behaviour and design thinking are seldom connected.',
  ],
  [
    'message-circle',
    'Missing soft skills',
    'Presentation, writing, formal & informal communication, empathy and reflection are taught in isolation, if at all.',
  ],
  [
    'compass',
    'No sense of direction',
    'What are lucrative careers? How do I explore what I actually want? Too few have a map.',
  ],
  [
    'hand-helping',
    'No hands-on practice',
    'Theory rarely meets practice, so portfolios and real experience stay thin.',
  ],
];

const STRATEGIES: [
  icon: string,
  title: string,
  desc: string,
  outcome: string,
  color: string,
][] = [
  [
    'hammer',
    'Theory → impact',
    'We formalise the Rotaract × OLE model into a replicable template: a Project Marketplace where non-profits post real problems and student cohorts execute them.',
    'Students gain practical experience; non-profits receive high-quality support.',
    'green',
  ],
  [
    'compass',
    'Opportunity matching',
    'A curated platform that filters opportunities by skill-match, with roadmaps — "to reach this fellowship, join this chapter and complete these three tasks."',
    'Youth move from aimlessness to a clear, directional path.',
    'crimson',
  ],
  [
    'brain',
    'Soft-skills & systems lab',
    'A future-ready curriculum embeds writing, communication and empathy into projects — taught through economics, global politics and AI ethics.',
    'A generation of T-shaped people: deep skill, broad awareness.',
    'blue',
  ],
  [
    'globe-2',
    'Diaspora & global bridge',
    'Virtual mentorship cycles match youth with Nepali professionals abroad in AI, research and data science.',
    'Turning brain-drain into knowledge-gain.',
    'sun',
  ],
];

const STRATEGY_ACCENTS: Record<string, string> = {
  crimson: 'var(--anu-flag-red)',
  green: 'var(--anu-flag-green)',
  blue: 'var(--anu-flag-blue)',
  sun: 'var(--anu-sun-400)',
};

const VALUES: [icon: string, title: string][] = [
  ['git-merge', 'Bridging theory & practice'],
  ['book-open', 'Enhancing digital educational access'],
  ['layers', 'Developing holistic perspectives'],
  ['heart', 'Empathetic & accessible engagement'],
];

function AboutHero({ onNav }: { onNav: OnNav }) {
  return (
    <header className={styles.aboutHero}>
      <Nav onNav={onNav} active="about" />
      <div className={styles.aboutHeroInner}>
        <img className={styles.flags} src={prayerFlags} alt="" />
        <Eyebrow>Our story · हाम्रो कथा</Eyebrow>
        <h1 className={styles.heroTitle}>
          Empowering Nepalese youth to bridge learning and{' '}
          <span className={styles.heroAccent}>real-world impact</span>.
        </h1>
        <p className={styles.heroLede}>
          Anubhuti — <em>"to realise, to feel deeply"</em> — exists to give young people holistic
          perspectives and the accessible, career-defining opportunities that closely connect with
          who they are.
        </p>
      </div>
    </header>
  );
}

export function About({ onNav }: { onNav: OnNav }) {
  return (
    <div style={{ background: 'var(--surface-page)' }}>
      <AboutHero onNav={onNav} />

      {/* Vision band */}
      <section className={styles.vision}>
        <div className="container container--narrow">
          <div className={styles.visionInner}>
            <Eyebrow light>Vision</Eyebrow>
            <p className={styles.visionText}>
              A Nepal where every young person can find the opportunity that fits them — and turn
              what they learn into something real.
            </p>
          </div>
        </div>
      </section>

      {/* Problems */}
      <section className={styles.sectionProblems}>
        <div className="container container--narrow">
          <div className={styles.headBlock}>
            <Eyebrow>The problem</Eyebrow>
            <h2 className={styles.sectionTitle}>What young people in Nepal are up against</h2>
          </div>
          <div className={styles.problemsGrid}>
            {PROBLEMS.map(([icon, title, desc]) => (
              <div key={title} className={styles.problemCard}>
                <span className={styles.problemIcon}>
                  <Icon name={icon} size={21} />
                </span>
                <h3 className={styles.problemTitle}>{title}</h3>
                <p className={styles.problemDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategies */}
      <section className={styles.sectionStrategies}>
        <div className="container container--narrow">
          <div className={styles.headBlock}>
            <Eyebrow>Our approach</Eyebrow>
            <h2 className={styles.sectionTitle}>Four moves, from aimlessness to impact</h2>
          </div>
          <div className={styles.strategiesGrid}>
            {STRATEGIES.map(([icon, title, desc, outcome, color]) => (
              <div
                key={title}
                className={styles.strategyCard}
                style={{ '--accent': STRATEGY_ACCENTS[color] } as CSSProperties}
              >
                <div className={styles.strategyHead}>
                  <span className={styles.strategyIcon}>
                    <Icon name={icon} size={24} />
                  </span>
                  <h3 className={styles.strategyTitle}>{title}</h3>
                </div>
                <p className={styles.strategyDesc}>{desc}</p>
                <div className={styles.strategyOutcome}>
                  <Icon name="arrow-up-right" size={16} />
                  <span className={styles.strategyOutcomeText}>{outcome}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={styles.sectionValues}>
        <div className="container container--narrow">
          <div className={styles.headCenter}>
            <Eyebrow>What we value</Eyebrow>
            <h2 className={styles.sectionTitle}>The principles behind every match</h2>
          </div>
          <div className={styles.valuesGrid}>
            {VALUES.map(([icon, title]) => (
              <div key={title} className={styles.valueCard}>
                <span className={styles.valueIcon}>
                  <Icon name={icon} size={24} />
                </span>
                <h3 className={styles.valueTitle}>{title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.sectionCta}>
        <div className="container container--narrow">
          <div className={styles.ctaBand}>
            <h2 className={styles.ctaTitle}>Build it with us.</h2>
            <p className={styles.ctaLede}>
              Partner, mentor, or post your first opportunity — and help a generation realise what's
              possible.
            </p>
            <div className={styles.ctaActions}>
              <Button
                size="lg"
                variant="sun"
                onClick={() => onNav('platform')}
                iconRight={<Icon name="arrow-right" size={18} />}
              >
                Become a partner
              </Button>
              <Button size="lg" variant="light" onClick={() => onNav('home')}>
                Explore the platform
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer onNav={onNav} />
    </div>
  );
}

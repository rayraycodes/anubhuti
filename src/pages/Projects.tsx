import type { CSSProperties } from 'react';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import { Eyebrow } from '../components/Eyebrow';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import type { OnNav } from '../types';
import prayerFlags from '../assets/prayer-flags.svg';
import styles from './Projects.module.css';

type ProjectColor = 'crimson' | 'blue' | 'green' | 'yellow' | 'sun';

interface Project {
  title: string;
  org: string;
  location: string;
  daysLeft: number;
  status: string;
  desc: string;
  tags: string[];
  color: ProjectColor;
}

const ACCENTS: Record<ProjectColor, string> = {
  crimson: 'var(--anu-flag-red)',
  blue: 'var(--anu-flag-blue)',
  green: 'var(--anu-flag-green)',
  yellow: 'var(--anu-flag-yellow)',
  sun: 'var(--anu-sun-400)',
};

// Sample projects — the kind of real, scoped work organisations post for student
// cohorts to execute (theory → impact). Replace with live data when the backend lands.
const PROJECTS: Project[] = [
  {
    title: 'Audio transcription for E-Pustakalaya',
    org: 'OLE Nepal × Rotaract Patan',
    location: 'Patan',
    daysLeft: 12,
    status: 'Open',
    desc: 'Transcribe and time-align Nepali audio lessons so they reach low-vision and early-grade learners on the E-Pustakalaya library.',
    tags: ['Transcription', 'Nepali', 'Accessibility'],
    color: 'green',
  },
  {
    title: 'Local market-trends research report',
    org: 'Sustainable Fish Co-op',
    location: 'Pokhara',
    daysLeft: 18,
    status: 'Open',
    desc: 'Survey Phewa-area buyers and compile a pricing & demand report the co-op can use to plan a fairer, more stable season.',
    tags: ['Research', 'Data', 'Markets'],
    color: 'blue',
  },
  {
    title: 'Brand identity for a youth-led NGO',
    org: 'Himalayan Climate Initiative',
    location: 'Kathmandu',
    daysLeft: 7,
    status: 'Closing soon',
    desc: 'Design a logo, colour system and social templates for a new circular-economy campaign aimed at school clubs.',
    tags: ['Branding', 'Design', 'Logo'],
    color: 'sun',
  },
  {
    title: 'Climate-data dashboard for the Terai',
    org: 'Code for Nepal',
    location: 'Remote',
    daysLeft: 15,
    status: 'Open',
    desc: 'Build an open dashboard that visualises temperature and flood data so local journalists can tell clearer climate stories.',
    tags: ['React', 'Data viz', 'Climate'],
    color: 'blue',
  },
  {
    title: 'Translate STEM worksheets into Nepali',
    org: 'OLE Nepal',
    location: 'Remote',
    daysLeft: 25,
    status: 'Open',
    desc: 'Localise a set of grade-7 science and maths worksheets, keeping terminology consistent with the national curriculum.',
    tags: ['Translation', 'Education', 'STEM'],
    color: 'green',
  },
  {
    title: 'Social campaign for a literacy drive',
    org: 'Leo District 325',
    location: 'Lalitpur',
    daysLeft: 9,
    status: 'Open',
    desc: 'Plan and produce a two-week social-media campaign to recruit volunteers for a community reading programme.',
    tags: ['Marketing', 'Content', 'Social'],
    color: 'yellow',
  },
  {
    title: 'Photo story: women in mountain agriculture',
    org: 'Himalayan Climate Initiative',
    location: 'Mustang',
    daysLeft: 30,
    status: 'Open',
    desc: 'Document the daily work of women farmers in the high valleys for an exhibition and fundraising microsite.',
    tags: ['Photography', 'Storytelling'],
    color: 'sun',
  },
  {
    title: 'Public-speaking workshop curriculum',
    org: 'Toastmasters Kathmandu',
    location: 'Kathmandu',
    daysLeft: 5,
    status: 'Closing soon',
    desc: 'Co-write a four-session curriculum that helps first-time speakers build confidence and structure a talk.',
    tags: ['Curriculum', 'Communication'],
    color: 'blue',
  },
  {
    title: 'Blood-donor matching app prototype',
    org: 'Rotaract Himalaya',
    location: 'Kathmandu / Remote',
    daysLeft: 21,
    status: 'Open',
    desc: 'Prototype a lightweight app that matches urgent blood requests to nearby registered donors across the valley.',
    tags: ['Flutter', 'Mobile', 'Health'],
    color: 'crimson',
  },
];

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const { title, org, location, daysLeft, status, desc, tags, color } = project;
  const closing = daysLeft <= 7;
  const deadline = daysLeft === 0 ? 'Today' : `${daysLeft} day${daysLeft === 1 ? '' : 's'} left`;
  const style = { '--accent': ACCENTS[color] } as CSSProperties;

  return (
    <article className={styles.card} style={style} onClick={onOpen}>
      <div className={styles.thumb}>
        <svg className={styles.thumbRidge} viewBox="0 0 100 40" preserveAspectRatio="none">
          <path
            d="M0 40 L0 24 L22 8 L40 22 L58 6 L80 24 L100 12 L100 40 Z"
            fill="rgba(255,255,255,0.18)"
          />
        </svg>
        <div className={styles.status}>
          <Badge tone={closing ? 'danger' : 'success'} solid={closing}>
            {status}
          </Badge>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.eyebrow}>
          <span className={styles.dot} />
          <span className={styles.eyebrowText}>Project</span>
        </div>
        <h3 className={styles.cardTitle}>{title}</h3>
        <div className={styles.org}>{org}</div>
        <p className={styles.desc}>{desc}</p>
        <div className={styles.tags}>
          {tags.map((t) => (
            <span key={t} className={styles.tag}>
              {t}
            </span>
          ))}
        </div>
        <div className={styles.foot}>
          <div className={styles.meta}>
            <span className={styles.metaItem}>
              <Icon name="map-pin" size={13} />
              {location}
            </span>
            <span className={`${styles.metaItem} ${closing ? styles.closing : ''}`}>
              <Icon name="clock" size={13} />
              {deadline}
            </span>
          </div>
          <span className={styles.view}>
            View
            <Icon name="arrow-right" size={14} />
          </span>
        </div>
      </div>
    </article>
  );
}

export function Projects({ onNav }: { onNav: OnNav }) {
  return (
    <div style={{ background: 'var(--surface-page)' }}>
      <header style={{ background: 'var(--surface-page)' }}>
        <Nav onNav={onNav} active="projects" />
        <div className="container container--narrow">
          <div className={styles.intro}>
            <Eyebrow>Project marketplace · परियोजना</Eyebrow>
            <h1 className={styles.title}>
              Real problems. <span className={styles.titleAccent}>Real-world experience.</span>
            </h1>
            <p className={styles.lede}>
              Non-profits and chapters post real work; student cohorts take it on for
              portfolio-grade experience. Browse what's live right now.
            </p>
          </div>
        </div>
      </header>

      <section className={styles.section}>
        <div className="container container--narrow">
          <div className={styles.toolbar}>
            <span className={styles.count}>
              <Icon name="sparkles" size={15} />
              <span>
                <span className={styles.countNum}>{PROJECTS.length}</span> open projects
              </span>
            </span>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onNav('circle')}
              iconLeft={<Icon name="hammer" size={15} />}
            >
              Post a project
            </Button>
          </div>
          <div className={styles.grid} style={{ marginTop: 24 }}>
            {PROJECTS.map((p, i) => (
              <ProjectCard key={i} project={p} onOpen={() => onNav('platform')} />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className="container container--narrow">
          <div className={styles.ctaBand}>
            <img className={styles.ctaFlags} src={prayerFlags} alt="" />
            <h2 className={styles.ctaTitle}>Have real work that needs real hands?</h2>
            <p className={styles.ctaLede}>
              Post a project and a matched cohort of young people will help you ship it.
            </p>
            <div className={styles.ctaActions}>
              <Button
                size="lg"
                variant="sun"
                onClick={() => onNav('circle')}
                iconRight={<Icon name="arrow-right" size={18} />}
              >
                Post a project
              </Button>
              <Button size="lg" variant="light" onClick={() => onNav('home')}>
                Browse opportunities
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer onNav={onNav} />
    </div>
  );
}

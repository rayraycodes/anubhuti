import { useState, type CSSProperties } from 'react';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import { Eyebrow } from '../components/Eyebrow';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { ProjectDetailModal } from '../components/ProjectDetailModal';
import { accentVar } from '../data/opportunities';
import { PROJECTS, openProjectForm, type Project } from '../data/projects';
import type { AppActions } from '../app-actions';
import prayerFlags from '../assets/prayer-flags.svg';
import styles from './Projects.module.css';

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const { title, org, location, daysLeft, status, desc, tags, color } = project;
  const closing = daysLeft <= 7;
  const deadline = daysLeft === 0 ? 'Today' : `${daysLeft} day${daysLeft === 1 ? '' : 's'} left`;
  const style = { '--accent': accentVar(color) } as CSSProperties;

  return (
    <button className={styles.card} style={style} onClick={onOpen}>
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
            View project
            <Icon name="arrow-right" size={14} />
          </span>
        </div>
      </div>
    </button>
  );
}

export function Projects({ actions }: { actions: AppActions }) {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <div style={{ background: 'var(--surface-page)' }}>
      <header style={{ background: 'var(--surface-page)' }}>
        <Nav onNav={actions.onNav} active="projects" onPost={actions.openPost} />
        <div className="container container--narrow">
          <div className={styles.intro}>
            <Eyebrow>Project marketplace · परियोजना</Eyebrow>
            <h1 className={styles.title}>
              Real problems. <span className={styles.titleAccent}>Real-world experience.</span>
            </h1>
            <p className={styles.lede}>
              Non-profits and chapters post real work; student cohorts take it on for
              portfolio-grade experience. Open a project to see the brief.
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
              onClick={openProjectForm}
              iconLeft={<Icon name="hammer" size={15} />}
            >
              Submit a project
            </Button>
          </div>
          <div className={styles.grid} style={{ marginTop: 24 }}>
            {PROJECTS.map((p) => (
              <ProjectCard key={p.id} project={p} onOpen={() => setSelected(p)} />
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
              Submit a project and a matched cohort of young people will help you ship it.
            </p>
            <div className={styles.ctaActions}>
              <Button
                size="lg"
                variant="sun"
                onClick={openProjectForm}
                iconRight={<Icon name="arrow-up-right" size={18} />}
              >
                Submit a project
              </Button>
              <Button size="lg" variant="light" onClick={() => actions.goBrowse()}>
                Browse opportunities
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer onNav={actions.onNav} />

      {selected && (
        <ProjectDetailModal project={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

import type { CSSProperties } from 'react';
import { Modal } from './Modal';
import { Badge } from './Badge';
import { Button } from './Button';
import { Icon } from './Icon';
import { accentVar } from '../data/opportunities';
import { openProjectForm, type Project } from '../data/projects';
import styles from './ProjectDetailModal.module.css';

export function ProjectDetailModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const { title, org, location, daysLeft, status, details, tags, color } = project;
  const closing = daysLeft <= 7;
  const deadline = daysLeft === 0 ? 'Closes today' : `${daysLeft} day${daysLeft === 1 ? '' : 's'} left`;
  const style = { '--accent': accentVar(color) } as CSSProperties;

  return (
    <Modal onClose={onClose} labelledBy="proj-title">
      <div style={style}>
        <div className={styles.banner}>
          <svg className={styles.bannerRidge} viewBox="0 0 100 40" preserveAspectRatio="none">
            <path
              d="M0 40 L0 22 L20 8 L38 22 L56 6 L78 24 L100 10 L100 40 Z"
              fill="rgba(255,255,255,0.16)"
            />
          </svg>
          <span className={styles.bannerIcon}>
            <Icon name="hammer" size={24} />
          </span>
        </div>
        <div className={styles.body}>
          <div className={styles.badges}>
            <Badge tone="success">Project</Badge>
            <Badge tone={closing ? 'danger' : 'neutral'} solid={closing}>
              {status}
            </Badge>
          </div>
          <h2 id="proj-title" className={styles.title}>
            {title}
          </h2>
          <div className={styles.org}>{org}</div>
          <p className={styles.details}>{details}</p>
          <div className={styles.tags}>
            {tags.map((t) => (
              <span key={t} className={styles.tag}>
                {t}
              </span>
            ))}
          </div>

          <div className={styles.metaGrid}>
            <div>
              <div className={styles.metaLabel}>Location</div>
              <div className={styles.metaValue}>
                <Icon name="map-pin" size={15} />
                {location}
              </div>
            </div>
            <div>
              <div className={styles.metaLabel}>Timeline</div>
              <div className={`${styles.metaValue} ${closing ? styles.closing : ''}`}>
                <Icon name="clock" size={15} />
                {deadline}
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <Button
              variant="primary"
              onClick={openProjectForm}
              iconRight={<Icon name="arrow-up-right" size={16} />}
            >
              Express interest
            </Button>
            <Button variant="secondary" onClick={onClose}>
              Back to projects
            </Button>
          </div>
          <div className={styles.note}>Opens our project form in a new tab.</div>
        </div>
      </div>
    </Modal>
  );
}

import type { CSSProperties } from 'react';
import { Icon } from './Icon';
import { Badge } from './Badge';
import {
  CATEGORY_META,
  accentVar,
  deadlineInfo,
  type Opportunity,
} from '../data/opportunities';
import styles from './OpportunityCard.module.css';

export function OpportunityCard({
  opportunity,
  onOpen,
}: {
  opportunity: Opportunity;
  onOpen: (o: Opportunity) => void;
}) {
  const { title, org, category, region, funded, deadline, posted } = opportunity;
  const meta = CATEGORY_META[category];
  const dl = deadlineInfo(deadline);
  const style = { '--accent': accentVar(meta.color) } as CSSProperties;

  const deadlineClass = dl.closed
    ? styles.closed
    : dl.rolling
      ? styles.rolling
      : dl.closing
        ? styles.closing
        : '';

  return (
    <button className={styles.card} style={style} onClick={() => onOpen(opportunity)}>
      <div className={styles.thumb}>
        <svg className={styles.thumbRidge} viewBox="0 0 100 40" preserveAspectRatio="none">
          <path
            d="M0 40 L0 24 L22 8 L40 22 L58 6 L80 24 L100 12 L100 40 Z"
            fill="rgba(255,255,255,0.18)"
          />
        </svg>
        <span className={styles.thumbIcon}>
          <Icon name={meta.icon} size={18} />
        </span>
      </div>
      <div className={styles.body}>
        <div className={styles.eyebrow}>
          <span className={styles.dot} />
          <span className={styles.eyebrowText}>
            {category}
            {funded ? ' · Funded' : ''}
          </span>
          {posted && (
            <span className={styles.posted}>
              <Badge tone="sun" solid>
                Posted
              </Badge>
            </span>
          )}
        </div>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.org}>{org}</div>
        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <Icon name="map-pin" size={13} />
            {region}
          </span>
          <span className={`${styles.metaItem} ${deadlineClass}`}>
            <Icon name="clock" size={13} />
            {dl.label}
          </span>
        </div>
      </div>
    </button>
  );
}

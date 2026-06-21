import type { CSSProperties } from 'react';
import { Icon } from './Icon';
import styles from './OppCard.module.css';

export type OppColor = 'crimson' | 'blue' | 'green' | 'yellow' | 'sun';

const ACCENTS: Record<OppColor, string> = {
  crimson: 'var(--anu-flag-red)',
  blue: 'var(--anu-flag-blue)',
  green: 'var(--anu-flag-green)',
  yellow: 'var(--anu-flag-yellow)',
  sun: 'var(--anu-sun-400)',
};

export interface OppCardProps {
  category: string;
  title: string;
  org: string;
  location: string;
  /** Days until the deadline. `null` → closed; `0` → today; `<= 3` highlights. */
  daysLeft?: number | null;
  funded?: boolean;
  color?: OppColor;
  /** Image-on-top feature layout (vs. the default compact row). */
  feature?: boolean;
  onClick?: () => void;
}

function deadlineLabel(daysLeft: number | null | undefined): string {
  if (daysLeft == null) return 'Closed';
  if (daysLeft === 0) return 'Today';
  return `${daysLeft} day${daysLeft === 1 ? '' : 's'} left`;
}

/** Branded ridgeline gradient thumbnail (no photographic imagery shipped). */
function Thumb({ width, height }: { width: number | string; height: number }) {
  return (
    <div className={styles.thumb} style={{ width, height }}>
      <svg className={styles.thumbRidge} viewBox="0 0 100 40" preserveAspectRatio="none">
        <path
          d="M0 40 L0 24 L22 8 L40 22 L58 6 L80 24 L100 12 L100 40 Z"
          fill="rgba(255,255,255,0.18)"
        />
      </svg>
    </div>
  );
}

export function OppCard({
  category,
  title,
  org,
  location,
  daysLeft,
  funded,
  color = 'crimson',
  feature,
  onClick,
}: OppCardProps) {
  const closing = typeof daysLeft === 'number' && daysLeft <= 3;
  const style = { '--accent': ACCENTS[color] } as CSSProperties;

  const eyebrow = (
    <div className={styles.eyebrow}>
      <span className={styles.dot} />
      <span className={styles.eyebrowText}>
        {category}
        {funded ? ' · Funded' : ''}
      </span>
    </div>
  );

  const meta = (
    <div className={styles.meta}>
      <span className={styles.metaItem}>
        <Icon name="map-pin" size={13} />
        {location}
      </span>
      <span className={`${styles.metaItem} ${closing ? styles.closing : ''}`}>
        <Icon name="clock" size={13} />
        {deadlineLabel(daysLeft)}
      </span>
    </div>
  );

  if (feature) {
    return (
      <div className={`${styles.card} ${styles.feature}`} onClick={onClick} style={style}>
        <div className={styles.featurePad}>
          <Thumb width="100%" height={150} />
        </div>
        <div className={styles.featureBody}>
          {eyebrow}
          <h3 className={`${styles.title} ${styles.featureTitle}`}>{title}</h3>
          <div className={`${styles.org} ${styles.featureOrg}`}>{org}</div>
          {meta}
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.card} ${styles.compact}`} onClick={onClick} style={style}>
      <Thumb width={86} height={86} />
      <div className={styles.compactBody}>
        {eyebrow}
        <h3 className={`${styles.title} ${styles.compactTitle}`}>{title}</h3>
        <div className={`${styles.org} ${styles.compactOrg}`}>{org}</div>
        {meta}
      </div>
    </div>
  );
}

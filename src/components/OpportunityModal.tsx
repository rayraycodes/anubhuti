import type { CSSProperties } from 'react';
import { Modal } from './Modal';
import { Badge } from './Badge';
import { Icon } from './Icon';
import {
  CATEGORY_META,
  accentVar,
  deadlineInfo,
  type Opportunity,
} from '../data/opportunities';
import styles from './OpportunityModal.module.css';

export function OpportunityModal({
  opportunity,
  onClose,
}: {
  opportunity: Opportunity;
  onClose: () => void;
}) {
  const { title, org, category, region, funded, deadline, url, summary, posted } = opportunity;
  const meta = CATEGORY_META[category];
  const dl = deadlineInfo(deadline);
  const style = { '--accent': accentVar(meta.color) } as CSSProperties;
  const hasLink = Boolean(url) && url !== '#';

  return (
    <Modal onClose={onClose} labelledBy="opp-title">
      <div style={style}>
        <div className={styles.banner}>
          <svg className={styles.bannerRidge} viewBox="0 0 100 40" preserveAspectRatio="none">
            <path
              d="M0 40 L0 22 L20 8 L38 22 L56 6 L78 24 L100 10 L100 40 Z"
              fill="rgba(255,255,255,0.16)"
            />
          </svg>
          <span className={styles.bannerIcon}>
            <Icon name={meta.icon} size={26} />
          </span>
        </div>
        <div className={styles.body}>
          <div className={styles.badges}>
            <Badge tone="brand">{category}</Badge>
            {funded && <Badge tone="success">Funded</Badge>}
            {posted && (
              <Badge tone="sun" solid>
                Posted
              </Badge>
            )}
          </div>
          <h2 id="opp-title" className={styles.title}>
            {title}
          </h2>
          <div className={styles.org}>{org}</div>
          <p className={styles.summary}>{summary}</p>

          <div className={styles.metaGrid}>
            <div>
              <div className={styles.metaLabel}>Region</div>
              <div className={styles.metaValue}>
                <Icon name="map-pin" size={15} />
                {region}
              </div>
            </div>
            <div>
              <div className={styles.metaLabel}>Deadline</div>
              <div
                className={`${styles.metaValue} ${
                  dl.closing ? styles.closing : dl.rolling ? styles.rolling : ''
                }`}
              >
                <Icon name="clock" size={15} />
                {dl.label}
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            {hasLink ? (
              <a href={url} target="_blank" rel="noopener noreferrer">
                <Btn label="Apply / view details" />
              </a>
            ) : (
              <Btn label="No link provided" disabled />
            )}
          </div>
          {posted && <div className={styles.note}>You posted this opportunity in this session.</div>}
        </div>
      </div>
    </Modal>
  );
}

/* Inline anchor-friendly button (the Button component renders its own <button>,
   which can't sit inside an <a>; this is a styled span used as the link body). */
function Btn({ label, disabled }: { label: string; disabled?: boolean }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        height: 46,
        padding: '0 22px',
        borderRadius: 'var(--radius-md)',
        background: disabled ? 'var(--anu-stone-200)' : 'var(--color-brand)',
        color: disabled ? 'var(--text-muted)' : '#fff',
        border: `1.5px solid ${disabled ? 'var(--anu-stone-200)' : 'var(--color-brand)'}`,
        boxShadow: disabled ? 'none' : 'var(--shadow-brand)',
        fontFamily: 'var(--font-sans)',
        fontSize: 15,
        fontWeight: 600,
        cursor: disabled ? 'default' : 'pointer',
      }}
    >
      {label}
      {!disabled && <Icon name="arrow-up-right" size={16} />}
    </span>
  );
}

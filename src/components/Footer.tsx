import { Icon } from './Icon';
import type { NavTarget, OnNav } from '../types';
import logoWordmarkLight from '../assets/logo-wordmark-light.svg';
import ridgeline from '../assets/ridgeline.svg';
import styles from './Footer.module.css';

type FooterLink = [label: string, to: NavTarget];

const COLUMNS: [title: string, items: FooterLink[]][] = [
  [
    'Platform',
    [
      ['Browse opportunities', 'home'],
      ['Project marketplace', 'projects'],
      ['For organizations', 'circle'],
      ['Mentorship', 'circle'],
    ],
  ],
  [
    'Anubhuti',
    [
      ['Our vision', 'about'],
      ['Values', 'about'],
      ['Partners', 'circle'],
      ['Join the team', 'circle'],
    ],
  ],
  [
    'Support',
    [
      ['Help centre', 'home'],
      ['Contact', 'circle'],
      ['Privacy', 'home'],
      ['Terms', 'home'],
    ],
  ],
];

const SOCIALS = ['instagram', 'facebook', 'linkedin', 'youtube'] as const;

export interface FooterProps {
  onNav?: OnNav;
}

export function Footer({ onNav }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <img className={styles.ridge} src={ridgeline} alt="" />
      <div className={styles.top}>
        <div>
          <img className={styles.brandLogo} src={logoWordmarkLight} alt="Anubhuti" />
          <p className={styles.blurb}>
            The hub connecting young Nepalis with opportunities, real projects, and the
            organisations that need them.
          </p>
          <div className={styles.social}>
            {SOCIALS.map((s) => (
              <span key={s} className={styles.socialBtn} aria-label={s}>
                <Icon name={s} size={18} />
              </span>
            ))}
          </div>
        </div>
        {COLUMNS.map(([title, items]) => (
          <div key={title} className={styles.col}>
            <div className={styles.colTitle}>{title}</div>
            {items.map(([label, to]) => (
              <a key={label} className={styles.colLink} onClick={() => onNav?.(to)}>
                {label}
              </a>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.bottom}>
        <span>© 2026 Anubhuti · अनुभूति</span>
        <span>Made in Kathmandu, Nepal</span>
      </div>
    </footer>
  );
}

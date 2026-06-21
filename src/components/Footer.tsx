import { Icon } from './Icon';
import type { OnNav } from '../types';
import logoWordmarkLight from '../assets/logo-wordmark-light.svg';
import ridgeline from '../assets/ridgeline.svg';
import styles from './Footer.module.css';

const COLUMNS: [title: string, items: string[]][] = [
  ['Platform', ['Browse opportunities', 'Project marketplace', 'For organizations', 'Mentorship']],
  ['Anubhuti', ['Our vision', 'Values', 'Partners', 'Join the team']],
  ['Support', ['Help centre', 'Contact', 'Privacy', 'Terms']],
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
            Bridging theory and real-world impact for the youth of Nepal — one opportunity at a
            time.
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
            {items.map((item) => (
              <a key={item} className={styles.colLink} onClick={() => onNav?.('platform')}>
                {item}
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

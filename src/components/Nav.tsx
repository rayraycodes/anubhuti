import { Button } from './Button';
import { Icon } from './Icon';
import type { NavTarget, OnNav } from '../types';
import logoWordmark from '../assets/logo-wordmark.svg';
import logoWordmarkLight from '../assets/logo-wordmark-light.svg';
import styles from './Nav.module.css';

const LINKS: [label: string, to: NavTarget][] = [
  ['Opportunities', 'browse'],
  ['Projects', 'projects'],
  ['About', 'about'],
  ['Circle', 'circle'],
];

export interface NavProps {
  onNav: OnNav;
  /** The current page, so its nav tab can be highlighted. */
  active?: NavTarget;
  /** Render over a dark surface (the Landing hero). */
  dark?: boolean;
  /** Open the "post an opportunity" dialog. */
  onPost?: () => void;
}

export function Nav({ onNav, active, dark, onPost }: NavProps) {
  return (
    <nav className={[styles.nav, dark && styles.onDark].filter(Boolean).join(' ')}>
      <a className={styles.logo} onClick={() => onNav('home')}>
        <img src={dark ? logoWordmarkLight : logoWordmark} alt="Anubhuti" />
      </a>
      <div className={styles.links}>
        {LINKS.map(([label, to], i) => (
          <a
            key={i}
            className={[styles.link, styles.textLink, to === active && styles.active]
              .filter(Boolean)
              .join(' ')}
            aria-current={to === active ? 'page' : undefined}
            onClick={() => onNav(to)}
          >
            {label}
          </a>
        ))}
        <Button size="sm" variant={dark ? 'light' : 'secondary'} onClick={() => onNav('browse')}>
          Browse
        </Button>
        <Button
          size="sm"
          variant="primary"
          onClick={() => (onPost ? onPost() : onNav('browse'))}
          iconRight={<Icon name="arrow-right" size={16} />}
        >
          Post an opportunity
        </Button>
      </div>
    </nav>
  );
}

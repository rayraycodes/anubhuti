import type { ReactNode } from 'react';
import styles from './Eyebrow.module.css';

export interface EyebrowProps {
  children: ReactNode;
  /** Use the light variant on dark surfaces. */
  light?: boolean;
}

export function Eyebrow({ children, light }: EyebrowProps) {
  return (
    <div className={[styles.eyebrow, light && styles.light].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
}

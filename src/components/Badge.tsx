import type { CSSProperties, ReactNode } from 'react';
import styles from './Badge.module.css';

export type BadgeTone = 'neutral' | 'brand' | 'sun' | 'success' | 'info' | 'danger';

const TONES: Record<BadgeTone, { soft: string; strong: string }> = {
  neutral: { soft: 'var(--anu-stone-100)', strong: 'var(--anu-stone-600)' },
  brand: { soft: 'var(--anu-crimson-50)', strong: 'var(--anu-crimson-600)' },
  sun: { soft: 'var(--anu-sun-50)', strong: 'var(--anu-sun-600)' },
  success: { soft: 'var(--anu-pine-50)', strong: 'var(--anu-pine-600)' },
  info: { soft: 'var(--anu-blue-50)', strong: 'var(--anu-blue-500)' },
  danger: { soft: 'var(--anu-crimson-50)', strong: 'var(--anu-crimson-600)' },
};

export interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  solid?: boolean;
}

export function Badge({ children, tone = 'neutral', solid }: BadgeProps) {
  const { soft, strong } = TONES[tone];
  const style = {
    '--badge-soft': soft,
    '--badge-strong': strong,
  } as CSSProperties;

  return (
    <span className={[styles.badge, solid && styles.solid].filter(Boolean).join(' ')} style={style}>
      {children}
    </span>
  );
}

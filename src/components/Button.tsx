import type { ReactNode } from 'react';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'sun' | 'ghost' | 'light';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  full?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  full,
  onClick,
  type = 'button',
  ...rest
}: ButtonProps) {
  const className = [styles.btn, styles[size], styles[variant], full && styles.full]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={className} onClick={onClick} type={type} {...rest}>
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function GradientButton({ children, className, variant = 'primary', size = 'md', ...props }: Props) {
  const sizes = { sm: 'h-9 px-4 text-sm', md: 'h-11 px-5 text-sm', lg: 'h-12 px-6 text-base' };
  const base = 'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all relative overflow-hidden disabled:opacity-50 disabled:pointer-events-none';
  if (variant === 'outline') {
    return <button className={cn(base, sizes[size], 'neon-border bg-card/40 hover:bg-card/60', className)} {...props}>{children}</button>;
  }
  if (variant === 'ghost') {
    return <button className={cn(base, sizes[size], 'hover:bg-muted/60', className)} {...props}>{children}</button>;
  }
  return (
    <button className={cn(base, sizes[size], 'gradient-neon text-white shadow-lg hover:shadow-xl hover:brightness-110 active:scale-[0.98]', className)} {...props}>
      {children}
    </button>
  );
}

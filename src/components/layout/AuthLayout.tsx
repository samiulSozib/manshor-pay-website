import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { motion } from 'framer-motion';
import { useI18n } from '@/i18n/I18nContext';

export function AuthLayout({ children, title, subtitle, footer }: { children: ReactNode; title: string; subtitle?: string; footer?: ReactNode }) {
  const { t } = useI18n();
  return (
    <div className="min-h-screen grid lg:grid-cols-2 relative overflow-hidden">
      <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full gradient-neon opacity-30 blur-3xl animate-float" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-accent opacity-20 blur-3xl animate-float" style={{ animationDelay: '3s' }} />

      {/* left visual */}
      <div className="hidden lg:flex relative p-10 flex-col justify-between">
        <Link to="/" className="flex items-center gap-2 relative">
          <div className="w-9 h-9 rounded-xl gradient-neon grid place-items-center font-bold text-white">T</div>
          <div className="font-bold tracking-tight">Manshor Pay</div>
        </Link>
        <div className="relative max-w-md">
          <h2 className="text-4xl font-bold leading-tight mb-4">{t('auth.leftTitle1')} <span className="text-gradient">{t('auth.leftTitle2')}</span> {t('auth.leftTitle3')}</h2>
          <p className="text-sm text-muted-foreground">{t('auth.leftSub')}</p>
        </div>
        <div className="text-xs text-muted-foreground relative">© 2026 Manshor Pay</div>
      </div>

      {/* right form */}
      <div className="relative flex items-center justify-center p-6 lg:p-10">
        <div className="absolute top-4 right-4 flex items-center gap-2"><LanguageSwitcher /><ThemeToggle /></div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md card-soft p-7 lg:p-8 relative">
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-6">
            <div className="w-9 h-9 rounded-xl gradient-neon grid place-items-center font-bold text-white">T</div>
            <div className="font-bold tracking-tight">Manshor Pay</div>
          </Link>
          <h1 className="text-2xl font-bold mb-1">{title}</h1>
          {subtitle && <p className="text-sm text-muted-foreground mb-6">{subtitle}</p>}
          {children}
          {footer && <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>}
        </motion.div>
      </div>
    </div>
  );
}

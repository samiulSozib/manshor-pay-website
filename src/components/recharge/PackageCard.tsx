import { RechargePackage } from '@/types';
import { taka } from '@/lib/format';
import { Wifi, Phone, MessageSquare, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { GradientButton } from '@/components/ui/gradient-button';
import { useI18n } from '@/i18n/I18nContext';

export function PackageCard({ pkg, onBuy }: { pkg: RechargePackage; onBuy?: (p: RechargePackage) => void }) {
  const { t } = useI18n();
  return (
    <motion.div whileHover={{ y: -4 }} className="card-soft p-5 relative overflow-hidden flex flex-col">
      {pkg.popular && (
        <div className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full gradient-neon text-white">
          <Sparkles className="h-3 w-3" /> {t('pkg.popular')}
        </div>
      )}
      <div className="text-xs text-muted-foreground uppercase tracking-wider">{t(`pkg.${pkg.category}`)}</div>
      <div className="mt-1 font-semibold">{pkg.title}</div>
      <div className="mt-3 space-y-1.5 text-xs text-muted-foreground flex-1">
        {pkg.data && <div className="flex items-center gap-2"><Wifi className="h-3.5 w-3.5 text-accent" /> {pkg.data}</div>}
        {pkg.minutes && <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-success" /> {pkg.minutes}</div>}
        {pkg.sms && <div className="flex items-center gap-2"><MessageSquare className="h-3.5 w-3.5 text-warning" /> {pkg.sms}</div>}
        <div className="text-[11px] opacity-75">{t('pkg.validity')} • {pkg.validity}</div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-gradient">{taka(pkg.price)}</div>
        <GradientButton size="sm" onClick={() => onBuy?.(pkg)}>{t('pkg.buy')}</GradientButton>
      </div>
    </motion.div>
  );
}

import { Eye, EyeOff, Plus, ArrowDownToLine, Send } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { taka } from '@/lib/format';
import { useApp } from '@/store/useApp';
import { GradientButton } from '@/components/ui/gradient-button';
import { Link } from 'react-router-dom';
import { useI18n } from '@/i18n/I18nContext';

export function WalletCard() {
  const balance = useApp(s => s.walletBalance);
  const user = useApp(s => s.user);
  const [hidden, setHidden] = useState(false);
  const { t } = useI18n();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-3xl p-6 lg:p-8 text-white"
      style={{ background: 'var(--gradient-neon)' }}
    >
      <div className="absolute -top-10 -right-10 w-56 h-56 rounded-full bg-white/10 blur-3xl animate-float" />
      <div className="absolute -bottom-16 -left-10 w-72 h-72 rounded-full bg-white/10 blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="relative flex items-start justify-between mb-6">
        <div>
          <div className="text-xs opacity-80">{t('wallet.balance')}</div>
          <div className="text-[11px] opacity-70">{user?.phone}</div>
        </div>
        <button onClick={() => setHidden(v => !v)} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
          {hidden ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>

      <div className="relative mb-8">
        <div className="text-4xl lg:text-5xl font-bold tracking-tight">
          {hidden ? '••••••' : taka(balance)}
        </div>
        <div className="text-xs opacity-80 mt-1">{t('wallet.available')}</div>
      </div>

      <div className="relative grid grid-cols-3 gap-2">
        <Link to="/wallet?action=add"><GradientButton variant="ghost" size="sm" className="w-full bg-white/10 hover:bg-white/20 text-white"><Plus className="h-4 w-4" /> {t('wallet.add')}</GradientButton></Link>
        <Link to="/wallet?action=send"><GradientButton variant="ghost" size="sm" className="w-full bg-white/10 hover:bg-white/20 text-white"><Send className="h-4 w-4" /> {t('wallet.send')}</GradientButton></Link>
        <Link to="/wallet?action=withdraw"><GradientButton variant="ghost" size="sm" className="w-full bg-white/10 hover:bg-white/20 text-white"><ArrowDownToLine className="h-4 w-4" /> {t('wallet.out')}</GradientButton></Link>
      </div>
    </motion.div>
  );
}

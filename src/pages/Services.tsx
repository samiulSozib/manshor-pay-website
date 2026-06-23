import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { digitalServices } from '@/data/mock';
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { GradientButton } from '@/components/ui/gradient-button';
import { taka } from '@/lib/format';
import { useApp } from '@/store/useApp';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { useI18n } from '@/i18n/I18nContext';

const cats = ['all', 'gaming', 'topup', 'gift', 'internet'] as const;

export default function Services() {
  const [cat, setCat] = useState<typeof cats[number]>('all');
  const [active, setActive] = useState<typeof digitalServices[number] | null>(null);
  const [amount, setAmount] = useState(0);
  const { buyService, walletBalance } = useApp();
  const { t } = useI18n();

  const catLabel = (c: string) => c === 'all' ? t('common.all') : t(`srv.${c}`);

  const filtered = digitalServices.filter(s => cat === 'all' || s.category === cat);

  const buy = () => {
    if (!active) return;
    if (amount < active.startingFrom) return toast.error(`${t('srv.min')} ${taka(active.startingFrom)}`);
    if (amount > walletBalance) return toast.error(t('pkg.errBal'));
    buyService(active.name, amount);
    toast.success(`${active.name} ${t('srv.purchased')}`);
    setActive(null);
  };

  return (
    <DashboardLayout title={t('srv.title')} subtitle={t('srv.subtitle')}>
      <Tabs value={cat} onValueChange={(v) => setCat(v as any)} className="mb-5">
        <TabsList className="bg-muted/50">
          {cats.map(c => <TabsTrigger key={c} value={c} className="capitalize">{catLabel(c)}</TabsTrigger>)}
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map(s => (
          <motion.button key={s.id} whileHover={{ y: -4 }} onClick={() => { setActive(s); setAmount(s.startingFrom); }}
            className="card-soft p-5 text-left relative overflow-hidden">
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full gradient-neon opacity-20 blur-2xl" />
            <div className="relative text-4xl mb-3">{s.icon}</div>
            <div className="font-semibold text-sm">{s.name}</div>
            <div className="text-[11px] text-muted-foreground capitalize">{catLabel(s.category)}</div>
            <div className="mt-3 text-xs text-gradient font-semibold">{t('srv.from')} {taka(s.startingFrom)}</div>
          </motion.button>
        ))}
      </div>

      <Dialog open={!!active} onOpenChange={() => setActive(null)}>
        <DialogContent className="glass-strong border-border max-w-sm">
          <DialogHeader><DialogTitle>{active?.name}</DialogTitle></DialogHeader>
          {active && (
            <div className="space-y-3 text-sm">
              <div className="text-3xl">{active.icon}</div>
              <div className="text-muted-foreground capitalize">{catLabel(active.category)}</div>
              <Input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} className="h-11" placeholder={t('rch.amount')} />
              <div className="flex gap-2">
                {[active.startingFrom, active.startingFrom * 2, active.startingFrom * 5].map(v => (
                  <button key={v} onClick={() => setAmount(v)} className={`flex-1 h-9 rounded-xl text-xs font-medium ${amount === v ? 'gradient-primary text-white' : 'glass'}`}>{taka(v)}</button>
                ))}
              </div>
              <GradientButton onClick={buy} className="w-full">{t('srv.pay')} {taka(amount)}</GradientButton>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}

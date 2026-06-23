import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { OperatorSelector } from '@/components/recharge/OperatorSelector';
import { PackageCard } from '@/components/recharge/PackageCard';
import { operators, packages } from '@/data/mock';
import { useMemo, useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { GradientButton } from '@/components/ui/gradient-button';
import { taka } from '@/lib/format';
import { useApp } from '@/store/useApp';
import { toast } from 'sonner';
import type { RechargePackage } from '@/types';
import { useI18n } from '@/i18n/I18nContext';

const cats = ['all', 'daily', 'weekly', 'monthly', 'unlimited'] as const;

export default function Packages() {
  const [opId, setOpId] = useState(operators[0].id);
  const [cat, setCat] = useState<typeof cats[number]>('all');
  const [q, setQ] = useState('');
  const [phone, setPhone] = useState('');
  const [selected, setSelected] = useState<RechargePackage | null>(null);
  const { buyPackage, walletBalance } = useApp();
  const { t } = useI18n();

  const op = operators.find(o => o.id === opId)!;
  const filtered = useMemo(() =>
    packages.filter(p => p.operatorId === opId)
      .filter(p => cat === 'all' || p.category === cat)
      .filter(p => p.title.toLowerCase().includes(q.toLowerCase())),
  [opId, cat, q]);

  const catLabel = (c: string) => c === 'all' ? t('common.all') : t(`pkg.${c}`);

  const finalize = () => {
    if (!selected) return;
    if (!phone || phone.length < 11) return toast.error(t('pkg.errPhone'));
    if (selected.price > walletBalance) return toast.error(t('pkg.errBal'));
    buyPackage(op.name, phone, selected.title, selected.price);
    toast.success(t('pkg.activated'));
    setSelected(null);
  };

  return (
    <DashboardLayout title={t('pkg.title')} subtitle={t('pkg.subtitle')}>
      <div className="space-y-4 lg:space-y-6">
        <div className="card-soft p-5">
          <div className="text-sm font-semibold mb-3">{t('rch.selectOp')}</div>
          <OperatorSelector operators={operators} value={opId} onChange={setOpId} />
        </div>

        <div className="card-soft p-4 flex flex-col md:flex-row md:items-center gap-3">
          <Tabs value={cat} onValueChange={(v) => setCat(v as any)} className="w-full md:w-auto">
            <TabsList className="bg-muted/50">
              {cats.map(c => <TabsTrigger key={c} value={c} className="capitalize">{catLabel(c)}</TabsTrigger>)}
            </TabsList>
          </Tabs>
          <div className="relative md:ms-auto md:w-72">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={e => setQ(e.target.value)} placeholder={t('pkg.searchPh')} className="pl-9 bg-muted/40 border-0" />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(p => <PackageCard key={p.id} pkg={p} onBuy={setSelected} />)}
          {filtered.length === 0 && <div className="col-span-full text-center text-sm text-muted-foreground py-12">{t('pkg.none')}</div>}
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="glass-strong border-border max-w-sm">
          <DialogHeader><DialogTitle>{t('pkg.buyTitle')}</DialogTitle></DialogHeader>
          {selected && (
            <div className="space-y-3 text-sm">
              <div className="text-muted-foreground">{op.name} • {catLabel(selected.category)}</div>
              <div className="font-semibold text-base">{selected.title}</div>
              <Input value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, ''))} placeholder="01XXXXXXXXX" className="h-11" />
              <div className="border-t border-border my-1" />
              <div className="flex justify-between"><span className="text-muted-foreground">{t('pkg.validity')}</span><span>{selected.validity}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">{t('pkg.price')}</span><span className="text-gradient font-bold text-lg">{taka(selected.price)}</span></div>
              <GradientButton onClick={finalize} className="w-full">{t('pkg.payActivate')}</GradientButton>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}

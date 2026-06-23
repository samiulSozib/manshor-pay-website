import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { OperatorSelector } from '@/components/recharge/OperatorSelector';
import { operators } from '@/data/mock';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GradientButton } from '@/components/ui/gradient-button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useApp } from '@/store/useApp';
import { taka } from '@/lib/format';
import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { TransactionRow } from '@/components/transactions/TransactionRow';
import { useI18n } from '@/i18n/I18nContext';

const presets = [50, 100, 200, 500, 1000];

export default function Recharge() {
  const [opId, setOpId] = useState(operators[0].id);
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState<number>(100);
  const [confirm, setConfirm] = useState(false);
  const [result, setResult] = useState<'success' | 'failed' | null>(null);
  const { recharge, transactions, walletBalance } = useApp();
  const { t } = useI18n();

  const op = operators.find(o => o.id === opId)!;
  const recent = transactions.filter(x => x.type === 'recharge').slice(0, 5);

  const submit = () => {
    if (!phone || phone.length < 11) return toast.error(t('rch.errPhone'));
    if (!amount || amount < 10) return toast.error(t('rch.errMin'));
    if (amount > walletBalance) return toast.error(t('rch.errBal'));
    setConfirm(true);
  };

  const finalize = () => {
    setConfirm(false);
    recharge(op.name, phone, amount);
    setResult('success');
  };

  return (
    <DashboardLayout title={t('rch.title')} subtitle={t('rch.subtitle')}>
      <div className="grid lg:grid-cols-3 gap-4 lg:gap-6">
        <div className="lg:col-span-2 card-soft p-5 lg:p-6">
          <div className="text-sm font-semibold mb-3">{t('rch.selectOp')}</div>
          <OperatorSelector operators={operators} value={opId} onChange={setOpId} />

          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>{t('rch.phone')}</Label>
              <Input value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, ''))} placeholder="01XXXXXXXXX" className="h-12 text-base" />
            </div>
            <div className="space-y-1.5">
              <Label>{t('rch.amount')}</Label>
              <Input type="number" value={amount || ''} onChange={e => setAmount(Number(e.target.value))} className="h-12 text-base" />
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {presets.map(p => (
              <button key={p} onClick={() => setAmount(p)} className={`px-3 h-9 rounded-xl text-sm font-medium transition ${amount === p ? 'gradient-primary text-white' : 'glass hover:bg-muted/40'}`}>{taka(p)}</button>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-3">
            <GradientButton size="lg" onClick={submit}>{t('rch.rechargeBtn')} {taka(amount || 0)}</GradientButton>
            <div className="text-xs text-muted-foreground">{t('rch.wallet')}: <span className="font-semibold text-foreground">{taka(walletBalance)}</span></div>
          </div>
        </div>

        <div className="card-soft p-5">
          <div className="text-sm font-semibold mb-3">{t('rch.recent')}</div>
          <div className="space-y-1">
            {recent.length === 0 && <div className="text-xs text-muted-foreground py-4 text-center">{t('rch.noRecent')}</div>}
            {recent.map(x => <TransactionRow key={x.id} txn={x} />)}
          </div>
        </div>
      </div>

      <Dialog open={confirm} onOpenChange={setConfirm}>
        <DialogContent className="glass-strong border-border max-w-sm">
          <DialogHeader><DialogTitle>{t('rch.confirm')}</DialogTitle></DialogHeader>
          <div className="space-y-3 text-sm">
            <Row k={t('rch.operator')} v={op.name} />
            <Row k={t('rch.number')} v={phone} />
            <Row k={t('rch.amount')} v={taka(amount)} />
            <Row k={t('rch.fee')} v={taka(0)} />
            <div className="border-t border-border my-2" />
            <Row k={t('rch.total')} v={<span className="text-gradient font-bold text-lg">{taka(amount)}</span>} />
          </div>
          <GradientButton onClick={finalize} className="w-full mt-2">{t('rch.confirmPay')}</GradientButton>
        </DialogContent>
      </Dialog>

      <Dialog open={!!result} onOpenChange={() => setResult(null)}>
        <DialogContent className="glass-strong border-border max-w-sm text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className={`w-16 h-16 rounded-full mx-auto grid place-items-center ${result === 'success' ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'}`}>
            {result === 'success' ? <Check className="h-8 w-8" /> : <X className="h-8 w-8" />}
          </motion.div>
          <div className="text-lg font-bold">{result === 'success' ? t('rch.success') : t('rch.failed')}</div>
          <div className="text-sm text-muted-foreground">{result === 'success' ? `${taka(amount)} ${t('rch.sentTo')} ${phone}` : t('rch.tryAgain')}</div>
          <GradientButton onClick={() => setResult(null)} className="w-full">{t('common.done')}</GradientButton>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return <div className="flex justify-between"><span className="text-muted-foreground">{k}</span><span className="font-medium">{v}</span></div>;
}

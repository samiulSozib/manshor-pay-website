import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { WalletCard } from '@/components/dashboard/WalletCard';
import { useApp } from '@/store/useApp';
import { TransactionRow } from '@/components/transactions/TransactionRow';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GradientButton } from '@/components/ui/gradient-button';
import { toast } from 'sonner';
import { taka } from '@/lib/format';
import { useI18n } from '@/i18n/I18nContext';

export default function Wallet() {
  const { transactions, addMoney, withdraw, sendMoney } = useApp();
  const [params] = useSearchParams();
  const [tab, setTab] = useState('add');
  const { t } = useI18n();
  useEffect(() => { const a = params.get('action'); if (a === 'add' || a === 'send' || a === 'withdraw') setTab(a); }, [params]);

  const walletTxns = transactions.filter(x => x.type.startsWith('wallet')).slice(0, 12);

  return (
    <DashboardLayout title={t('wal.title')} subtitle={t('wal.subtitle')}>
      <div className="grid lg:grid-cols-3 gap-4 lg:gap-6">
        <div className="space-y-4 lg:space-y-6">
          <WalletCard />
          <div className="card-soft p-5">
            <div className="text-sm font-semibold mb-3">{t('wal.thisMonth')}</div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { l: t('wal.in'), v: taka(6500), c: 'text-success' },
                { l: t('wal.out'), v: taka(4120), c: 'text-destructive' },
                { l: t('wal.recharges'), v: '24', c: '' },
                { l: t('wal.transfers'), v: '6', c: '' },
              ].map(s => (
                <div key={s.l} className="glass rounded-xl p-3">
                  <div className="text-[11px] text-muted-foreground">{s.l}</div>
                  <div className={`text-base font-semibold ${s.c}`}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4 lg:space-y-6">
          <div className="card-soft p-5">
            <Tabs value={tab} onValueChange={setTab}>
              <TabsList className="bg-muted/50">
                <TabsTrigger value="add">{t('wal.addTab')}</TabsTrigger>
                <TabsTrigger value="send">{t('wal.sendTab')}</TabsTrigger>
                <TabsTrigger value="withdraw">{t('wal.withdrawTab')}</TabsTrigger>
              </TabsList>
              <TabsContent value="add" className="mt-4"><AddForm onSubmit={addMoney} /></TabsContent>
              <TabsContent value="send" className="mt-4"><SendForm onSubmit={sendMoney} /></TabsContent>
              <TabsContent value="withdraw" className="mt-4"><WithdrawForm onSubmit={withdraw} /></TabsContent>
            </Tabs>
          </div>

          <div className="card-soft p-5">
            <div className="text-sm font-semibold mb-3">{t('wal.activity')}</div>
            <div className="space-y-1">
              {walletTxns.map(x => <TransactionRow key={x.id} txn={x} />)}
              {walletTxns.length === 0 && <div className="text-xs text-muted-foreground py-6 text-center">{t('wal.noActivity')}</div>}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function AddForm({ onSubmit }: { onSubmit: (a: number, src: string) => void }) {
  const { t } = useI18n();
  const [amount, setAmount] = useState(500);
  const [source, setSource] = useState('bKash');
  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-3">
        <div><Label>{t('rch.amount')}</Label><Input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} className="h-11 mt-1.5" /></div>
        <div><Label>{t('wal.source')}</Label>
          <select value={source} onChange={e => setSource(e.target.value)} className="mt-1.5 w-full h-11 rounded-md bg-input border border-border px-3 text-sm">
            {['bKash', 'Nagad', 'Rocket', 'Card', 'Bank Transfer'].map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
      </div>
      <GradientButton className="w-full" onClick={() => { onSubmit(amount, source); toast.success(`${taka(amount)} ${t('wal.added')}`); }}>{t('wal.addBtn')}</GradientButton>
    </div>
  );
}
function SendForm({ onSubmit }: { onSubmit: (a: number, to: string) => void }) {
  const { t } = useI18n();
  const [amount, setAmount] = useState(100);
  const [to, setTo] = useState('');
  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-3">
        <div><Label>{t('wal.recipient')}</Label><Input value={to} onChange={e => setTo(e.target.value)} placeholder="01XXXXXXXXX or @user" className="h-11 mt-1.5" /></div>
        <div><Label>{t('rch.amount')}</Label><Input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} className="h-11 mt-1.5" /></div>
      </div>
      <GradientButton className="w-full" onClick={() => { if (!to) return toast.error(t('wal.errRecipient')); onSubmit(amount, to); toast.success(`${taka(amount)} ${t('wal.sent')}`); }}>{t('wal.sendBtn')}</GradientButton>
    </div>
  );
}
function WithdrawForm({ onSubmit }: { onSubmit: (a: number, dest: string) => void }) {
  const { t } = useI18n();
  const [amount, setAmount] = useState(1000);
  const [dest, setDest] = useState('Bank — DBBL ****4421');
  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-3">
        <div><Label>{t('rch.amount')}</Label><Input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} className="h-11 mt-1.5" /></div>
        <div><Label>{t('wal.destination')}</Label><Input value={dest} onChange={e => setDest(e.target.value)} className="h-11 mt-1.5" /></div>
      </div>
      <GradientButton className="w-full" onClick={() => { onSubmit(amount, dest); toast.success(`${taka(amount)} ${t('wal.withdrawn')}`); }}>{t('wal.withdrawBtn')}</GradientButton>
    </div>
  );
}

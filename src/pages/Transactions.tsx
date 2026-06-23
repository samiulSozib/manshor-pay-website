import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useApp } from '@/store/useApp';
import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search, Download } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { GradientButton } from '@/components/ui/gradient-button';
import { signedTaka, fmtDateTime } from '@/lib/format';
import type { Transaction, TxnStatus } from '@/types';
import { toast } from 'sonner';
import { useI18n } from '@/i18n/I18nContext';

const statuses: ('all' | TxnStatus)[] = ['all', 'success', 'pending', 'failed'];

export default function Transactions() {
  const { transactions } = useApp();
  const [q, setQ] = useState('');
  const [status, setStatus] = useState<typeof statuses[number]>('all');
  const [page, setPage] = useState(1);
  const [active, setActive] = useState<Transaction | null>(null);
  const perPage = 8;
  const { t } = useI18n();

  const filtered = useMemo(() =>
    transactions
      .filter(x => status === 'all' || x.status === status)
      .filter(x => x.title.toLowerCase().includes(q.toLowerCase()) || (x.meta?.toLowerCase().includes(q.toLowerCase()) ?? false)),
  [transactions, status, q]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  const statusBadge = (s: TxnStatus) => ({
    success: 'bg-success/15 text-success', pending: 'bg-warning/15 text-warning', failed: 'bg-destructive/15 text-destructive',
  }[s]);

  const sLabel = (s: string) => s === 'all' ? t('common.all') : t(`txn.${s}`);

  return (
    <DashboardLayout title={t('txn.title')} subtitle={t('txn.subtitle')}>
      <div className="card-soft p-4 lg:p-5 mb-4 flex flex-col md:flex-row md:items-center gap-3">
        <Tabs value={status} onValueChange={(v) => { setStatus(v as any); setPage(1); }}>
          <TabsList className="bg-muted/50">
            {statuses.map(s => <TabsTrigger key={s} value={s} className="capitalize">{sLabel(s)}</TabsTrigger>)}
          </TabsList>
        </Tabs>
        <div className="relative md:ms-auto md:w-80">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={e => { setQ(e.target.value); setPage(1); }} placeholder={t('txn.searchPh')} className="pl-9 bg-muted/40 border-0" />
        </div>
        <GradientButton size="sm" variant="outline" onClick={() => toast.success(t('txn.exported'))}><Download className="h-4 w-4" /> {t('common.export')}</GradientButton>
      </div>

      <div className="card-soft hidden md:block overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="text-left font-medium p-4">{t('txn.id')}</th>
              <th className="text-left font-medium p-4">{t('txn.desc')}</th>
              <th className="text-left font-medium p-4">{t('txn.date')}</th>
              <th className="text-left font-medium p-4">{t('txn.status')}</th>
              <th className="text-right font-medium p-4">{t('txn.amount')}</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map(x => (
              <tr key={x.id} onClick={() => setActive(x)} className="border-t border-border cursor-pointer hover:bg-muted/30">
                <td className="p-4 text-xs text-muted-foreground">#{x.id}</td>
                <td className="p-4"><div className="font-medium">{x.title}</div><div className="text-xs text-muted-foreground">{x.meta}</div></td>
                <td className="p-4 text-xs text-muted-foreground">{fmtDateTime(x.date)}</td>
                <td className="p-4"><span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold uppercase ${statusBadge(x.status)}`}>{sLabel(x.status)}</span></td>
                <td className={`p-4 text-right font-semibold ${x.amount < 0 ? '' : 'text-success'}`}>{signedTaka(x.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-2">
        {pageItems.map(x => (
          <button key={x.id} onClick={() => setActive(x)} className="w-full text-left card-soft p-4 flex justify-between items-start">
            <div className="min-w-0">
              <div className="text-sm font-medium truncate">{x.title}</div>
              <div className="text-[11px] text-muted-foreground truncate">{x.meta ?? fmtDateTime(x.date)}</div>
              <span className={`mt-1 inline-block text-[10px] px-1.5 py-0.5 rounded-md font-semibold ${statusBadge(x.status)}`}>{sLabel(x.status)}</span>
            </div>
            <div className={`text-sm font-semibold ${x.amount < 0 ? '' : 'text-success'}`}>{signedTaka(x.amount)}</div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && <div className="text-center text-sm text-muted-foreground py-12">{t('txn.none')}</div>}

      <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
        <div>{t('common.showing')} {(page - 1) * perPage + 1}-{Math.min(page * perPage, filtered.length)} {t('common.of')} {filtered.length}</div>
        <div className="flex gap-1">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 h-8 rounded-lg glass disabled:opacity-40">{t('common.prev')}</button>
          <div className="px-3 h-8 grid place-items-center font-semibold text-foreground">{page} / {totalPages}</div>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 h-8 rounded-lg glass disabled:opacity-40">{t('common.next')}</button>
        </div>
      </div>

      <Dialog open={!!active} onOpenChange={() => setActive(null)}>
        <DialogContent className="glass-strong border-border max-w-sm">
          <DialogHeader><DialogTitle>{t('txn.details')}</DialogTitle></DialogHeader>
          {active && (
            <div className="space-y-2 text-sm">
              <Row k={t('txn.id')} v={`#${active.id}`} />
              <Row k={t('txn.type')} v={active.type} />
              <Row k={t('txn.desc')} v={active.title} />
              {active.meta && <Row k={t('txn.ref')} v={active.meta} />}
              <Row k={t('txn.date')} v={fmtDateTime(active.date)} />
              <Row k={t('txn.status')} v={<span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold uppercase ${statusBadge(active.status)}`}>{sLabel(active.status)}</span>} />
              <div className="border-t border-border my-2" />
              <Row k={t('txn.amount')} v={<span className={`font-bold text-lg ${active.amount < 0 ? '' : 'text-success'}`}>{signedTaka(active.amount)}</span>} />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return <div className="flex justify-between"><span className="text-muted-foreground capitalize">{k}</span><span className="font-medium">{v}</span></div>;
}

import { Transaction, TxnStatus } from '@/types';
import { signedTaka, fmtDateTime } from '@/lib/format';
import { Smartphone, Wallet, Wifi, Send, ArrowDownToLine, Gamepad2, Plus } from 'lucide-react';
import { useI18n } from '@/i18n/I18nContext';

const iconMap = {
  recharge: Smartphone, package: Wifi, 'wallet-add': Plus, 'wallet-send': Send,
  'wallet-withdraw': ArrowDownToLine, service: Gamepad2,
} as const;

const statusStyle: Record<TxnStatus, string> = {
  success: 'bg-success/15 text-success', pending: 'bg-warning/15 text-warning', failed: 'bg-destructive/15 text-destructive',
};

export function TransactionRow({ txn, onClick }: { txn: Transaction; onClick?: () => void }) {
  const { t } = useI18n();
  const Icon = iconMap[txn.type] ?? Wallet;
  return (
    <button onClick={onClick} className="w-full text-left flex items-center gap-3 p-3 rounded-xl hover:bg-muted/40 transition">
      <div className="w-10 h-10 rounded-xl bg-muted/60 grid place-items-center shrink-0"><Icon className="h-4 w-4" /></div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium truncate">{txn.title}</div>
        <div className="text-[11px] text-muted-foreground truncate">{txn.meta ?? fmtDateTime(txn.date)}</div>
      </div>
      <div className="text-right shrink-0">
        <div className={`text-sm font-semibold ${txn.amount < 0 ? 'text-foreground' : 'text-success'}`}>{signedTaka(txn.amount)}</div>
        <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-medium ${statusStyle[txn.status]}`}>{t(`txn.${txn.status}`)}</span>
      </div>
    </button>
  );
}

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useApp } from '@/store/useApp';
import { fmtDateTime } from '@/lib/format';
import { Bell, Check, Megaphone, Smartphone, Wallet } from 'lucide-react';
import { GradientButton } from '@/components/ui/gradient-button';
import { useI18n } from '@/i18n/I18nContext';

const iconMap = { recharge: Smartphone, wallet: Wallet, system: Bell, promo: Megaphone };

export default function Notifications() {
  const { notifications, markAllNotificationsRead } = useApp();
  const { t } = useI18n();
  return (
    <DashboardLayout title={t('ntf.title')} subtitle={t('ntf.subtitle')}>
      <div className="card-soft">
        <div className="p-4 flex items-center justify-between border-b border-border">
          <div className="text-sm font-semibold">{t('ntf.all')}</div>
          <GradientButton size="sm" variant="ghost" onClick={markAllNotificationsRead}><Check className="h-4 w-4" /> {t('ntf.markAll')}</GradientButton>
        </div>
        <div className="divide-y divide-border">
          {notifications.length === 0 && <div className="p-8 text-center text-sm text-muted-foreground">{t('ntf.empty')}</div>}
          {notifications.map(n => {
            const Icon = iconMap[n.type] ?? Bell;
            return (
              <div key={n.id} className={`p-4 flex items-start gap-3 ${!n.read ? 'bg-primary/5' : ''}`}>
                <div className="w-10 h-10 rounded-xl gradient-primary text-white grid place-items-center shrink-0"><Icon className="h-4 w-4" /></div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{n.title}</div>
                  <div className="text-xs text-muted-foreground">{n.body}</div>
                  <div className="text-[11px] text-muted-foreground mt-1">{fmtDateTime(n.date)}</div>
                </div>
                {!n.read && <span className="h-2 w-2 rounded-full bg-primary mt-1.5" />}
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}

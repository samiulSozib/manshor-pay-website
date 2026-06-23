import { Bell, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useApp } from '@/store/useApp';
import { fmtDateTime } from '@/lib/format';
import { useI18n } from '@/i18n/I18nContext';

export function NotificationBell() {
  const { notifications, markAllNotificationsRead } = useApp();
  const { t } = useI18n();
  const unread = notifications.filter(n => !n.read).length;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unread > 0 && <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive ring-2 ring-card" />}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0 glass-strong border-border rounded-2xl">
        <div className="p-3 flex items-center justify-between border-b border-border">
          <div className="font-semibold text-sm">{t('ntf.title')}</div>
          <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={markAllNotificationsRead}><Check className="h-3 w-3 me-1" /> {t('ntf.markRead')}</Button>
        </div>
        <div className="max-h-80 overflow-y-auto scrollbar-thin">
          {notifications.length === 0 && <div className="p-6 text-center text-xs text-muted-foreground">{t('ntf.none')}</div>}
          {notifications.map(n => (
            <div key={n.id} className={`p-3 border-b border-border/50 hover:bg-muted/30 transition-colors ${!n.read ? 'bg-primary/5' : ''}`}>
              <div className="flex items-start gap-2">
                <div className={`mt-0.5 h-2 w-2 rounded-full shrink-0 ${!n.read ? 'bg-primary' : 'bg-muted'}`} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{n.title}</div>
                  <div className="text-xs text-muted-foreground">{n.body}</div>
                  <div className="text-[10px] text-muted-foreground mt-1">{fmtDateTime(n.date)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

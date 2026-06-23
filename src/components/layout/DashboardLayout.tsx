import { ReactNode, useState } from 'react';
import { Sidebar, BottomNav, MobileSidebarTrigger } from './Sidebar';
import { NotificationBell } from '@/components/dashboard/NotificationBell';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useApp } from '@/store/useApp';
import { useI18n } from '@/i18n/I18nContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Navigate } from 'react-router-dom';

export function DashboardLayout({ children, title, subtitle }: { children: ReactNode; title?: string; subtitle?: string }) {
  const [open, setOpen] = useState(false);
  const { user, isAuthed } = useApp();
  const { t } = useI18n();

  if (!isAuthed) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen flex">
      <Sidebar open={open} onClose={() => setOpen(false)} />

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-30 px-3 lg:px-6 pt-3 lg:pt-6">
          <div className="glass-strong rounded-2xl px-3 lg:px-5 py-3 flex items-center gap-3">
            <MobileSidebarTrigger onOpen={() => setOpen(true)} />
            <div className="hidden md:block min-w-0">
              {title && <h1 className="text-lg font-semibold truncate">{title}</h1>}
              {subtitle && <p className="text-xs text-muted-foreground truncate">{subtitle}</p>}
            </div>
            <div className="flex-1 max-w-md mx-auto hidden md:block">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder={t('search.placeholder')} className="pl-9 bg-muted/50 border-0 rounded-xl" />
              </div>
            </div>
            <div className="ms-auto flex items-center gap-1">
              <LanguageSwitcher />
              <ThemeToggle />
              <NotificationBell />
              <Avatar className="h-9 w-9 ring-2 ring-border">
                <AvatarFallback className="gradient-primary text-white text-xs">{user?.name?.[0] ?? 'T'}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <main className="flex-1 px-3 lg:px-6 py-4 lg:py-6 pb-28 lg:pb-6">
          {(title || subtitle) && (
            <div className="md:hidden mb-4">
              {title && <h1 className="text-2xl font-bold">{title}</h1>}
              {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
            </div>
          )}
          {children}
        </main>
      </div>

      <BottomNav />
    </div>
  );
}

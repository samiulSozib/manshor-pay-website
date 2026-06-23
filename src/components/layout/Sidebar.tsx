import { Link, NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Smartphone, Wifi, Gamepad2, Wallet, Receipt, User, Bell, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '@/store/useApp';
import { useI18n } from '@/i18n/I18nContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export const navItems = [
  { to: '/dashboard', labelKey: 'side.dashboard', icon: LayoutDashboard },
  { to: '/recharge', labelKey: 'side.recharge', icon: Smartphone },
  { to: '/packages', labelKey: 'side.packages', icon: Wifi },
  { to: '/services', labelKey: 'side.services', icon: Gamepad2 },
  { to: '/wallet', labelKey: 'side.wallet', icon: Wallet },
  { to: '/transactions', labelKey: 'side.transactions', icon: Receipt },
  { to: '/profile', labelKey: 'side.profile', icon: User },
];

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { user, logout } = useApp();
  const { pathname } = useLocation();
  const { t } = useI18n();

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <aside className={`fixed lg:sticky top-0 z-50 h-screen w-72 shrink-0 transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="h-full m-3 lg:m-4 glass-strong rounded-3xl flex flex-col p-5">
          <div className="flex items-center justify-between mb-8">
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl gradient-neon grid place-items-center font-bold text-white shadow-lg">T</div>
              <div>
                <div className="font-bold tracking-tight">Manshor Pay</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest">{t('side.fintech')}</div>
              </div>
            </Link>
            <button className="lg:hidden p-2 rounded-lg hover:bg-muted" onClick={onClose}><X className="h-4 w-4" /></button>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto scrollbar-thin">
            {navItems.map(item => {
              const active = pathname === item.to;
              return (
                <NavLink key={item.to} to={item.to} onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all relative ${active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>
                  {active && (
                    <motion.span layoutId="active-pill" className="absolute inset-0 rounded-xl gradient-primary opacity-90 -z-10" transition={{ type: 'spring', bounce: 0.2 }} />
                  )}
                  <item.icon className={`h-4 w-4 ${active ? 'text-white' : ''}`} />
                  <span className={active ? 'text-white' : ''}>{t(item.labelKey)}</span>
                </NavLink>
              );
            })}
          </nav>

          <div className="mt-4 p-3 rounded-2xl glass flex items-center gap-3">
            <Avatar className="h-9 w-9"><AvatarFallback className="gradient-primary text-white text-xs">{user?.name?.[0] ?? 'T'}</AvatarFallback></Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold truncate">{user?.name}</div>
              <div className="text-[11px] text-muted-foreground truncate">{user?.email}</div>
            </div>
            <Button size="icon" variant="ghost" onClick={logout}><LogOut className="h-4 w-4" /></Button>
          </div>
        </div>
      </aside>
    </>
  );
}

export function MobileSidebarTrigger({ onOpen }: { onOpen: () => void }) {
  return (
    <button onClick={onOpen} className="lg:hidden p-2 rounded-lg hover:bg-muted"><Menu className="h-5 w-5" /></button>
  );
}

export function BottomNav() {
  const { pathname } = useLocation();
  const { t } = useI18n();
  const items = [navItems[0], navItems[1], navItems[2], navItems[4], navItems[6]];
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 px-3 pb-3">
      <div className="glass-strong rounded-2xl px-2 py-2 flex items-center justify-between">
        {items.map(item => {
          const active = pathname === item.to;
          return (
            <NavLink key={item.to} to={item.to} className="flex-1 flex flex-col items-center gap-0.5 py-1.5 rounded-xl text-[10px] font-medium relative">
              <div className={`p-2 rounded-xl ${active ? 'gradient-primary text-white shadow-lg' : 'text-muted-foreground'}`}>
                <item.icon className="h-4 w-4" />
              </div>
              <span className={active ? 'text-foreground' : 'text-muted-foreground'}>{t(item.labelKey)}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

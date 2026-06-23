import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { WalletCard } from '@/components/dashboard/WalletCard';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { TransactionRow } from '@/components/transactions/TransactionRow';
import { OperatorSelector } from '@/components/recharge/OperatorSelector';
import { useApp } from '@/store/useApp';
import { Smartphone, Wifi, Gamepad2, Receipt, ArrowRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip, BarChart, Bar } from 'recharts';
import { monthlyRecharge, weeklyActivity, operators } from '@/data/mock';
import { taka } from '@/lib/format';
import { useState } from 'react';
import { GradientButton } from '@/components/ui/gradient-button';
import { useI18n } from '@/i18n/I18nContext';

export default function Dashboard() {
  const { transactions, user } = useApp();
  const [selectedOp, setSelectedOp] = useState(operators[0].id);
  const { t } = useI18n();

  const quickActions = [
    { to: '/recharge', label: t('side.recharge'), icon: Smartphone, gradient: 'from-primary/30 to-accent/20' },
    { to: '/packages', label: t('side.packages'), icon: Wifi, gradient: 'from-accent/30 to-primary/20' },
    { to: '/services', label: t('side.services'), icon: Gamepad2, gradient: 'from-warning/30 to-destructive/20' },
    { to: '/transactions', label: t('dash.history'), icon: Receipt, gradient: 'from-success/30 to-accent/20' },
  ];

  return (
    <DashboardLayout title={`${t('dash.hi')}, ${user?.name?.split(' ')[0] ?? ''}`} subtitle={t('dash.welcome')}>
      <div className="grid lg:grid-cols-3 gap-4 lg:gap-6">
        <div className="lg:col-span-2 space-y-4 lg:space-y-6">
          <WalletCard />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            <StatsCard label={t('dash.month')} value={taka(2680)} delta={12} icon={TrendingUp} gradient="from-primary/30 to-accent/20" />
            <StatsCard label={t('dash.recharges')} value="48" delta={8} icon={Smartphone} gradient="from-accent/30 to-primary/20" />
            <StatsCard label={t('dash.packages')} value="12" delta={-3} icon={Wifi} gradient="from-warning/30 to-destructive/20" />
            <StatsCard label={t('dash.cashback')} value={taka(184)} delta={22} icon={Receipt} gradient="from-success/30 to-accent/20" />
          </div>

          <div className="card-soft p-5">
            <div className="flex items-center justify-between mb-4">
              <div><div className="text-sm font-semibold">{t('dash.monthlyTitle')}</div><div className="text-xs text-muted-foreground">{t('dash.monthlySub')}</div></div>
              <div className="text-xs px-2 py-1 rounded-md bg-success/15 text-success font-semibold">+18.4%</div>
            </div>
            <div className="h-48">
              <ResponsiveContainer>
                <AreaChart data={monthlyRecharge}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 12, fontSize: 12 }} />
                  <Area type="monotone" dataKey="amount" stroke="hsl(var(--primary))" strokeWidth={2.5} fill="url(#g1)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card-soft p-5">
            <div className="text-sm font-semibold mb-3">{t('dash.quickRecharge')}</div>
            <OperatorSelector operators={operators} value={selectedOp} onChange={setSelectedOp} />
            <Link to="/recharge" className="mt-4 inline-block"><GradientButton size="sm">{t('common.continue')} <ArrowRight className="h-4 w-4 rtl:rotate-180" /></GradientButton></Link>
          </div>
        </div>

        <div className="space-y-4 lg:space-y-6">
          <div className="card-soft p-5">
            <div className="text-sm font-semibold mb-3">{t('dash.quickActions')}</div>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map(a => (
                <Link key={a.to} to={a.to} className="card-soft p-4 hover:glow transition-all">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${a.gradient} grid place-items-center mb-2`}><a.icon className="h-4 w-4" /></div>
                  <div className="text-sm font-medium">{a.label}</div>
                </Link>
              ))}
            </div>
          </div>

          <div className="card-soft p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold">{t('dash.weekly')}</div>
              <div className="text-xs text-muted-foreground">{taka(3370)}</div>
            </div>
            <div className="h-32">
              <ResponsiveContainer>
                <BarChart data={weeklyActivity}>
                  <XAxis dataKey="day" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 12, fontSize: 12 }} cursor={{ fill: 'hsl(var(--muted) / 0.3)' }} />
                  <Bar dataKey="value" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card-soft p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-semibold">{t('dash.recent')}</div>
              <Link to="/transactions" className="text-xs text-primary hover:underline">{t('common.viewAll')}</Link>
            </div>
            <div className="space-y-1">
              {transactions.slice(0, 5).map(t => <TransactionRow key={t.id} txn={t} />)}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

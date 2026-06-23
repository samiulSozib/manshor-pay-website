import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useApp } from '@/store/useApp';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GradientButton } from '@/components/ui/gradient-button';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';
import { toast } from 'sonner';
import { Camera, ShieldCheck, Bell, Lock, Smartphone } from 'lucide-react';
import { useI18n } from '@/i18n/I18nContext';

export default function Profile() {
  const { user, updateProfile } = useApp();
  const { t } = useI18n();
  const [form, setForm] = useState({ name: user?.name ?? '', email: user?.email ?? '', phone: user?.phone ?? '' });
  const [pw, setPw] = useState({ current: '', next: '', confirm: '' });

  const save = () => { updateProfile(form); toast.success(t('pro.saved')); };
  const changePw = () => {
    if (!pw.current || pw.next !== pw.confirm) return toast.error(t('pro.pwMismatch'));
    setPw({ current: '', next: '', confirm: '' }); toast.success(t('pro.pwChanged'));
  };

  const prefs = [
    { l: t('pro.push'), d: t('pro.pushDesc') },
    { l: t('pro.emailR'), d: t('pro.emailRDesc') },
    { l: t('pro.promo'), d: t('pro.promoDesc') },
    { l: t('pro.tfa'), d: t('pro.tfaDesc'), icon: Smartphone },
  ];

  return (
    <DashboardLayout title={t('pro.title')} subtitle={t('pro.subtitle')}>
      <div className="grid lg:grid-cols-3 gap-4 lg:gap-6">
        <div className="card-soft p-6 text-center">
          <div className="relative w-24 h-24 mx-auto">
            <Avatar className="w-24 h-24"><AvatarFallback className="gradient-neon text-white text-2xl font-bold">{user?.name?.[0]}</AvatarFallback></Avatar>
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full gradient-primary text-white grid place-items-center shadow-lg"><Camera className="h-4 w-4" /></button>
          </div>
          <div className="mt-4 font-semibold">{user?.name}</div>
          <div className="text-xs text-muted-foreground">{user?.email}</div>
          <div className="mt-3 inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-success/15 text-success font-semibold">
            <ShieldCheck className="h-3 w-3" /> {t('pro.kyc')} {user?.kyc}
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2 text-xs">
            <div className="glass rounded-xl p-2"><div className="font-bold">48</div><div className="text-muted-foreground">{t('dash.recharges')}</div></div>
            <div className="glass rounded-xl p-2"><div className="font-bold">12</div><div className="text-muted-foreground">{t('dash.packages')}</div></div>
            <div className="glass rounded-xl p-2"><div className="font-bold">184</div><div className="text-muted-foreground">{t('dash.cashback')}</div></div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4 lg:space-y-6">
          <div className="card-soft p-5">
            <div className="text-sm font-semibold mb-4">{t('pro.personal')}</div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div><Label>{t('pro.fullName')}</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="h-11 mt-1.5" /></div>
              <div><Label>{t('pro.email')}</Label><Input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="h-11 mt-1.5" /></div>
              <div className="sm:col-span-2"><Label>{t('pro.phone')}</Label><Input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="h-11 mt-1.5" /></div>
            </div>
            <GradientButton className="mt-4" onClick={save}>{t('common.save')}</GradientButton>
          </div>

          <div className="card-soft p-5">
            <div className="text-sm font-semibold mb-4 flex items-center gap-2"><Lock className="h-4 w-4" /> {t('pro.changePw')}</div>
            <div className="grid sm:grid-cols-3 gap-3">
              <div><Label>{t('pro.current')}</Label><Input type="password" value={pw.current} onChange={e => setPw({ ...pw, current: e.target.value })} className="h-11 mt-1.5" /></div>
              <div><Label>{t('pro.new')}</Label><Input type="password" value={pw.next} onChange={e => setPw({ ...pw, next: e.target.value })} className="h-11 mt-1.5" /></div>
              <div><Label>{t('pro.confirm')}</Label><Input type="password" value={pw.confirm} onChange={e => setPw({ ...pw, confirm: e.target.value })} className="h-11 mt-1.5" /></div>
            </div>
            <GradientButton className="mt-4" onClick={changePw}>{t('pro.updatePw')}</GradientButton>
          </div>

          <div className="card-soft p-5">
            <div className="text-sm font-semibold mb-4 flex items-center gap-2"><Bell className="h-4 w-4" /> {t('pro.prefs')}</div>
            <div className="space-y-3">
              {prefs.map((p, i) => (
                <div key={i} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-muted/30">
                  <div><div className="text-sm font-medium">{p.l}</div><div className="text-xs text-muted-foreground">{p.d}</div></div>
                  <Switch defaultChecked={i < 2} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

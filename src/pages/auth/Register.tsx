import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GradientButton } from '@/components/ui/gradient-button';
import { useApp } from '@/store/useApp';
import { toast } from 'sonner';
import { useI18n } from '@/i18n/I18nContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useApp();
  const { t } = useI18n();
  const nav = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !password) return toast.error(t('auth.errAll'));
    register(name, email, phone);
    toast.success(t('auth.regSuccess'));
    nav('/verify-otp');
  };

  return (
    <AuthLayout title={t('auth.regTitle')} subtitle={t('auth.regSub')}
      footer={<>{t('auth.hasAcct')} <Link to="/login" className="text-primary font-medium hover:underline">{t('cta.signin')}</Link></>}>
      <form onSubmit={submit} className="space-y-4">
        <div className="space-y-1.5"><Label>{t('auth.fullName')}</Label><Input value={name} onChange={e => setName(e.target.value)} className="h-11" /></div>
        <div className="space-y-1.5"><Label>{t('auth.email')}</Label><Input type="email" value={email} onChange={e => setEmail(e.target.value)} className="h-11" /></div>
        <div className="space-y-1.5"><Label>{t('auth.phone')}</Label><Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+8801..." className="h-11" /></div>
        <div className="space-y-1.5"><Label>{t('auth.password')}</Label><Input type="password" value={password} onChange={e => setPassword(e.target.value)} className="h-11" /></div>
        <p className="text-[11px] text-muted-foreground">{t('auth.terms')}</p>
        <GradientButton type="submit" className="w-full">{t('auth.create')}</GradientButton>
      </form>
    </AuthLayout>
  );
}

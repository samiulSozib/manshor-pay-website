import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GradientButton } from '@/components/ui/gradient-button';
import { toast } from 'sonner';
import { useI18n } from '@/i18n/I18nContext';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const { t } = useI18n();
  const submit = (e: React.FormEvent) => { e.preventDefault(); if (!email) return toast.error(t('auth.errEmail')); setSent(true); };
  return (
    <AuthLayout title={t('auth.fpTitle')} subtitle={t('auth.fpSub')}
      footer={<><Link to="/login" className="text-primary font-medium hover:underline">{t('auth.backSignin')}</Link></>}>
      {sent ? (
        <div className="text-sm text-muted-foreground">{t('auth.fpSent')} <span className="text-foreground font-medium">{email}</span></div>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-1.5"><Label>{t('auth.email')}</Label><Input type="email" value={email} onChange={e => setEmail(e.target.value)} className="h-11" /></div>
          <GradientButton type="submit" className="w-full">{t('auth.sendLink')}</GradientButton>
        </form>
      )}
    </AuthLayout>
  );
}

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { GradientButton } from '@/components/ui/gradient-button';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useApp } from '@/store/useApp';
import { toast } from 'sonner';
import { useI18n } from '@/i18n/I18nContext';

export default function Login() {
  const [email, setEmail] = useState('arman@teknurpay.com');
  const [password, setPassword] = useState('demo1234');
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const { login } = useApp();
  const { t } = useI18n();
  const nav = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return toast.error(t('auth.errCred'));
    login(email);
    toast.success(t('auth.welcomeBack'));
    nav('/dashboard');
  };

  return (
    <AuthLayout title={t('auth.welcome')} subtitle={t('auth.signinSub')}
      footer={<>{t('auth.noAcct')} <Link to="/register" className="text-primary font-medium hover:underline">{t('auth.createOne')}</Link></>}>
      <form onSubmit={submit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">{t('auth.email')}</Label>
          <div className="relative">
            <Mail className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="pl-9 h-11" />
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between"><Label htmlFor="password">{t('auth.password')}</Label>
            <Link to="/forgot-password" className="text-xs text-primary hover:underline">{t('auth.forgot')}</Link>
          </div>
          <div className="relative">
            <Lock className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input id="password" type={show ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} className="pl-9 pr-9 h-11" />
            <button type="button" onClick={() => setShow(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
          <Checkbox checked={remember} onCheckedChange={v => setRemember(!!v)} /> {t('auth.remember')}
        </label>
        <GradientButton type="submit" className="w-full">{t('auth.signIn')}</GradientButton>
        <div className="relative my-3"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
          <div className="relative flex justify-center"><span className="px-3 bg-card text-[10px] uppercase tracking-widest text-muted-foreground">{t('auth.or')}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button type="button" className="h-11 rounded-xl glass hover:bg-muted/40 text-sm font-medium">Google</button>
          <button type="button" className="h-11 rounded-xl glass hover:bg-muted/40 text-sm font-medium">Apple</button>
        </div>
      </form>
    </AuthLayout>
  );
}

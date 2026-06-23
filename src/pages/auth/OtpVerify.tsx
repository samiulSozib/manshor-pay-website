import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { GradientButton } from '@/components/ui/gradient-button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { toast } from 'sonner';
import { useI18n } from '@/i18n/I18nContext';

export default function OtpVerify() {
  const [code, setCode] = useState('');
  const nav = useNavigate();
  const { t } = useI18n();
  const submit = () => { if (code.length < 6) return toast.error(t('auth.errOtp')); toast.success(t('auth.phoneVerified')); nav('/dashboard'); };
  return (
    <AuthLayout title={t('auth.otpTitle')} subtitle={t('auth.otpSub')}>
      <div className="flex justify-center mb-6">
        <InputOTP maxLength={6} value={code} onChange={setCode}>
          <InputOTPGroup>
            {[0, 1, 2, 3, 4, 5].map(i => <InputOTPSlot key={i} index={i} className="h-12 w-11 text-lg" />)}
          </InputOTPGroup>
        </InputOTP>
      </div>
      <GradientButton onClick={submit} className="w-full">{t('auth.verify')}</GradientButton>
      <button className="mt-4 text-xs text-muted-foreground w-full hover:underline">{t('auth.resend')}</button>
    </AuthLayout>
  );
}

import { Link } from 'react-router-dom';
import { GradientButton } from '@/components/ui/gradient-button';
import { useI18n } from '@/i18n/I18nContext';

export default function NotFound() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen grid place-items-center px-6 text-center">
      <div>
        <div className="text-6xl font-bold text-gradient mb-4">404</div>
        <h1 className="text-2xl font-semibold mb-2">{t('nf.title')}</h1>
        <p className="text-sm text-muted-foreground mb-6 max-w-sm">{t('nf.desc')}</p>
        <Link to="/"><GradientButton>{t('common.back')}</GradientButton></Link>
      </div>
    </div>
  );
}

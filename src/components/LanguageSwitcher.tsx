import { Globe } from 'lucide-react';
import { languages, useI18n, Lang } from '@/i18n/I18nContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export function LanguageSwitcher({ variant = 'ghost' }: { variant?: 'ghost' | 'outline' }) {
  const { lang, setLang, t } = useI18n();
  const current = languages.find(l => l.code === lang)!;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size="sm" className="gap-1.5 px-2.5 rounded-xl">
          <Globe className="h-4 w-4" />
          <span className="text-xs font-semibold uppercase">{current.code}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuLabel className="text-xs">{t('lang.label')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {languages.map(l => (
          <DropdownMenuItem
            key={l.code}
            onClick={() => setLang(l.code as Lang)}
            className={`gap-2 cursor-pointer ${l.code === lang ? 'bg-muted font-semibold' : ''}`}
          >
            <span className="text-base leading-none">{l.flag}</span>
            <span className="flex-1">{l.native}</span>
            <span className="text-[10px] uppercase text-muted-foreground">{l.code}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

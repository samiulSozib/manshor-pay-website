import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/store/useApp';
import { useEffect } from 'react';

export function ThemeToggle() {
  const { theme, toggleTheme } = useApp();
  useEffect(() => { document.documentElement.classList.toggle('light', theme === 'light'); }, [theme]);
  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
      {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}

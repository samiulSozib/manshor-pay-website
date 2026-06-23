import { LucideIcon, TrendingDown, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Props { label: string; value: string; delta?: number; icon: LucideIcon; gradient?: string; }

export function StatsCard({ label, value, delta, icon: Icon, gradient = 'from-primary/20 to-accent/10' }: Props) {
  return (
    <motion.div whileHover={{ y: -3 }} className="card-soft p-5 relative overflow-hidden">
      <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${gradient} blur-2xl`} />
      <div className="relative flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} grid place-items-center`}>
          <Icon className="h-4 w-4" />
        </div>
        {typeof delta === 'number' && (
          <div className={`flex items-center gap-1 text-[11px] font-semibold ${delta >= 0 ? 'text-success' : 'text-destructive'}`}>
            {delta >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {Math.abs(delta)}%
          </div>
        )}
      </div>
      <div className="relative">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="text-2xl font-bold tracking-tight"><Counter target={value} /></div>
      </div>
    </motion.div>
  );
}

function Counter({ target }: { target: string }) {
  const num = parseFloat(target.replace(/[^0-9.-]/g, ''));
  const prefix = target.match(/^[^\d-]*/)?.[0] ?? '';
  const suffix = target.match(/[^\d.,]*$/)?.[0] ?? '';
  const [v, setV] = useState(0);
  useEffect(() => {
    if (isNaN(num)) return;
    const start = performance.now(); const dur = 800;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setV(num * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [num]);
  if (isNaN(num)) return <>{target}</>;
  return <>{prefix}{Math.round(v).toLocaleString()}{suffix}</>;
}

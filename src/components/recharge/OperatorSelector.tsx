import { Operator } from '@/types';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface Props { operators: Operator[]; value?: string; onChange: (id: string) => void; }

export function OperatorSelector({ operators, value, onChange }: Props) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
      {operators.map(op => {
        const active = op.id === value;
        return (
          <motion.button
            key={op.id} onClick={() => onChange(op.id)} whileTap={{ scale: 0.96 }}
            className={`relative card-soft p-4 flex flex-col items-center gap-2 transition-all ${active ? 'ring-2 ring-primary' : 'hover:ring-1 hover:ring-border'}`}>
            {active && <span className="absolute top-2 right-2 h-5 w-5 rounded-full gradient-primary text-white grid place-items-center"><Check className="h-3 w-3" /></span>}
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${op.color} grid place-items-center text-white font-bold`}>{op.logo}</div>
            <div className="text-[11px] font-medium text-center">{op.name}</div>
          </motion.button>
        );
      })}
    </div>
  );
}

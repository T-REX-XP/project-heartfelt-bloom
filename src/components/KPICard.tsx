import { motion } from 'framer-motion';
import type { KPI } from '@/domain/types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

const statusColors: Record<string, string> = {
  green: 'text-logiq-emerald',
  yellow: 'text-logiq-amber',
  red: 'text-logiq-rose',
};

const statusGlows: Record<string, string> = {
  green: 'glow-emerald',
  yellow: 'glow-amber',
  red: 'glow-rose',
};

const KPICard = ({ kpi, index = 0 }: { kpi: KPI; index?: number }) => {
  const TrendIcon = kpi.trend > 0 ? TrendingUp : kpi.trend < 0 ? TrendingDown : Minus;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={cn("glass rounded-xl p-5 hover:scale-[1.02] transition-transform cursor-pointer", statusGlows[kpi.status])}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-sm font-medium text-muted-foreground">{kpi.name}</h3>
        <span className={cn("text-xs font-semibold uppercase px-2 py-0.5 rounded-full",
          kpi.status === 'green' ? 'bg-logiq-emerald/15 text-logiq-emerald' :
          kpi.status === 'yellow' ? 'bg-logiq-amber/15 text-logiq-amber' :
          'bg-logiq-rose/15 text-logiq-rose'
        )}>
          {kpi.status}
        </span>
      </div>

      <div className="flex items-end gap-3">
        <span className={cn("text-4xl font-bold", statusColors[kpi.status])}>
          {kpi.value}
        </span>
        <div className={cn("flex items-center gap-1 text-sm mb-1",
          kpi.trend > 0 ? 'text-logiq-emerald' : kpi.trend < 0 ? 'text-logiq-rose' : 'text-muted-foreground'
        )}>
          <TrendIcon className="w-4 h-4" />
          <span>{Math.abs(kpi.trend)}%</span>
        </div>
      </div>

      {kpi.subKPIs && (
        <div className="mt-4 space-y-2">
          {kpi.subKPIs.map(sub => (
            <div key={sub.id} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{sub.name}</span>
              <span className={cn("font-medium", statusColors[sub.status])}>
                {sub.value}{sub.unit ? sub.unit : ''}
              </span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default KPICard;

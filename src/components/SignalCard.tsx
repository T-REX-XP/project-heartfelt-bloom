import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Signal } from '@/domain/types';
import { AlertTriangle, AlertCircle, Info, CheckCircle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const severityConfig = {
  critical: { icon: AlertTriangle, color: 'text-logiq-rose', bg: 'bg-logiq-rose/10', border: 'border-logiq-rose/30' },
  warning: { icon: AlertCircle, color: 'text-logiq-amber', bg: 'bg-logiq-amber/10', border: 'border-logiq-amber/30' },
  info: { icon: Info, color: 'text-logiq-cyan', bg: 'bg-logiq-cyan/10', border: 'border-logiq-cyan/30' },
  positive: { icon: CheckCircle, color: 'text-logiq-emerald', bg: 'bg-logiq-emerald/10', border: 'border-logiq-emerald/30' },
};

function getActionUrl(signal: Signal): string | null {
  if (!signal.employeeId) return null;
  if (signal.actionLabel === 'Prepare 1:1') return `/lead/conversation-prep/${signal.employeeId}`;
  return `/lead/team/${signal.employeeId}`;
}

const SignalCard = ({ signal, index = 0 }: { signal: Signal; index?: number }) => {
  const config = severityConfig[signal.severity];
  const Icon = config.icon;
  const actionUrl = getActionUrl(signal);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 }}
      className={cn(
        "glass rounded-xl p-4 border-l-4 hover:bg-card/80 transition-colors cursor-pointer",
        config.border,
        !signal.isRead && 'ring-1 ring-primary/20'
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5", config.bg)}>
          <Icon className={cn("w-4 h-4", config.color)} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-sm font-semibold text-foreground">{signal.title}</h4>
            {!signal.isRead && <span className="w-2 h-2 rounded-full bg-primary signal-pulse" />}
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{signal.description}</p>
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-muted-foreground">{signal.timestamp}</span>
            {signal.actionLabel && actionUrl && (
              <Link to={actionUrl} className="flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                {signal.actionLabel} <ArrowRight className="w-3 h-3" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SignalCard;

import { motion } from 'framer-motion';
import { Clock, GitPullRequest, CheckSquare, CalendarDays } from 'lucide-react';
import { cn } from '@/lib/utils';

const MemberDelivery = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Your Delivery</h1>
      <p className="text-muted-foreground text-sm mt-1">Contribution highlights and workload metrics</p>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { label: 'Hours This Week', value: '48h', icon: Clock, color: 'text-logiq-amber' },
        { label: 'PRs Merged', value: '3', icon: GitPullRequest, color: 'text-logiq-emerald' },
        { label: 'Tasks Completed', value: '7', icon: CheckSquare, color: 'text-logiq-cyan' },
        { label: 'Meetings', value: '18h', icon: CalendarDays, color: 'text-logiq-rose' },
      ].map((m, i) => (
        <motion.div key={m.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass rounded-xl p-5 text-center">
          <m.icon className={cn("w-6 h-6 mx-auto mb-2", m.color)} />
          <div className={cn("text-2xl font-bold", m.color)}>{m.value}</div>
          <div className="text-xs text-muted-foreground mt-1">{m.label}</div>
        </motion.div>
      ))}
    </div>

    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass rounded-xl p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Sprint Contributions</h3>
      <div className="space-y-3">
        {[
          { sprint: 'Sprint 12 (Current)', tasks: 7, points: 13, status: 'In Progress' },
          { sprint: 'Sprint 11', tasks: 5, points: 10, status: 'Completed' },
          { sprint: 'Sprint 10', tasks: 8, points: 16, status: 'Completed' },
        ].map((s, i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
            <span className="text-sm text-foreground">{s.sprint}</span>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{s.tasks} tasks</span>
              <span>{s.points} pts</span>
              <span className={cn("text-xs font-medium", s.status === 'Completed' ? 'text-logiq-emerald' : 'text-logiq-cyan')}>{s.status}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  </div>
);

export default MemberDelivery;

import { motion } from 'framer-motion';
import { idpGoals } from '@/mocks/data';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const MemberIDP = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Individual Development Plan</h1>
      <p className="text-muted-foreground text-sm mt-1">Track your growth goals and milestones</p>
    </div>
    <div className="space-y-4">
      {idpGoals.map((goal, i) => (
        <motion.div key={goal.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-semibold text-foreground">{goal.title}</h3>
            <span className={cn("text-xs font-medium px-3 py-1 rounded-full",
              goal.status === 'on-track' ? 'bg-logiq-emerald/15 text-logiq-emerald' :
              goal.status === 'behind' ? 'bg-logiq-rose/15 text-logiq-rose' :
              goal.status === 'at-risk' ? 'bg-logiq-amber/15 text-logiq-amber' :
              'bg-logiq-emerald/15 text-logiq-emerald'
            )}>{goal.status}</span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">{goal.description}</p>
          <Progress value={goal.progress} className="h-2 mb-2" />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{goal.skillArea}</span>
            <span>{goal.progress}% · Target: {goal.targetDate}</span>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default MemberIDP;

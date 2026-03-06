import { motion } from 'framer-motion';
import KPICard from '@/components/KPICard';
import SignalCard from '@/components/SignalCard';
import { teamMemberSignals, learningRecommendations, idpGoals } from '@/mocks/data';
import type { KPI } from '@/domain/types';
import { GraduationCap, BookOpen, Target, Clock, TrendingUp, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

// Personal KPIs for Alex Chen (the demo team member)
const personalKPIs: KPI[] = [
  { id: 'p-wellbeing', name: 'Well-being', value: 42, previousValue: 55, status: 'red', trend: -23.6, category: 'wellbeing' },
  { id: 'p-skills', name: 'Skills', value: 65, previousValue: 60, status: 'yellow', trend: 8.3, category: 'skills' },
  { id: 'p-motivation', name: 'Motivation', value: 48, previousValue: 65, status: 'red', trend: -26.2, category: 'motivation' },
  { id: 'p-delivery', name: 'Delivery', value: 55, previousValue: 68, status: 'yellow', trend: -19.1, category: 'delivery' },
];

const MemberDashboard = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Your Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">Personal intelligence and growth insights</p>
        </div>
        <Link to="/member/coach">
          <Button className="gradient-primary text-primary-foreground border-0">
            <GraduationCap className="w-4 h-4 mr-2" /> AI Coach
          </Button>
        </Link>
      </div>

      {/* Personal KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {personalKPIs.map((kpi, i) => (
          <KPICard key={kpi.id} kpi={kpi} index={i} />
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Signals */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Your Signals</h2>
            <Link to="/member/signals" className="text-sm text-primary hover:underline">View All</Link>
          </div>
          <div className="space-y-3">
            {teamMemberSignals.map((signal, i) => (
              <SignalCard key={signal.id} signal={signal} index={i} />
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* IDP Progress */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Development Plan</h2>
              <Link to="/member/idp" className="text-sm text-primary hover:underline">View Full IDP</Link>
            </div>
            <div className="space-y-3">
              {idpGoals.slice(0, 3).map((goal, i) => (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-xl p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-foreground">{goal.title}</h4>
                    <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full",
                      goal.status === 'on-track' ? 'bg-logiq-emerald/15 text-logiq-emerald' :
                      goal.status === 'behind' ? 'bg-logiq-rose/15 text-logiq-rose' :
                      goal.status === 'at-risk' ? 'bg-logiq-amber/15 text-logiq-amber' :
                      'bg-logiq-emerald/15 text-logiq-emerald'
                    )}>
                      {goal.status}
                    </span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground">{goal.skillArea}</span>
                    <span className="text-xs text-muted-foreground">{goal.progress}%</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Learning Recommendations */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Recommended Learning</h2>
              <Link to="/member/learning" className="text-sm text-primary hover:underline">View All</Link>
            </div>
            <div className="space-y-2">
              {learningRecommendations.slice(0, 3).map((rec, i) => (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="glass rounded-lg p-3 flex items-center gap-3"
                >
                  <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center",
                    rec.type === 'course' ? 'bg-logiq-cyan/10 text-logiq-cyan' :
                    rec.type === 'mentoring' ? 'bg-primary/10 text-primary' :
                    rec.type === 'certification' ? 'bg-logiq-amber/10 text-logiq-amber' :
                    'bg-logiq-emerald/10 text-logiq-emerald'
                  )}>
                    {rec.type === 'course' ? <BookOpen className="w-4 h-4" /> :
                     rec.type === 'mentoring' ? <MessageSquare className="w-4 h-4" /> :
                     rec.type === 'certification' ? <Target className="w-4 h-4" /> :
                     <TrendingUp className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-foreground truncate">{rec.title}</h4>
                    <p className="text-xs text-muted-foreground">{rec.skillArea} · {rec.estimatedHours}h</p>
                  </div>
                  <span className={cn("text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full",
                    rec.priority === 'high' ? 'bg-logiq-rose/10 text-logiq-rose' :
                    rec.priority === 'medium' ? 'bg-logiq-amber/10 text-logiq-amber' :
                    'bg-muted text-muted-foreground'
                  )}>
                    {rec.priority}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Workload snippet */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass rounded-xl p-5"
          >
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-logiq-amber" />
              <span className="text-sm font-medium text-muted-foreground">This Week</span>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-logiq-amber">48h</div>
                <div className="text-[10px] text-muted-foreground uppercase">Hours Worked</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-logiq-rose">18h</div>
                <div className="text-[10px] text-muted-foreground uppercase">In Meetings</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-logiq-emerald">3</div>
                <div className="text-[10px] text-muted-foreground uppercase">PRs Merged</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;

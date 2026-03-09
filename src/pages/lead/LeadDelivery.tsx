import { motion } from 'framer-motion';
import { employees } from '@/mocks/data';
import { cn } from '@/lib/utils';

const deliveryData = [
  { name: 'Sprint 10', completion: 92, velocity: 48 },
  { name: 'Sprint 11', completion: 85, velocity: 44 },
  { name: 'Sprint 12', completion: 78, velocity: 39 },
];

const LeadDelivery = () => (
  <div className="space-y-6">

    <div className="grid md:grid-cols-3 gap-4">
      {deliveryData.map((sprint, i) => (
        <motion.div key={sprint.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass rounded-xl p-5">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">{sprint.name}</h3>
          <div className="flex items-end gap-4">
            <div>
              <div className={cn("text-3xl font-bold", sprint.completion >= 85 ? 'text-logiq-emerald' : sprint.completion >= 70 ? 'text-logiq-amber' : 'text-logiq-rose')}>{sprint.completion}%</div>
              <div className="text-xs text-muted-foreground">Completion</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">{sprint.velocity}</div>
              <div className="text-xs text-muted-foreground">Story Points</div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    <div className="glass rounded-xl p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Individual Delivery Scores</h3>
      <div className="space-y-3">
        {employees.map((emp, i) => (
          <motion.div key={emp.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex items-center gap-4">
            <span className="w-32 text-sm text-foreground truncate">{emp.name}</span>
            <div className="flex-1 h-3 bg-secondary rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${emp.deliveryScore}%` }}
                transition={{ delay: 0.3 + i * 0.05, duration: 0.6 }}
                className={cn("h-full rounded-full",
                  emp.deliveryScore >= 80 ? 'bg-logiq-emerald' :
                  emp.deliveryScore >= 60 ? 'bg-logiq-amber' : 'bg-logiq-rose'
                )}
              />
            </div>
            <span className={cn("text-sm font-bold w-10 text-right",
              emp.deliveryScore >= 80 ? 'text-logiq-emerald' :
              emp.deliveryScore >= 60 ? 'text-logiq-amber' : 'text-logiq-rose'
            )}>{emp.deliveryScore}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default LeadDelivery;

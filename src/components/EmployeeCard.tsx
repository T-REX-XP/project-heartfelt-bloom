import { motion } from 'framer-motion';
import type { Employee } from '@/domain/types';
import { cn } from '@/lib/utils';
import { User, AlertTriangle } from 'lucide-react';

const EmployeeCard = ({ employee, index = 0, onClick }: { employee: Employee; index?: number; onClick?: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
      className="glass rounded-xl p-4 hover:scale-[1.01] hover:bg-card/80 transition-all cursor-pointer"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <User className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-foreground">{employee.name}</h4>
          <p className="text-xs text-muted-foreground">{employee.role} · {employee.tenure}</p>
        </div>
        {employee.status === 'red' && (
          <div className="flex items-center gap-1 text-logiq-rose text-xs font-medium">
            <AlertTriangle className="w-3.5 h-3.5" />
            At Risk
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[
          { label: 'Well-being', value: employee.wellbeingScore },
          { label: 'Skills', value: employee.skillsScore },
          { label: 'Motivation', value: employee.motivationScore },
          { label: 'Delivery', value: employee.deliveryScore },
        ].map(metric => (
          <div key={metric.label} className="text-center">
            <div className={cn("text-lg font-bold",
              metric.value >= 70 ? 'text-logiq-emerald' :
              metric.value >= 50 ? 'text-logiq-amber' :
              'text-logiq-rose'
            )}>
              {metric.value}
            </div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{metric.label}</div>
          </div>
        ))}
      </div>

      {employee.churnRisk > 50 && (
        <div className="mt-3 flex items-center justify-between bg-logiq-rose/5 rounded-lg px-3 py-1.5">
          <span className="text-xs text-muted-foreground">Churn Risk</span>
          <span className="text-sm font-bold text-logiq-rose">{employee.churnRisk}%</span>
        </div>
      )}
    </motion.div>
  );
};

export default EmployeeCard;

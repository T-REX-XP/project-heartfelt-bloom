import { useParams, Link } from 'react-router-dom';
import { employees } from '@/mocks/data';
import { motion } from 'framer-motion';
import { User, ArrowLeft, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const statusColors: Record<string, string> = { green: 'text-logiq-emerald', yellow: 'text-logiq-amber', red: 'text-logiq-rose' };

const EmployeeDetail = () => {
  const { employeeId } = useParams();
  const employee = employees.find(e => e.id === employeeId);

  if (!employee) return <div className="text-foreground">Employee not found</div>;

  const metrics = [
    { label: 'Well-being', value: employee.wellbeingScore },
    { label: 'Skills', value: employee.skillsScore },
    { label: 'Motivation', value: employee.motivationScore },
    { label: 'Delivery', value: employee.deliveryScore },
    { label: 'Churn Risk', value: employee.churnRisk },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/lead/team"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" /> Back</Button></Link>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <User className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{employee.name}</h1>
            <p className="text-muted-foreground">{employee.role} · {employee.department} · {employee.tenure}</p>
          </div>
          <div className="ml-auto">
            <Link to={`/lead/conversation-prep/${employee.id}`}>
              <Button className="gradient-primary text-primary-foreground border-0">
                <MessageSquare className="w-4 h-4 mr-2" /> Prepare 1:1
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4">
          {metrics.map(m => (
            <div key={m.label} className="glass rounded-xl p-4 text-center">
              <div className={cn("text-3xl font-bold",
                m.label === 'Churn Risk'
                  ? (m.value > 60 ? 'text-logiq-rose' : m.value > 30 ? 'text-logiq-amber' : 'text-logiq-emerald')
                  : (m.value >= 70 ? 'text-logiq-emerald' : m.value >= 50 ? 'text-logiq-amber' : 'text-logiq-rose')
              )}>
                {m.value}{m.label === 'Churn Risk' ? '%' : ''}
              </div>
              <div className="text-xs text-muted-foreground mt-1">{m.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-foreground mb-3">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {employee.skills.map(s => (
              <span key={s} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">{s}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EmployeeDetail;

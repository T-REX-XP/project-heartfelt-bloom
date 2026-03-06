import { employees } from '@/mocks/data';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const allSkills = Array.from(new Set(employees.flatMap(e => e.skills)));

const LeadSkills = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Skills Matrix</h1>
      <p className="text-muted-foreground text-sm mt-1">Who knows what across your team</p>
    </div>

    <div className="glass rounded-xl overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Team Member</th>
            {allSkills.map(s => (
              <th key={s} className="px-3 py-3 text-xs font-semibold text-muted-foreground uppercase text-center whitespace-nowrap">{s}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, i) => (
            <motion.tr key={emp.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-border/50 hover:bg-card/50">
              <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">{emp.name}</td>
              {allSkills.map(s => (
                <td key={s} className="px-3 py-3 text-center">
                  {emp.skills.includes(s) ? (
                    <span className="w-3 h-3 rounded-full bg-logiq-emerald inline-block" />
                  ) : (
                    <span className="w-3 h-3 rounded-full bg-muted inline-block" />
                  )}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default LeadSkills;

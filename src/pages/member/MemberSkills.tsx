import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const skills = [
  { name: 'React', level: 82, target: 90 },
  { name: 'TypeScript', level: 75, target: 85 },
  { name: 'Node.js', level: 60, target: 80 },
  { name: 'Python', level: 45, target: 70 },
  { name: 'Cloud Architecture', level: 25, target: 60 },
  { name: 'System Design', level: 30, target: 65 },
  { name: 'Testing', level: 55, target: 75 },
  { name: 'CI/CD', level: 50, target: 70 },
];

const MemberSkills = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Skills Profile</h1>
      <p className="text-muted-foreground text-sm mt-1">Your current skills coverage and gap analysis</p>
    </div>

    <div className="glass rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">Skills Coverage</h3>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><span className="w-3 h-1.5 rounded bg-primary inline-block" /> Current</span>
          <span className="flex items-center gap-1"><span className="w-3 h-1.5 rounded bg-muted-foreground/30 inline-block" /> Target</span>
        </div>
      </div>
      <div className="space-y-4">
        {skills.map((skill, i) => (
          <motion.div key={skill.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-foreground">{skill.name}</span>
              <span className="text-xs text-muted-foreground">{skill.level} / {skill.target}</span>
            </div>
            <div className="relative h-3 bg-secondary rounded-full overflow-hidden">
              <div className="absolute inset-0 h-full rounded-full bg-muted-foreground/10" style={{ width: `${skill.target}%` }} />
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ delay: 0.2 + i * 0.05, duration: 0.6 }}
                className={cn("absolute h-full rounded-full",
                  skill.level >= skill.target * 0.8 ? 'bg-logiq-emerald' :
                  skill.level >= skill.target * 0.5 ? 'bg-logiq-amber' : 'bg-logiq-rose'
                )}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default MemberSkills;

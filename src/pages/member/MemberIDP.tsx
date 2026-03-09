import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { BookOpen, MessageSquare, Target, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { QueryWrapper } from '@/components/QueryWrapper';
import { useIDPGoals, useLearningRecommendations } from '@/hooks/useApiQueries';

// Skills data (local until API is ready)
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

const typeIcons = { course: BookOpen, mentoring: MessageSquare, certification: Target, project: TrendingUp };

const MemberIDP = () => {
  const goalsQuery = useIDPGoals();
  const learningQuery = useLearningRecommendations();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Individual Development Plan</h1>
        <p className="text-muted-foreground text-sm mt-1">Track your growth, learning, and skill development</p>
      </div>

      <Tabs defaultValue="goals" className="w-full">
        <TabsList>
          <TabsTrigger value="goals">Dev Plan</TabsTrigger>
          <TabsTrigger value="learning">Learning</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
        </TabsList>

        {/* Dev Plan Goals */}
        <TabsContent value="goals" className="mt-4">
          <QueryWrapper query={goalsQuery} emptyMessage="No goals set yet.">
            {(goals) => (
              <div className="space-y-4">
                {goals.map((goal, i) => (
                  <motion.div key={goal.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass rounded-xl p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-base font-semibold text-foreground">{goal.title}</h3>
                      <span className={cn("text-xs font-medium px-3 py-1 rounded-full",
                        goal.status === 'on-track' ? 'bg-primary/15 text-primary' :
                        goal.status === 'behind' ? 'bg-destructive/15 text-destructive' :
                        goal.status === 'at-risk' ? 'bg-warning/15 text-warning' :
                        'bg-primary/15 text-primary'
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
            )}
          </QueryWrapper>
        </TabsContent>

        {/* Learning Recommendations */}
        <TabsContent value="learning" className="mt-4">
          <QueryWrapper query={learningQuery} emptyMessage="No learning recommendations yet.">
            {(recommendations) => (
              <div className="grid md:grid-cols-2 gap-4">
                {recommendations.map((rec, i) => {
                  const Icon = typeIcons[rec.type];
                  return (
                    <motion.div key={rec.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass rounded-xl p-6">
                      <div className="flex items-start gap-3">
                        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center",
                          rec.type === 'course' ? 'bg-accent/50 text-accent-foreground' :
                          rec.type === 'mentoring' ? 'bg-primary/10 text-primary' :
                          rec.type === 'certification' ? 'bg-warning/10 text-warning' :
                          'bg-primary/10 text-primary'
                        )}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="text-sm font-semibold text-foreground">{rec.title}</h3>
                            <span className={cn("text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full",
                              rec.priority === 'high' ? 'bg-destructive/10 text-destructive' :
                              rec.priority === 'medium' ? 'bg-warning/10 text-warning' :
                              'bg-muted text-muted-foreground'
                            )}>{rec.priority}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">{rec.reason}</p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span>{rec.type}</span>
                            <span>·</span>
                            <span>{rec.skillArea}</span>
                            <span>·</span>
                            <span>{rec.estimatedHours}h</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </QueryWrapper>
        </TabsContent>

        {/* Skills Profile */}
        <TabsContent value="skills" className="mt-4">
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
                        skill.level >= skill.target * 0.8 ? 'bg-primary' :
                        skill.level >= skill.target * 0.5 ? 'bg-warning' : 'bg-destructive'
                      )}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MemberIDP;

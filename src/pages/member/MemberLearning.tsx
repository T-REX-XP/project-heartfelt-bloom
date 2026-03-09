import { motion } from 'framer-motion';
import { learningRecommendations } from '@/mocks/data';
import { BookOpen, MessageSquare, Target, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const typeIcons = { course: BookOpen, mentoring: MessageSquare, certification: Target, project: TrendingUp };

const MemberLearning = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Learning Recommendations</h1>
      <p className="text-muted-foreground text-sm mt-1">Personalized learning paths based on your skill gaps and career goals</p>
    </div>
    <div className="grid md:grid-cols-2 gap-4">
      {learningRecommendations.map((rec, i) => {
        const Icon = typeIcons[rec.type];
        return (
          <motion.div key={rec.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass rounded-xl p-6">
            <div className="flex items-start gap-3">
              <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center",
                rec.type === 'course' ? 'bg-logiq-cyan/10 text-logiq-cyan' :
                rec.type === 'mentoring' ? 'bg-primary/10 text-primary' :
                rec.type === 'certification' ? 'bg-logiq-amber/10 text-logiq-amber' :
                'bg-logiq-emerald/10 text-logiq-emerald'
              )}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-semibold text-foreground">{rec.title}</h3>
                  <span className={cn("text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full",
                    rec.priority === 'high' ? 'bg-logiq-rose/10 text-logiq-rose' :
                    rec.priority === 'medium' ? 'bg-logiq-amber/10 text-logiq-amber' :
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
  </div>
);

export default MemberLearning;

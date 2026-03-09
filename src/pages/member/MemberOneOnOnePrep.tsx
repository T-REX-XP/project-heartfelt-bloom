import { motion } from 'framer-motion';
import { alexConversationPrep } from '@/mocks/data';
import { CheckCircle, HelpCircle, ListChecks, Lightbulb } from 'lucide-react';

const MemberOneOnOnePrep = () => {
  const topics = [
    'Discuss workload and meeting load — feeling stretched',
    'Ask about flexible schedule options',
    'Share interest in cloud architecture learning',
    'Clarify Q2 project expectations',
  ];

  const coachTips = [
    'Start by sharing how you\'re feeling honestly — your lead wants to help',
    'Frame concerns as opportunities: "I\'d love to invest more time in learning"',
    'Be specific about what would make your week better',
    'Ask about the team\'s priorities so you can align your goals',
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">1:1 Prep Assistant</h1>
        <p className="text-muted-foreground text-sm mt-1">Prepare for your next meeting with your team lead</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <ListChecks className="w-4 h-4 text-primary" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">Your Topics</h3>
          </div>
          <ul className="space-y-2">
            {topics.map((t, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" /> {t}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-logiq-cyan/10 flex items-center justify-center">
              <Lightbulb className="w-4 h-4 text-logiq-cyan" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">Coach Tips</h3>
          </div>
          <ul className="space-y-2">
            {coachTips.map((t, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-logiq-cyan mt-2 flex-shrink-0" /> {t}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-logiq-emerald/10 flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-logiq-emerald" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">Your Wins</h3>
          </div>
          <ul className="space-y-2">
            {['PR review throughput up 30%', 'Completed Advanced TypeScript course', 'Consistent code quality on recent tasks'].map((t, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-logiq-emerald mt-2 flex-shrink-0" /> {t}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-logiq-amber/10 flex items-center justify-center">
              <HelpCircle className="w-4 h-4 text-logiq-amber" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">Questions to Ask</h3>
          </div>
          <ul className="space-y-2">
            {['What are the team priorities for next quarter?', 'Can we reduce my meeting load by 3-4 hours?', 'Is there a mentoring opportunity for cloud skills?', 'How is my overall performance being evaluated?'].map((t, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-logiq-amber mt-2 flex-shrink-0" /> {t}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default MemberOneOnOnePrep;

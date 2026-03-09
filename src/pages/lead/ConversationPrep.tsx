import { useParams, Link } from 'react-router-dom';
import { alexConversationPrep, employees } from '@/mocks/data';
import { motion } from 'framer-motion';
import { ArrowLeft, AlertTriangle, CheckCircle, HelpCircle, ListChecks } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ConversationPrep = () => {
  const { employeeId } = useParams();
  const employee = employees.find(e => e.id === employeeId);
  // For demo, always use Alex's prep
  const prep = alexConversationPrep;

  if (!employee) return <div className="text-foreground">Employee not found</div>;

  const sections = [
    { title: 'Key Topics', items: prep.keyTopics, icon: ListChecks, color: 'text-primary bg-primary/10' },
    { title: 'Risk Areas', items: prep.riskAreas, icon: AlertTriangle, color: 'text-logiq-rose bg-logiq-rose/10' },
    { title: 'Positive Highlights', items: prep.positiveHighlights, icon: CheckCircle, color: 'text-logiq-emerald bg-logiq-emerald/10' },
    { title: 'Suggested Questions', items: prep.suggestedQuestions, icon: HelpCircle, color: 'text-logiq-cyan bg-logiq-cyan/10' },
    { title: 'Action Items', items: prep.actionItems, icon: ListChecks, color: 'text-logiq-amber bg-logiq-amber/10' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to={`/lead/team/${employeeId}`}><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" /> Back</Button></Link>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-foreground">1:1 Conversation Prep</h1>
        <p className="text-muted-foreground text-sm mt-1">AI-generated brief for your meeting with {prep.employeeName}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {sections.map((section, i) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-xl p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${section.color}`}>
                <section.icon className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">{section.title}</h3>
            </div>
            <ul className="space-y-2">
              {section.items.map((item, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ConversationPrep;

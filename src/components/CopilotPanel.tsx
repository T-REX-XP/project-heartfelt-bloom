import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const prompts = [
  'Which team members are at highest churn risk?',
  'Summarize team delivery performance this sprint',
  'What skills gaps should I prioritize?',
  'How can I help Alex Chen re-engage?',
];

const demoResponses: Record<string, string> = {
  'churn': 'Alex Chen (78% risk) and David Kim (72% risk) are at highest churn risk. Alex shows declining wellbeing, motivation, and learning engagement. David is experiencing burnout from sustained overtime. Both need immediate attention — I recommend scheduling 1:1s this week.',
  'delivery': 'Team velocity has dropped 18% over 3 sprints. Key factors: meeting load increased 25%, 2 unplanned incidents consumed ~40 story points, and Alex + David\'s reduced output. Sprint completion is at 78%. I recommend reviewing and reducing non-essential meetings.',
  'skills': 'Top skill gaps: Cloud Architecture (3 team members need upskilling), System Design (Kevin and Jonas), and Test Automation (team-wide coverage at 60%). Recommended: Pair Kevin with Sarah for mentoring, enroll Jonas in the backend architecture course.',
  'alex': 'Alex shows multiple concerning signals: 4 sick days in 3 weeks, no learning hours in 6 weeks, motivation dropped from 65→48. He may be dealing with burnout or personal challenges. Approach with empathy — start the 1:1 by checking on his wellbeing before discussing performance.',
};

interface Message { role: 'user' | 'assistant'; content: string }

interface CopilotPanelProps {
  children: React.ReactNode;
}

const CopilotPanel = ({ children }: CopilotPanelProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I\'m your AI copilot. I have context about your team\'s KPIs, signals, and employee data. How can I help?' },
  ]);
  const [input, setInput] = useState('');

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: 'user', content: text };
    const lower = text.toLowerCase();
    const responseKey = Object.keys(demoResponses).find(k => lower.includes(k));
    const response = responseKey ? demoResponses[responseKey] : 'Based on my analysis of team data, I\'d recommend reviewing the signals dashboard for the most current insights. Would you like me to dive deeper into a specific area?';
    setMessages(prev => [...prev, userMsg, { role: 'assistant', content: response }]);
    setInput('');
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-[420px] sm:w-[480px] flex flex-col gap-0 p-0">
        <SheetHeader className="px-6 py-4 border-b border-border">
          <SheetTitle className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary-foreground" />
            </div>
            AI Copilot
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {/* Prompt starters */}
          {messages.length <= 1 && (
            <div className="grid grid-cols-1 gap-2">
              {prompts.map((p, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => send(p)}
                  className="glass rounded-xl p-3 text-left text-sm text-muted-foreground hover:text-foreground hover:bg-card/80 transition-colors"
                >
                  {p}
                </motion.button>
              ))}
            </div>
          )}

          {/* Messages */}
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5 text-primary-foreground" />
                </div>
              )}
              <div className={`max-w-[85%] rounded-xl p-3 text-sm ${
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'glass'
              }`}>
                {msg.content}
              </div>
              {msg.role === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5 text-secondary-foreground" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Input */}
        <div className="px-6 py-4 border-t border-border flex gap-2">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send(input)}
            placeholder="Ask about your team..."
            className="bg-secondary/50"
          />
          <Button onClick={() => send(input)} className="gradient-primary text-primary-foreground border-0" size="icon">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CopilotPanel;

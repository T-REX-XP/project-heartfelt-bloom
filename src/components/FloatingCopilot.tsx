import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, User, X, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const prompts = [
  'Which team members are at highest churn risk?',
  'Summarize team delivery performance this sprint',
  'What skills gaps should I prioritize?',
  'How can I help Alex Chen re-engage?',
];

interface Message { role: 'user' | 'assistant'; content: string }

const demoResponses: Record<string, string> = {
  'churn': 'Alex Chen (78% risk) and David Kim (72% risk) are at highest churn risk. Alex shows declining wellbeing, motivation, and learning engagement. David is experiencing burnout from sustained overtime. Both need immediate attention — I recommend scheduling 1:1s this week.',
  'delivery': 'Team velocity has dropped 18% over 3 sprints. Key factors: meeting load increased 25%, 2 unplanned incidents consumed ~40 story points, and Alex + David\'s reduced output. Sprint completion is at 78%. I recommend reviewing and reducing non-essential meetings.',
  'skills': 'Top skill gaps: Cloud Architecture (3 team members need upskilling), System Design (Kevin and Jonas), and Test Automation (team-wide coverage at 60%). Recommended: Pair Kevin with Sarah for mentoring, enroll Jonas in the backend architecture course.',
  'alex': 'Alex shows multiple concerning signals: 4 sick days in 3 weeks, no learning hours in 6 weeks, motivation dropped from 65→48. He may be dealing with burnout or personal challenges. Approach with empathy — start the 1:1 by checking on his wellbeing before discussing performance.',
};

const FloatingCopilot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I'm your AI copilot. I have context about your team's KPIs, signals, and employee data. How can I help?" },
  ]);
  const [input, setInput] = useState('');

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: 'user', content: text };
    const lower = text.toLowerCase();
    const responseKey = Object.keys(demoResponses).find(k => lower.includes(k));
    const response = responseKey ? demoResponses[responseKey] : "Based on my analysis of team data, I'd recommend reviewing the signals dashboard for the most current insights. Would you like me to dive deeper into a specific area?";
    setMessages(prev => [...prev, userMsg, { role: 'assistant', content: response }]);
    setInput('');
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gradient-primary text-primary-foreground shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{ display: open ? 'none' : 'flex' }}
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[400px] max-h-[600px] rounded-2xl border border-border bg-card shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">AI Copilot</h3>
                  <p className="text-xs text-muted-foreground">Team intelligence assistant</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0 max-h-[420px]">
              {/* Prompt starters */}
              {messages.length <= 1 && (
                <div className="grid grid-cols-1 gap-2 mb-3">
                  {prompts.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => send(p)}
                      className="rounded-lg border border-border p-3 text-left text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : ''}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-md gradient-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                  <div className={`max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}>
                    {msg.content}
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-6 h-6 rounded-md bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <User className="w-3 h-3 text-secondary-foreground" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t border-border p-3 flex gap-2">
              <Input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send(input)}
                placeholder="Ask about your team..."
                className="text-xs h-9 bg-muted/50"
              />
              <Button onClick={() => send(input)} size="sm" className="gradient-primary text-primary-foreground border-0 h-9 w-9 p-0">
                <Send className="w-3.5 h-3.5" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingCopilot;

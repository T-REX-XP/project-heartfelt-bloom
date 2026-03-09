import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, User } from 'lucide-react';
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

const CopilotChat = ({ title = 'AI Copilot', promptList = prompts }: { title?: string; promptList?: string[] }) => {
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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        <p className="text-muted-foreground text-sm mt-1">Ask questions about your team and get AI-powered insights</p>
      </div>

      {/* Prompt starters */}
      {messages.length <= 1 && (
        <div className="grid grid-cols-2 gap-2">
          {promptList.map((p, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => send(p)}
              className="glass rounded-xl p-4 text-left text-sm text-muted-foreground hover:text-foreground hover:bg-card/80 transition-colors"
            >
              {p}
            </motion.button>
          ))}
        </div>
      )}

      {/* Messages */}
      <div className="space-y-4 max-h-[500px] overflow-y-auto">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}
          >
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
            )}
            <div className={`max-w-[80%] rounded-xl p-4 text-sm ${
              msg.role === 'user'
                ? 'bg-primary text-primary-foreground'
                : 'glass'
            }`}>
              {msg.content}
            </div>
            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-secondary-foreground" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send(input)}
          placeholder="Ask about your team..."
          className="bg-secondary/50"
        />
        <Button onClick={() => send(input)} className="gradient-primary text-primary-foreground border-0">
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default CopilotChat;

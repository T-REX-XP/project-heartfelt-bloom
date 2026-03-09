import { useState } from 'react';
import { makeStyles, tokens, shorthands, Text, Input, Button, Avatar } from '@fluentui/react-components';
import { BotSparkleRegular, SendRegular, PersonRegular } from '@fluentui/react-icons';

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

const useStyles = makeStyles({
  root: { display: 'flex', flexDirection: 'column', ...shorthands.gap('24px') },
  promptGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', ...shorthands.gap('8px') },
  promptBtn: {
    ...shorthands.padding('16px'),
    ...shorthands.borderRadius('8px'),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
    cursor: 'pointer', textAlign: 'left' as const,
    fontSize: 13, color: tokens.colorNeutralForeground2,
    ':hover': { backgroundColor: tokens.colorNeutralBackground1Hover },
  },
  messages: { display: 'flex', flexDirection: 'column', ...shorthands.gap('16px'), maxHeight: '500px', overflowY: 'auto' },
  msgRow: { display: 'flex', ...shorthands.gap('12px') },
  msgRowUser: { justifyContent: 'flex-end' },
  bubble: {
    maxWidth: '80%', ...shorthands.padding('12px', '16px'),
    ...shorthands.borderRadius('8px'), fontSize: 13, lineHeight: '1.5',
  },
  bubbleAssistant: {
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
    color: tokens.colorNeutralForeground1,
  },
  bubbleUser: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
  },
  inputRow: { display: 'flex', ...shorthands.gap('8px') },
});

const CopilotChat = ({ title = 'AI Copilot', promptList = prompts }: { title?: string; promptList?: string[] }) => {
  const s = useStyles();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I\'m your AI copilot. I have context about your team\'s KPIs, signals, and employee data. How can I help?' },
  ]);
  const [input, setInput] = useState('');

  const send = (text: string) => {
    if (!text.trim()) return;
    const lower = text.toLowerCase();
    const responseKey = Object.keys(demoResponses).find(k => lower.includes(k));
    const response = responseKey ? demoResponses[responseKey] : 'Based on my analysis of team data, I\'d recommend reviewing the signals dashboard for the most current insights. Would you like me to dive deeper into a specific area?';
    setMessages(prev => [...prev, { role: 'user', content: text }, { role: 'assistant', content: response }]);
    setInput('');
  };

  return (
    <div className={s.root}>
      <div>
        <Text size={600} weight="bold" block>{title}</Text>
        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>Ask questions about your team and get AI-powered insights</Text>
      </div>

      {messages.length <= 1 && (
        <div className={s.promptGrid}>
          {promptList.map((p, i) => (
            <button key={i} onClick={() => send(p)} className={s.promptBtn}>{p}</button>
          ))}
        </div>
      )}

      <div className={s.messages}>
        {messages.map((msg, i) => (
          <div key={i} className={`${s.msgRow} ${msg.role === 'user' ? s.msgRowUser : ''}`}>
            {msg.role === 'assistant' && (
              <Avatar icon={<BotSparkleRegular />} color="brand" size={28} />
            )}
            <div className={`${s.bubble} ${msg.role === 'user' ? s.bubbleUser : s.bubbleAssistant}`}>
              {msg.content}
            </div>
            {msg.role === 'user' && (
              <Avatar icon={<PersonRegular />} color="neutral" size={28} />
            )}
          </div>
        ))}
      </div>

      <div className={s.inputRow}>
        <Input
          style={{ flex: 1 }}
          value={input}
          onChange={(_, d) => setInput(d.value)}
          onKeyDown={e => e.key === 'Enter' && send(input)}
          placeholder="Ask about your team..."
        />
        <Button appearance="primary" icon={<SendRegular />} onClick={() => send(input)} />
      </div>
    </div>
  );
};

export default CopilotChat;

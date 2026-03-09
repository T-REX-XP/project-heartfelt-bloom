import { useState } from 'react';
import { makeStyles, tokens, shorthands, Text, Input, Button, Avatar, Drawer, DrawerHeader, DrawerHeaderTitle, DrawerBody } from '@fluentui/react-components';
import { BotSparkleRegular, SendRegular, PersonRegular, DismissRegular } from '@fluentui/react-icons';

const prompts = [
  'Which team members are at highest churn risk?',
  'Summarize team delivery performance this sprint',
  'What skills gaps should I prioritize?',
  'How can I help Alex Chen re-engage?',
];

const demoResponses: Record<string, string> = {
  'churn': 'Alex Chen (78% risk) and David Kim (72% risk) are at highest churn risk.',
  'delivery': 'Team velocity has dropped 18% over 3 sprints.',
  'skills': 'Top skill gaps: Cloud Architecture, System Design, and Test Automation.',
  'alex': 'Alex shows multiple concerning signals: 4 sick days in 3 weeks.',
};

interface Message { role: 'user' | 'assistant'; content: string }

const useStyles = makeStyles({
  messages: { display: 'flex', flexDirection: 'column', ...shorthands.gap('12px'), flex: 1, overflowY: 'auto' },
  msgRow: { display: 'flex', ...shorthands.gap('8px') },
  msgRowUser: { justifyContent: 'flex-end' },
  bubble: {
    maxWidth: '85%', ...shorthands.padding('10px', '14px'),
    ...shorthands.borderRadius('8px'), fontSize: tokens.fontSizeBase300, lineHeight: '1.5',
  },
  bubbleAssistant: {
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground1,
  },
  bubbleUser: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
  },
  inputRow: {
    display: 'flex', ...shorthands.gap('8px'),
    ...shorthands.padding('12px', '0', '0'),
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  promptBtn: {
    ...shorthands.padding('10px'),
    ...shorthands.borderRadius('8px'),
    backgroundColor: tokens.colorNeutralBackground3,
    ...shorthands.border('none'),
    cursor: 'pointer', textAlign: 'left' as const,
    fontSize: tokens.fontSizeBase300, color: tokens.colorNeutralForeground2,
    ':hover': { backgroundColor: tokens.colorNeutralBackground3Hover },
  },
});

const CopilotPanel = ({ children }: { children: React.ReactNode }) => {
  const s = useStyles();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I\'m your AI copilot. How can I help?' },
  ]);
  const [input, setInput] = useState('');

  const send = (text: string) => {
    if (!text.trim()) return;
    const lower = text.toLowerCase();
    const key = Object.keys(demoResponses).find(k => lower.includes(k));
    const response = key ? demoResponses[key] : 'I\'d recommend reviewing the signals dashboard for current insights.';
    setMessages(prev => [...prev, { role: 'user', content: text }, { role: 'assistant', content: response }]);
    setInput('');
  };

  return (
    <>
      <span onClick={() => setOpen(true)}>{children}</span>
      <Drawer open={open} onOpenChange={(_, d) => setOpen(d.open)} position="end" size="medium">
        <DrawerHeader>
          <DrawerHeaderTitle
            action={<Button appearance="subtle" icon={<DismissRegular />} onClick={() => setOpen(false)} />}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Avatar icon={<BotSparkleRegular />} color="brand" size={28} />
              AI Copilot
            </div>
          </DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody style={{ display: 'flex', flexDirection: 'column' }}>
          <div className={s.messages}>
            {messages.length <= 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
                {prompts.map((p, i) => (
                  <button key={i} onClick={() => send(p)} className={s.promptBtn}>{p}</button>
                ))}
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`${s.msgRow} ${msg.role === 'user' ? s.msgRowUser : ''}`}>
                {msg.role === 'assistant' && <Avatar icon={<BotSparkleRegular />} color="brand" size={24} />}
                <div className={`${s.bubble} ${msg.role === 'user' ? s.bubbleUser : s.bubbleAssistant}`}>{msg.content}</div>
                {msg.role === 'user' && <Avatar icon={<PersonRegular />} color="neutral" size={24} />}
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
        </DrawerBody>
      </Drawer>
    </>
  );
};

export default CopilotPanel;

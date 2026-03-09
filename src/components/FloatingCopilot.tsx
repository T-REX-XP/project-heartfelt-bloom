import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { makeStyles, tokens, shorthands, mergeClasses, Button, Input } from '@fluentui/react-components';
import { ChatSparkleRegular, DismissRegular, SendRegular, PersonRegular, BotRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  fab: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    zIndex: 50,
    width: '48px',
    height: '48px',
    ...shorthands.borderRadius('50%'),
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: tokens.shadow16,
    ...shorthands.border('none'),
    transition: 'transform 150ms',
    ':hover': { transform: 'scale(1.1)' },
  },
  panel: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    zIndex: 50,
    width: '400px',
    maxHeight: '560px',
    ...shorthands.borderRadius('12px'),
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow64,
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.overflow('hidden'),
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shorthands.padding('12px', '16px'),
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  headerLeft: { display: 'flex', alignItems: 'center', ...shorthands.gap('8px') },
  headerIcon: {
    width: '28px', height: '28px', ...shorthands.borderRadius('6px'),
    backgroundColor: tokens.colorBrandBackground, color: tokens.colorNeutralForegroundOnBrand,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  messages: { flex: 1, overflowY: 'auto', ...shorthands.padding('12px'), display: 'flex', flexDirection: 'column', ...shorthands.gap('8px'), minHeight: 0, maxHeight: '380px' },
  msgRow: { display: 'flex', ...shorthands.gap('8px') },
  msgRowUser: { justifyContent: 'flex-end' },
  avatar: {
    width: '24px', height: '24px', ...shorthands.borderRadius('6px'),
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px',
  },
  botAvatar: { backgroundColor: tokens.colorBrandBackground, color: tokens.colorNeutralForegroundOnBrand },
  userAvatar: { backgroundColor: tokens.colorNeutralBackground4, color: tokens.colorNeutralForeground3 },
  bubble: {
    maxWidth: '85%', ...shorthands.borderRadius('8px'), ...shorthands.padding('8px', '12px'),
    fontSize: tokens.fontSizeBase200, lineHeight: tokens.lineHeightBase200,
  },
  bubbleBot: { backgroundColor: tokens.colorNeutralBackground4, color: tokens.colorNeutralForeground1 },
  bubbleUser: { backgroundColor: tokens.colorBrandBackground, color: tokens.colorNeutralForegroundOnBrand },
  inputBar: { display: 'flex', ...shorthands.gap('8px'), ...shorthands.padding('12px'), borderTop: `1px solid ${tokens.colorNeutralStroke2}` },
  prompt: {
    ...shorthands.padding('10px'),
    ...shorthands.borderRadius('6px'),
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    cursor: 'pointer',
    textAlign: 'left' as const,
    backgroundColor: 'transparent',
    width: '100%',
    transition: 'all 150ms',
    ':hover': { backgroundColor: tokens.colorNeutralBackground1Hover, color: tokens.colorNeutralForeground1 },
  },
});

const prompts = [
  'Which team members are at highest churn risk?',
  'Summarize team delivery performance this sprint',
  'What skills gaps should I prioritize?',
  'How can I help Alex Chen re-engage?',
];

interface Message { role: 'user' | 'assistant'; content: string }

const demoResponses: Record<string, string> = {
  'churn': 'Alex Chen (78% risk) and David Kim (72% risk) are at highest churn risk.',
  'delivery': 'Team velocity has dropped 18% over 3 sprints. Sprint completion is at 78%.',
  'skills': 'Top gaps: Cloud Architecture, System Design, Test Automation.',
  'alex': 'Alex shows 4 sick days in 3 weeks, no learning hours in 6 weeks, motivation dropped to 48.',
};

const FloatingCopilot = () => {
  const s = useStyles();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I'm your AI copilot. How can I help?" },
  ]);
  const [input, setInput] = useState('');

  const send = (text: string) => {
    if (!text.trim()) return;
    const lower = text.toLowerCase();
    const key = Object.keys(demoResponses).find(k => lower.includes(k));
    const response = key ? demoResponses[key] : "I'd recommend reviewing the signals dashboard for current insights.";
    setMessages(prev => [...prev, { role: 'user', content: text }, { role: 'assistant', content: response }]);
    setInput('');
  };

  return (
    <>
      {!open && (
        <button className={s.fab} onClick={() => setOpen(true)}>
          <ChatSparkleRegular style={{ fontSize: 24 }} />
        </button>
      )}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={s.panel}
          >
            <div className={s.header}>
              <div className={s.headerLeft}>
                <div className={s.headerIcon}><BotRegular style={{ fontSize: 16 }} /></div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: tokens.colorNeutralForeground1 }}>AI Copilot</div>
                  <div style={{ fontSize: 11, color: tokens.colorNeutralForeground3 }}>Team intelligence assistant</div>
                </div>
              </div>
              <Button icon={<DismissRegular />} appearance="subtle" size="small" onClick={() => setOpen(false)} />
            </div>
            <div className={s.messages}>
              {messages.length <= 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {prompts.map((p, i) => (
                    <button key={i} className={s.prompt} onClick={() => send(p)}>{p}</button>
                  ))}
                </div>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={mergeClasses(s.msgRow, msg.role === 'user' && s.msgRowUser)}>
                  {msg.role === 'assistant' && <div className={mergeClasses(s.avatar, s.botAvatar)}><BotRegular style={{ fontSize: 14 }} /></div>}
                  <div className={mergeClasses(s.bubble, msg.role === 'user' ? s.bubbleUser : s.bubbleBot)}>{msg.content}</div>
                  {msg.role === 'user' && <div className={mergeClasses(s.avatar, s.userAvatar)}><PersonRegular style={{ fontSize: 14 }} /></div>}
                </div>
              ))}
            </div>
            <div className={s.inputBar}>
              <Input
                value={input}
                onChange={(_, d) => setInput(d.value)}
                onKeyDown={e => e.key === 'Enter' && send(input)}
                placeholder="Ask about your team..."
                style={{ flex: 1 }}
                size="small"
              />
              <Button icon={<SendRegular />} appearance="primary" size="small" onClick={() => send(input)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingCopilot;

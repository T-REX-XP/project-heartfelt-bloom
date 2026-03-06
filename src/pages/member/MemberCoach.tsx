import CopilotChat from '@/pages/lead/CopilotChat';

const memberPrompts = [
  'How can I improve my skills coverage score?',
  'What should I prepare for my next 1:1?',
  'Am I on track with my development goals?',
  'How does my workload compare to the team average?',
];

const MemberCoach = () => (
  <CopilotChat title="AI Development Coach" promptList={memberPrompts} />
);

export default MemberCoach;

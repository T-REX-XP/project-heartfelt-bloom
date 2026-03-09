import { makeStyles, tokens, shorthands, Text } from '@fluentui/react-components';
import { ListRegular, LightbulbRegular, CheckmarkCircleRegular, QuestionCircleRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  root: { display: 'flex', flexDirection: 'column', ...shorthands.gap('24px') },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', ...shorthands.gap('16px'), '@media (max-width: 768px)': { gridTemplateColumns: '1fr' } },
  card: {
    ...shorthands.padding('24px'),
    ...shorthands.borderRadius('8px'),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
  },
  sectionHeader: { display: 'flex', alignItems: 'center', ...shorthands.gap('8px'), marginBottom: '16px' },
  iconWrap: {
    width: '32px', height: '32px',
    ...shorthands.borderRadius('8px'),
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  listItem: {
    display: 'flex', alignItems: 'flex-start', ...shorthands.gap('8px'),
    ...shorthands.padding('4px', '0'),
  },
  bullet: {
    width: '6px', height: '6px', ...shorthands.borderRadius('50%'),
    flexShrink: 0, marginTop: '6px',
  },
});

const sections = [
  {
    title: 'Your Topics', icon: ListRegular, color: tokens.colorBrandForeground1, bg: tokens.colorBrandBackground2,
    items: ['Discuss workload and meeting load — feeling stretched', 'Ask about flexible schedule options', 'Share interest in cloud architecture learning', 'Clarify Q2 project expectations'],
  },
  {
    title: 'Coach Tips', icon: LightbulbRegular, color: tokens.colorPaletteBlueForeground2, bg: tokens.colorPaletteBlueBackground2,
    items: ['Start by sharing how you\'re feeling honestly — your lead wants to help', 'Frame concerns as opportunities: "I\'d love to invest more time in learning"', 'Be specific about what would make your week better', 'Ask about the team\'s priorities so you can align your goals'],
  },
  {
    title: 'Your Wins', icon: CheckmarkCircleRegular, color: tokens.colorPaletteGreenForeground1, bg: tokens.colorPaletteGreenBackground1,
    items: ['PR review throughput up 30%', 'Completed Advanced TypeScript course', 'Consistent code quality on recent tasks'],
  },
  {
    title: 'Questions to Ask', icon: QuestionCircleRegular, color: tokens.colorPaletteYellowForeground1, bg: tokens.colorPaletteYellowBackground1,
    items: ['What are the team priorities for next quarter?', 'Can we reduce my meeting load by 3-4 hours?', 'Is there a mentoring opportunity for cloud skills?', 'How is my overall performance being evaluated?'],
  },
];

const MemberOneOnOnePrep = () => {
  const s = useStyles();
  return (
    <div className={s.root}>
      <div>
        <Text size={600} weight="bold" block>1:1 Prep Assistant</Text>
        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>Prepare for your next meeting with your team lead</Text>
      </div>
      <div className={s.grid}>
        {sections.map(section => (
          <div key={section.title} className={s.card}>
            <div className={s.sectionHeader}>
              <div className={s.iconWrap} style={{ backgroundColor: section.bg, color: section.color }}>
                <section.icon style={{ fontSize: 16 }} />
              </div>
              <Text size={300} weight="semibold">{section.title}</Text>
            </div>
            {section.items.map((item, j) => (
              <div key={j} className={s.listItem}>
                <span className={s.bullet} style={{ backgroundColor: section.color }} />
                <Text size={200} style={{ color: tokens.colorNeutralForeground2 }}>{item}</Text>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberOneOnOnePrep;

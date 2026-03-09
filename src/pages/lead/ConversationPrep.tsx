import { useParams, Link } from 'react-router-dom';
import { makeStyles, tokens, shorthands, Text, Button } from '@fluentui/react-components';
import { ArrowLeftRegular, ListRegular, WarningRegular, CheckmarkCircleRegular, QuestionCircleRegular } from '@fluentui/react-icons';
import { alexConversationPrep, employees } from '@/mocks/data';

const useStyles = makeStyles({
  root: { display: 'flex', flexDirection: 'column', ...shorthands.gap('24px') },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', ...shorthands.gap('16px'), '@media (max-width: 768px)': { gridTemplateColumns: '1fr' } },
  card: {
    ...shorthands.padding('24px'),
    ...shorthands.borderRadius('8px'),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
  },
  iconWrap: {
    width: '32px', height: '32px',
    ...shorthands.borderRadius('8px'),
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  sectionHeader: { display: 'flex', alignItems: 'center', ...shorthands.gap('8px'), marginBottom: '16px' },
  listItem: {
    display: 'flex', alignItems: 'flex-start', ...shorthands.gap('8px'),
    ...shorthands.padding('4px', '0'),
  },
  bullet: {
    width: '6px', height: '6px', ...shorthands.borderRadius('50%'),
    flexShrink: 0, marginTop: '6px',
  },
});

const ConversationPrep = () => {
  const s = useStyles();
  const { employeeId } = useParams();
  const employee = employees.find(e => e.id === employeeId);
  const prep = alexConversationPrep;

  if (!employee) return <Text>Employee not found</Text>;

  const sections = [
    { title: 'Key Topics', items: prep.keyTopics, icon: <ListRegular />, color: tokens.colorBrandForeground1, bg: tokens.colorBrandBackground2 },
    { title: 'Risk Areas', items: prep.riskAreas, icon: <WarningRegular />, color: tokens.colorPaletteRedForeground1, bg: tokens.colorPaletteRedBackground1 },
    { title: 'Positive Highlights', items: prep.positiveHighlights, icon: <CheckmarkCircleRegular />, color: tokens.colorPaletteGreenForeground1, bg: tokens.colorPaletteGreenBackground1 },
    { title: 'Suggested Questions', items: prep.suggestedQuestions, icon: <QuestionCircleRegular />, color: tokens.colorPaletteBlueForeground2, bg: tokens.colorPaletteBlueBackground2 },
    { title: 'Action Items', items: prep.actionItems, icon: <ListRegular />, color: tokens.colorPaletteYellowForeground1, bg: tokens.colorPaletteYellowBackground1 },
  ];

  return (
    <div className={s.root}>
      <Link to={`/lead/team/${employeeId}`}>
        <Button appearance="subtle" icon={<ArrowLeftRegular />}>Back</Button>
      </Link>
      <div>
        <Text size={600} weight="bold" block>1:1 Conversation Prep</Text>
        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>AI-generated brief for your meeting with {prep.employeeName}</Text>
      </div>
      <div className={s.grid}>
        {sections.map(section => (
          <div key={section.title} className={s.card}>
            <div className={s.sectionHeader}>
              <div className={s.iconWrap} style={{ backgroundColor: section.bg, color: section.color }}>{section.icon}</div>
              <Text size={300} weight="semibold">{section.title}</Text>
            </div>
            {section.items.map((item, j) => (
              <div key={j} className={s.listItem}>
                <span className={s.bullet} style={{ backgroundColor: tokens.colorNeutralForeground3 }} />
                <Text size={200} style={{ color: tokens.colorNeutralForeground2 }}>{item}</Text>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversationPrep;

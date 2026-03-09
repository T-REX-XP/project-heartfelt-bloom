import { makeStyles, tokens, shorthands, Text, Badge } from '@fluentui/react-components';
import { BookRegular, ChatRegular, TargetRegular, ArrowTrendingRegular } from '@fluentui/react-icons';
import { learningRecommendations } from '@/mocks/data';

const typeIcons: Record<string, React.ElementType> = {
  course: BookRegular,
  mentoring: ChatRegular,
  certification: TargetRegular,
  project: ArrowTrendingRegular,
};

const useStyles = makeStyles({
  root: { display: 'flex', flexDirection: 'column', ...shorthands.gap('24px') },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', ...shorthands.gap('16px') },
  card: {
    ...shorthands.padding('20px'),
    ...shorthands.borderRadius('8px'),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
  },
  cardHeader: { display: 'flex', alignItems: 'flex-start', ...shorthands.gap('12px') },
  iconBox: {
    width: '40px', height: '40px', ...shorthands.borderRadius('8px'),
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  meta: { display: 'flex', alignItems: 'center', ...shorthands.gap('8px'), marginTop: '8px' },
});

const typeColors: Record<string, { bg: string; fg: string }> = {
  course:        { bg: '#DEECF9', fg: '#0078D4' },
  mentoring:     { bg: '#E8F5E9', fg: '#107C10' },
  certification: { bg: '#FFF8E1', fg: '#CA5010' },
  project:       { bg: '#F3E5F5', fg: '#6B2FA0' },
};

const priorityColors: Record<string, 'danger' | 'warning' | 'informative'> = {
  high: 'danger',
  medium: 'warning',
  low: 'informative',
};

const MemberLearning = () => {
  const s = useStyles();
  return (
    <div className={s.root}>
      <div>
        <Text size={600} weight="bold" block>Learning Recommendations</Text>
        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>Personalized learning paths based on your skill gaps and career goals</Text>
      </div>
      <div className={s.grid}>
        {learningRecommendations.map(rec => {
          const Icon = typeIcons[rec.type] || BookRegular;
          const colors = typeColors[rec.type] || typeColors.course;
          return (
            <div key={rec.id} className={s.card}>
              <div className={s.cardHeader}>
                <div className={s.iconBox} style={{ backgroundColor: colors.bg, color: colors.fg }}>
                  <Icon style={{ fontSize: 20 }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text size={300} weight="semibold">{rec.title}</Text>
                    <Badge appearance="filled" color={priorityColors[rec.priority] || 'informative'} size="small">
                      {rec.priority}
                    </Badge>
                  </div>
                  <Text size={200} style={{ color: tokens.colorNeutralForeground3, marginTop: 4 }} block>{rec.reason}</Text>
                  <div className={s.meta}>
                    <Text size={100} style={{ color: tokens.colorNeutralForeground3 }}>{rec.type}</Text>
                    <Text size={100} style={{ color: tokens.colorNeutralForeground3 }}>·</Text>
                    <Text size={100} style={{ color: tokens.colorNeutralForeground3 }}>{rec.skillArea}</Text>
                    <Text size={100} style={{ color: tokens.colorNeutralForeground3 }}>·</Text>
                    <Text size={100} style={{ color: tokens.colorNeutralForeground3 }}>{rec.estimatedHours}h</Text>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MemberLearning;
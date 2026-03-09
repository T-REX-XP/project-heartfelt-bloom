import { makeStyles, tokens, shorthands, Text, Tab, TabList, Badge, ProgressBar } from '@fluentui/react-components';
import { BookRegular, ChatRegular, TargetRegular, ArrowTrendingRegular } from '@fluentui/react-icons';
import { useState } from 'react';
import { QueryWrapper } from '@/components/QueryWrapper';
import { useIDPGoals, useLearningRecommendations } from '@/hooks/useApiQueries';

const skills = [
  { name: 'React', level: 82, target: 90 },
  { name: 'TypeScript', level: 75, target: 85 },
  { name: 'Node.js', level: 60, target: 80 },
  { name: 'Python', level: 45, target: 70 },
  { name: 'Cloud Architecture', level: 25, target: 60 },
  { name: 'System Design', level: 30, target: 65 },
  { name: 'Testing', level: 55, target: 75 },
  { name: 'CI/CD', level: 50, target: 70 },
];

const typeIcons: Record<string, React.ElementType> = { course: BookRegular, mentoring: ChatRegular, certification: TargetRegular, project: ArrowTrendingRegular };

const useStyles = makeStyles({
  root: { display: 'flex', flexDirection: 'column', ...shorthands.gap('24px') },
  card: {
    ...shorthands.padding('24px'),
    ...shorthands.borderRadius('8px'),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
  },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', ...shorthands.gap('16px'), '@media (max-width: 768px)': { gridTemplateColumns: '1fr' } },
  skillRow: { ...shorthands.padding('4px', '0') },
  skillBarBg: {
    position: 'relative' as const, height: '12px',
    ...shorthands.borderRadius('6px'),
    backgroundColor: tokens.colorNeutralBackground5,
    overflow: 'hidden',
  },
  skillBarTarget: {
    position: 'absolute' as const, top: 0, left: 0, height: '100%',
    ...shorthands.borderRadius('6px'),
    backgroundColor: tokens.colorNeutralStroke3,
  },
  skillBarCurrent: {
    position: 'absolute' as const, top: 0, left: 0, height: '100%',
    ...shorthands.borderRadius('6px'),
  },
});

const MemberIDP = () => {
  const s = useStyles();
  const [tab, setTab] = useState('goals');
  const goalsQuery = useIDPGoals();
  const learningQuery = useLearningRecommendations();

  return (
    <div className={s.root}>
      <div>
        <Text size={600} weight="bold" block>Individual Development Plan</Text>
        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>Track your growth, learning, and skill development</Text>
      </div>

      <TabList selectedValue={tab} onTabSelect={(_, d) => setTab(d.value as string)}>
        <Tab value="goals">Dev Plan</Tab>
        <Tab value="learning">Learning</Tab>
        <Tab value="skills">Skills</Tab>
      </TabList>

      {tab === 'goals' && (
        <QueryWrapper query={goalsQuery} emptyMessage="No goals set yet.">
          {(goals) => (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {goals.map(goal => (
                <div key={goal.id} className={s.card}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text size={400} weight="semibold">{goal.title}</Text>
                    <Badge appearance="outline" color={goal.status === 'on-track' ? 'success' : goal.status === 'behind' ? 'danger' : 'warning'} size="small">{goal.status}</Badge>
                  </div>
                  <Text size={200} style={{ color: tokens.colorNeutralForeground2 }} block>{goal.description}</Text>
                  <ProgressBar value={goal.progress / 100} thickness="medium" style={{ marginTop: 12 }}
                    color={goal.status === 'on-track' ? 'success' : goal.status === 'behind' ? 'error' : 'warning'} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                    <Text size={100} style={{ color: tokens.colorNeutralForeground3 }}>{goal.skillArea}</Text>
                    <Text size={100} style={{ color: tokens.colorNeutralForeground3 }}>{goal.progress}% · Target: {goal.targetDate}</Text>
                  </div>
                </div>
              ))}
            </div>
          )}
        </QueryWrapper>
      )}

      {tab === 'learning' && (
        <QueryWrapper query={learningQuery} emptyMessage="No learning recommendations yet.">
          {(recs) => (
            <div className={s.grid}>
              {recs.map(rec => {
                const Icon = typeIcons[rec.type] || BookRegular;
                return (
                  <div key={rec.id} className={s.card}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: 8,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        backgroundColor: tokens.colorBrandBackground2,
                        color: tokens.colorBrandForeground1,
                        flexShrink: 0,
                      }}>
                        <Icon style={{ fontSize: 20 }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <Text size={300} weight="semibold">{rec.title}</Text>
                          <Badge appearance="outline" color={rec.priority === 'high' ? 'danger' : rec.priority === 'medium' ? 'warning' : 'informative'} size="small">{rec.priority}</Badge>
                        </div>
                        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }} block>{rec.reason}</Text>
                        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
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
          )}
        </QueryWrapper>
      )}

      {tab === 'skills' && (
        <div className={s.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <Text size={300} weight="semibold">Skills Coverage</Text>
            <div style={{ display: 'flex', gap: 16 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: tokens.colorNeutralForeground3 }}>
                <span style={{ width: 12, height: 6, borderRadius: 3, backgroundColor: tokens.colorBrandBackground, display: 'inline-block' }} /> Current
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: tokens.colorNeutralForeground3 }}>
                <span style={{ width: 12, height: 6, borderRadius: 3, backgroundColor: tokens.colorNeutralStroke3, display: 'inline-block' }} /> Target
              </span>
            </div>
          </div>
          {skills.map(skill => {
            const barColor = skill.level >= skill.target * 0.8 ? tokens.colorPaletteGreenBackground3 :
              skill.level >= skill.target * 0.5 ? tokens.colorPaletteYellowBackground3 :
              tokens.colorPaletteRedBackground3;
            return (
              <div key={skill.name} className={s.skillRow}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <Text size={300}>{skill.name}</Text>
                  <Text size={100} style={{ color: tokens.colorNeutralForeground3 }}>{skill.level} / {skill.target}</Text>
                </div>
                <div className={s.skillBarBg}>
                  <span className={s.skillBarTarget} style={{ width: `${skill.target}%` }} />
                  <span className={s.skillBarCurrent} style={{ width: `${skill.level}%`, backgroundColor: barColor }} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MemberIDP;

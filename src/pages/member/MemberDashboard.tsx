import { makeStyles, tokens, shorthands, Text, Button, ProgressBar } from '@fluentui/react-components';
import { BookRegular, ChatSparkleRegular, ClockRegular } from '@fluentui/react-icons';
import { Link } from 'react-router-dom';
import KPICard from '@/components/KPICard';
import SignalCard from '@/components/SignalCard';
import { teamMemberSignals, learningRecommendations, idpGoals } from '@/mocks/data';
import type { KPI } from '@/domain/types';

const useStyles = makeStyles({
  root: { display: 'flex', flexDirection: 'column', ...shorthands.gap('24px') },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  kpiGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', ...shorthands.gap('16px') },
  twoCol: { display: 'grid', gridTemplateColumns: '1fr 1fr', ...shorthands.gap('32px'), '@media (max-width: 900px)': { gridTemplateColumns: '1fr' } },
  section: { display: 'flex', flexDirection: 'column', ...shorthands.gap('12px') },
  sectionHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  card: {
    ...shorthands.padding('16px'),
    ...shorthands.borderRadius('8px'),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
  },
  recRow: {
    display: 'flex', alignItems: 'center', ...shorthands.gap('12px'),
    ...shorthands.padding('12px'),
    ...shorthands.borderRadius('8px'),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
  },
  workloadGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', ...shorthands.gap('16px'), textAlign: 'center' as const },
});

const personalKPIs: KPI[] = [
  { id: 'p-wellbeing', name: 'Well-being', value: 42, previousValue: 55, status: 'red', trend: -23.6, category: 'wellbeing' },
  { id: 'p-skills', name: 'Skills', value: 65, previousValue: 60, status: 'yellow', trend: 8.3, category: 'skills' },
  { id: 'p-motivation', name: 'Motivation', value: 48, previousValue: 65, status: 'red', trend: -26.2, category: 'motivation' },
  { id: 'p-delivery', name: 'Delivery', value: 55, previousValue: 68, status: 'yellow', trend: -19.1, category: 'delivery' },
];

const MemberDashboard = () => {
  const s = useStyles();

  return (
    <div className={s.root}>
      <div className={s.header}>
        <div>
          <Text size={600} weight="bold" block>Your Dashboard</Text>
          <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>Personal intelligence and growth insights</Text>
        </div>
        <Link to="/member/coach">
          <Button appearance="primary" icon={<ChatSparkleRegular />}>AI Coach</Button>
        </Link>
      </div>

      <div className={s.kpiGrid}>
        {personalKPIs.map((kpi, i) => <KPICard key={kpi.id} kpi={kpi} index={i} />)}
      </div>

      <div className={s.twoCol}>
        <div className={s.section}>
          <div className={s.sectionHeader}>
            <Text size={400} weight="semibold">Your Signals</Text>
            <Link to="/member/signals" style={{ color: tokens.colorBrandForeground1, fontSize: 13, textDecoration: 'none' }}>View All</Link>
          </div>
          {teamMemberSignals.map((signal, i) => <SignalCard key={signal.id} signal={signal} index={i} />)}
        </div>

        <div className={s.section}>
          <div className={s.sectionHeader}>
            <Text size={400} weight="semibold">Development Plan</Text>
            <Link to="/member/idp" style={{ color: tokens.colorBrandForeground1, fontSize: 13, textDecoration: 'none' }}>View Full IDP</Link>
          </div>
          {idpGoals.slice(0, 3).map(goal => (
            <div key={goal.id} className={s.card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text size={300} weight="medium">{goal.title}</Text>
                <Badge appearance="outline" color={goal.status === 'on-track' ? 'success' : goal.status === 'behind' ? 'danger' : 'warning'} size="small">{goal.status}</Badge>
              </div>
              <ProgressBar value={goal.progress / 100} thickness="medium" color={goal.status === 'on-track' ? 'success' : goal.status === 'behind' ? 'error' : 'warning'} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                <Text size={100} style={{ color: tokens.colorNeutralForeground3 }}>{goal.skillArea}</Text>
                <Text size={100} style={{ color: tokens.colorNeutralForeground3 }}>{goal.progress}%</Text>
              </div>
            </div>
          ))}

          <div className={s.sectionHeader} style={{ marginTop: 16 }}>
            <Text size={400} weight="semibold">Recommended Learning</Text>
          </div>
          {learningRecommendations.slice(0, 3).map(rec => (
            <div key={rec.id} className={s.recRow}>
              <BookRegular style={{ color: tokens.colorBrandForeground1, fontSize: 18, flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <Text size={300} weight="medium" truncate block>{rec.title}</Text>
                <Text size={100} style={{ color: tokens.colorNeutralForeground3 }}>{rec.skillArea} · {rec.estimatedHours}h</Text>
              </div>
              <Badge appearance="outline" color={rec.priority === 'high' ? 'danger' : rec.priority === 'medium' ? 'warning' : 'informative'} size="small">{rec.priority}</Badge>
            </div>
          ))}

          <div className={s.card} style={{ marginTop: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <ClockRegular style={{ color: tokens.colorPaletteYellowForeground1 }} />
              <Text size={200} weight="medium" style={{ color: tokens.colorNeutralForeground3 }}>This Week</Text>
            </div>
            <div className={s.workloadGrid}>
              <div>
                <div style={{ fontSize: 22, fontWeight: 700, color: tokens.colorPaletteYellowForeground1 }}>48h</div>
                <Text size={100} style={{ color: tokens.colorNeutralForeground3, textTransform: 'uppercase' }}>Hours Worked</Text>
              </div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 700, color: tokens.colorPaletteRedForeground1 }}>18h</div>
                <Text size={100} style={{ color: tokens.colorNeutralForeground3, textTransform: 'uppercase' }}>In Meetings</Text>
              </div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 700, color: tokens.colorPaletteGreenForeground1 }}>3</div>
                <Text size={100} style={{ color: tokens.colorNeutralForeground3, textTransform: 'uppercase' }}>PRs Merged</Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Need Badge import
import { Badge } from '@fluentui/react-components';

export default MemberDashboard;

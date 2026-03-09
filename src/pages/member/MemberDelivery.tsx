import { makeStyles, tokens, shorthands, Text } from '@fluentui/react-components';
import { ClockRegular, BranchRegular, CheckmarkSquareRegular, CalendarRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  root: { display: 'flex', flexDirection: 'column', ...shorthands.gap('24px') },
  metricsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', ...shorthands.gap('16px') },
  metricCard: {
    textAlign: 'center' as const,
    ...shorthands.padding('20px'),
    ...shorthands.borderRadius('8px'),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
  },
  card: {
    ...shorthands.padding('24px'),
    ...shorthands.borderRadius('8px'),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
  },
  sprintRow: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    ...shorthands.padding('8px', '0'),
    borderBottom: `1px solid ${tokens.colorNeutralStroke3}`,
    ':last-child': { borderBottom: 'none' },
  },
});

const metrics = [
  { label: 'Hours This Week', value: '48h', icon: ClockRegular, color: tokens.colorPaletteYellowForeground1 },
  { label: 'PRs Merged', value: '3', icon: BranchRegular, color: tokens.colorPaletteGreenForeground1 },
  { label: 'Tasks Completed', value: '7', icon: CheckmarkSquareRegular, color: tokens.colorPaletteBlueForeground2 },
  { label: 'Meetings', value: '18h', icon: CalendarRegular, color: tokens.colorPaletteRedForeground1 },
];

const sprints = [
  { sprint: 'Sprint 12 (Current)', tasks: 7, points: 13, status: 'In Progress' },
  { sprint: 'Sprint 11', tasks: 5, points: 10, status: 'Completed' },
  { sprint: 'Sprint 10', tasks: 8, points: 16, status: 'Completed' },
];

const MemberDelivery = () => {
  const s = useStyles();
  return (
    <div className={s.root}>
      <div>
        <Text size={600} weight="bold" block>Your Delivery</Text>
        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>Contribution highlights and workload metrics</Text>
      </div>

      <div className={s.metricsGrid}>
        {metrics.map(m => (
          <div key={m.label} className={s.metricCard}>
            <m.icon style={{ fontSize: 24, color: m.color, marginBottom: 8 }} />
            <div style={{ fontSize: 22, fontWeight: 700, color: m.color }}>{m.value}</div>
            <Text size={100} style={{ color: tokens.colorNeutralForeground3, marginTop: 4 }}>{m.label}</Text>
          </div>
        ))}
      </div>

      <div className={s.card}>
        <Text size={400} weight="semibold" block style={{ marginBottom: 16 }}>Sprint Contributions</Text>
        {sprints.map((sp, i) => (
          <div key={i} className={s.sprintRow}>
            <Text size={300}>{sp.sprint}</Text>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>{sp.tasks} tasks</Text>
              <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>{sp.points} pts</Text>
              <Text size={200} weight="medium" style={{ color: sp.status === 'Completed' ? tokens.colorPaletteGreenForeground1 : tokens.colorPaletteBlueForeground2 }}>{sp.status}</Text>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberDelivery;

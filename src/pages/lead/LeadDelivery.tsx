import { makeStyles, tokens, shorthands, Text, ProgressBar } from '@fluentui/react-components';
import { employees } from '@/mocks/data';

const useStyles = makeStyles({
  root: { display: 'flex', flexDirection: 'column', ...shorthands.gap('24px') },
  sprintGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', ...shorthands.gap('16px') },
  card: {
    ...shorthands.padding('20px'),
    ...shorthands.borderRadius('8px'),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
  },
  empRow: {
    display: 'flex', alignItems: 'center', ...shorthands.gap('16px'),
    ...shorthands.padding('8px', '0'),
  },
  empName: { width: '120px', flexShrink: 0 },
  barWrap: { flex: 1 },
  score: { width: '40px', textAlign: 'right' as const, fontWeight: tokens.fontWeightBold },
});

const deliveryData = [
  { name: 'Sprint 10', completion: 92, velocity: 48 },
  { name: 'Sprint 11', completion: 85, velocity: 44 },
  { name: 'Sprint 12', completion: 78, velocity: 39 },
];

const scoreColor = (v: number) =>
  v >= 80 ? tokens.colorPaletteGreenForeground1 :
  v >= 60 ? tokens.colorPaletteYellowForeground1 :
  tokens.colorPaletteRedForeground1;

const LeadDelivery = () => {
  const s = useStyles();
  return (
    <div className={s.root}>
      <div className={s.sprintGrid}>
        {deliveryData.map(sprint => (
          <div key={sprint.name} className={s.card}>
            <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>{sprint.name}</Text>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, marginTop: 8 }}>
              <div>
                <div style={{ fontSize: 28, fontWeight: 700, color: scoreColor(sprint.completion) }}>{sprint.completion}%</div>
                <Text size={100} style={{ color: tokens.colorNeutralForeground3 }}>Completion</Text>
              </div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 700 }}>{sprint.velocity}</div>
                <Text size={100} style={{ color: tokens.colorNeutralForeground3 }}>Story Points</Text>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={s.card}>
        <Text size={400} weight="semibold" block style={{ marginBottom: 16 }}>Individual Delivery Scores</Text>
        {employees.map(emp => (
          <div key={emp.id} className={s.empRow}>
            <Text size={300} className={s.empName} truncate>{emp.name}</Text>
            <div className={s.barWrap}>
              <ProgressBar
                value={emp.deliveryScore / 100}
                color={emp.deliveryScore >= 80 ? 'success' : emp.deliveryScore >= 60 ? 'warning' : 'error'}
                thickness="large"
              />
            </div>
            <Text size={300} className={s.score} style={{ color: scoreColor(emp.deliveryScore) }}>{emp.deliveryScore}</Text>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeadDelivery;

import { makeStyles, tokens, shorthands, Text } from '@fluentui/react-components';
import { WarningRegular } from '@fluentui/react-icons';
import { employees, teamSummary } from '@/mocks/data';

const useStyles = makeStyles({
  root: { display: 'flex', flexDirection: 'column', ...shorthands.gap('24px') },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', ...shorthands.gap('16px') },
  card: {
    ...shorthands.padding('20px'),
    ...shorthands.borderRadius('8px'),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
  },
  tableWrap: {
    ...shorthands.borderRadius('8px'),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
    overflowX: 'auto',
  },
  table: { width: '100%', borderCollapse: 'collapse' as const, fontSize: '13px' },
  th: {
    textAlign: 'left' as const,
    ...shorthands.padding('10px', '16px'),
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    fontSize: '11px', fontWeight: 600,
    color: tokens.colorNeutralForeground3,
    textTransform: 'uppercase' as const,
  },
  td: {
    ...shorthands.padding('10px', '16px'),
    borderBottom: `1px solid ${tokens.colorNeutralStroke3}`,
  },
});

const scoreColor = (v: number, invert = false) => {
  if (invert) return v > 60 ? tokens.colorPaletteRedForeground1 : v > 30 ? tokens.colorPaletteYellowForeground1 : tokens.colorPaletteGreenForeground1;
  return v >= 70 ? tokens.colorPaletteGreenForeground1 : v >= 50 ? tokens.colorPaletteYellowForeground1 : tokens.colorPaletteRedForeground1;
};

const ChurnRisk = () => {
  const s = useStyles();
  const sorted = [...employees].sort((a, b) => b.churnRisk - a.churnRisk);

  return (
    <div className={s.root}>
      <div>
        <Text size={600} weight="bold" block>Churn Risk & Retention</Text>
        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>Financial impact and preventability analysis</Text>
      </div>

      <div className={s.statsGrid}>
        <div className={s.card}>
          <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>Churn Exposure</Text>
          <div style={{ fontSize: 28, fontWeight: 700, color: tokens.colorPaletteRedForeground1 }}>${(teamSummary.churnExposure / 1000)}k</div>
        </div>
        <div className={s.card}>
          <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>Absence Cost</Text>
          <div><span style={{ fontSize: 28, fontWeight: 700, color: tokens.colorPaletteYellowForeground1 }}>${(teamSummary.absenceCost / 1000)}k</span>
            <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>/yr</Text></div>
        </div>
        <div className={s.card}>
          <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>Preventability</Text>
          <div style={{ fontSize: 28, fontWeight: 700, color: tokens.colorPaletteGreenForeground1 }}>72%</div>
        </div>
      </div>

      <div className={s.tableWrap}>
        <table className={s.table}>
          <thead>
            <tr>
              <th className={s.th} colSpan={2}>Employee</th>
              <th className={s.th}>Churn Risk</th>
              <th className={s.th}>Wellbeing</th>
              <th className={s.th}>Motivation</th>
              <th className={s.th}>Est. Replace Cost</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(emp => (
              <tr key={emp.id}>
                <td className={s.td} colSpan={2}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {emp.churnRisk > 60 && <WarningRegular style={{ color: tokens.colorPaletteRedForeground1, fontSize: 14 }} />}
                    <div>
                      <Text size={300} weight="medium" block>{emp.name}</Text>
                      <Text size={100} style={{ color: tokens.colorNeutralForeground3 }}>{emp.role}</Text>
                    </div>
                  </div>
                </td>
                <td className={s.td} style={{ fontWeight: 700, color: scoreColor(emp.churnRisk, true) }}>{emp.churnRisk}%</td>
                <td className={s.td} style={{ color: scoreColor(emp.wellbeingScore) }}>{emp.wellbeingScore}</td>
                <td className={s.td} style={{ color: scoreColor(emp.motivationScore) }}>{emp.motivationScore}</td>
                <td className={s.td} style={{ color: tokens.colorNeutralForeground3 }}>${emp.churnRisk > 60 ? '85k' : emp.churnRisk > 30 ? '60k' : '45k'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChurnRisk;

import { motion } from 'framer-motion';
import type { Employee } from '@/domain/types';
import { makeStyles, tokens, shorthands, mergeClasses, Avatar } from '@fluentui/react-components';
import { WarningRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  card: {
    ...shorthands.padding('16px'),
    ...shorthands.borderRadius('8px'),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
    cursor: 'pointer',
    transition: 'all 150ms',
    ':hover': { backgroundColor: tokens.colorNeutralBackground1Hover, transform: 'translateY(-1px)' },
  },
  header: { display: 'flex', alignItems: 'center', ...shorthands.gap('12px'), marginBottom: '12px' },
  info: { flex: 1 },
  name: { fontSize: tokens.fontSizeBase300, fontWeight: tokens.fontWeightSemibold, color: tokens.colorNeutralForeground1 },
  role: { fontSize: tokens.fontSizeBase100, color: tokens.colorNeutralForeground3 },
  risk: { display: 'flex', alignItems: 'center', ...shorthands.gap('4px'), fontSize: tokens.fontSizeBase100, fontWeight: tokens.fontWeightSemibold, color: tokens.colorPaletteRedForeground1 },
  metrics: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', ...shorthands.gap('8px') },
  metric: { textAlign: 'center' },
  metricValue: { fontSize: tokens.fontSizeBase400, fontWeight: tokens.fontWeightBold },
  metricLabel: { fontSize: '10px', color: tokens.colorNeutralForeground4, textTransform: 'uppercase' as const, letterSpacing: '0.3px' },
  green: { color: tokens.colorPaletteGreenForeground1 },
  yellow: { color: tokens.colorPaletteYellowForeground1 },
  red: { color: tokens.colorPaletteRedForeground1 },
  churnBar: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    ...shorthands.padding('6px', '12px'), ...shorthands.borderRadius('6px'),
    backgroundColor: tokens.colorPaletteRedBackground1, marginTop: '12px',
  },
});

const EmployeeCard = ({ employee, index = 0, onClick }: { employee: Employee; index?: number; onClick?: () => void }) => {
  const s = useStyles();
  const colorClass = (v: number) => v >= 70 ? s.green : v >= 50 ? s.yellow : s.red;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
      className={s.card}
    >
      <div className={s.header}>
        <Avatar name={employee.name} color="brand" size={36} />
        <div className={s.info}>
          <div className={s.name}>{employee.name}</div>
          <div className={s.role}>{employee.role} · {employee.tenure}</div>
        </div>
        {employee.status === 'red' && (
          <div className={s.risk}><WarningRegular style={{ fontSize: 14 }} /> At Risk</div>
        )}
      </div>
      <div className={s.metrics}>
        {[
          { label: 'Well-being', value: employee.wellbeingScore },
          { label: 'Skills', value: employee.skillsScore },
          { label: 'Motivation', value: employee.motivationScore },
          { label: 'Delivery', value: employee.deliveryScore },
        ].map(m => (
          <div key={m.label} className={s.metric}>
            <div className={mergeClasses(s.metricValue, colorClass(m.value))}>{m.value}</div>
            <div className={s.metricLabel}>{m.label}</div>
          </div>
        ))}
      </div>
      {employee.churnRisk > 50 && (
        <div className={s.churnBar}>
          <span style={{ fontSize: 12, color: tokens.colorNeutralForeground3 }}>Churn Risk</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: tokens.colorPaletteRedForeground1 }}>{employee.churnRisk}%</span>
        </div>
      )}
    </motion.div>
  );
};

export default EmployeeCard;

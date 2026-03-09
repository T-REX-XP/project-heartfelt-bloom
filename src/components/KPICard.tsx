import { motion } from 'framer-motion';
import type { KPI } from '@/domain/types';
import { makeStyles, tokens, shorthands, mergeClasses, Badge } from '@fluentui/react-components';
import { ArrowTrendingRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  card: {
    ...shorthands.padding('20px'),
    ...shorthands.borderRadius('8px'),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
    cursor: 'pointer',
    transition: 'all 150ms',
    ':hover': { transform: 'translateY(-2px)', boxShadow: tokens.shadow4 },
  },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' },
  label: { fontSize: tokens.fontSizeBase200, fontWeight: tokens.fontWeightMedium, color: tokens.colorNeutralForeground3 },
  valueRow: { display: 'flex', alignItems: 'flex-end', ...shorthands.gap('12px') },
  value: { fontSize: '32px', fontWeight: tokens.fontWeightBold, lineHeight: 1 },
  trend: { display: 'flex', alignItems: 'center', ...shorthands.gap('4px'), fontSize: tokens.fontSizeBase200, marginBottom: '4px' },
  subKPIs: { marginTop: '16px', display: 'flex', flexDirection: 'column', ...shorthands.gap('8px') },
  subRow: { display: 'flex', justifyContent: 'space-between', fontSize: tokens.fontSizeBase200 },
  subLabel: { color: tokens.colorNeutralForeground3 },
  green: { color: tokens.colorPaletteGreenForeground1 },
  yellow: { color: tokens.colorPaletteYellowForeground1 },
  red: { color: tokens.colorPaletteRedForeground1 },
});

const KPICard = ({ kpi, index = 0 }: { kpi: KPI; index?: number }) => {
  const s = useStyles();
  const statusClass = kpi.status === 'green' ? s.green : kpi.status === 'yellow' ? s.yellow : s.red;
  const trendColor = kpi.trend > 0 ? s.green : kpi.trend < 0 ? s.red : undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={s.card}
    >
      <div className={s.header}>
        <span className={s.label}>{kpi.name}</span>
        <Badge
          size="small"
          appearance="filled"
          color={kpi.status === 'green' ? 'success' : kpi.status === 'yellow' ? 'warning' : 'danger'}
        >
          {kpi.status}
        </Badge>
      </div>
      <div className={s.valueRow}>
        <span className={mergeClasses(s.value, statusClass)}>{kpi.value}</span>
        <div className={mergeClasses(s.trend, trendColor)}>
          <ArrowTrendingRegular style={{ fontSize: 16, transform: kpi.trend < 0 ? 'scaleY(-1)' : undefined }} />
          <span>{Math.abs(kpi.trend)}%</span>
        </div>
      </div>
      {kpi.subKPIs && (
        <div className={s.subKPIs}>
          {kpi.subKPIs.map(sub => (
            <div key={sub.id} className={s.subRow}>
              <span className={s.subLabel}>{sub.name}</span>
              <span className={sub.status === 'green' ? s.green : sub.status === 'yellow' ? s.yellow : s.red} style={{ fontWeight: 600 }}>
                {sub.value}{sub.unit ?? ''}
              </span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default KPICard;

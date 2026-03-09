import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Signal } from '@/domain/types';
import { makeStyles, tokens, shorthands, mergeClasses } from '@fluentui/react-components';
import { WarningRegular, InfoRegular, CheckmarkCircleRegular, ArrowRightRegular, ErrorCircleRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  card: {
    ...shorthands.padding('16px'),
    ...shorthands.borderRadius('8px'),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
    borderLeftWidth: '4px',
    cursor: 'pointer',
    transition: 'background 150ms',
    ':hover': { backgroundColor: tokens.colorNeutralBackground1Hover },
  },
  critical: { borderLeftColor: tokens.colorPaletteRedBorder1 },
  warning: { borderLeftColor: tokens.colorPaletteYellowBorder1 },
  info: { borderLeftColor: tokens.colorPaletteBlueBorder2 },
  positive: { borderLeftColor: tokens.colorPaletteGreenBorder1 },
  unread: { boxShadow: `inset 0 0 0 1px ${tokens.colorBrandStroke1}` },
  row: { display: 'flex', alignItems: 'flex-start', ...shorthands.gap('12px') },
  iconBox: {
    width: '32px', height: '32px', ...shorthands.borderRadius('6px'),
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  criticalIcon: { backgroundColor: tokens.colorPaletteRedBackground1, color: tokens.colorPaletteRedForeground1 },
  warningIcon: { backgroundColor: tokens.colorPaletteYellowBackground1, color: tokens.colorPaletteYellowForeground1 },
  infoIcon: { backgroundColor: tokens.colorPaletteBlueBackground1, color: tokens.colorPaletteBlueForeground1 },
  positiveIcon: { backgroundColor: tokens.colorPaletteGreenBackground1, color: tokens.colorPaletteGreenForeground1 },
  content: { flex: 1, minWidth: 0 },
  titleRow: { display: 'flex', alignItems: 'center', ...shorthands.gap('8px'), marginBottom: '4px' },
  title: { fontSize: tokens.fontSizeBase300, fontWeight: tokens.fontWeightSemibold, color: tokens.colorNeutralForeground1 },
  dot: { width: '8px', height: '8px', ...shorthands.borderRadius('50%'), backgroundColor: tokens.colorBrandBackground },
  desc: { fontSize: tokens.fontSizeBase200, color: tokens.colorNeutralForeground3, lineHeight: tokens.lineHeightBase200 },
  footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' },
  time: { fontSize: tokens.fontSizeBase100, color: tokens.colorNeutralForeground4 },
  action: {
    display: 'flex', alignItems: 'center', ...shorthands.gap('4px'),
    fontSize: tokens.fontSizeBase100, fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1, textDecoration: 'none',
    ':hover': { textDecoration: 'underline' },
  },
});

const severityIcons = {
  critical: WarningRegular,
  warning: ErrorCircleRegular,
  info: InfoRegular,
  positive: CheckmarkCircleRegular,
};

function getActionUrl(signal: Signal): string | null {
  if (!signal.employeeId) return null;
  if (signal.actionLabel === 'Prepare 1:1') return `/lead/one-on-ones?employee=${signal.employeeId}`;
  return `/lead/team/${signal.employeeId}`;
}

const SignalCard = ({ signal, index = 0 }: { signal: Signal; index?: number }) => {
  const styles = useStyles();
  const Icon = severityIcons[signal.severity];
  const actionUrl = getActionUrl(signal);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 }}
      className={mergeClasses(
        styles.card,
        styles[signal.severity],
        !signal.isRead && styles.unread,
      )}
    >
      <div className={styles.row}>
        <div className={mergeClasses(styles.iconBox, styles[`${signal.severity}Icon`])}>
          <Icon style={{ fontSize: 16 }} />
        </div>
        <div className={styles.content}>
          <div className={styles.titleRow}>
            <span className={styles.title}>{signal.title}</span>
            {!signal.isRead && <span className={mergeClasses(styles.dot, 'signal-pulse')} />}
          </div>
          <p className={styles.desc}>{signal.description}</p>
          <div className={styles.footer}>
            <span className={styles.time}>{signal.timestamp}</span>
            {signal.actionLabel && actionUrl && (
              <Link to={actionUrl} className={styles.action}>
                {signal.actionLabel} <ArrowRightRegular style={{ fontSize: 12 }} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SignalCard;

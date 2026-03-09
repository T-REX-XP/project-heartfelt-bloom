import { makeStyles, tokens, shorthands, Text, ProgressBar } from '@fluentui/react-components';

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

const useStyles = makeStyles({
  root: { display: 'flex', flexDirection: 'column', ...shorthands.gap('24px') },
  card: {
    ...shorthands.padding('24px'),
    ...shorthands.borderRadius('8px'),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
  },
  legend: { display: 'flex', alignItems: 'center', ...shorthands.gap('16px') },
  legendDot: { width: 12, height: 6, ...shorthands.borderRadius('3px'), display: 'inline-block' },
  skillRow: { display: 'flex', flexDirection: 'column', ...shorthands.gap('4px'), marginTop: '16px' },
  skillHeader: { display: 'flex', justifyContent: 'space-between' },
  barWrap: { position: 'relative' as const, height: '12px', ...shorthands.borderRadius('6px'), backgroundColor: tokens.colorNeutralBackground4, overflow: 'hidden' },
  barTarget: { position: 'absolute' as const, top: 0, left: 0, height: '100%', ...shorthands.borderRadius('6px'), backgroundColor: tokens.colorNeutralStroke2 },
  barCurrent: { position: 'absolute' as const, top: 0, left: 0, height: '100%', ...shorthands.borderRadius('6px') },
});

const getBarColor = (level: number, target: number) => {
  const ratio = level / target;
  if (ratio >= 0.8) return '#107C10';
  if (ratio >= 0.5) return '#CA5010';
  return '#D13438';
};

const MemberSkills = () => {
  const s = useStyles();
  return (
    <div className={s.root}>
      <div>
        <Text size={600} weight="bold" block>Skills Profile</Text>
        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>Your current skills coverage and gap analysis</Text>
      </div>

      <div className={s.card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <Text size={300} weight="semibold">Skills Coverage</Text>
          <div className={s.legend}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: tokens.colorNeutralForeground3 }}>
              <span className={s.legendDot} style={{ backgroundColor: '#0078D4' }} /> Current
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: tokens.colorNeutralForeground3 }}>
              <span className={s.legendDot} style={{ backgroundColor: tokens.colorNeutralStroke2 }} /> Target
            </span>
          </div>
        </div>

        {skills.map(skill => (
          <div key={skill.name} className={s.skillRow}>
            <div className={s.skillHeader}>
              <Text size={300}>{skill.name}</Text>
              <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>{skill.level} / {skill.target}</Text>
            </div>
            <div className={s.barWrap}>
              <div className={s.barTarget} style={{ width: `${skill.target}%` }} />
              <div className={s.barCurrent} style={{ width: `${skill.level}%`, backgroundColor: getBarColor(skill.level, skill.target) }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberSkills;
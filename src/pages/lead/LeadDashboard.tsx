import { makeStyles, tokens, shorthands, Text, Badge, Button as FluentButton } from '@fluentui/react-components';
import { BotSparkleRegular, ArrowRightRegular, WarningRegular } from '@fluentui/react-icons';
import { Link } from 'react-router-dom';
import KPICard from '@/components/KPICard';
import SignalCard from '@/components/SignalCard';
import EmployeeCard from '@/components/EmployeeCard';
import CopilotPanel from '@/components/CopilotPanel';
import { teamLeadKPIs, teamLeadSignals, employees, teamSummary } from '@/mocks/data';

const useStyles = makeStyles({
  root: { display: 'flex', flexDirection: 'column', ...shorthands.gap('24px') },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  banner: {
    display: 'flex', alignItems: 'center', ...shorthands.gap('12px'),
    ...shorthands.padding('12px', '16px'),
    ...shorthands.borderRadius('8px'),
    backgroundColor: tokens.colorPaletteRedBackground1,
    ...shorthands.border('1px', 'solid', tokens.colorPaletteRedBorder1),
  },
  kpiGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    ...shorthands.gap('16px'),
  },
  riskGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    ...shorthands.gap('16px'),
  },
  riskCard: {
    ...shorthands.padding('20px'),
    ...shorthands.borderRadius('8px'),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
  },
  riskValue: { fontSize: '28px', fontWeight: tokens.fontWeightBold },
  twoCol: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    ...shorthands.gap('32px'),
    '@media (max-width: 900px)': { gridTemplateColumns: '1fr' },
  },
  section: { display: 'flex', flexDirection: 'column', ...shorthands.gap('12px') },
  sectionHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  prepItem: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    ...shorthands.padding('12px'),
    ...shorthands.borderRadius('8px'),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
    textDecoration: 'none',
    ':hover': { backgroundColor: tokens.colorNeutralBackground1Hover },
  },
});

const LeadDashboard = () => {
  const s = useStyles();
  const atRiskEmployees = employees.filter(e => e.status === 'red');
  const unreadSignals = teamLeadSignals.filter(s => !s.isRead);

  return (
    <div className={s.root}>
      <div className={s.header}>
        <div>
          <Text size={600} weight="bold" block>Team Dashboard</Text>
          <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
            Intelligence overview for your team of {teamSummary.totalMembers}
          </Text>
        </div>
        <CopilotPanel>
          <FluentButton appearance="primary" icon={<BotSparkleRegular />}>Ask Copilot</FluentButton>
        </CopilotPanel>
      </div>

      {unreadSignals.length > 0 && (
        <div className={s.banner}>
          <WarningRegular style={{ color: tokens.colorPaletteRedForeground1, fontSize: 20 }} />
          <Text size={300} weight="semibold">{unreadSignals.length} urgent signals require attention</Text>
          <Link to="/lead/wellbeing-risks" style={{ marginLeft: 'auto', color: tokens.colorBrandForeground1, fontSize: 13 }}>
            View All →
          </Link>
        </div>
      )}

      <div className={s.kpiGrid}>
        {teamLeadKPIs.map((kpi, i) => (
          <KPICard key={kpi.id} kpi={kpi} index={i} />
        ))}
      </div>

      <div className={s.riskGrid}>
        <div className={s.riskCard}>
          <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>At-Risk Employees</Text>
          <div><span className={s.riskValue} style={{ color: tokens.colorPaletteRedForeground1 }}>{teamSummary.atRiskCount}</span>
            <Text size={200} style={{ color: tokens.colorNeutralForeground3, marginLeft: 8 }}>of {teamSummary.totalMembers}</Text></div>
        </div>
        <div className={s.riskCard}>
          <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>Churn Exposure</Text>
          <div className={s.riskValue} style={{ color: tokens.colorPaletteYellowForeground1 }}>${(teamSummary.churnExposure / 1000).toFixed(0)}k</div>
        </div>
        <div className={s.riskCard}>
          <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>Total People Risk</Text>
          <div><span className={s.riskValue} style={{ color: tokens.colorPaletteRedForeground1 }}>${(teamSummary.totalPeopleRisk / 1000).toFixed(0)}k</span>
            <Text size={200} style={{ color: tokens.colorNeutralForeground3, marginLeft: 4 }}>/year</Text></div>
        </div>
      </div>

      <div className={s.twoCol}>
        <div className={s.section}>
          <div className={s.sectionHeader}>
            <Text size={400} weight="semibold">Recent Signals</Text>
            <Link to="/lead/wellbeing-risks" style={{ color: tokens.colorBrandForeground1, fontSize: 13, textDecoration: 'none' }}>View All</Link>
          </div>
          {teamLeadSignals.slice(0, 4).map((signal, i) => (
            <SignalCard key={signal.id} signal={signal} index={i} />
          ))}
        </div>

        <div className={s.section}>
          <div className={s.sectionHeader}>
            <Text size={400} weight="semibold">At-Risk Employees</Text>
            <Link to="/lead/team" style={{ color: tokens.colorBrandForeground1, fontSize: 13, textDecoration: 'none' }}>View Team</Link>
          </div>
          {atRiskEmployees.map((emp, i) => (
            <EmployeeCard key={emp.id} employee={emp} index={i} />
          ))}
          <Text size={200} weight="semibold" style={{ color: tokens.colorNeutralForeground3, marginTop: 16 }}>Upcoming 1:1 Prep Available</Text>
          {atRiskEmployees.map(emp => (
            <Link key={emp.id} to={`/lead/one-on-ones?employee=${emp.id}`} className={s.prepItem}>
              <Text size={300}>{emp.name}</Text>
              <Text size={200} style={{ color: tokens.colorBrandForeground1 }}>Prepare 1:1 →</Text>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeadDashboard;

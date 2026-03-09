import { useState, useMemo } from 'react';
import { makeStyles, tokens, shorthands, Text, Tab, TabList, Dropdown, Option, Button } from '@fluentui/react-components';
import SignalCard from '@/components/SignalCard';
import { QueryWrapper } from '@/components/QueryWrapper';
import { useTeamLeadSignals, useEmployees, useTeamSummary } from '@/hooks/useApiQueries';

const useStyles = makeStyles({
  root: { display: 'flex', flexDirection: 'column', ...shorthands.gap('24px') },
  filters: { display: 'flex', alignItems: 'center', ...shorthands.gap('12px') },
  list: { display: 'flex', flexDirection: 'column', ...shorthands.gap('12px') },
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
  empty: {
    ...shorthands.padding('32px'),
    textAlign: 'center' as const,
    color: tokens.colorNeutralForeground3,
  },
});

const categories = ['all', 'wellbeing', 'skills', 'motivation', 'churn', 'delivery'] as const;
const categoryLabels: Record<string, string> = {
  all: 'All Types', wellbeing: 'Wellbeing', skills: 'Skills', motivation: 'Motivation', churn: 'Churn', delivery: 'Delivery',
};

const scoreColor = (v: number, invert = false) => {
  if (invert) return v > 60 ? tokens.colorPaletteRedForeground1 : v > 30 ? tokens.colorPaletteYellowForeground1 : tokens.colorPaletteGreenForeground1;
  return v >= 70 ? tokens.colorPaletteGreenForeground1 : v >= 50 ? tokens.colorPaletteYellowForeground1 : tokens.colorPaletteRedForeground1;
};

const WellbeingRisks = () => {
  const s = useStyles();
  const signalsQuery = useTeamLeadSignals();
  const employeesQuery = useEmployees();
  const summaryQuery = useTeamSummary();
  const [tab, setTab] = useState('signals');
  const [employeeFilter, setEmployeeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const uniqueEmployees = useMemo(() => {
    if (!signalsQuery.data) return [];
    return Array.from(new Set(signalsQuery.data.map(s => s.employeeName).filter((n): n is string => !!n)));
  }, [signalsQuery.data]);

  const filteredSignals = useMemo(() => {
    if (!signalsQuery.data) return [];
    return signalsQuery.data.filter(s => {
      if (employeeFilter !== 'all' && s.employeeName !== employeeFilter) return false;
      if (categoryFilter !== 'all' && s.category !== categoryFilter) return false;
      return true;
    });
  }, [signalsQuery.data, employeeFilter, categoryFilter]);

  return (
    <div className={s.root}>
      <div>
        <Text size={600} weight="bold" block>Wellbeing & Risks</Text>
        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>Monitor team signals and churn exposure</Text>
      </div>

      <TabList selectedValue={tab} onTabSelect={(_, d) => setTab(d.value as string)}>
        <Tab value="signals">Signals</Tab>
        <Tab value="churn-risk">Churn Risk</Tab>
      </TabList>

      {tab === 'signals' && (
        <>
          <div className={s.filters}>
            <Dropdown
              placeholder="All Employees"
              value={employeeFilter === 'all' ? 'All Employees' : employeeFilter}
              onOptionSelect={(_, d) => setEmployeeFilter(d.optionValue || 'all')}
              style={{ minWidth: 180 }}
            >
              <Option value="all">All Employees</Option>
              {uniqueEmployees.map(name => <Option key={name} value={name}>{name}</Option>)}
            </Dropdown>
            <Dropdown
              placeholder="All Types"
              value={categoryLabels[categoryFilter]}
              onOptionSelect={(_, d) => setCategoryFilter(d.optionValue || 'all')}
              style={{ minWidth: 160 }}
            >
              {categories.map(cat => <Option key={cat} value={cat}>{categoryLabels[cat]}</Option>)}
            </Dropdown>
            {(employeeFilter !== 'all' || categoryFilter !== 'all') && (
              <Button appearance="subtle" size="small" onClick={() => { setEmployeeFilter('all'); setCategoryFilter('all'); }}>Clear filters</Button>
            )}
          </div>
          <QueryWrapper query={signalsQuery} emptyMessage="No signals to display.">
            {() =>
              filteredSignals.length > 0 ? (
                <div className={s.list}>
                  {filteredSignals.map((signal, i) => <SignalCard key={signal.id} signal={signal} index={i} />)}
                </div>
              ) : (
                <div className={s.empty}>No signals match the selected filters.</div>
              )
            }
          </QueryWrapper>
        </>
      )}

      {tab === 'churn-risk' && (
        <>
          <QueryWrapper query={summaryQuery} skeletonRows={1}>
            {(summary) => (
              <div className={s.statsGrid}>
                <div className={s.card}>
                  <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>Churn Exposure</Text>
                  <div style={{ fontSize: 28, fontWeight: 700, color: tokens.colorPaletteRedForeground1 }}>${(summary.churnExposure / 1000)}k</div>
                </div>
                <div className={s.card}>
                  <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>Absence Cost</Text>
                  <div style={{ fontSize: 28, fontWeight: 700, color: tokens.colorPaletteYellowForeground1 }}>${(summary.absenceCost / 1000)}k/yr</div>
                </div>
                <div className={s.card}>
                  <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>Preventability</Text>
                  <div style={{ fontSize: 28, fontWeight: 700, color: tokens.colorBrandForeground1 }}>72%</div>
                </div>
              </div>
            )}
          </QueryWrapper>
          <QueryWrapper query={employeesQuery} skeletonRows={5}>
            {(emps) => {
              const sorted = [...emps].sort((a, b) => b.churnRisk - a.churnRisk);
              return (
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
                            <Text size={300} weight="medium" block>{emp.name}</Text>
                            <Text size={100} style={{ color: tokens.colorNeutralForeground3 }}>{emp.role}</Text>
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
              );
            }}
          </QueryWrapper>
        </>
      )}
    </div>
  );
};

export default WellbeingRisks;

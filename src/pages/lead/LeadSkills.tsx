import { useState, useMemo } from 'react';
import { makeStyles, tokens, shorthands, Text, Badge, Button, Input, Tooltip } from '@fluentui/react-components';
import { SearchRegular, FilterRegular, ChevronLeftRegular, ChevronRightRegular, PeopleRegular, SparkleRegular, GridRegular } from '@fluentui/react-icons';
import { employees } from '@/mocks/data';

const allSkills = Array.from(new Set(employees.flatMap(e => e.skills)));
const ROWS_PER_PAGE = 5;

const useStyles = makeStyles({
  root: { display: 'flex', flexDirection: 'column', ...shorthands.gap('24px') },
  searchRow: { display: 'flex', ...shorthands.gap('8px'), flexWrap: 'wrap', alignItems: 'center' },
  skillChip: { cursor: 'pointer' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', ...shorthands.gap('12px') },
  statCard: {
    display: 'flex', alignItems: 'center', ...shorthands.gap('12px'),
    ...shorthands.padding('16px'),
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
  table: { width: '100%', borderCollapse: 'collapse' as const, fontSize: 13 },
  th: {
    textAlign: 'left' as const,
    ...shorthands.padding('10px', '12px'),
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    fontSize: 11, fontWeight: 600,
    color: tokens.colorNeutralForeground3,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  thCenter: { textAlign: 'center' as const },
  td: {
    ...shorthands.padding('10px', '12px'),
    borderBottom: `1px solid ${tokens.colorNeutralStroke3}`,
  },
  dot: {
    width: '14px', height: '14px',
    ...shorthands.borderRadius('50%'),
    display: 'inline-block',
  },
  dotHas: { backgroundColor: tokens.colorPaletteGreenBackground3 },
  dotMissing: { backgroundColor: tokens.colorNeutralBackground5 },
  coverageBar: {
    height: '6px', ...shorthands.borderRadius('4px'),
    backgroundColor: tokens.colorNeutralBackground5,
    width: '60px', display: 'inline-block', position: 'relative' as const, verticalAlign: 'middle',
  },
  pagination: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    ...shorthands.padding('12px', '16px'),
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
  },
});

const LeadSkills = () => {
  const s = useStyles();
  const [search, setSearch] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    let result = employees;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(e => e.name.toLowerCase().includes(q) || e.role.toLowerCase().includes(q));
    }
    if (selectedSkills.length > 0) {
      result = result.filter(e => selectedSkills.some(sk => e.skills.includes(sk)));
    }
    return result;
  }, [search, selectedSkills]);

  const displayedSkills = selectedSkills.length > 0 ? selectedSkills : allSkills;
  const totalPages = Math.ceil(filtered.length / ROWS_PER_PAGE);
  const paged = filtered.slice(page * ROWS_PER_PAGE, (page + 1) * ROWS_PER_PAGE);

  const toggleSkill = (skill: string) => {
    setSelectedSkills(p => p.includes(skill) ? p.filter(s => s !== skill) : [...p, skill]);
    setPage(0);
  };

  return (
    <div className={s.root}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Input
          contentBefore={<SearchRegular />}
          placeholder="Search by name or role..."
          value={search}
          onChange={(_, d) => { setSearch(d.value); setPage(0); }}
        />
        <div className={s.searchRow}>
          <FilterRegular style={{ color: tokens.colorNeutralForeground3 }} />
          {allSkills.map(skill => (
            <Badge
              key={skill}
              appearance={selectedSkills.includes(skill) ? 'filled' : 'outline'}
              color={selectedSkills.includes(skill) ? 'brand' : 'informative'}
              className={s.skillChip}
              onClick={() => toggleSkill(skill)}
            >
              {skill}
            </Badge>
          ))}
          {selectedSkills.length > 0 && (
            <Button appearance="subtle" size="small" onClick={() => { setSelectedSkills([]); setPage(0); }}>Clear</Button>
          )}
        </div>
      </div>

      <div className={s.statsGrid}>
        {[
          { label: 'Team Members', value: filtered.length, icon: <PeopleRegular /> },
          { label: 'Skills Tracked', value: displayedSkills.length, icon: <SparkleRegular /> },
          { label: 'Avg Skills/Person', value: (filtered.reduce((a, e) => a + e.skills.length, 0) / (filtered.length || 1)).toFixed(1), icon: <GridRegular /> },
          { label: 'Gaps Found', value: filtered.reduce((a, e) => a + (displayedSkills.length - e.skills.filter(sk => displayedSkills.includes(sk)).length), 0), icon: <FilterRegular /> },
        ].map(stat => (
          <div key={stat.label} className={s.statCard}>
            <span style={{ fontSize: 20, color: tokens.colorBrandForeground1 }}>{stat.icon}</span>
            <div>
              <Text size={500} weight="bold" block>{stat.value}</Text>
              <Text size={100} style={{ color: tokens.colorNeutralForeground3 }}>{stat.label}</Text>
            </div>
          </div>
        ))}
      </div>

      <div className={s.tableWrap}>
        <table className={s.table}>
          <thead>
            <tr>
              <th className={s.th}>Team Member</th>
              {displayedSkills.map(sk => (
                <th key={sk} className={`${s.th} ${s.thCenter}`} style={{ whiteSpace: 'nowrap' }}>{sk}</th>
              ))}
              <th className={`${s.th} ${s.thCenter}`}>Coverage</th>
            </tr>
          </thead>
          <tbody>
            {paged.map(emp => {
              const covered = emp.skills.filter(sk => displayedSkills.includes(sk)).length;
              const pct = Math.round((covered / displayedSkills.length) * 100);
              return (
                <tr key={emp.id}>
                  <td className={s.td}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{
                        width: 8, height: 8, borderRadius: '50%',
                        backgroundColor: emp.status === 'green' ? tokens.colorPaletteGreenBackground3 :
                          emp.status === 'yellow' ? tokens.colorPaletteYellowBackground3 :
                          tokens.colorPaletteRedBackground3,
                      }} />
                      <div>
                        <Text size={300} weight="medium" block>{emp.name}</Text>
                        <Text size={100} style={{ color: tokens.colorNeutralForeground3 }}>{emp.role}</Text>
                      </div>
                    </div>
                  </td>
                  {displayedSkills.map(sk => (
                    <td key={sk} className={s.td} style={{ textAlign: 'center' }}>
                      <Tooltip content={`${emp.name}: ${emp.skills.includes(sk) ? 'Has' : 'Missing'} ${sk}`} relationship="description">
                        <span className={`${s.dot} ${emp.skills.includes(sk) ? s.dotHas : s.dotMissing}`} />
                      </Tooltip>
                    </td>
                  ))}
                  <td className={s.td} style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                      <span className={s.coverageBar}>
                        <span style={{
                          position: 'absolute', left: 0, top: 0, height: '100%',
                          width: `${pct}%`, borderRadius: 4,
                          backgroundColor: pct >= 70 ? tokens.colorPaletteGreenBackground3 :
                            pct >= 40 ? tokens.colorPaletteYellowBackground3 :
                            tokens.colorPaletteRedBackground3,
                        }} />
                      </span>
                      <Text size={200} style={{ fontFamily: 'monospace' }}>{pct}%</Text>
                    </div>
                  </td>
                </tr>
              );
            })}
            {paged.length === 0 && (
              <tr><td colSpan={displayedSkills.length + 2} style={{ textAlign: 'center', padding: 48, color: tokens.colorNeutralForeground3 }}>No team members match your filters</td></tr>
            )}
          </tbody>
        </table>
        {totalPages > 1 && (
          <div className={s.pagination}>
            <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
              Showing {page * ROWS_PER_PAGE + 1}–{Math.min((page + 1) * ROWS_PER_PAGE, filtered.length)} of {filtered.length}
            </Text>
            <div style={{ display: 'flex', gap: 4 }}>
              <Button appearance="subtle" size="small" icon={<ChevronLeftRegular />} disabled={page === 0} onClick={() => setPage(p => p - 1)} />
              {Array.from({ length: totalPages }, (_, i) => (
                <Button key={i} appearance={page === i ? 'primary' : 'subtle'} size="small" onClick={() => setPage(i)}>{i + 1}</Button>
              ))}
              <Button appearance="subtle" size="small" icon={<ChevronRightRegular />} disabled={page === totalPages - 1} onClick={() => setPage(p => p + 1)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadSkills;

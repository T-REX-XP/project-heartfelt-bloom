import { useParams, Link } from 'react-router-dom';
import { makeStyles, tokens, shorthands, Text, Button, Badge, Tab, TabList, Avatar, ProgressBar } from '@fluentui/react-components';
import {
  ArrowLeftRegular, ChatRegular, PersonRegular, WarningRegular,
  StarRegular, StarFilled, CheckmarkCircleRegular,
  ChevronRightRegular, BookRegular, CertificateRegular,
  ClockRegular, BriefcaseRegular, ArrowTrendingRegular,
} from '@fluentui/react-icons';
import { useState } from 'react';
import { employees, employeeProjects, employeeFeedback, employeeTrainings, employeeRoleHistory, teamLeadSignals } from '@/mocks/data';

const useStyles = makeStyles({
  root: { display: 'flex', flexDirection: 'column', ...shorthands.gap('24px'), maxWidth: '960px' },
  headerCard: {
    ...shorthands.padding('24px', '32px'),
    ...shorthands.borderRadius('12px'),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
  },
  headerRow: { display: 'flex', alignItems: 'center', ...shorthands.gap('20px'), flexWrap: 'wrap' },
  skillChips: { display: 'flex', flexWrap: 'wrap', ...shorthands.gap('6px'), marginTop: '12px' },
  metricsRow: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', ...shorthands.gap('12px'), marginTop: '20px' },
  metricBox: {
    textAlign: 'center' as const,
    ...shorthands.padding('12px'),
    ...shorthands.borderRadius('8px'),
    backgroundColor: tokens.colorNeutralBackground3,
  },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', ...shorthands.gap('12px') },
  statCard: {
    display: 'flex', alignItems: 'center', ...shorthands.gap('12px'),
    ...shorthands.padding('16px'),
    ...shorthands.borderRadius('8px'),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
  },
  card: {
    ...shorthands.padding('20px'),
    ...shorthands.borderRadius('8px'),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
  },
  content: { display: 'flex', flexDirection: 'column', ...shorthands.gap('12px'), marginTop: '16px' },
  feedbackGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', ...shorthands.gap('12px') },
  timeline: { position: 'relative' as const, paddingLeft: '24px' },
  timelineLine: {
    position: 'absolute' as const, left: '8px', top: '4px', bottom: '4px',
    width: '2px', backgroundColor: tokens.colorNeutralStroke2,
  },
  timelineDot: {
    position: 'absolute' as const, left: '3px', top: '4px',
    width: '12px', height: '12px', ...shorthands.borderRadius('50%'),
    ...shorthands.border('2px', 'solid', tokens.colorNeutralBackground1),
  },
  timelineItem: { position: 'relative' as const, marginBottom: '16px' },
});

const scoreColor = (v: number, invert = false) => {
  if (invert) return v > 60 ? tokens.colorPaletteRedForeground1 : v > 30 ? tokens.colorPaletteYellowForeground1 : tokens.colorPaletteGreenForeground1;
  return v >= 70 ? tokens.colorPaletteGreenForeground1 : v >= 50 ? tokens.colorPaletteYellowForeground1 : tokens.colorPaletteRedForeground1;
};

const statusDot = (status: string) =>
  status === 'green' ? tokens.colorPaletteGreenBackground3 :
  status === 'yellow' ? tokens.colorPaletteYellowBackground3 :
  tokens.colorPaletteRedBackground3;

const EmployeeDetail = () => {
  const s = useStyles();
  const { employeeId } = useParams();
  const employee = employees.find(e => e.id === employeeId);
  const [tab, setTab] = useState('projects');

  if (!employee) return <Text>Employee not found</Text>;

  const projects = employeeProjects[employee.id] || [];
  const feedback = employeeFeedback[employee.id] || [];
  const trainings = employeeTrainings[employee.id] || [];
  const roleHistory = employeeRoleHistory[employee.id] || [];
  const signals = teamLeadSignals.filter(s => s.employeeId === employee.id);

  const avgRating = feedback.length > 0 ? (feedback.reduce((s, f) => s + f.rating, 0) / feedback.length).toFixed(1) : '—';
  const totalHours = trainings.reduce((s, t) => s + t.hours, 0);

  const metrics = [
    { label: 'Well-being', value: employee.wellbeingScore, icon: '💚' },
    { label: 'Skills', value: employee.skillsScore, icon: '🧠' },
    { label: 'Motivation', value: employee.motivationScore, icon: '🔥' },
    { label: 'Delivery', value: employee.deliveryScore, icon: '📦' },
    { label: 'Churn Risk', value: employee.churnRisk, icon: '⚠️', invert: true },
  ];

  return (
    <div className={s.root}>
      <Link to="/lead/team"><Button appearance="subtle" icon={<ArrowLeftRegular />} size="small">Back to Team</Button></Link>

      <div className={s.headerCard}>
        <div className={s.headerRow}>
          <Avatar name={employee.name} size={64} color="brand" />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Text size={600} weight="bold">{employee.name}</Text>
              <span style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: statusDot(employee.status) }} />
            </div>
            <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>{employee.role} · {employee.department} · {employee.tenure}</Text>
            <div className={s.skillChips}>
              {employee.skills.map(sk => <Badge key={sk} appearance="outline" color="brand" size="small">{sk}</Badge>)}
            </div>
          </div>
          <Link to={`/lead/conversation-prep/${employee.id}`}>
            <Button appearance="primary" icon={<ChatRegular />}>Prepare 1:1</Button>
          </Link>
        </div>

        <div className={s.metricsRow}>
          {metrics.map(m => (
            <div key={m.label} className={s.metricBox}>
              <div style={{ fontSize: 18, marginBottom: 2 }}>{m.icon}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: scoreColor(m.value, m.invert) }}>
                {m.value}{m.label === 'Churn Risk' ? '%' : ''}
              </div>
              <Text size={100} style={{ color: tokens.colorNeutralForeground3, textTransform: 'uppercase', letterSpacing: 0.5 }}>{m.label}</Text>
            </div>
          ))}
        </div>
      </div>

      <div className={s.statsGrid}>
        {[
          { label: 'Active Signals', value: signals.length, color: tokens.colorPaletteRedForeground1 },
          { label: 'Feedback Score', value: avgRating, color: tokens.colorPaletteYellowForeground1 },
          { label: 'Training Hours', value: totalHours, color: tokens.colorPaletteBlueForeground2 },
          { label: 'Projects', value: projects.length, color: tokens.colorBrandForeground1 },
        ].map(stat => (
          <div key={stat.label} className={s.statCard}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, color: stat.color }}>{stat.value}</div>
              <Text size={100} style={{ color: tokens.colorNeutralForeground3 }}>{stat.label}</Text>
            </div>
          </div>
        ))}
      </div>

      <TabList selectedValue={tab} onTabSelect={(_, d) => setTab(d.value as string)}>
        <Tab value="projects" icon={<BriefcaseRegular />}>Projects</Tab>
        <Tab value="feedback" icon={<StarRegular />}>Feedback</Tab>
        <Tab value="training" icon={<BookRegular />}>Training</Tab>
        <Tab value="signals" icon={<WarningRegular />}>Signals</Tab>
        <Tab value="career" icon={<ArrowTrendingRegular />}>Career</Tab>
      </TabList>

      <div className={s.content}>
        {tab === 'projects' && projects.map(proj => (
          <div key={proj.id} className={s.card}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <Text size={300} weight="semibold">{proj.name}</Text>
              <Badge appearance="outline" color={proj.status === 'active' ? 'success' : proj.status === 'completed' ? 'informative' : 'warning'} size="small">{proj.status}</Badge>
            </div>
            <Text size={100} style={{ color: tokens.colorNeutralForeground3 }}>{proj.role} · {proj.period}</Text>
            <Text size={200} style={{ color: tokens.colorNeutralForeground2, marginTop: 8 }} block>{proj.description}</Text>
            <div style={{ display: 'flex', gap: 4, marginTop: 8, flexWrap: 'wrap' }}>
              {proj.technologies.map(t => <Badge key={t} appearance="outline" color="informative" size="small">{t}</Badge>)}
            </div>
          </div>
        ))}

        {tab === 'feedback' && feedback.map(fb => (
          <div key={fb.id} className={s.card}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Badge appearance="filled" color={fb.type === 'manager' ? 'brand' : fb.type === 'peer' ? 'informative' : fb.type === '360' ? 'warning' : 'subtle'} size="small">{fb.type}</Badge>
                <Text size={300} weight="medium">{fb.from}</Text>
                <Text size={100} style={{ color: tokens.colorNeutralForeground3 }}>· {fb.fromRole}</Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {Array.from({ length: 5 }).map((_, idx) => (
                  idx < fb.rating ? <StarFilled key={idx} style={{ color: tokens.colorPaletteYellowForeground1, fontSize: 14 }} /> : <StarRegular key={idx} style={{ color: tokens.colorNeutralForeground4, fontSize: 14 }} />
                ))}
                <Text size={100} style={{ color: tokens.colorNeutralForeground3, marginLeft: 8 }}>{fb.date}</Text>
              </div>
            </div>
            <Text size={200} style={{ color: tokens.colorNeutralForeground2 }} block>{fb.summary}</Text>
            <div className={s.feedbackGrid} style={{ marginTop: 12 }}>
              <div>
                <Text size={100} weight="semibold" style={{ color: tokens.colorPaletteGreenForeground1, textTransform: 'uppercase', letterSpacing: 0.5 }}>Strengths</Text>
                {fb.strengths.map((st, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                    <CheckmarkCircleRegular style={{ color: tokens.colorPaletteGreenForeground1, fontSize: 12 }} />
                    <Text size={200}>{st}</Text>
                  </div>
                ))}
              </div>
              <div>
                <Text size={100} weight="semibold" style={{ color: tokens.colorPaletteYellowForeground1, textTransform: 'uppercase', letterSpacing: 0.5 }}>Growth Areas</Text>
                {fb.growthAreas.map((g, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                    <ChevronRightRegular style={{ color: tokens.colorPaletteYellowForeground1, fontSize: 12 }} />
                    <Text size={200}>{g}</Text>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {tab === 'training' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {[
                { label: 'Completed', value: trainings.filter(t => t.status === 'completed').length, color: tokens.colorPaletteGreenForeground1 },
                { label: 'In Progress', value: trainings.filter(t => t.status === 'in-progress').length, color: tokens.colorPaletteBlueForeground2 },
                { label: 'Total Hours', value: `${totalHours}h`, color: tokens.colorPaletteYellowForeground1 },
              ].map(st => (
                <div key={st.label} className={s.metricBox}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: st.color }}>{st.value}</div>
                  <Text size={100} style={{ color: tokens.colorNeutralForeground3 }}>{st.label}</Text>
                </div>
              ))}
            </div>
            {trainings.map(tr => (
              <div key={tr.id} className={s.card}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  {tr.type === 'certification' ? <CertificateRegular style={{ color: tokens.colorPaletteYellowForeground1 }} /> : <BookRegular style={{ color: tokens.colorPaletteBlueForeground2 }} />}
                  <Text size={300} weight="semibold">{tr.title}</Text>
                  <Badge appearance="outline" color={tr.status === 'completed' ? 'success' : tr.status === 'in-progress' ? 'informative' : 'subtle'} size="small">{tr.status}</Badge>
                  {tr.score && <Text size={200} weight="bold" style={{ color: tokens.colorPaletteGreenForeground1, marginLeft: 'auto' }}>{tr.score}%</Text>}
                </div>
                <Text size={100} style={{ color: tokens.colorNeutralForeground3 }}>{tr.provider} · {tr.type} · {tr.skillArea}</Text>
                <div style={{ display: 'flex', gap: 16, marginTop: 8, fontSize: 12, color: tokens.colorNeutralForeground3 }}>
                  <span><ClockRegular style={{ fontSize: 12 }} /> {tr.hours}h</span>
                  <span>Started: {tr.startDate}</span>
                  {tr.completedDate && <span>Completed: {tr.completedDate}</span>}
                </div>
                {tr.status === 'in-progress' && <ProgressBar value={0.5} thickness="medium" style={{ marginTop: 12 }} />}
              </div>
            ))}
          </>
        )}

        {tab === 'signals' && (
          signals.length === 0 ? (
            <div className={s.card} style={{ textAlign: 'center', padding: 32 }}>
              <Text style={{ color: tokens.colorNeutralForeground3 }}>No active signals for this employee</Text>
            </div>
          ) : signals.map(sig => (
            <div key={sig.id} className={s.card} style={{
              borderLeft: `4px solid ${sig.severity === 'critical' ? tokens.colorPaletteRedBorder1 : tokens.colorPaletteYellowBorder1}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <WarningRegular style={{ color: sig.severity === 'critical' ? tokens.colorPaletteRedForeground1 : tokens.colorPaletteYellowForeground1 }} />
                <Text size={300} weight="semibold">{sig.title}</Text>
                <Text size={100} style={{ color: tokens.colorNeutralForeground3, marginLeft: 'auto' }}>{sig.timestamp}</Text>
              </div>
              <Text size={200} style={{ color: tokens.colorNeutralForeground2 }}>{sig.description}</Text>
            </div>
          ))
        )}

        {tab === 'career' && (
          <>
            <div className={s.card}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <ArrowTrendingRegular style={{ color: tokens.colorBrandForeground1 }} />
                <Text size={300} weight="semibold">Role History</Text>
              </div>
              {roleHistory.length === 0 ? (
                <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>No role history available</Text>
              ) : (
                <div className={s.timeline}>
                  <div className={s.timelineLine} />
                  {roleHistory.map((role, i) => (
                    <div key={role.id} className={s.timelineItem}>
                      <div className={s.timelineDot} style={{
                        backgroundColor: i === 0 ? tokens.colorBrandBackground : tokens.colorNeutralBackground5,
                      }} />
                      <Text size={300} weight="semibold" block>{role.title}</Text>
                      <Text size={100} style={{ color: tokens.colorNeutralForeground3 }}>{role.department} · {role.period} · {role.duration}</Text>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className={s.card}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <CertificateRegular style={{ color: tokens.colorPaletteYellowForeground1 }} />
                <Text size={300} weight="semibold">Certifications & Achievements</Text>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {trainings.filter(t => t.type === 'certification').map(cert => (
                  <div key={cert.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 8, backgroundColor: tokens.colorNeutralBackground3 }}>
                    <CertificateRegular style={{ color: tokens.colorPaletteYellowForeground1 }} />
                    <div>
                      <Text size={200} weight="medium" block>{cert.title}</Text>
                      <Text size={100} style={{ color: tokens.colorNeutralForeground3 }}>{cert.provider} · {cert.status === 'completed' ? `Score: ${cert.score}%` : 'In Progress'}</Text>
                    </div>
                  </div>
                ))}
                {trainings.filter(t => t.type === 'certification').length === 0 && (
                  <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>No certifications yet</Text>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EmployeeDetail;

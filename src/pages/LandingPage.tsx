import { makeStyles, tokens, shorthands, Text, Button } from '@fluentui/react-components';
import {
  FlashRegular, ArrowRightRegular, ShieldCheckmarkRegular, BrainCircuitRegular,
  HeartRegular, ChartMultipleRegular, PeopleRegular, HatGraduationRegular,
  ChatRegular, ArrowTrendingRegular, AlertRegular, ChevronRightRegular,
} from '@fluentui/react-icons';
import { Link } from 'react-router-dom';
import { agents } from '@/mocks/data';

const useStyles = makeStyles({
  page: { minHeight: '100vh', backgroundColor: tokens.colorNeutralBackground1 },
  nav: {
    position: 'fixed' as const, top: 0, width: '100%', zIndex: 50,
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    ...shorthands.padding('0', '24px'),
    height: '48px',
  },
  logo: { display: 'flex', alignItems: 'center', ...shorthands.gap('8px') },
  logoIcon: {
    width: '28px', height: '28px', ...shorthands.borderRadius('6px'),
    backgroundColor: tokens.colorBrandBackground,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: tokens.colorNeutralForegroundOnBrand,
  },
  hero: {
    ...shorthands.padding('120px', '24px', '80px'),
    textAlign: 'center' as const, maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto',
  },
  pill: {
    display: 'inline-flex', alignItems: 'center', ...shorthands.gap('8px'),
    ...shorthands.padding('4px', '16px'),
    ...shorthands.borderRadius('20px'),
    backgroundColor: tokens.colorNeutralBackground3,
    fontSize: 13, color: tokens.colorNeutralForeground2,
    marginBottom: '32px',
  },
  section: { ...shorthands.padding('80px', '24px'), maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto' },
  sectionAlt: { backgroundColor: tokens.colorNeutralBackground3 },
  grid3: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', ...shorthands.gap('16px'), '@media (max-width: 768px)': { gridTemplateColumns: '1fr' } },
  grid5: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', ...shorthands.gap('16px'), '@media (max-width: 768px)': { gridTemplateColumns: 'repeat(2, 1fr)' } },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', ...shorthands.gap('24px'), '@media (max-width: 768px)': { gridTemplateColumns: '1fr' } },
  card: {
    ...shorthands.padding('24px'),
    ...shorthands.borderRadius('8px'),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
  },
  kpiCard: {
    textAlign: 'center' as const,
    ...shorthands.padding('24px'),
    ...shorthands.borderRadius('8px'),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
  },
  signalCard: {
    ...shorthands.padding('20px'),
    ...shorthands.borderRadius('8px'),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
    maxWidth: '640px', marginLeft: 'auto', marginRight: 'auto',
  },
  cta: { ...shorthands.padding('80px', '24px'), textAlign: 'center' as const },
  footer: {
    ...shorthands.padding('16px', '24px'),
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
  btnRow: { display: 'flex', alignItems: 'center', justifyContent: 'center', ...shorthands.gap('12px'), marginTop: '32px' },
});

const kpiHighlights = [
  { name: 'Well-being Index', value: '67', color: tokens.colorPaletteYellowForeground1 },
  { name: 'Skills & Development', value: '71', color: tokens.colorPaletteGreenForeground1 },
  { name: 'Motivation Index', value: '73', color: tokens.colorPaletteGreenForeground1 },
  { name: 'Churn & Retention', value: '64', color: tokens.colorPaletteYellowForeground1 },
  { name: 'Delivery & Workload', value: '64', color: tokens.colorPaletteYellowForeground1 },
];

const signalExamples = [
  { title: 'Sick Leave Spike', severity: 'critical', person: 'Alex Chen', time: '2h ago' },
  { title: 'Workload Overload', severity: 'critical', person: 'David Kim', time: '6h ago' },
  { title: 'Team Trust Declining', severity: 'warning', person: 'Team', time: '1d ago' },
];

const agentIcons: Record<string, React.ElementType> = {
  Heart: HeartRegular, Brain: BrainCircuitRegular, BarChart3: ChartMultipleRegular,
  MessageSquare: ChatRegular, Users: PeopleRegular, GraduationCap: HatGraduationRegular,
};

const LandingPage = () => {
  const s = useStyles();
  return (
    <div className={s.page}>
      <nav className={s.nav}>
        <div className={s.logo}>
          <div className={s.logoIcon}><FlashRegular style={{ fontSize: 16 }} /></div>
          <Text weight="semibold" size={400}>LogIQ</Text>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <Link to="/login"><Button appearance="subtle" size="small">Sign In</Button></Link>
          <Link to="/login"><Button appearance="primary" size="small" icon={<ArrowRightRegular />} iconPosition="after">Get Started</Button></Link>
        </div>
      </nav>

      <section className={s.hero}>
        <div className={s.pill}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: tokens.colorPaletteGreenBackground3 }} />
          AI Multi-Agent People Intelligence
        </div>
        <Text size={900} weight="bold" block style={{ marginBottom: 16 }}>Intelligence for High-Performing Teams</Text>
        <Text size={400} style={{ color: tokens.colorNeutralForeground2, maxWidth: 640, margin: '0 auto' }} block>
          LogIQ proactively surfaces risks, signals, and coaching — powered by 6 AI agents that monitor well-being, skills, motivation, retention, and delivery in real-time.
        </Text>
        <div className={s.btnRow}>
          <Link to="/login"><Button appearance="primary" size="large" icon={<ArrowRightRegular />} iconPosition="after">Get Started</Button></Link>
          <a href="#features"><Button appearance="outline" size="large">See How It Works</Button></a>
        </div>
      </section>

      <section id="features" className={s.sectionAlt}>
        <div className={s.section}>
          <Text size={700} weight="bold" block style={{ textAlign: 'center', marginBottom: 8 }}>Why Traditional HRBP is Too Reactive</Text>
          <Text size={300} style={{ color: tokens.colorNeutralForeground3, textAlign: 'center', display: 'block', maxWidth: 640, margin: '0 auto 32px' }}>
            HR teams discover burnout, churn, and disengagement after it happens. LogIQ detects signals before they become problems.
          </Text>
          <div className={s.grid3}>
            {[
              { title: 'Proactive, Not Reactive', desc: 'AI agents continuously analyze signals and surface actionable insights before issues escalate.', icon: AlertRegular },
              { title: 'Signal-First UX', desc: 'Critical alerts appear front-and-center — not buried in dashboards.', icon: FlashRegular },
              { title: 'Privacy by Design', desc: 'Team Members get private coaching. Team Leads get team-level insights.', icon: ShieldCheckmarkRegular },
            ].map((item, i) => (
              <div key={i} className={s.card}>
                <div style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: tokens.colorBrandBackground, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <item.icon style={{ fontSize: 20, color: tokens.colorNeutralForegroundOnBrand }} />
                </div>
                <Text size={400} weight="semibold" block style={{ marginBottom: 8 }}>{item.title}</Text>
                <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>{item.desc}</Text>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="agents" className={s.section}>
        <Text size={700} weight="bold" block style={{ textAlign: 'center', marginBottom: 8 }}>6-Agent Architecture</Text>
        <Text size={300} style={{ color: tokens.colorNeutralForeground3, textAlign: 'center', display: 'block', maxWidth: 640, margin: '0 auto 32px' }}>
          Three background analyzers feed a synthesis layer, which powers two role-specific copilots.
        </Text>
        <div className={s.grid3}>
          {agents.map(agent => {
            const IconComp = agentIcons[agent.icon] || BrainCircuitRegular;
            return (
              <div key={agent.id} className={s.card}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 8,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: agent.type === 'analyzer' ? tokens.colorPaletteBlueBackground2 :
                      agent.type === 'synthesis' ? tokens.colorPaletteYellowBackground1 :
                      tokens.colorBrandBackground2,
                    color: agent.type === 'analyzer' ? tokens.colorPaletteBlueForeground2 :
                      agent.type === 'synthesis' ? tokens.colorPaletteYellowForeground1 :
                      tokens.colorBrandForeground1,
                  }}>
                    <IconComp style={{ fontSize: 18 }} />
                  </div>
                  <div>
                    <Text size={100} weight="semibold" style={{
                      textTransform: 'uppercase', letterSpacing: 0.5,
                      color: agent.type === 'analyzer' ? tokens.colorPaletteBlueForeground2 :
                        agent.type === 'synthesis' ? tokens.colorPaletteYellowForeground1 :
                        tokens.colorBrandForeground1,
                    }}>{agent.type}</Text>
                    <Text size={300} weight="semibold" block>{agent.name}</Text>
                  </div>
                </div>
                <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>{agent.description}</Text>
              </div>
            );
          })}
        </div>
      </section>

      <section id="kpis" className={s.sectionAlt}>
        <div className={s.section}>
          <Text size={700} weight="bold" block style={{ textAlign: 'center', marginBottom: 32 }}>5 Intelligence Dimensions</Text>
          <div className={s.grid5}>
            {kpiHighlights.map((kpi, i) => (
              <div key={i} className={s.kpiCard}>
                <div style={{ fontSize: 28, fontWeight: 700, color: kpi.color }}>{kpi.value}</div>
                <Text size={100} style={{ color: tokens.colorNeutralForeground3, marginTop: 4 }}>{kpi.name}</Text>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={s.section}>
        <Text size={700} weight="bold" block style={{ textAlign: 'center', marginBottom: 32 }}>Signals Before Dashboards</Text>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 640, margin: '0 auto' }}>
          {signalExamples.map((sig, i) => (
            <div key={i} className={s.signalCard} style={{
              borderLeft: `4px solid ${sig.severity === 'critical' ? tokens.colorPaletteRedBorder1 : tokens.colorPaletteYellowBorder1}`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <Text size={300} weight="semibold" block>{sig.title}</Text>
                  <Text size={100} style={{ color: tokens.colorNeutralForeground3 }}>{sig.person} · {sig.time}</Text>
                </div>
                <ChevronRightRegular style={{ color: tokens.colorNeutralForeground3 }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="roles" className={s.sectionAlt}>
        <div className={s.section}>
          <Text size={700} weight="bold" block style={{ textAlign: 'center', marginBottom: 32 }}>Two Experiences, One Platform</Text>
          <div className={s.grid2}>
            {[
              { role: 'Team Lead', desc: 'Team health dashboards, risk signals, 1:1 prep, churn prevention, skills search, AI copilot.', icon: PeopleRegular, items: ['Proactive risk alerts', 'Conversation preparation', 'Cost-of-attrition analysis', 'Team workload rebalancing'] },
              { role: 'Team Member', desc: 'Personal growth, private coaching, skills gaps, learning paths, IDP tracking, 1:1 prep.', icon: HatGraduationRegular, items: ['Private AI coaching', 'Skills gap analysis', 'Learning recommendations', 'Development plan tracking'] },
            ].map((r, i) => (
              <div key={i} className={s.card}>
                <div style={{ width: 44, height: 44, borderRadius: 8, backgroundColor: tokens.colorBrandBackground, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <r.icon style={{ fontSize: 22, color: tokens.colorNeutralForegroundOnBrand }} />
                </div>
                <Text size={500} weight="bold" block style={{ marginBottom: 8 }}>{r.role}</Text>
                <Text size={200} style={{ color: tokens.colorNeutralForeground3, marginBottom: 16 }} block>{r.desc}</Text>
                {r.items.map((item, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: tokens.colorBrandBackground }} />
                    <Text size={300}>{item}</Text>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={s.cta}>
        <Text size={800} weight="bold" block style={{ marginBottom: 16 }}>Ready to See LogIQ in Action?</Text>
        <Text size={400} style={{ color: tokens.colorNeutralForeground3 }} block>Experience proactive people intelligence. No setup required.</Text>
        <div className={s.btnRow}>
          <Link to="/login"><Button appearance="primary" size="large" icon={<ArrowRightRegular />} iconPosition="after">Get Started</Button></Link>
        </div>
      </section>

      <footer className={s.footer}>
        <div className={s.logo}>
          <div className={s.logoIcon} style={{ width: 24, height: 24 }}><FlashRegular style={{ fontSize: 12 }} /></div>
          <Text weight="semibold" size={200}>LogIQ</Text>
        </div>
        <Text size={100} style={{ color: tokens.colorNeutralForeground3 }}>© 2026 LogIQ · Intelligence for High-Performing Teams</Text>
      </footer>
    </div>
  );
};

export default LandingPage;

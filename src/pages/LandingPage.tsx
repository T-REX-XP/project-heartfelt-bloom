import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, ArrowRight, Shield, Brain, Heart, BarChart3, Users, GraduationCap, MessageSquare, TrendingUp, Bell, ChevronRight } from 'lucide-react';
import { agents } from '@/mocks/data';
import { Button } from '@/components/ui/button';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const kpiHighlights = [
  { name: 'Well-being Index', icon: Heart, value: '67', color: 'text-logiq-amber' },
  { name: 'Skills & Development', icon: Brain, value: '71', color: 'text-logiq-emerald' },
  { name: 'Motivation Index', icon: TrendingUp, value: '73', color: 'text-logiq-emerald' },
  { name: 'Churn & Retention', icon: Shield, value: '64', color: 'text-logiq-amber' },
  { name: 'Delivery & Workload', icon: BarChart3, value: '64', color: 'text-logiq-amber' },
];

const agentIcons: Record<string, React.ElementType> = {
  Heart, Brain, BarChart3, MessageSquare, Users, GraduationCap,
};

const signalExamples = [
  { title: 'Sick Leave Spike', severity: 'critical', person: 'Alex Chen', time: '2h ago' },
  { title: 'Workload Overload', severity: 'critical', person: 'David Kim', time: '6h ago' },
  { title: 'Team Trust Declining', severity: 'warning', person: 'Team', time: '1d ago' },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background dark">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 glass-strong">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-gradient">LogIQ</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#agents" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Architecture</a>
            <a href="#kpis" className="text-sm text-muted-foreground hover:text-foreground transition-colors">KPIs</a>
            <a href="#roles" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Roles</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link to="/demo">
              <Button size="sm" className="gradient-primary text-primary-foreground border-0">
                Try Demo <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden mesh-bg">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 3, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1], rotate: [0, -2, 0] }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute -bottom-1/3 -left-1/4 w-[600px] h-[600px] rounded-full bg-logiq-cyan/5 blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-muted-foreground mb-8">
              <span className="w-2 h-2 rounded-full bg-logiq-emerald signal-pulse" />
              AI Multi-Agent People Intelligence
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
              <span className="text-gradient">Intelligence</span>{' '}
              <span className="text-foreground">for High-Performing Teams</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
              LogIQ proactively surfaces risks, signals, and coaching — powered by 6 AI agents that monitor well-being, skills, motivation, retention, and delivery in real-time.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/demo">
                <Button size="lg" className="gradient-primary text-primary-foreground border-0 px-8 text-base glow-primary">
                  Enter Live Demo <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <a href="#features">
                <Button variant="outline" size="lg" className="px-8 text-base">
                  See How It Works
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why section */}
      <section id="features" className="py-24 bg-card/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Traditional HRBP is Too Reactive</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">HR teams discover burnout, churn, and disengagement <em>after</em> it happens. LogIQ detects signals <em>before</em> they become problems.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Proactive, Not Reactive', desc: 'AI agents continuously analyze signals and surface actionable insights before issues escalate.', icon: Bell },
              { title: 'Signal-First UX', desc: 'Critical alerts appear front-and-center — not buried in dashboards. Every signal has a clear action.', icon: Zap },
              { title: 'Privacy by Design', desc: 'Team Members get private coaching. Team Leads get team-level insights. Strict role boundaries.', icon: Shield },
            ].map((item, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1, duration: 0.6 }} className="glass rounded-2xl p-8">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-5">
                  <item.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Agent Architecture */}
      <section id="agents" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">6-Agent Architecture</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Three background analyzers feed a synthesis layer, which powers two role-specific copilots.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-4">
            {agents.map((agent, i) => {
              const IconComp = agentIcons[agent.icon] || Brain;
              return (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="glass rounded-2xl p-6 hover:glow-primary transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      agent.type === 'analyzer' ? 'bg-logiq-cyan/10 text-logiq-cyan' :
                      agent.type === 'synthesis' ? 'bg-logiq-amber/10 text-logiq-amber' :
                      'bg-primary/10 text-primary'
                    }`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <span className={`text-[10px] uppercase tracking-wider font-semibold ${
                        agent.type === 'analyzer' ? 'text-logiq-cyan' :
                        agent.type === 'synthesis' ? 'text-logiq-amber' :
                        'text-primary'
                      }`}>{agent.type}</span>
                      <h4 className="text-sm font-semibold text-foreground">{agent.name}</h4>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{agent.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* KPIs */}
      <section id="kpis" className="py-24 bg-card/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">5 Intelligence Dimensions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Every team is scored across five critical KPIs with drill-down sub-metrics and threshold-based alerting.</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {kpiHighlights.map((kpi, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 text-center"
              >
                <kpi.icon className={`w-8 h-8 mx-auto mb-3 ${kpi.color}`} />
                <div className={`text-3xl font-bold ${kpi.color}`}>{kpi.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{kpi.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Signals Preview */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Signals Before Dashboards</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Critical issues surface immediately. Each signal has context, rationale, and a clear next action.</p>
          </motion.div>
          <div className="max-w-2xl mx-auto space-y-4">
            {signalExamples.map((sig, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`glass rounded-xl p-5 border-l-4 ${
                  sig.severity === 'critical' ? 'border-logiq-rose' : 'border-logiq-amber'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">{sig.title}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{sig.person} · {sig.time}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section id="roles" className="py-24 bg-card/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Two Experiences, One Platform</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { role: 'Team Lead', desc: 'Team health dashboards, risk signals, 1:1 prep, churn prevention, skills search, AI copilot.', icon: Users, items: ['Proactive risk alerts', 'Conversation preparation', 'Cost-of-attrition analysis', 'Team workload rebalancing'] },
              { role: 'Team Member', desc: 'Personal growth, private coaching, skills gaps, learning paths, IDP tracking, 1:1 prep.', icon: GraduationCap, items: ['Private AI coaching', 'Skills gap analysis', 'Learning recommendations', 'Development plan tracking'] },
            ].map((r, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.2, duration: 0.6 }} className="glass rounded-2xl p-8">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-5">
                  <r.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{r.role}</h3>
                <p className="text-sm text-muted-foreground mb-5">{r.desc}</p>
                <ul className="space-y-2">
                  {r.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" /> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">Ready to See LogIQ in Action?</h2>
            <p className="text-lg text-muted-foreground mb-10">Experience proactive people intelligence. No setup required.</p>
            <Link to="/demo">
              <Button size="lg" className="gradient-primary text-primary-foreground border-0 px-10 text-lg glow-primary">
                Launch Demo <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded gradient-primary flex items-center justify-center">
              <Zap className="w-3 h-3 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold text-gradient">LogIQ</span>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 LogIQ · Intelligence for High-Performing Teams</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

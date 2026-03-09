import { useParams, Link } from 'react-router-dom';
import { employees, employeeProjects, employeeFeedback, employeeTrainings, employeeRoleHistory, teamLeadSignals } from '@/mocks/data';
import { motion } from 'framer-motion';
import { User, ArrowLeft, MessageSquare, Briefcase, Star, GraduationCap, Clock, CheckCircle, BookOpen, Award, AlertTriangle, ChevronRight, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

const statusColors: Record<string, string> = { green: 'text-logiq-emerald', yellow: 'text-logiq-amber', red: 'text-logiq-rose' };
const statusBg: Record<string, string> = { green: 'bg-logiq-emerald/10', yellow: 'bg-logiq-amber/10', red: 'bg-logiq-rose/10' };

const scoreColor = (value: number, invert = false) => {
  if (invert) return value > 60 ? 'text-logiq-rose' : value > 30 ? 'text-logiq-amber' : 'text-logiq-emerald';
  return value >= 70 ? 'text-logiq-emerald' : value >= 50 ? 'text-logiq-amber' : 'text-logiq-rose';
};

const trainingStatusConfig: Record<string, { label: string; color: string; bg: string }> = {
  completed: { label: 'Completed', color: 'text-logiq-emerald', bg: 'bg-logiq-emerald/10' },
  'in-progress': { label: 'In Progress', color: 'text-logiq-cyan', bg: 'bg-logiq-cyan/10' },
  planned: { label: 'Planned', color: 'text-muted-foreground', bg: 'bg-muted/50' },
};

const projectStatusConfig: Record<string, { label: string; color: string; bg: string }> = {
  active: { label: 'Active', color: 'text-logiq-emerald', bg: 'bg-logiq-emerald/10' },
  completed: { label: 'Completed', color: 'text-logiq-cyan', bg: 'bg-logiq-cyan/10' },
  'on-hold': { label: 'On Hold', color: 'text-logiq-amber', bg: 'bg-logiq-amber/10' },
};

const feedbackTypeConfig: Record<string, { label: string; color: string }> = {
  manager: { label: 'Manager', color: 'bg-primary/10 text-primary' },
  peer: { label: 'Peer', color: 'bg-logiq-cyan/10 text-logiq-cyan' },
  '360': { label: '360°', color: 'bg-logiq-amber/10 text-logiq-amber' },
  self: { label: 'Self', color: 'bg-muted text-muted-foreground' },
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const EmployeeDetail = () => {
  const { employeeId } = useParams();
  const employee = employees.find(e => e.id === employeeId);

  if (!employee) return <div className="text-foreground p-8">Employee not found</div>;

  const projects = employeeProjects[employee.id] || [];
  const feedback = employeeFeedback[employee.id] || [];
  const trainings = employeeTrainings[employee.id] || [];
  const roleHistory = employeeRoleHistory[employee.id] || [];
  const signals = teamLeadSignals.filter(s => s.employeeId === employee.id);

  const completedTrainings = trainings.filter(t => t.status === 'completed');
  const activeTrainings = trainings.filter(t => t.status === 'in-progress');
  const totalHours = trainings.reduce((sum, t) => sum + t.hours, 0);
  const avgFeedbackRating = feedback.length > 0 ? (feedback.reduce((s, f) => s + f.rating, 0) / feedback.length).toFixed(1) : '—';

  const metrics = [
    { label: 'Well-being', value: employee.wellbeingScore, icon: '💚' },
    { label: 'Skills', value: employee.skillsScore, icon: '🧠' },
    { label: 'Motivation', value: employee.motivationScore, icon: '🔥' },
    { label: 'Delivery', value: employee.deliveryScore, icon: '📦' },
    { label: 'Churn Risk', value: employee.churnRisk, icon: '⚠️', invert: true },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Back */}
      <Link to="/lead/team">
        <Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" /> Back to Team</Button>
      </Link>

      {/* Header Card */}
      <motion.div {...fadeUp} className="glass rounded-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <User className="w-10 h-10 text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-foreground">{employee.name}</h1>
              <span className={cn('w-3 h-3 rounded-full', employee.status === 'green' ? 'bg-logiq-emerald' : employee.status === 'yellow' ? 'bg-logiq-amber' : 'bg-logiq-rose signal-pulse')} />
            </div>
            <p className="text-muted-foreground">{employee.role} · {employee.department} · {employee.tenure}</p>
            {roleHistory.length > 1 && (
              <p className="text-xs text-muted-foreground mt-1">Previously: {roleHistory[1]?.title} ({roleHistory[1]?.period})</p>
            )}
            <div className="flex flex-wrap gap-2 mt-3">
              {employee.skills.map(s => (
                <span key={s} className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">{s}</span>
              ))}
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Link to={`/lead/conversation-prep/${employee.id}`}>
              <Button className="gradient-primary text-primary-foreground border-0">
                <MessageSquare className="w-4 h-4 mr-2" /> Prepare 1:1
              </Button>
            </Link>
          </div>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-5 gap-3 mt-6">
          {metrics.map(m => (
            <div key={m.label} className="glass rounded-xl p-3 text-center">
              <div className="text-lg mb-0.5">{m.icon}</div>
              <div className={cn("text-2xl font-bold", scoreColor(m.value, m.invert))}>
                {m.value}{m.label === 'Churn Risk' ? '%' : ''}
              </div>
              <div className="text-[10px] text-muted-foreground mt-0.5 uppercase tracking-wide">{m.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Active Signals', value: signals.length, icon: AlertTriangle, color: 'text-logiq-rose' },
          { label: 'Feedback Score', value: avgFeedbackRating, icon: Star, color: 'text-logiq-amber' },
          { label: 'Training Hours', value: totalHours, icon: GraduationCap, color: 'text-logiq-cyan' },
          { label: 'Projects', value: projects.length, icon: Briefcase, color: 'text-primary' },
        ].map((stat, i) => (
          <motion.div key={stat.label} {...fadeUp} transition={{ delay: i * 0.05 }} className="glass rounded-xl p-4 flex items-center gap-3">
            <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center bg-card', stat.color)}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold text-foreground">{stat.value}</div>
              <div className="text-[11px] text-muted-foreground">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="projects" className="w-full">
        <TabsList className="glass w-full justify-start gap-1 p-1 h-auto flex-wrap">
          <TabsTrigger value="projects" className="text-xs gap-1.5"><Briefcase className="w-3.5 h-3.5" /> Projects</TabsTrigger>
          <TabsTrigger value="feedback" className="text-xs gap-1.5"><Star className="w-3.5 h-3.5" /> Feedback</TabsTrigger>
          <TabsTrigger value="training" className="text-xs gap-1.5"><GraduationCap className="w-3.5 h-3.5" /> Training</TabsTrigger>
          <TabsTrigger value="signals" className="text-xs gap-1.5"><AlertTriangle className="w-3.5 h-3.5" /> Signals</TabsTrigger>
          <TabsTrigger value="career" className="text-xs gap-1.5"><TrendingUp className="w-3.5 h-3.5" /> Career</TabsTrigger>
        </TabsList>

        {/* Projects Tab */}
        <TabsContent value="projects" className="mt-4 space-y-3">
          {projects.length === 0 ? (
            <div className="glass rounded-xl p-8 text-center text-muted-foreground">No project history available</div>
          ) : projects.map((proj, i) => {
            const cfg = projectStatusConfig[proj.status];
            return (
              <motion.div key={proj.id} {...fadeUp} transition={{ delay: i * 0.05 }} className="glass rounded-xl p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-foreground">{proj.name}</h4>
                      <span className={cn('text-[10px] font-medium px-2 py-0.5 rounded-full', cfg.bg, cfg.color)}>{cfg.label}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{proj.role} · {proj.period}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{proj.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {proj.technologies.map(t => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-card text-muted-foreground border border-border">{t}</span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </TabsContent>

        {/* Feedback Tab */}
        <TabsContent value="feedback" className="mt-4 space-y-3">
          {feedback.length === 0 ? (
            <div className="glass rounded-xl p-8 text-center text-muted-foreground">No feedback records available</div>
          ) : feedback.map((fb, i) => {
            const typeCfg = feedbackTypeConfig[fb.type];
            return (
              <motion.div key={fb.id} {...fadeUp} transition={{ delay: i * 0.05 }} className="glass rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={cn('text-[10px] font-semibold px-2 py-0.5 rounded-full', typeCfg.color)}>{typeCfg.label}</span>
                    <span className="text-sm font-medium text-foreground">{fb.from}</span>
                    <span className="text-xs text-muted-foreground">· {fb.fromRole}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star key={idx} className={cn('w-3.5 h-3.5', idx < fb.rating ? 'text-logiq-amber fill-logiq-amber' : 'text-muted-foreground/30')} />
                    ))}
                    <span className="text-xs text-muted-foreground ml-2">{fb.date}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{fb.summary}</p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <h5 className="text-[10px] uppercase tracking-wider text-logiq-emerald font-semibold mb-1.5">Strengths</h5>
                    <ul className="space-y-1">
                      {fb.strengths.map((s, j) => (
                        <li key={j} className="text-xs text-foreground flex items-center gap-1.5">
                          <CheckCircle className="w-3 h-3 text-logiq-emerald flex-shrink-0" /> {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-[10px] uppercase tracking-wider text-logiq-amber font-semibold mb-1.5">Growth Areas</h5>
                    <ul className="space-y-1">
                      {fb.growthAreas.map((g, j) => (
                        <li key={j} className="text-xs text-foreground flex items-center gap-1.5">
                          <ChevronRight className="w-3 h-3 text-logiq-amber flex-shrink-0" /> {g}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </TabsContent>

        {/* Training Tab */}
        <TabsContent value="training" className="mt-4 space-y-4">
          {/* Training summary */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Completed', value: completedTrainings.length, icon: CheckCircle, color: 'text-logiq-emerald' },
              { label: 'In Progress', value: activeTrainings.length, icon: BookOpen, color: 'text-logiq-cyan' },
              { label: 'Total Hours', value: `${totalHours}h`, icon: Clock, color: 'text-logiq-amber' },
            ].map((s, i) => (
              <div key={s.label} className="glass rounded-xl p-4 text-center">
                <s.icon className={cn('w-5 h-5 mx-auto mb-1', s.color)} />
                <div className="text-xl font-bold text-foreground">{s.value}</div>
                <div className="text-[10px] text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>

          {trainings.length === 0 ? (
            <div className="glass rounded-xl p-8 text-center text-muted-foreground">No training records available</div>
          ) : trainings.map((tr, i) => {
            const tCfg = trainingStatusConfig[tr.status];
            return (
              <motion.div key={tr.id} {...fadeUp} transition={{ delay: i * 0.05 }} className="glass rounded-xl p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      {tr.type === 'certification' ? <Award className="w-4 h-4 text-logiq-amber" /> : <BookOpen className="w-4 h-4 text-logiq-cyan" />}
                      <h4 className="text-sm font-semibold text-foreground">{tr.title}</h4>
                      <span className={cn('text-[10px] font-medium px-2 py-0.5 rounded-full', tCfg.bg, tCfg.color)}>{tCfg.label}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{tr.provider} · {tr.type} · {tr.skillArea}</p>
                  </div>
                  {tr.score && <span className="text-sm font-bold text-logiq-emerald">{tr.score}%</span>}
                </div>
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {tr.hours}h</span>
                  <span>Started: {tr.startDate}</span>
                  {tr.completedDate && <span>Completed: {tr.completedDate}</span>}
                </div>
                {tr.status === 'in-progress' && (
                  <Progress value={50} className="mt-3 h-1.5" />
                )}
              </motion.div>
            );
          })}
        </TabsContent>

        {/* Signals Tab */}
        <TabsContent value="signals" className="mt-4 space-y-3">
          {signals.length === 0 ? (
            <div className="glass rounded-xl p-8 text-center text-muted-foreground">No active signals for this employee</div>
          ) : signals.map((sig, i) => {
            const sevColors: Record<string, string> = {
              critical: 'border-logiq-rose/30 bg-logiq-rose/5',
              warning: 'border-logiq-amber/30 bg-logiq-amber/5',
              info: 'border-logiq-cyan/30',
              positive: 'border-logiq-emerald/30',
            };
            return (
              <motion.div key={sig.id} {...fadeUp} transition={{ delay: i * 0.05 }} className={cn('glass rounded-xl p-5 border-l-4', sevColors[sig.severity])}>
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className={cn('w-4 h-4', sig.severity === 'critical' ? 'text-logiq-rose' : 'text-logiq-amber')} />
                  <h4 className="text-sm font-semibold text-foreground">{sig.title}</h4>
                  <span className="text-xs text-muted-foreground ml-auto">{sig.timestamp}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{sig.description}</p>
              </motion.div>
            );
          })}
        </TabsContent>

        {/* Career Tab */}
        <TabsContent value="career" className="mt-4 space-y-4">
          <div className="glass rounded-xl p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-primary" /> Role History</h3>
            {roleHistory.length === 0 ? (
              <p className="text-sm text-muted-foreground">No role history available</p>
            ) : (
              <div className="relative pl-6 space-y-4">
                <div className="absolute left-2 top-1 bottom-1 w-px bg-border" />
                {roleHistory.map((role, i) => (
                  <div key={role.id} className="relative">
                    <div className={cn('absolute -left-4 top-1 w-3 h-3 rounded-full border-2 border-background', i === 0 ? 'bg-primary' : 'bg-muted-foreground/30')} />
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">{role.title}</h4>
                      <p className="text-xs text-muted-foreground">{role.department} · {role.period} · {role.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="glass rounded-xl p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2"><GraduationCap className="w-4 h-4 text-logiq-cyan" /> Certifications & Achievements</h3>
            <div className="flex flex-wrap gap-2">
              {trainings.filter(t => t.type === 'certification').map(cert => (
                <div key={cert.id} className="flex items-center gap-2 glass rounded-lg px-3 py-2">
                  <Award className="w-4 h-4 text-logiq-amber" />
                  <div>
                    <div className="text-xs font-medium text-foreground">{cert.title}</div>
                    <div className="text-[10px] text-muted-foreground">{cert.provider} · {cert.status === 'completed' ? `Score: ${cert.score}%` : 'In Progress'}</div>
                  </div>
                </div>
              ))}
              {trainings.filter(t => t.type === 'certification').length === 0 && (
                <p className="text-sm text-muted-foreground">No certifications yet</p>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmployeeDetail;

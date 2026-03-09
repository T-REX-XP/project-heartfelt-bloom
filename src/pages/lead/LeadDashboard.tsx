import { motion } from 'framer-motion';
import KPICard from '@/components/KPICard';
import SignalCard from '@/components/SignalCard';
import EmployeeCard from '@/components/EmployeeCard';
import CopilotPanel from '@/components/CopilotPanel';
import { teamLeadKPIs, teamLeadSignals, employees, teamSummary } from '@/mocks/data';
import { AlertTriangle, DollarSign, Users, TrendingDown, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const LeadDashboard = () => {
  const atRiskEmployees = employees.filter(e => e.status === 'red');
  const unreadSignals = teamLeadSignals.filter(s => !s.isRead);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Team Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">Intelligence overview for your team of {teamSummary.totalMembers}</p>
        </div>
        <CopilotPanel>
          <Button className="gradient-primary text-primary-foreground border-0">
            <Bot className="w-4 h-4 mr-2" /> Ask Copilot
          </Button>
        </CopilotPanel>
      </div>

      {/* Urgent signals banner */}
      {unreadSignals.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-4 border border-logiq-rose/30 bg-logiq-rose/5"
        >
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-logiq-rose signal-pulse" />
            <span className="text-sm font-medium text-foreground">
              {unreadSignals.length} urgent signals require attention
            </span>
            <Link to="/lead/signals" className="ml-auto text-sm text-primary hover:underline">
              View All →
            </Link>
          </div>
        </motion.div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {teamLeadKPIs.map((kpi, i) => (
          <KPICard key={kpi.id} kpi={kpi} index={i} />
        ))}
      </div>

      {/* Risk Exposure Row */}
      <div className="grid md:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-4 h-4 text-logiq-rose" />
            <span className="text-sm font-medium text-muted-foreground">At-Risk Employees</span>
          </div>
          <span className="text-3xl font-bold text-logiq-rose">{teamSummary.atRiskCount}</span>
          <span className="text-sm text-muted-foreground ml-2">of {teamSummary.totalMembers}</span>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <DollarSign className="w-4 h-4 text-logiq-amber" />
            <span className="text-sm font-medium text-muted-foreground">Churn Exposure</span>
          </div>
          <span className="text-3xl font-bold text-logiq-amber">${(teamSummary.churnExposure / 1000).toFixed(0)}k</span>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <TrendingDown className="w-4 h-4 text-logiq-rose" />
            <span className="text-sm font-medium text-muted-foreground">Total People Risk</span>
          </div>
          <span className="text-3xl font-bold text-logiq-rose">${(teamSummary.totalPeopleRisk / 1000).toFixed(0)}k</span>
          <span className="text-sm text-muted-foreground ml-1">/year</span>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Signals */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Recent Signals</h2>
            <Link to="/lead/signals" className="text-sm text-primary hover:underline">View All</Link>
          </div>
          <div className="space-y-3">
            {teamLeadSignals.slice(0, 4).map((signal, i) => (
              <SignalCard key={signal.id} signal={signal} index={i} />
            ))}
          </div>
        </div>

        {/* At-Risk Employees */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">At-Risk Employees</h2>
            <Link to="/lead/team" className="text-sm text-primary hover:underline">View Team</Link>
          </div>
          <div className="space-y-3">
            {atRiskEmployees.map((emp, i) => (
              <EmployeeCard key={emp.id} employee={emp} index={i} />
            ))}
          </div>

          {/* Quick 1:1 prep */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Upcoming 1:1 Prep Available</h3>
            {atRiskEmployees.map(emp => (
              <Link key={emp.id} to={`/lead/one-on-ones?employee=${emp.id}`}>
                <div className="glass rounded-lg p-3 mb-2 flex items-center justify-between hover:bg-card/80 transition-colors">
                  <span className="text-sm text-foreground">{emp.name}</span>
                  <span className="text-xs text-primary">Prepare 1:1 →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDashboard;

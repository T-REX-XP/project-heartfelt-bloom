import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import SignalCard from '@/components/SignalCard';
import { teamLeadSignals, employees, teamSummary } from '@/mocks/data';
import { motion } from 'framer-motion';
import { DollarSign, AlertTriangle, ShieldCheck, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const WellbeingRisks = () => {
  const sorted = [...employees].sort((a, b) => b.churnRisk - a.churnRisk);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Wellbeing & Risks</h1>
        <p className="text-muted-foreground text-sm mt-1">Monitor team signals and churn exposure</p>
      </div>

      <Tabs defaultValue="signals" className="w-full">
        <TabsList>
          <TabsTrigger value="signals">Signals</TabsTrigger>
          <TabsTrigger value="churn-risk">Churn Risk</TabsTrigger>
        </TabsList>

        <TabsContent value="signals" className="space-y-3 mt-4">
          {teamLeadSignals.map((signal, i) => (
            <SignalCard key={signal.id} signal={signal} index={i} />
          ))}
        </TabsContent>

        <TabsContent value="churn-risk" className="space-y-6 mt-4">
          <div className="grid md:grid-cols-3 gap-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2"><DollarSign className="w-4 h-4 text-destructive" /><span className="text-sm text-muted-foreground">Churn Exposure</span></div>
              <span className="text-3xl font-bold text-destructive">${(teamSummary.churnExposure / 1000)}k</span>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2"><TrendingDown className="w-4 h-4 text-warning" /><span className="text-sm text-muted-foreground">Absence Cost</span></div>
              <span className="text-3xl font-bold text-warning">${(teamSummary.absenceCost / 1000)}k</span><span className="text-sm text-muted-foreground">/yr</span>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2"><ShieldCheck className="w-4 h-4 text-primary" /><span className="text-sm text-muted-foreground">Preventability</span></div>
              <span className="text-3xl font-bold text-primary">72%</span>
            </motion.div>
          </div>

          <div className="glass rounded-xl overflow-hidden">
            <div className="grid grid-cols-6 gap-4 px-5 py-3 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <span className="col-span-2">Employee</span><span>Churn Risk</span><span>Wellbeing</span><span>Motivation</span><span>Est. Replace Cost</span>
            </div>
            {sorted.map((emp, i) => (
              <motion.div key={emp.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="grid grid-cols-6 gap-4 px-5 py-3 border-b border-border/50 hover:bg-card/50 transition-colors items-center">
                <div className="col-span-2 flex items-center gap-2">
                  {emp.churnRisk > 60 && <AlertTriangle className="w-3.5 h-3.5 text-destructive" />}
                  <div>
                    <div className="text-sm font-medium text-foreground">{emp.name}</div>
                    <div className="text-xs text-muted-foreground">{emp.role}</div>
                  </div>
                </div>
                <div className={cn("text-sm font-bold", emp.churnRisk > 60 ? 'text-destructive' : emp.churnRisk > 30 ? 'text-warning' : 'text-primary')}>{emp.churnRisk}%</div>
                <div className={cn("text-sm", emp.wellbeingScore >= 70 ? 'text-primary' : emp.wellbeingScore >= 50 ? 'text-warning' : 'text-destructive')}>{emp.wellbeingScore}</div>
                <div className={cn("text-sm", emp.motivationScore >= 70 ? 'text-primary' : emp.motivationScore >= 50 ? 'text-warning' : 'text-destructive')}>{emp.motivationScore}</div>
                <div className="text-sm text-muted-foreground">${emp.churnRisk > 60 ? '85k' : emp.churnRisk > 30 ? '60k' : '45k'}</div>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WellbeingRisks;

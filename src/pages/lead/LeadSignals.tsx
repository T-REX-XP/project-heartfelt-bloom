import SignalCard from '@/components/SignalCard';
import { teamLeadSignals } from '@/mocks/data';

const LeadSignals = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Signal Center</h1>
      <p className="text-muted-foreground text-sm mt-1">Proactive alerts and recommendations for your team</p>
    </div>
    <div className="space-y-3">
      {teamLeadSignals.map((signal, i) => (
        <SignalCard key={signal.id} signal={signal} index={i} />
      ))}
    </div>
  </div>
);

export default LeadSignals;

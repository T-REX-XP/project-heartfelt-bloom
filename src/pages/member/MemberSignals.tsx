import SignalCard from '@/components/SignalCard';
import { teamMemberSignals } from '@/mocks/data';

const MemberSignals = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Your Signals</h1>
      <p className="text-muted-foreground text-sm mt-1">Personal insights and recommendations</p>
    </div>
    <div className="space-y-3">
      {teamMemberSignals.map((signal, i) => (
        <SignalCard key={signal.id} signal={signal} index={i} />
      ))}
    </div>
  </div>
);

export default MemberSignals;

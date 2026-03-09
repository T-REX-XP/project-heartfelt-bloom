import { makeStyles, shorthands, Text, tokens } from '@fluentui/react-components';
import SignalCard from '@/components/SignalCard';
import { teamMemberSignals } from '@/mocks/data';

const useStyles = makeStyles({
  root: { display: 'flex', flexDirection: 'column', ...shorthands.gap('24px') },
  list: { display: 'flex', flexDirection: 'column', ...shorthands.gap('12px') },
});

const MemberSignals = () => {
  const s = useStyles();
  return (
    <div className={s.root}>
      <div>
        <Text size={600} weight="bold" block>Your Signals</Text>
        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>Personal insights and recommendations</Text>
      </div>
      <div className={s.list}>
        {teamMemberSignals.map((signal, i) => <SignalCard key={signal.id} signal={signal} index={i} />)}
      </div>
    </div>
  );
};

export default MemberSignals;

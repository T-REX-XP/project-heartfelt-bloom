import { makeStyles, shorthands, Text, tokens, Tab, TabList } from '@fluentui/react-components';
import { useState } from 'react';
import EmployeeCard from '@/components/EmployeeCard';
import { employees } from '@/mocks/data';
import { useNavigate } from 'react-router-dom';
import LeadSkills from './LeadSkills';
import LeadDelivery from './LeadDelivery';

const useStyles = makeStyles({
  root: { display: 'flex', flexDirection: 'column', ...shorthands.gap('24px') },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    ...shorthands.gap('16px'),
  },
});

const LeadTeam = () => {
  const s = useStyles();
  const navigate = useNavigate();
  const [tab, setTab] = useState('people');

  return (
    <div className={s.root}>
      <div>
        <Text size={600} weight="bold" block>My Team</Text>
        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>{employees.length} team members</Text>
      </div>

      <TabList selectedValue={tab} onTabSelect={(_, d) => setTab(d.value as string)}>
        <Tab value="people">People</Tab>
        <Tab value="skills">Skills</Tab>
        <Tab value="delivery">Delivery</Tab>
      </TabList>

      {tab === 'people' && (
        <div className={s.grid}>
          {employees.map((emp, i) => (
            <EmployeeCard key={emp.id} employee={emp} index={i} onClick={() => navigate(`/lead/team/${emp.id}`)} />
          ))}
        </div>
      )}
      {tab === 'skills' && <LeadSkills />}
      {tab === 'delivery' && <LeadDelivery />}
    </div>
  );
};

export default LeadTeam;

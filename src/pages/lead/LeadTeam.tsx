import EmployeeCard from '@/components/EmployeeCard';
import { employees } from '@/mocks/data';
import { useNavigate } from 'react-router-dom';

const LeadTeam = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Team Overview</h1>
        <p className="text-muted-foreground text-sm mt-1">{employees.length} team members</p>
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {employees.map((emp, i) => (
          <EmployeeCard key={emp.id} employee={emp} index={i} onClick={() => navigate(`/lead/team/${emp.id}`)} />
        ))}
      </div>
    </div>
  );
};

export default LeadTeam;

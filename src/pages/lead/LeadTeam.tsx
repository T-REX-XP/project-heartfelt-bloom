import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import EmployeeCard from '@/components/EmployeeCard';
import { employees } from '@/mocks/data';
import { useNavigate } from 'react-router-dom';
import LeadSkills from './LeadSkills';
import LeadDelivery from './LeadDelivery';

const LeadTeam = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Team</h1>
        <p className="text-muted-foreground text-sm mt-1">{employees.length} team members</p>
      </div>

      <Tabs defaultValue="people" className="w-full">
        <TabsList>
          <TabsTrigger value="people">People</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="delivery">Delivery</TabsTrigger>
        </TabsList>

        <TabsContent value="people" className="mt-4">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {employees.map((emp, i) => (
              <EmployeeCard key={emp.id} employee={emp} index={i} onClick={() => navigate(`/lead/team/${emp.id}`)} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="skills" className="mt-4">
          <LeadSkills />
        </TabsContent>

        <TabsContent value="delivery" className="mt-4">
          <LeadDelivery />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeadTeam;

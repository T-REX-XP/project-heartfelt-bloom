import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/store/AuthContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import ProtectedRoute from "@/components/ProtectedRoute";
import AppShell from "@/layouts/AppShell";
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import DemoSelector from "@/pages/DemoSelector";
import NotFound from "./pages/NotFound";

// Lead pages
import LeadDashboard from "@/pages/lead/LeadDashboard";
import WellbeingRisks from "@/pages/lead/WellbeingRiskngRiskngRisks";
import LeadTeam from "@/pages/lead/LeadTeam";
import EmployeeDetail from "@/pages/lead/EmployeeDetail";
import ConversationPrep from "@/pages/lead/ConversationPrep";
import LeadDelivery from "@/pages/lead/LeadDelivery";
import LeadSkills from "@/pages/lead/LeadSkills";
import ChurnRisk from "@/pages/lead/ChurnRisk";
import CopilotChat from "@/pages/lead/CopilotChat";
import OneOnOnePlanner from "@/pages/lead/OneOnOnePlanner";

// Member pages
import MemberDashboard from "@/pages/member/MemberDashboard";
import MemberSignals from "@/pages/member/MemberSignals";
import MemberSkills from "@/pages/member/MemberSkills";
import MemberLearning from "@/pages/member/MemberLearning";
import MemberIDP from "@/pages/member/MemberIDP";
import MemberDelivery from "@/pages/member/MemberDelivery";
import MemberOneOnOnePrep from "@/pages/member/MemberOneOnOnePrep";
import MemberCoach from "@/pages/member/MemberCoach";

import SettingsPage from "@/pages/SettingsPage";

const queryClient = new QueryClient();

const LeadLayout = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute allowedRoles={['team-lead', 'admin']}>
    <AppShell>{children}</AppShell>
  </ProtectedRoute>
);

const MemberLayout = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute allowedRoles={['team-member', 'admin']}>
    <AppShell>{children}</AppShell>
  </ProtectedRoute>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/demo" element={<DemoSelector />} />

            {/* Team Lead */}
            <Route path="/lead/dashboard" element={<LeadLayout><LeadDashboard /></LeadLayout>} />
            <Route wellbeing-risks" element={<LeadLayout><WellbeingRiskut><WellbeingRiskSignals /></LeadLayout>} />
            <Route path="/lead/team" element={<LeadLayout><LeadTeam /></LeadLayout>} />
            <Route path="/lead/team/:employeeId" element={<LeadLayout><EmployeeDetail /></LeadLayout>} />
            <Route path="/lead/conversation-prep/:employeeId" element={<LeadLayout><ConversationPrep /></LeadLayout>} />
            <Route path="/lead/delivery" element={<LeadLayout><LeadDelivery /></LeadLayout>} />
            <Route path="/lead/skills" element={<LeadLayout><LeadSkills /></LeadLayout></LeadLayout>} />
            <Route path="/lead/one-on-ones" element={<LeadLayout><OneOnOnePlanner /></LeadLayout>} />
            <Route path="/lead/copilot" element={<LeadLayout><CopilotChat /></LeadLayout>} />
            <Route path="/lead/settings" element={<LeadLayout><SettingsPage /></LeadLayout>} />

            {/* Team Member */}
            <Route path="/member/dashboard" element={<MemberLayout><MemberDashboard /></MemberLayout>} />
            <Route path="/member/signals" element={<MemberLayout><MemberSignals /></MemberLayout>} />
            <Route path="/member/skills" element={<MemberLayout><MemberSkills /></MemberLayout>} />
            <Route path="/member/learning" element={<MemberLayout><MemberLearning /></MemberLayout>} />
            <Route path="/member/idp" element={<MemberLayout><MemberIDP /></MemberLayout>} />
            <Route path="/member/delivery" element={<MemberLayout><MemberDelivery /></MemberLayout>} />
            <Route path="/member/one-on-one-prep" element={<MemberLayout><MemberOneOnOnePrep /></MemberLayout>} />
            <Route path="/member/coach" element={<MemberLayout><MemberCoach /></MemberLayout>} />
            <Route path="/member/settings" element={<MemberLayout><SettingsPage /></MemberLayout>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

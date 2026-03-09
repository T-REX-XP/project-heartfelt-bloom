import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/store/AuthContext";
import AppShell from "@/layouts/AppShell";
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import NotFound from "./pages/NotFound";

// Lead pages
import LeadDashboard from "@/pages/lead/LeadDashboard";
import WellbeingRisks from "@/pages/lead/WellbeingRisks";
import LeadTeam from "@/pages/lead/LeadTeam";
import EmployeeDetail from "@/pages/lead/EmployeeDetail";
import ConversationPrep from "@/pages/lead/ConversationPrep";
import OneOnOnePlanner from "@/pages/lead/OneOnOnePlanner";

// Member pages
import MemberDashboard from "@/pages/member/MemberDashboard";
import MemberSignals from "@/pages/member/MemberSignals";
import MemberIDP from "@/pages/member/MemberIDP";
import MemberDelivery from "@/pages/member/MemberDelivery";
import MemberOneOnOnePrep from "@/pages/member/MemberOneOnOnePrep";

import SettingsPage from "@/pages/SettingsPage";
import ProtectedRoute from "@/components/ProtectedRoute";

const queryClient = new QueryClient();

const LeadLayout = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute allowedRoles={['team-lead']}>
    <AppShell>{children}</AppShell>
  </ProtectedRoute>
);

const MemberLayout = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute allowedRoles={['team-member']}>
    <AppShell>{children}</AppShell>
  </ProtectedRoute>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Team Lead */}
          <Route path="/lead/dashboard" element={<LeadLayout><LeadDashboard /></LeadLayout>} />
          <Route path="/lead/wellbeing-risks" element={<LeadLayout><WellbeingRisks /></LeadLayout>} />
          <Route path="/lead/team" element={<LeadLayout><LeadTeam /></LeadLayout>} />
          <Route path="/lead/team/:employeeId" element={<LeadLayout><EmployeeDetail /></LeadLayout>} />
          <Route path="/lead/conversation-prep/:employeeId" element={<LeadLayout><ConversationPrep /></LeadLayout>} />
          <Route path="/lead/one-on-ones" element={<LeadLayout><OneOnOnePlanner /></LeadLayout>} />
          <Route path="/lead/settings" element={<LeadLayout><SettingsPage /></LeadLayout>} />

          {/* Team Member */}
          <Route path="/member/dashboard" element={<MemberLayout><MemberDashboard /></MemberLayout>} />
          <Route path="/member/signals" element={<MemberLayout><MemberSignals /></MemberLayout>} />
          <Route path="/member/idp" element={<MemberLayout><MemberIDP /></MemberLayout>} />
          <Route path="/member/delivery" element={<MemberLayout><MemberDelivery /></MemberLayout>} />
          <Route path="/member/one-on-one-prep" element={<MemberLayout><MemberOneOnOnePrep /></MemberLayout>} />
          <Route path="/member/settings" element={<MemberLayout><SettingsPage /></MemberLayout>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

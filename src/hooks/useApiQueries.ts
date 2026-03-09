/**
 * React Query hooks for all API data.
 * 
 * Each hook wraps a single ApiClient method with React Query,
 * providing automatic caching, refetching, loading & error states.
 * 
 * Usage:
 *   const { data, isLoading, error } = useEmployees();
 *   // data is Employee[] | undefined
 */

import { useQuery } from '@tanstack/react-query';
import { getApiClient } from '@/api';

const api = getApiClient();

// ── Query key factory (prevents key collisions) ─────────────────
export const queryKeys = {
  employees: ['employees'] as const,
  employee: (id: string) => ['employees', id] as const,
  teamLeadSignals: ['signals', 'lead'] as const,
  teamMemberSignals: ['signals', 'member'] as const,
  teamLeadKPIs: ['kpis', 'lead'] as const,
  teamSummary: ['team-summary'] as const,
  conversationPrep: (id: string) => ['conversation-prep', id] as const,
  learningRecommendations: ['learning-recommendations'] as const,
  idpGoals: ['idp-goals'] as const,
  employeeProjects: (id: string) => ['employee-projects', id] as const,
  employeeFeedback: (id: string) => ['employee-feedback', id] as const,
  employeeTraining: (id: string) => ['employee-training', id] as const,
  employeeRoleHistory: (id: string) => ['employee-role-history', id] as const,
  oneOnOneMeetings: ['one-on-one-meetings'] as const,
  agents: ['agents'] as const,
};

// ── Hooks ───────────────────────────────────────────────────────

export function useEmployees() {
  return useQuery({
    queryKey: queryKeys.employees,
    queryFn: async () => (await api.getEmployees()).data,
  });
}

export function useEmployee(id: string) {
  return useQuery({
    queryKey: queryKeys.employee(id),
    queryFn: async () => (await api.getEmployeeById(id)).data,
    enabled: !!id,
  });
}

export function useTeamLeadSignals() {
  return useQuery({
    queryKey: queryKeys.teamLeadSignals,
    queryFn: async () => (await api.getTeamLeadSignals()).data,
  });
}

export function useTeamMemberSignals() {
  return useQuery({
    queryKey: queryKeys.teamMemberSignals,
    queryFn: async () => (await api.getTeamMemberSignals()).data,
  });
}

export function useTeamLeadKPIs() {
  return useQuery({
    queryKey: queryKeys.teamLeadKPIs,
    queryFn: async () => (await api.getTeamLeadKPIs()).data,
  });
}

export function useTeamSummary() {
  return useQuery({
    queryKey: queryKeys.teamSummary,
    queryFn: async () => (await api.getTeamSummary()).data,
  });
}

export function useConversationPrep(employeeId: string) {
  return useQuery({
    queryKey: queryKeys.conversationPrep(employeeId),
    queryFn: async () => (await api.getConversationPrep(employeeId)).data,
    enabled: !!employeeId,
  });
}

export function useLearningRecommendations() {
  return useQuery({
    queryKey: queryKeys.learningRecommendations,
    queryFn: async () => (await api.getLearningRecommendations()).data,
  });
}

export function useIDPGoals() {
  return useQuery({
    queryKey: queryKeys.idpGoals,
    queryFn: async () => (await api.getIDPGoals()).data,
  });
}

export function useEmployeeProjects(employeeId: string) {
  return useQuery({
    queryKey: queryKeys.employeeProjects(employeeId),
    queryFn: async () => (await api.getEmployeeProjects(employeeId)).data,
    enabled: !!employeeId,
  });
}

export function useEmployeeFeedback(employeeId: string) {
  return useQuery({
    queryKey: queryKeys.employeeFeedback(employeeId),
    queryFn: async () => (await api.getEmployeeFeedback(employeeId)).data,
    enabled: !!employeeId,
  });
}

export function useEmployeeTraining(employeeId: string) {
  return useQuery({
    queryKey: queryKeys.employeeTraining(employeeId),
    queryFn: async () => (await api.getEmployeeTraining(employeeId)).data,
    enabled: !!employeeId,
  });
}

export function useEmployeeRoleHistory(employeeId: string) {
  return useQuery({
    queryKey: queryKeys.employeeRoleHistory(employeeId),
    queryFn: async () => (await api.getEmployeeRoleHistory(employeeId)).data,
    enabled: !!employeeId,
  });
}

export function useOneOnOneMeetings() {
  return useQuery({
    queryKey: queryKeys.oneOnOneMeetings,
    queryFn: async () => (await api.getOneOnOneMeetings()).data,
  });
}

export function useAgents() {
  return useQuery({
    queryKey: queryKeys.agents,
    queryFn: async () => (await api.getAgents()).data,
  });
}

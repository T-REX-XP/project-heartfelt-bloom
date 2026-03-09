/**
 * API Client Interface
 * 
 * Defines the contract for all data access. Swap MockApiClient for a 
 * real HttpApiClient when backend endpoints are ready.
 * 
 * Each method returns a Promise to simulate async behavior, 
 * making the switch to real HTTP calls seamless.
 */

import type {
  Employee, Signal, KPI, TeamSummary, ConversationPrep,
  LearningRecommendation, IDPGoal, Agent, ProjectHistory,
  FeedbackEntry, TrainingRecord, RoleHistory, OneOnOneMeeting,
} from '@/domain/types';

// ── Response wrapper ────────────────────────────────────────────
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// ── Client interface ────────────────────────────────────────────
export interface ApiClient {
  // Team / employees
  getEmployees(): Promise<ApiResponse<Employee[]>>;
  getEmployeeById(id: string): Promise<ApiResponse<Employee>>;

  // Signals
  getTeamLeadSignals(): Promise<ApiResponse<Signal[]>>;
  getTeamMemberSignals(): Promise<ApiResponse<Signal[]>>;

  // KPIs & summary
  getTeamLeadKPIs(): Promise<ApiResponse<KPI[]>>;
  getTeamSummary(): Promise<ApiResponse<TeamSummary>>;

  // Conversation prep
  getConversationPrep(employeeId: string): Promise<ApiResponse<ConversationPrep>>;

  // Learning & IDP
  getLearningRecommendations(): Promise<ApiResponse<LearningRecommendation[]>>;
  getIDPGoals(): Promise<ApiResponse<IDPGoal[]>>;

  // Employee detail data
  getEmployeeProjects(employeeId: string): Promise<ApiResponse<ProjectHistory[]>>;
  getEmployeeFeedback(employeeId: string): Promise<ApiResponse<FeedbackEntry[]>>;
  getEmployeeTraining(employeeId: string): Promise<ApiResponse<TrainingRecord[]>>;
  getEmployeeRoleHistory(employeeId: string): Promise<ApiResponse<RoleHistory[]>>;

  // Meetings
  getOneOnOneMeetings(): Promise<ApiResponse<OneOnOneMeeting[]>>;

  // Agents
  getAgents(): Promise<ApiResponse<Agent[]>>;
}

/**
 * Mock API Client
 * 
 * Implements ApiClient using static mock data with configurable
 * simulated latency. Replace with HttpApiClient for production.
 */

import type { ApiClient, ApiResponse } from './client';
import {
  employees, teamLeadSignals, teamMemberSignals, teamLeadKPIs,
  teamSummary, alexConversationPrep, learningRecommendations,
  idpGoals, agents, employeeProjects, employeeFeedback,
  employeeTrainings, employeeRoleHistory,
} from '@/mocks/data';

const SIMULATED_DELAY_MS = 400;

function delay(ms: number = SIMULATED_DELAY_MS): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function ok<T>(data: T): ApiResponse<T> {
  return { data, status: 200 };
}

function notFound(entity: string, id: string): never {
  throw new ApiError(`${entity} "${id}" not found`, 404);
}

export class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    this.name = 'ApiError';
  }
}

export class MockApiClient implements ApiClient {
  async getEmployees() {
    await delay();
    return ok(employees);
  }

  async getEmployeeById(id: string) {
    await delay();
    const emp = employees.find(e => e.id === id);
    if (!emp) notFound('Employee', id);
    return ok(emp);
  }

  async getTeamLeadSignals() {
    await delay();
    return ok(teamLeadSignals);
  }

  async getTeamMemberSignals() {
    await delay();
    return ok(teamMemberSignals);
  }

  async getTeamLeadKPIs() {
    await delay();
    return ok(teamLeadKPIs);
  }

  async getTeamSummary() {
    await delay();
    return ok(teamSummary);
  }

  async getConversationPrep(employeeId: string) {
    await delay();
    if (employeeId === 'alex') return ok(alexConversationPrep);
    notFound('ConversationPrep', employeeId);
  }

  async getLearningRecommendations() {
    await delay();
    return ok(learningRecommendations);
  }

  async getIDPGoals() {
    await delay();
    return ok(idpGoals);
  }

  async getEmployeeProjects(employeeId: string) {
    await delay();
    return ok(employeeProjects[employeeId] ?? []);
  }

  async getEmployeeFeedback(employeeId: string) {
    await delay();
    return ok(employeeFeedback[employeeId] ?? []);
  }

  async getEmployeeTraining(employeeId: string) {
    await delay();
    return ok(employeeTraining[employeeId] ?? []);
  }

  async getEmployeeRoleHistory(employeeId: string) {
    await delay();
    return ok(employeeRoleHistory[employeeId] ?? []);
  }

  async getOneOnOneMeetings() {
    await delay();
    return ok(oneOnOneMeetings);
  }

  async getAgents() {
    await delay();
    return ok(agents);
  }
}

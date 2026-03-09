/**
 * API Provider
 * 
 * Single source of truth for the active ApiClient instance.
 * Swap MockApiClient → HttpApiClient here when backend is ready.
 */

import type { ApiClient } from './client';
import { MockApiClient } from './mock-client';

// Change this line to switch implementations:
const apiClient: ApiClient = new MockApiClient();

export function getApiClient(): ApiClient {
  return apiClient;
}

export { type ApiClient } from './client';
export { type ApiResponse } from './client';
export { ApiError } from './mock-client';

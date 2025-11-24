import { Client } from './client';
import { BugByBugConfig } from './types';

let clientInstance: Client | undefined;

export function init(config: BugByBugConfig) {
  if (!clientInstance) {
    clientInstance = new Client(config);
    clientInstance.init();
  }
  return clientInstance;
}

export function captureException(error: Error, customData?: Record<string, any>) {
  if (clientInstance) {
    clientInstance.captureException(error, customData);
  } else {
    console.warn('[BugByBug] SDK not initialized. Call init() first.');
  }
}

export function setUser(id: string, email?: string) {
  if (clientInstance) {
    clientInstance.setUser(id, email);
  }
}

export { Client, BugByBugConfig };
import { Client } from './client';
import { BugByBugConfig } from './types';
export declare function init(config: BugByBugConfig): Client;
export declare function captureException(error: Error, customData?: Record<string, any>): void;
export declare function setUser(id: string, email?: string): void;
export { Client, BugByBugConfig };

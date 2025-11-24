import { BugByBugConfig } from './types';
export declare class Client {
    private config;
    private transport;
    private isInitialized;
    private sessionId;
    private user;
    constructor(config: BugByBugConfig);
    init(): void;
    setUser(id: string, email?: string): void;
    captureException(error: Error, customData?: Record<string, any>): void;
    captureMessage(message: string, level?: 'info' | 'warning' | 'error'): void;
    private buildPayload;
    private registerGlobalHandlers;
    private getOrSetSessionId;
}

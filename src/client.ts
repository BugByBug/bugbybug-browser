import { BugByBugConfig, IngestErrorRequest } from './types';
import { Transport } from './transport';
import { getDeviceInfo, getPerformanceMetrics } from './device';
import { addBreadcrumb, getBreadcrumbs, initInstrumentation } from './breadcrumbs';
import { generateUUID, getCookie, setCookie } from './utils';

export class Client {
  private config: BugByBugConfig;
  private transport: Transport;
  private isInitialized = false;
  private sessionId: string;
  private user: { id?: string; email?: string } = {};

  constructor(config: BugByBugConfig) {
    this.config = config;
    this.transport = new Transport(config);
    this.sessionId = this.getOrSetSessionId();
  }

  public init() {
    if (this.isInitialized) return;
    
    initInstrumentation();
    this.registerGlobalHandlers();
    this.isInitialized = true;
    
    if (this.config.debug) {
      console.log('[BugByBug] SDK Initialized');
    }
  }

  public setUser(id: string, email?: string) {
    this.user = { id, email };
  }

  public captureException(error: Error, customData?: Record<string, any>) {
    const payload = this.buildPayload(error, customData);
    this.transport.send(payload);
  }

  public captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info') {
    const error = new Error(message);
    error.name = level === 'error' ? 'Error' : 'Log';
    this.captureException(error);
  }

  private buildPayload(error: Error, customData?: Record<string, any>): IngestErrorRequest {
    return {
      errorType: error.name || 'UnknownError',
      message: error.message || 'No error message',
      stackTrace: error.stack || '',
      environment: this.config.environment || 'production',
      url: typeof window !== 'undefined' ? window.location.href : '',
      appVersion: this.config.appVersion,
      sdkVersion: '0.1.0', 
      userId: this.user.id,
      userEmail: this.user.email,
      sessionId: this.sessionId,
      timestamp: new Date().toISOString(),
      device: getDeviceInfo(),
      breadcrumbs: getBreadcrumbs(),
      customData: customData,
      tags: [],
      performance: getPerformanceMetrics()
    };
  }

  private registerGlobalHandlers() {
    if (typeof window === 'undefined') return;

    window.onerror = (msg, url, line, col, error) => {
      if (error instanceof Error) {
        this.captureException(error);
      } else {
        this.captureException(new Error(String(msg)));
      }
    };

    window.onunhandledrejection = (event) => {
      const error = event.reason instanceof Error ? event.reason : new Error(String(event.reason));
      error.name = 'UnhandledRejection';
      this.captureException(error);
    };
  }

  private getOrSetSessionId(): string {
    let id = getCookie('bbb_session_id');
    if (!id) {
      id = generateUUID();
      setCookie('bbb_session_id', id, 1); 
    }
    return id;
  }
}
export interface IngestErrorRequest {
    errorType: string;
    message: string;
    stackTrace: string;
    environment: string;
    url: string;
    appVersion?: string;
    sdkVersion: string;
    userId?: string;
    userEmail?: string;
    sessionId: string;
    timestamp: string;
    device: DeviceInfo;
    breadcrumbs: Breadcrumb[];
    customData?: Record<string, any>;
    tags?: string[];
    performance?: PerformanceMetrics;
}
export interface DeviceInfo {
    browser: string;
    browserVersion: string;
    os: string;
    osVersion: string;
    device: string;
    userAgent: string;
    ipAddress?: string;
    viewport: string;
    screenResolution: string;
}
export interface Breadcrumb {
    type: 'manual' | 'navigation' | 'click' | 'console' | 'error';
    category: string;
    message: string;
    level: 'info' | 'warning' | 'error';
    timestamp: string;
    data?: Record<string, any>;
}
export interface PerformanceMetrics {
    memoryUsed?: number;
    memoryLimit?: number;
    pageLoadTime?: number;
    connectionType?: string;
    connectionSpeed?: number;
}
export interface BugByBugConfig {
    apiKey: string;
    appVersion?: string;
    environment?: string;
    apiUrl?: string;
    releaseStage?: string;
    maxBreadcrumbs?: number;
    debug?: boolean;
}

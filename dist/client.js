"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const transport_1 = require("./transport");
const device_1 = require("./device");
const breadcrumbs_1 = require("./breadcrumbs");
const utils_1 = require("./utils");
class Client {
    constructor(config) {
        this.isInitialized = false;
        this.user = {};
        this.config = config;
        this.transport = new transport_1.Transport(config);
        this.sessionId = this.getOrSetSessionId();
    }
    init() {
        if (this.isInitialized)
            return;
        (0, breadcrumbs_1.initInstrumentation)();
        this.registerGlobalHandlers();
        this.isInitialized = true;
        if (this.config.debug) {
            console.log('[BugByBug] SDK Initialized');
        }
    }
    setUser(id, email) {
        this.user = { id, email };
    }
    captureException(error, customData) {
        const payload = this.buildPayload(error, customData);
        this.transport.send(payload);
    }
    captureMessage(message, level = 'info') {
        const error = new Error(message);
        error.name = level === 'error' ? 'Error' : 'Log';
        this.captureException(error);
    }
    buildPayload(error, customData) {
        return {
            errorType: error.name || 'UnknownError',
            message: error.message || 'No error message',
            stackTrace: error.stack || '',
            environment: this.config.environment || 'production',
            url: typeof window !== 'undefined' ? window.location.href : '',
            appVersion: this.config.appVersion,
            sdkVersion: '0.1.1',
            userId: this.user.id,
            userEmail: this.user.email,
            sessionId: this.sessionId,
            timestamp: new Date().toISOString(),
            device: (0, device_1.getDeviceInfo)(),
            breadcrumbs: (0, breadcrumbs_1.getBreadcrumbs)(),
            customData: customData,
            tags: [],
            performance: (0, device_1.getPerformanceMetrics)()
        };
    }
    registerGlobalHandlers() {
        if (typeof window === 'undefined')
            return;
        window.onerror = (msg, url, line, col, error) => {
            if (error instanceof Error) {
                this.captureException(error);
            }
            else {
                this.captureException(new Error(String(msg)));
            }
        };
        window.onunhandledrejection = (event) => {
            const error = event.reason instanceof Error ? event.reason : new Error(String(event.reason));
            error.name = 'UnhandledRejection';
            this.captureException(error);
        };
    }
    getOrSetSessionId() {
        let id = (0, utils_1.getCookie)('bbb_session_id');
        if (!id) {
            id = (0, utils_1.generateUUID)();
            (0, utils_1.setCookie)('bbb_session_id', id, 1);
        }
        return id;
    }
}
exports.Client = Client;
//# sourceMappingURL=client.js.map
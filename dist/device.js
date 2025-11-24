"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeviceInfo = getDeviceInfo;
exports.getPerformanceMetrics = getPerformanceMetrics;
function getDeviceInfo() {
    const ua = navigator.userAgent;
    let browser = 'Unknown';
    let browserVersion = '';
    let os = 'Unknown';
    let osVersion = '';
    if (ua.indexOf('Win') !== -1)
        os = 'Windows';
    else if (ua.indexOf('Mac') !== -1)
        os = 'macOS';
    else if (ua.indexOf('Linux') !== -1)
        os = 'Linux';
    else if (ua.indexOf('Android') !== -1)
        os = 'Android';
    else if (ua.indexOf('like Mac') !== -1)
        os = 'iOS';
    if (ua.indexOf('Chrome') !== -1)
        browser = 'Chrome';
    else if (ua.indexOf('Firefox') !== -1)
        browser = 'Firefox';
    else if (ua.indexOf('Safari') !== -1 && ua.indexOf('Chrome') === -1)
        browser = 'Safari';
    else if (ua.indexOf('Edge') !== -1)
        browser = 'Edge';
    return {
        browser,
        browserVersion,
        os,
        osVersion,
        device: /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/.test(ua) ? 'Mobile' : 'Desktop',
        userAgent: ua,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        screenResolution: `${window.screen.width}x${window.screen.height}`
    };
}
function getPerformanceMetrics() {
    const metrics = {};
    if (typeof performance !== 'undefined') {
        const timing = performance.timing;
        if (timing) {
            metrics.pageLoadTime = timing.loadEventEnd - timing.navigationStart;
        }
        // @ts-ignore 
        if (performance.memory) {
            // @ts-ignore
            metrics.memoryUsed = performance.memory.usedJSHeapSize;
            // @ts-ignore
            metrics.memoryLimit = performance.memory.jsHeapSizeLimit;
        }
    }
    // @ts-ignore 
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
        metrics.connectionType = connection.effectiveType;
        metrics.connectionSpeed = connection.downlink;
    }
    return metrics;
}
//# sourceMappingURL=device.js.map
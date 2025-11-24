"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBreadcrumb = addBreadcrumb;
exports.getBreadcrumbs = getBreadcrumbs;
exports.clearBreadcrumbs = clearBreadcrumbs;
exports.initInstrumentation = initInstrumentation;
const MAX_BREADCRUMBS = 20;
let breadcrumbs = [];
function addBreadcrumb(breadcrumb) {
    if (breadcrumbs.length >= MAX_BREADCRUMBS) {
        breadcrumbs.shift();
    }
    breadcrumbs.push(breadcrumb);
}
function getBreadcrumbs() {
    return [...breadcrumbs];
}
function clearBreadcrumbs() {
    breadcrumbs = [];
}
function initInstrumentation() {
    const originalConsoleLog = console.log;
    console.log = function (...args) {
        addBreadcrumb({
            type: 'console',
            category: 'log',
            message: args.map(String).join(' '),
            level: 'info',
            timestamp: new Date().toISOString(),
        });
        originalConsoleLog.apply(console, args);
    };
    const originalConsoleError = console.error;
    console.error = function (...args) {
        addBreadcrumb({
            type: 'console',
            category: 'error',
            message: args.map(String).join(' '),
            level: 'error',
            timestamp: new Date().toISOString(),
        });
        originalConsoleError.apply(console, args);
    };
    if (typeof window !== 'undefined' && window.document) {
        window.document.addEventListener('click', (event) => {
            let target = event.target;
            let selector = target.tagName.toLowerCase();
            if (target.id)
                selector += `#${target.id}`;
            else if (target.className && typeof target.className === 'string')
                selector += `.${target.className.split(' ').join('.')}`;
            const text = target.innerText ? target.innerText.substring(0, 20) : '';
            addBreadcrumb({
                type: 'click',
                category: 'ui',
                message: `Clicked ${selector} ${text ? `("${text}")` : ''}`,
                level: 'info',
                timestamp: new Date().toISOString()
            });
        });
    }
}
//# sourceMappingURL=breadcrumbs.js.map
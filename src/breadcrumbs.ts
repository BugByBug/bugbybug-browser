import { Breadcrumb } from './types';

const MAX_BREADCRUMBS = 20;
let breadcrumbs: Breadcrumb[] = [];

export function addBreadcrumb(breadcrumb: Breadcrumb) {
  if (breadcrumbs.length >= MAX_BREADCRUMBS) {
    breadcrumbs.shift();
  }
  breadcrumbs.push(breadcrumb);
}

export function getBreadcrumbs(): Breadcrumb[] {
  return [...breadcrumbs];
}

export function clearBreadcrumbs() {
  breadcrumbs = [];
}

export function initInstrumentation() {
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
      let target = event.target as HTMLElement;
      
      let selector = target.tagName.toLowerCase();
      if (target.id) selector += `#${target.id}`;
      else if (target.className && typeof target.className === 'string') selector += `.${target.className.split(' ').join('.')}`;
      
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
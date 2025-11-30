
# @bugbybug/browser

The official browser SDK for BugByBug

### Installation
```
npm install @bugbybug/browser
```

### Usage
Initialize the SDK as early as possible in your application (e.g., in your `index.js` or `main.ts`).

```
import * as BugByBug from '@bugbybug/browser';

BugByBug.init({
  apiKey: 'YOUR_PROJECT_API_KEY', // Starts with bbb_
  environment: 'production'
});
```

### Identify Users
To track which users are experiencing errors:
```
BugByBug.setUser('user-123', 'john.doe@example.com');
```

### Manual Error Capture
While BugByBug captures unhandled exceptions automatically, you can also manually report errors:
```
try {
  doSomethingRisky();
} catch (error) {
  BugByBug.captureException(error, { extraInfo: 'Additional context here' });
}
```

### Features
**Automatic Context**: Automatically captures Browser, OS, Viewport, and URL.

**Breadcrumbs**: Tracks console logs and click events leading up to an error.

**Performance**: Captures page load time and memory usage snapshots.

**Offline Support**: Uses fetch with keepalive to ensure errors are sent even if the page is closing.
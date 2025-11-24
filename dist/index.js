"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
exports.init = init;
exports.captureException = captureException;
exports.setUser = setUser;
const client_1 = require("./client");
Object.defineProperty(exports, "Client", { enumerable: true, get: function () { return client_1.Client; } });
let clientInstance;
function init(config) {
    if (!clientInstance) {
        clientInstance = new client_1.Client(config);
        clientInstance.init();
    }
    return clientInstance;
}
function captureException(error, customData) {
    if (clientInstance) {
        clientInstance.captureException(error, customData);
    }
    else {
        console.warn('[BugByBug] SDK not initialized. Call init() first.');
    }
}
function setUser(id, email) {
    if (clientInstance) {
        clientInstance.setUser(id, email);
    }
}
//# sourceMappingURL=index.js.map
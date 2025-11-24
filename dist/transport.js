"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transport = void 0;
class Transport {
    constructor(config) {
        this.apiKey = config.apiKey;
        const baseUrl = (config.apiUrl || 'https://nexus.bugbybug.com').replace(/\/$/, '');
        this.apiUrl = `${baseUrl}/api/v1/Error/Ingest`;
    }
    send(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const headers = {
                    'Content-Type': 'application/json',
                    'X-API-Key': this.apiKey
                };
                yield fetch(this.apiUrl, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(payload),
                    keepalive: true
                });
            }
            catch (err) {
                console.error('[BugByBug] Failed to send error report:', err);
            }
        });
    }
}
exports.Transport = Transport;
//# sourceMappingURL=transport.js.map
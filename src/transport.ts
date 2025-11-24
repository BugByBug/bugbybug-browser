import { BugByBugConfig, IngestErrorRequest } from './types';

export class Transport {
  private apiUrl: string;
  private apiKey: string;

  constructor(config: BugByBugConfig) {
    this.apiKey = config.apiKey;
    const baseUrl = (config.apiUrl || 'https://nexus.bugbybug.com').replace(/\/$/, '');
    this.apiUrl = `${baseUrl}/api/v1/Error/Ingest`;
  }

  public async send(payload: IngestErrorRequest): Promise<void> {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'X-API-Key': this.apiKey
      };
      
      await fetch(this.apiUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload),
        keepalive: true
      });
      
    } catch (err) {
      console.error('[BugByBug] Failed to send error report:', err);
    }
  }
}
import { BugByBugConfig, IngestErrorRequest } from './types';
export declare class Transport {
    private apiUrl;
    private apiKey;
    constructor(config: BugByBugConfig);
    send(payload: IngestErrorRequest): Promise<void>;
}

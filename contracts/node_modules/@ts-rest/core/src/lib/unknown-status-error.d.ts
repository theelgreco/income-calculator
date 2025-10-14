export declare class UnknownStatusError extends Error {
    response: {
        status: number;
        body: unknown;
    };
    constructor(response: {
        status: number;
        body: unknown;
    }, knownResponseStatuses: string[]);
}

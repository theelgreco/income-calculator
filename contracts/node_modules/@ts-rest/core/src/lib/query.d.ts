/**
 *
 * @param query - Any JSON object
 * @param json - Use JSON.stringify to encode the query values
 * @returns - The query url segment, using explode array syntax, and deep object syntax
 */
export declare const convertQueryParamsToUrlString: (query: unknown, json?: boolean) => string;
export declare const encodeQueryParamsJson: (query: unknown) => string;
export declare const encodeQueryParams: (query: unknown) => string;
/**
 *
 * @param query - A server-side query object where values have been encoded as JSON strings
 * @returns - The same object with the JSON strings decoded. Objects that were encoded using toJSON such as Dates will remain as strings
 */
export declare const parseJsonQueryObject: (query: Record<string, string>) => {
    [k: string]: any;
};

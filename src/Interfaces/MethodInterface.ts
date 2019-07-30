/**
 * An interface to generate a new route
 */
export interface MethodInterface {
    // The path to register the method for
    path: string;
    // The method to use for the path (Set by the decorator)
    handler?: any;
    // Is this a protected method (Authenticated users only?)
    protected?: boolean;
    // The fine grain authentication handler
    authenticationHandler?: (_: any) => Promise<boolean>;
    // The priority of the method
    priority?: number;
}

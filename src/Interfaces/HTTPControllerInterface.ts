/**
 * The interface for the HTTPController decorator
 */
export interface HTTPControllerInterface {
    // The path to register the controller for
    path?: string;
    // Is this controller restricted access
    protected?: boolean;
    // Fine grain access handler to prevent unauthorised access to controller
    // Works even if the path handler has an authorisation function applied
    authenticationHandler?: (_: any) => Promise<boolean>;
}

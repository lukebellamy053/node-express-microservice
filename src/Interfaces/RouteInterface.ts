/**
 * An interface to generate a new route
 */
import { Method } from '../Enums';

export interface RouteInterface {
    // The path to register the method for
    path: string;
    // The method name to handle the request (Set automatically)
    handler?: any;
    // The method to use with the request
    method?: Method;
    // Is this method restricted to authenticated users only
    protected?: boolean;
    // The fine grain handler for preventing unauthorised access
    authenticationHandler?: (activeUser: any) => Promise<boolean>;
    // The priority of the method
    priority?: number;
}

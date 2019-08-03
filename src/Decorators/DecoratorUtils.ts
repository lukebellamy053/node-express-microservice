import {HTTPControllerInterface, RouteInterface} from '../Interfaces';
import {RouteItem} from '../Classes';

export class DecoratorUtils {
    // The controller options
    protected static mControllerPaths: { [x: string]: HTTPControllerInterface } = {};
    // The pending route items to be registered
    protected static mPending: RouteItem[] = [];
    // The required parameters for controllers
    private static requiredParams: Map<string, string[]>;
    // The timeouts for methods
    private static methodTimeouts: Map<string, number>;

    public static get pending() {
        return this.mPending;
    }

    public static get controllerPaths() {
        return this.mControllerPaths;
    }

    public static get required() {
        return this.requiredParams;
    }

    public static get timeouts() {
        return this.methodTimeouts;
    }

    /**
     * Registers a controller for a specific path
     * Routes inside this controller inherit the start path
     * @param controller
     * @param {string} controllerName
     */
    public static addControllerPath(controller: HTTPControllerInterface, controllerName: string): void {
        this.mControllerPaths[controllerName] = controller;
    }

    /**
     * Add a set of required variables to a method name
     * @param {string} methodName controller_name@methodName
     * @param {string[]} required
     */
    public static addRequired(methodName: string, required: string[]) {
        // Check if the required params have been set already
        if (DecoratorUtils.requiredParams == null) {
            // Create the map
            DecoratorUtils.requiredParams = new Map<string, string[]>();
        }
        // Add the required param to the map
        DecoratorUtils.requiredParams.set(methodName, required);
    }

    /**
     * Add a timeout to a method
     * @param method
     * @param timeout
     */
    public static addTimeout(method: string, timeout: number) {
        if (DecoratorUtils.methodTimeouts == null) {
            DecoratorUtils.methodTimeouts = new Map<string, number>();
        }
        // Add the required param to the map
        DecoratorUtils.methodTimeouts.set(method, timeout);
    }

    /**
     * Add a route to the pending list
     * These routes are added to express when the server is started
     * @param route {RouteInterface} The route item to register
     */
    public static addPendingRoute(route: RouteInterface): void {
        DecoratorUtils.pending.push(
            new RouteItem(
                route.path,
                route.handler,
                route.method,
                route.protected,
                route.authenticationHandler,
                route.priority,
            ),
        );
    }

}
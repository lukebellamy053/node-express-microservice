import {fail} from './ResponseUtils';
import {ErrorResponses, Method} from '../Enums';
import {Express, Request, Response} from 'express';
import {RouteItem} from '../Classes';
import {RouteInterface} from '../Interfaces';
import {Controller, ExpressServer} from '../Server';
import {verifyRequest} from './AuthHandler';

/**
 * A class to handle the registration of routes
 */
export class PathHandler {
    // The registered controllers
    private static mControllers: { [x: string]: Controller } = {};
    // The paths for controllers
    private static mControllerPaths: { [x: string]: string } = {};
    // The pending route items to be registered
    private static mPending: RouteItem[] = [];
    // The custom verification function
    private static customVerification: any;

    /**
     * Get the server app
     * @returns {e.Express}
     */
    public static get mApp(): Express {
        return ExpressServer.serverApp;
    }

    /**
     * Add a new controller item
     * @param controller_item - Object or array of controllers
     */
    public static addController(controller_item: Array<any>) {
        if (Array.isArray(controller_item)) {
            // Work out the controller object automatically
            const newControllers = {};
            controller_item.forEach((item) => {
                newControllers[(<any>item).prototype.constructor.name] = item;
            });
            this.mControllers = Object.assign(this.mControllers, newControllers);
        } else {
            this.mControllers = Object.assign(this.mControllers, controller_item);
        }
    }

    /**
     * Add a route to the pending list
     * These routes are added to express when the server is started
     * @param route {RouteInterface} The route item to register
     */
    public static addPendingRoute(route: RouteInterface): void {
        this.mPending.push(new RouteItem(route.path, route.handler, route.method, route.protected, route.authenticationHandler, route.priority));
    }

    /**
     * Registers a controller for a specific path
     * Routes inside this controller inherit the start path
     * @param {string} path
     * @param {string} controller_name
     */
    public static addControllerPath(path: string, controller_name: string): void {
        this.mControllerPaths[controller_name] = path;
    }

    /**
     * Register the default paths
     */
    public static registerDefaults(request_verifier?: (req: any, res: any, next: any) => any) {

        if (request_verifier) {
            PathHandler.customVerification = request_verifier;
        }

        /**
         * Sort the routes by their priorities
         */
        this.mPending.sort((path_a, path_b) => {
            if (path_a.priority < path_b.priority) return 1;
            if (path_a.priority > path_b.priority) return -1;
            return 0;
        });

        this.mPending.forEach((pending: RouteItem) => {
            // Check if the controller has been registered already
            const prePath = this.mControllerPaths[pending.handler.split('@')[0]];
            if (prePath) {
                // Add the controller path to the start of the path
                pending = new RouteItem(`${prePath}${pending.path}`, pending.handler, pending.method, pending.protected, pending.authHandler, pending.priority);
            }
            this.register(pending);
        });
    }


    /**
     * Register an array of routes
     * @param {RouteInterface[]} routes
     */
    public static registerRouteArray(routes: RouteInterface[]) {
        routes.forEach((route: RouteInterface) => {
            const routeItem = new RouteItem(route.path, route.handler, route.method, route.protected, route.authenticationHandler, route.priority);
            this.register(routeItem);
        });
    }

    /**
     * Register a http route handler
     * @param {RouteInterface} route
     */
    public static register(route: RouteItem): void {

        const handler = async (req: Request, res: Response) => {
            if (route.protected) {
                const handler = PathHandler.customVerification ? PathHandler.customVerification : this.verifyRequest;
                try {
                    await handler(req, res);
                } catch (exception) {
                    fail(res, exception);
                    return;
                }
            }

            try {
                if (route.authHandler) {
                    await route.authHandler(req);
                }
                this.callHandler(route, req, res);
            } catch (exception) {
                fail(res, exception);
            }
        };

        switch (route.method) {
            case Method.GET:
                this.mApp.get(route.path, handler);
                break;
            case Method.DELETE:
                this.mApp.delete(route.path, handler);
                break;
            case Method.OPTIONS:
                this.mApp.options(route.path, handler);
                break;
            case Method.POST:
                this.mApp.post(route.path, handler);
                break;
            case Method.PUT:
                this.mApp.put(route.path, handler);
                break;
            default:
                this.mApp.all(route.path, handler);
        }
    }

    /**
     * Call the handler for a route
     * @param {RouteItem} route
     * @param request
     * @param response
     */
    private static callHandler(route: RouteItem, request: Request, response: Response) {
        new (<any>this.mControllers[route.handler_class])(request, response, route.handler_method);
    }

    /**
     * Register a route to use a proxy
     * @param {string} path
     * @param proxy
     * @param remove_path
     * @param {boolean} isProtected
     * @param authHandler
     * @param jwtVerify
     */
    public static registerProxy(path: string, proxy: any, remove_path: string, isProtected ?: boolean, authHandler?: any, jwtVerify: boolean = false) {

        const postAuth = (req: Request, res: Response) => {
            if (remove_path != null) {
                req.url = req.url.replace(remove_path, '');
            }
            proxy(req, res);
        };

        this.mApp.all(path, async (req, res) => {
            if (isProtected) {
                const handler = PathHandler.customVerification ? PathHandler.customVerification : this.verifyRequest;
                try {
                    if (authHandler) {
                        await authHandler(req);
                    }
                    await handler(req, res);
                } catch (exception) {
                    fail(res, exception);
                    return;
                }
            }

            try {
                postAuth(req, res);
            } catch (exception) {
                fail(res, exception);
            }

        });

    }

    /**
     * Verify that the user can perform the request
     * @param req
     * @param adminOnly - Can only admins perform this request?
     */
    private static verifyRequest(req: any, adminOnly: boolean = false): Promise<any> {
        return new Promise(async (resolve: any, reject: any) => {

            try {
                await verifyRequest(req);
            } catch (err) {
                reject(err);
                return;
            }
            
            if (this.customVerification) {
                PathHandler.customVerification(req, null, resolve);
            } else {
                if (req.decodedToken != null) {
                    resolve(true);
                } else {
                    reject(ErrorResponses.Invalid_Token);
                }
            }
        });
    }
}
import { EnvironmentVariables, ErrorResponses, Method } from '../Enums';
import { Express, Request, Response } from 'express';
import { RouteItem } from '../Classes';
import { HTTPControllerInterface, RouteInterface } from '../Interfaces';
import { Controller } from '../Server';
import { Passport } from '../Security';
import { env } from '../EnvironmentConfig';

/**
 * A class to handle the registration of routes
 */
export class PathHandler {
    // The registered controllers
    protected mControllers: { [x: string]: Controller } = {};
    // The Express application
    protected mApp: () => Express;
    // The pending route items to be registered
    protected static mPending: RouteItem[] = [];
    // The active path handler instance
    protected static mPathHandler: PathHandler;
    // The paths for controllers
    protected static mControllerPaths: { [x: string]: HTTPControllerInterface } = {};

    /**
     * Get the active path handler instance
     */
    public static get pathHandler(): PathHandler {
        if (!PathHandler.mPathHandler) {
            PathHandler.mPathHandler = new PathHandler();
        }
        return PathHandler.mPathHandler;
    }

    /**
     * Set the active path handler instance
     * @param handler
     */
    public static set pathHandler(handler: PathHandler) {
        // Pass on the app object if found
        const _app = this.pathHandler.app;
        if (_app) {
            handler.app = _app;
        }
        // Set the new path handler
        PathHandler.mPathHandler = handler;
    }

    /**
     * Get the server app
     * @returns {e.Express}
     */
    public get app(): Express {
        return this.mApp();
    }

    /**
     * Set the path handler app
     * @param _app
     */
    public set app(_app: Express) {
        this.mApp = () => {
            // This is one of those javascript things, if you set the value directly, it will be undefined
            return _app;
        };
    }

    /**
     * Add a new controller item
     * @param controller_item - Object or array of controllers
     */
    public addController(controller_item: any[] | { [x: string]: Controller }) {
        let newControllers = controller_item;
        if (Array.isArray(controller_item)) {
            // Work out the controller object automatically
            newControllers = {};
            controller_item.forEach(item => {
                newControllers[(<any>item).prototype.constructor.name] = item;
            });
        }
        this.mControllers = Object.assign(this.mControllers, newControllers);
    }

    /**
     * Add a route to the pending list
     * These routes are added to express when the server is started
     * @param route {RouteInterface} The route item to register
     */
    public static addPendingRoute(route: RouteInterface): void {
        this.mPending.push(
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

    /**
     * Registers a controller for a specific path
     * Routes inside this controller inherit the start path
     * @param controller
     * @param {string} controller_name
     */
    public static addControllerPath(controller: HTTPControllerInterface, controller_name: string): void {
        this.mControllerPaths[controller_name] = controller;
    }

    /**
     * Register the default paths
     */
    public registerDefaults() {
        /**
         * Sort the routes by their priorities
         */
        PathHandler.mPending.sort((path_a, path_b) => {
            if (path_a.priority < path_b.priority) return 1;
            if (path_a.priority > path_b.priority) return -1;
            return 0;
        });

        PathHandler.mPending.forEach((pending: RouteItem) => {
            const controllerName = pending.handler.split('@')[0];
            if (!controllerName) {
                // This should not happen
                return;
            }
            // Check if the controller has been registered already
            const prePath = PathHandler.mControllerPaths[controllerName];
            if (prePath) {
                const existingAuthHandler = pending.authHandler;
                /**
                 * Create the new authentication handler
                 * @param controller - The active controller
                 */
                const newHandler = async (controller: Controller) => {
                    let res = true;
                    // Call the controllers auth handler
                    if (prePath.authenticationHandler) {
                        res = await prePath.authenticationHandler(controller);
                    }

                    if (res && existingAuthHandler) {
                        res = await existingAuthHandler(controller);
                    }

                    return res;
                };
                // Add the controller path to the start of the path
                pending = new RouteItem(
                    `${prePath.path}${pending.path}`,
                    pending.handler,
                    pending.method,
                    pending.protected,
                    newHandler,
                    pending.priority,
                );
            }
            this.register(pending);
        });
    }

    /**
     * Register an array of routes
     * @param {RouteInterface[]} routes
     */
    public registerRouteArray(routes: RouteInterface[]) {
        routes.forEach((route: RouteInterface) => {
            const routeItem = new RouteItem(
                route.path,
                route.handler,
                route.method,
                route.protected,
                route.authenticationHandler,
                route.priority,
            );
            this.register(routeItem);
        });
    }

    /**
     * Register a http route handler
     * @param {RouteInterface} route
     */
    public register(route: RouteItem): void {
        /**
         * The method that will handle the incoming request
         * @param req
         * @param res
         */
        const handler = async (req: Request, res: Response) => {
            /**
             * Check if the route is protected by the generic authenticator
             */
            if (route.protected) {
                // Use the custom verifier or the generic verifier
                try {
                    await Passport.passport.verifyRequest(req);
                } catch (exception) {
                    PathHandler.fail(res, exception);
                    return;
                }
            }

            try {
                // Call the method
                this.callHandler(route, req, res);
            } catch (exception) {
                PathHandler.fail(res, exception);
            }
        };

        switch (route.method) {
            case Method.GET:
                this.app.get(route.path, handler);
                break;
            case Method.DELETE:
                this.app.delete(route.path, handler);
                break;
            case Method.OPTIONS:
                this.app.options(route.path, handler);
                break;
            case Method.POST:
                this.app.post(route.path, handler);
                break;
            case Method.PUT:
                this.app.put(route.path, handler);
                break;
            default:
                this.app.all(route.path, handler);
        }

        // Register the routes authentication handler if one exists
        Passport.addGatedMethod(route.handler, route.authHandler);
    }

    /**
     * Call the handler for a route
     * @param {RouteItem} route
     * @param request
     * @param response
     */
    protected callHandler(route: RouteItem, request: Request, response: Response) {
        if (this.mControllers[route.handlerClass]) {
            new (<any>this.mControllers[route.handlerClass])(request, response, route.handlerMethod);
        } else {
            throw ErrorResponses.INVALID_ROUTE;
        }
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
    public registerProxy(
        path: string,
        proxy: any,
        remove_path: string,
        isProtected?: boolean,
        authHandler?: any,
        jwtVerify: boolean = false,
    ) {
        const postAuth = (req: Request, res: Response) => {
            if (remove_path != null) {
                req.url = req.url.replace(remove_path, '');
            }
            proxy(req, res);
        };

        this.app.all(path, async (req: Request, res) => {
            if (isProtected) {
                try {
                    await Passport.passport.verifyRequest(req);
                    if (authHandler) {
                        await authHandler(req);
                    }
                } catch (exception) {
                    PathHandler.fail(res, exception);
                    return;
                }
            }

            try {
                postAuth(req, res);
            } catch (exception) {
                PathHandler.fail(res, exception);
            }
        });
    }

    /**
     * Send a failed request message
     * @param req
     * @param {string} reason
     * @param code
     */
    protected static fail(req: Response, reason: string, code: number = 200) {
        req.status(code).json({
            success: false,
            version: env(EnvironmentVariables.APP_VERSION),
            build: env(EnvironmentVariables.APP_BUILD),
            service: env(EnvironmentVariables.SERVICE_NAME),
            error: reason.toString(),
        });
    }
}

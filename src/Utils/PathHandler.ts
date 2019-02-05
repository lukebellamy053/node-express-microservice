import {env} from '..';
import {fail} from './ResponseUtils';
import {Method} from '../Enums';
import {Request, Response} from 'express';
import {verifyRequest} from './AuthHandler';
import {RouteItem} from '../Classes';
import {RouteInterface} from '../Interfaces';

/**
 * A class to handle the registration of routes
 */
export class PathHandler {

    public static app: any;
    public static server: any;
    private static mControllers = {};
    private static mPending: RouteItem[] = [];
    private static userDatabaseObject: any;
    private static customVerification: any;

    /**
     * Add a new controller item
     * @param controller_item
     */
    public static addController(controller_item: any) {
        this.mControllers = Object.assign(this.mControllers, controller_item);
    }

    /**
     * Add a route to be inited
     * @param route
     */
    public static addPendingRoute(route: RouteInterface) {
        this.mPending.push(new RouteItem(route.path, route.handler, route.method, route.protected, route.admin));
    }

    /**
     * Register the default paths
     */
    public static registerDefaults(request_verifier?: (req: any, res: any, next: any) => any) {
        PathHandler.customVerification = request_verifier;

        this.mPending.forEach((pending: RouteItem) => {
            this.register(pending);
        });

        // Handle non-used paths
        PathHandler.registerRoute('/_service_info_', (req: Request, res: Response) => {
            res.json({
                success: true,
                error: 'Service Information',
                version: env('APP_VERSION', 'Unknown'),
                build: env('APP_BUILD', 'Unknown'),
                service: env('SERVICE_NAME', 'Unknown'),
            });
            res.end();
        });

        // Handle non-used paths
        PathHandler.registerRoute('*', (req: Request, res: Response) => {
            res.status(404);
            res.json({
                success: false,
                error: 'Path doesn\'t exist',
                version: env('APP_VERSION', 'Unknown'),
                build: env('APP_BUILD', 'Unknown'),
                service: env('SERVICE_NAME', 'Unknown'),
            });
            res.end();
        });
    }


    /**
     * Register an array of routes
     * @param {RouteInterface[]} routes
     */
    public static registerRouteArray(routes: RouteInterface[]) {
        routes.forEach((route: RouteInterface) => {
            const routeItem = new RouteItem(route.path, route.handler, route.method, route.protected, route.admin);
            this.register(routeItem);
        });
    }

    /**
     * Register a http route handler
     * @param {RouteInterface} route
     */
    public static register(route: RouteItem): void {
        if (route.protected) {
            this.app.all(route.path, (req: any, res: any, next: any) => {
                if (PathHandler.customVerification) {
                    PathHandler.customVerification(req, res, next);
                } else {
                    verifyRequest(req, res, next);
                }
            });
        }

        const handler = (req: Request, res: Response) => {
            try {
                this.callHandler(route, req, res);
            } catch (exception) {
                res.send({success: false, error: exception, service: 'PathHandler'});
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
     * Register a new route
     * @param {string} path
     * @param handler
     * @param method
     * @param isProtected
     * @param isAdmin
     * @param jwtVerify
     */
    public static registerRoute(path: string, handler: any, method?: number, isProtected ?: boolean, isAdmin: boolean = false, jwtVerify: boolean = false) {
        if (isProtected !== undefined && isProtected) {
            this.app.all(path, (req: any, res: any, next: any) => {
                if (jwtVerify) {
                    if (PathHandler.customVerification) {
                        PathHandler.customVerification(req, res, next);
                    } else {
                        verifyRequest(req, res, next);
                    }
                } else {
                    PathHandler.verifyRequest(req, isAdmin)
                        .then((verified: boolean) => {
                            if (verified) {
                                next();
                            } else {
                                fail(res, 'You don\'t have permission to do that');
                            }
                        }, () => {
                            fail(res, 'You don\'t have permission to do that');
                        });
                }
            });
        }

        if (method === undefined) {
            this.app.all(path, (req: any, res: any) => {
                handler(req, res);
            });
        } else {
            if (method === Method.GET) {
                this.app.get(path, (req: any, res: any) => {
                    handler(req, res);
                });
            } else if (method === Method.POST) {
                this.app.post(path, (req: any, res: any) => {
                    handler(req, res);
                });
            } else if (method === Method.PUT) {
                this.app.update(path, (req: any, res: any) => {
                    handler(req, res);
                });
            } else if (method === Method.DELETE) {
                this.app.delete(path, (req: any, res: any) => {
                    handler(req, res);
                });
            } else if (method === Method.OPTIONS) {
                this.app.options(path, (req: any, res: any) => {
                    handler(req, res);
                });
            }
        }
    }

    /**
     * Register a route to use a proxy
     * @param {string} path
     * @param proxy
     * @param remove_path
     * @param {boolean} isProtected
     * @param {boolean} isAdmin
     * @param jwtVerify
     */
    public static registerProxy(path: string, proxy: any, remove_path: string, isProtected ?: boolean, isAdmin: boolean = false, jwtVerify: boolean = false) {

        const postAuth = (req: Request, res: Response) => {
            if (remove_path != null) {
                req.url = req.url.replace(remove_path, '');
            }
            proxy(req, res);
        };

        this.app.all(path, (req, res) => {
            if (!isProtected) {
                postAuth(req, res);
            } else {
                if (PathHandler.customVerification) {
                    PathHandler.customVerification(req, res, postAuth);
                } else {
                    verifyRequest(req, res, postAuth);
                }
            }
        });

    }

    /**
     * Verify that the user can perform the request
     * @param req
     * @param adminOnly - Can only admins perform this request?
     */
    private static verifyRequest(req: any, adminOnly: boolean = false): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            if (this.customVerification) {
                PathHandler.customVerification(req, null, resolve);
            } else {
                if (req.active_user_id != null) {
                    PathHandler.userDatabaseObject.findOne({_id: req.active_user_id})
                        .then((user: any) => {
                            if (adminOnly) {
                                resolve(user != null && user.isAdmin);
                            } else {
                                resolve(user != null);
                            }
                        }, () => {
                            reject('Invalid User ID Found');
                        });
                } else {
                    reject('No User ID Found');
                }
            }
        });
    }
}
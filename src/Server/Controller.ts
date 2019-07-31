import { Request, Response } from 'express';
import { ErrorResponses } from '../Enums';
import { loadActiveUser, PreConstruct, PreRequest } from '../Interfaces';
import { Passport } from '../Security';

/**
 * The base controller
 * Gets the active user from a request
 */
export abstract class Controller {
    // The required parameters for controllers
    private static requiredParams: Map<string, string[]>;
    // The timeouts for methods
    private static methodTimeouts: Map<string, number>;
    // The response object
    protected res: Response;
    // The request object
    protected req: Request;
    // The params from the request
    protected params: any;
    // The request body params
    protected body: any;
    // The url params from the request
    protected urlParams: any;
    // The GET params from the request
    protected queryParams: any;
    // The response code to send back to the client
    protected responseCode: number;
    // The active user object
    protected activeUser: any;

    /**
     * Class constructor
     * @param {e.Request} request
     * @param {e.Response} response
     * @param method - The method to activate when ready
     */
    protected constructor(request: Request, response: Response, method?: string) {
        // Do this in another method to allow overrides
        this.doInit(request, response);
        this.optionalMethods(method)
            .then(() => {
                if (method) {
                    this.executeMethod(method)
                        .then((response: any) => {
                            this.success(response);
                        })
                        .catch(err => {
                            this.fail(err);
                        });
                }
            })
            .catch(err => {
                this.fail(err);
            });
    }

    /**
     * Call the optional methods
     * @param method
     */
    protected async optionalMethods(method?: string): Promise<void> {
        // Allow the user to set any variables before the construction begins
        if ('preConstruct' in this) {
            await (<PreConstruct>this).preConstruct();
        }

        // Make sure the method has been provided, otherwise nothing can be called
        if (method !== undefined) {
            // Check if an active user should be loaded
            if ('loadActiveUser' in this) {
                // Load the user
                (<Controller>this).activeUser = await (<loadActiveUser>this).loadActiveUser();
            }

            if ('preRequest' in this) {
                // Perform pre-request checks
                await (<PreRequest>this).preRequest();
            }
        }
    }

    /**
     * Parse the request and send it to the correct controller
     * @param request
     * @param response
     */
    protected doInit(request: Request, response: Response) {
        // Set the request, response and variables
        this.req = request;
        this.res = response;
        this.body = request.body || {};
        this.urlParams = request.params;
        this.queryParams = request.query;
        // Load the parameters of the request
        this.params = Controller.getParams(request);
    }

    /**
     * Fail the request
     * @param {string} reason
     * @param code - The HTTP response code
     */
    protected fail(reason: string, code: number = 500): void {
        if (this.res != null) {
            this.res.status(this.responseCode || code);
            this.res.json({ success: false, error: reason, code: code });
            this.res.end();
        }
    }

    /**
     * Get the parameters from a request
     * @returns {any}
     * @param request
     */
    protected static getParams(request: Request): any {
        return Object.assign({}, request.params, request.body, request.query);
    }

    /**
     * Add a set of required variables to a method name
     * @param {string} methodName controller_name@methodName
     * @param {string[]} required
     */
    public static addRequired(methodName: string, required: string[]) {
        // Check if the required params have been set already
        if (Controller.requiredParams == null) {
            // Create the map
            Controller.requiredParams = new Map<string, string[]>();
        }
        // Add the required param to the map
        Controller.requiredParams.set(methodName, required);
    }

    /**
     * Add a timeout to a method
     * @param method
     * @param timeout
     */
    public static addTimeout(method: string, timeout: number) {
        if (Controller.methodTimeouts == null) {
            Controller.methodTimeouts = new Map<string, number>();
        }
        // Add the required param to the map
        Controller.methodTimeouts.set(method, timeout);
    }

    /**
     * Execute the method
     * @param {string} name
     */
    private executeMethod(name: string) {
        const fullName = (<any>this).__proto__.constructor.name + '@' + name;
        // Check if any variables are required
        let required;
        if (Controller.requiredParams) {
            // Get the required variables
            required = Controller.requiredParams.get(fullName);
        }

        if (required != null) {
            // There are variables to check for first
            required.forEach((item: string) => {
                if (this.params[item] === undefined) {
                    throw ErrorResponses.MissingParameters;
                }
            });
        }

        // @ts-ignore
        return new Promise(async (resolve, reject) => {
            const authHandler = Passport.getGateForMethod(fullName);

            if (authHandler) {
                if (!(await authHandler(this))) {
                    reject(ErrorResponses.NOT_ALLOWED);
                }
            }

            const timeout =
                Controller.methodTimeouts != null ? Controller.methodTimeouts.get(fullName) || 10 * 1000 : 10 * 1000;
            setTimeout(() => {
                reject(ErrorResponses.Timeout);
            }, timeout);
            try {
                // Execute the method and check for a response
                const method = (<any>this[name]).apply(this, Object.values(this.urlParams));
                const result = await method;
                resolve(result);
            } catch (e) {
                reject(e);
            }
        });
    }

    /**
     * Send something back to the requester
     * @param data
     */
    protected send(data: any): void {
        // Send something back to the caller
        if (this.res !== undefined) {
            this.res.json(data);
            this.res.end();
        }
    }

    /**
     * Send a success response
     * @param data - The data to send back to the user
     * @param code - The HTTP Response code
     */
    protected success(data?: any, code: number = this.responseCode || 200): void {
        // Send a success request
        if (this.res !== undefined && !this.res.headersSent) {
            this.res.status(code);
            this.send({ success: true, data: data, code: code });
        }
    }
}

import {Request, Response} from 'express';
import {ErrorResponses} from '../Enums';
import {loadActiveUser, PreConstruct, PreRequest} from '../Interfaces/ControllerInterfaces';

/**
 * The base controller
 * Gets the active user from a request
 */
export abstract class Controller {
    // The required parameters for controllers
    private static required_params: Map<string, string[]>;
    // The timeouts for methods
    private static method_timeouts: Map<string, number>;
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

    /**
     * Class constructor
     * @param {e.Request} request
     * @param {e.Response} response
     * @param method - The method to activate when ready
     */
    protected constructor(request: Request, response: Response, method?: string) {
        // Do this in another method to allow overrides
        this.doInit(request, response, method).catch(err => {
            this.fail(err);
        });
    }

    /**
     * Parse the request and send it to the correct controller
     * @param request
     * @param response
     * @param method
     */
    protected async doInit(request: Request, response: Response, method?: string) {
        // Allow the user to set any variables before the construction begins
        if ('preConstruct' in this) {
            await (<PreConstruct>this).preConstruct();
        }

        // Set the request, response and variables
        this.req = request;
        this.res = response;
        this.body = request.body || {};
        this.urlParams = request.params;
        this.queryParams = request.query;
        // Load the parameters of the request
        this.params = Controller.getParams(request);
        // Make sure the method has been provided, otherwise nothing can be called
        if (method !== undefined) {
            // Check if an active user should be loaded
            if ('loadActiveUser' in this) {
                try {
                    // Load the user
                    await (<loadActiveUser>this).loadActiveUser();
                } catch (err) {
                    // Failed to load the user
                    //@ts-ignore
                    this.fail(err);
                }
            }

            try {
                if ('preRequest' in this) {
                    // Perform pre-request checks
                    await (<PreRequest>this).preRequest();
                }
                // Output the response to the user
                this.success(await this.executeMethod(method));
            } catch (e) {
                // The request failed for some reason, inform the user
                this.fail(e);
            }
        }
    }

    /**
     * Fail the request
     * @param {string} reason
     * @param code - The HTTP response code
     */
    public fail(reason: string, code: number = this.responseCode || 500): void {
        if (this.res != null) {
            this.res.status(code);
            this.res.json({success: false, error: reason, code: code});
            this.res.end();
        }
    }

    /**
     * Get the parameters from a request
     * @returns {any}
     * @param request
     */
    public static getParams(request: Request): any {
        return Object.assign({}, request.params, request.body, request.query);
    }

    /**
     * Add a set of required variables to a method name
     * @param {string} method_name controller_name@method_name
     * @param {string[]} required
     */
    public static addRequired(method_name: string, required: string[]) {
        // Check if the required params have been set already
        if (Controller.required_params == null) {
            // Create the map
            Controller.required_params = new Map<string, string[]>();
        }
        // Add the required param to the map
        Controller.required_params.set(method_name, required);
    }

    /**
     * Add a timeout to a method
     * @param method
     * @param timeout
     */
    public static addTimeout(method: string, timeout: number) {
        if (Controller.method_timeouts == null) {
            Controller.method_timeouts = new Map<string, number>();
        }
        // Add the required param to the map
        Controller.method_timeouts.set(method, timeout);
    }

    /**
     * Execute the method
     * @param {string} name
     */
    private executeMethod(name: string) {
        const full_name = (<any>this).__proto__.constructor.name + '@' + name;
        // Check if any variables are required
        let required;
        if (Controller.required_params) {
            // Get the required variables
            required = Controller.required_params.get(full_name);
        }

        let can_continue = true;
        if (required != null) {
            // There are variables to check for first
            required.forEach((item: string) => {
                if (this.params[item] === undefined) {
                    // The variable is missing, fail the request
                    can_continue = false;
                    return false;
                }
            });

        }

        // Check if the request can continue
        if (can_continue) {
            // @ts-ignore
            return new Promise(async (resolve, reject) => {
                const timeout = Controller.method_timeouts != null ? Controller.method_timeouts.get(full_name) || (10 * 1000) : 10 * 1000;
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
        } else {
            // Tell the caller that something is missing
            throw ErrorResponses.MissingParameters;
        }
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
            this.send({success: true, data: data, code: code});
        }
    }
}
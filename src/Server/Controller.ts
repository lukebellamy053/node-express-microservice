import { Request, Response } from "express";

/**
 * The base controller
 * Gets the active user from a request
 */
export class Controller {
    // The request object
    private req: Request;
    // The response object
    private res: Response;
    // The required parameters for controllers
    private static required_params: Map<string, string[]>;
    // The mongoose object to get user objects
    protected userMongooseObj: any;
    // The active user object
    protected activeUser: any;
    // The params from the request
    protected params: any;
    // The request body params
    protected body: any;
    // The url params from the request
    protected urlParams: any;
    // The GET params from the request
    protected queryParams: any;
    // noinspection JSUnusedGlobalSymbols
    protected async = require("async");

    /**
     * Class constructor
     * @param {e.Request} request
     * @param {e.Response} response
     * @param method - The method to activate when ready
     */
    constructor(request: Request, response: Response, method?: string) {
        // Do this in another method to allow overrides
        this.doInit(request, response, method);
    }

    /**
     * Parse the request and send it to the correct controller
     * @param request 
     * @param response 
     * @param method 
     */
    protected doInit(request: Request, response: Response, method?: string) {
        // Allow the user to set any variables before the contruction begins
        this.preConstruct();
        // Set the request, response and variables
        this.req = request;
        this.res = response;
        this.body = request.body || {};
        this.urlParams = request.params;
        this.queryParams = request.query;
        this.params = Controller.getParams(request);
        // Make sure the method has been provided, otherwise nothing can be called
        if (method !== undefined) {
            // Get the ID of the active user, might be null
            const user_id = (<any>request).active_user_id;
            try {
                // Check if a user is found
                if (user_id != null && this.userMongooseObj) {
                    // Get the user object from the DB
                    this.userMongooseObj.findById(user_id).then((user: any) => {
                        if (user) {
                            // Set the active user and continue
                            this.activeUser = user;
                            this.executeMethod(method);
                        } else {
                            this.fail("Invalid token provided. User not found");
                        }
                    });
                } else {
                    this.executeMethod(method);
                }
            } catch (e) {
                this.fail(e);
            }
        }
    }

    /**
    * Fail the request
    * @param {string} reason
    */
    public fail(reason: string): void {
        if (this.res != null) {
            this.res.json({ success: false, error: reason });
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
     * A method to allow any child classes to set values before the class is constructed
     */
    protected preConstruct() {
        return;
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

        if (required != null) {
            // There are variables to check for first
            let can_continue = true;
            required.forEach((item: string) => {
                if (this.params[item] === undefined) {
                    // The variable is missing, fail the request
                    can_continue = false;
                    return false;
                }
            });
            // Check if the request can continue
            if (can_continue) {
                // @ts-ignore
                (<any>this[name])();
            } else {
                // Tell the caller that something is missing
                this.fail('Missing key parameter');
            }
        } else {
            // @ts-ignore
            (<any>this[name])();
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
     * @param data
     */
    protected success(data?: any): void {
        // Send a success request
        if (this.res !== undefined) {
            this.res.json({ success: true, data: data });
            this.res.end();
        }
    }

}
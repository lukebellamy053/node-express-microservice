import {Request, Response} from 'express';
import {ErrorResponses} from '../Enums';
import {loadActiveUser, PreConstruct, PreRequest} from '../Interfaces';
import {Passport} from '../Security';
import {env} from '../Environment/EnvironmentConfig';
import {DecoratorUtils} from '../Decorators/DecoratorUtils';

/**
 * The base controller
 * Gets the active user from a request
 */
export abstract class Controller {
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
    protected fail(reason: any, code: number = 500): void {
        if (this.res != null) {
            this.res.status(this.responseCode || code);
            this.res.json({
                success: false,
                error: reason,
                code: code,
                version: env('APP_VERSION', 'Unknown'),
                build: env('APP_BUILD', 'Unknown'),
                service: env('SERVICE_NAME', 'Unknown'),
            });
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
     * Check if the method can be executed or not
     * @param fullName
     * @throws ErrorResponses.MissingParameters
     */
    protected canExecute(fullName: string): void {
        // Check if any variables are required
        let required;
        if (DecoratorUtils.required) {
            // Get the required variables
            required = DecoratorUtils.required.get(fullName);
        }

        if (required != null) {
            // There are variables to check for first
            required.forEach((item: string) => {
                if (this.params[item] === undefined) {
                    throw ErrorResponses.MissingParameters;
                }
            });
        }
    }

    /**
     * Execute the method
     * @param {string} name
     */
    protected executeMethod(name: string): Promise<any> {
        const fullName = (<any>this).__proto__.constructor.name + '@' + name;
        // Throws an error if it fails
        this.canExecute(fullName);

        return new Promise(async (resolve, reject) => {
            const authHandler = Passport.getGateForMethod(fullName);

            if (authHandler) {
                try {
                    if (!(await authHandler(this))) {
                        reject(ErrorResponses.NotAllowed);
                        return;
                    }
                } catch (err) {
                    reject(err);
                    return;
                }
            }

            const timeout = env('NO_TIMEOUT', false) ? -1 :
                DecoratorUtils.timeouts != null ?  DecoratorUtils.timeouts.get(fullName) || 10 * 1000 : 10 * 1000;

            if (timeout > 0) {
                setTimeout(() => {
                    reject(ErrorResponses.Timeout);
                }, timeout);
            }

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
            this.send({
                success: true,
                data: data,
                code: code,
                version: env('APP_VERSION', 'Unknown'),
                build: env('APP_BUILD', 'Unknown'),
                service: env('SERVICE_NAME', 'Unknown'),
            });
        }
    }
}

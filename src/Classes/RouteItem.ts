import {Method} from "../Enums/Method";

/**
 * A class to hold route information
 */
export class RouteItem {
    // The URL path
    private readonly mPath: string;
    // The class and method to call to handle the request
    private readonly mHandler: string;
    // The HTTP method required to activate the route GET, PUT, POST, DELETE
    private readonly mMethod: Method;
    // Is the route locked by JWT?
    private readonly mProtected: boolean;
    // Is the route admin only?
    private readonly mAdmin: boolean;

    /**
     * The http path for the route
     * @returns {string}
     */
    get path(): string {
        return this.mPath;
    }

    /**
     * Get the full string handler
     * @returns {string}
     */
    get handler(): string {
        return this.mHandler;
    }

    /**
     * What is the HTTP method?
     * @returns {Method}
     */
    get method(): Method {
        return this.mMethod;
    }

    /**
     * Is the route logged in users only?
     * @returns {boolean}
     */
    get protected(): boolean {
        return this.mProtected;
    }

    /**
     * Is the route admin only?
     * @returns {boolean}
     */
    get admin(): boolean {
        return this.mAdmin;
    }

    /**
     * Get the class to handle the route
     * @returns {string}
     */
    get handler_class(): string {
        return this.handler.substr(0, this.handler.indexOf('@'));
    }

    /**
     * Get the method to handle the route
     * @returns {string}
     */
    get handler_method(): string {
        return this.handler.substr(this.handler.indexOf('@') + 1);
    }

    /**
     * Class constructor
     * @param {string} _path
     * @param _handler
     * @param {Method} _method
     * @param {boolean} _isProtected
     * @param {boolean} _isAdmin
     */
    constructor(_path: string, _handler: any, _method?: Method, _isProtected: boolean = false, _isAdmin: boolean = false) {
        this.mPath = _path;
        this.mHandler = _handler;
        this.mProtected = _isProtected;
        this.mMethod = _method || Method.ALL;
        this.mAdmin = _isAdmin;
    }
}
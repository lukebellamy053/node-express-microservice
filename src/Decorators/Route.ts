// noinspection JSUnusedGlobalSymbols
import { PathHandler } from '../Utils';
import { RouteInterface } from '../Interfaces';
import { MethodInterface } from '../Interfaces';
import { Method } from '../Enums';

/**
 * Create a new route
 * @param {RouteInterface} data
 * @returns {(target: any, propertyKey: string, descriptor: PropertyDescriptor) => void}
 * @deprecated use Route instead
 */
export function route(data: RouteInterface) {
    return Route(data);
}

/**
 * Create a new route
 * @param {RouteInterface} data
 * @returns {(target: any, propertyKey: string, descriptor: PropertyDescriptor) => void}
 */
export function Route(data: RouteInterface) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const route_item = {
            handler: target.constructor.name + '@' + propertyKey,
        };
        PathHandler.addPendingRoute(Object.assign(data, route_item));
    };
}

/**
 * Create a new GET route
 * @param {MethodInterface} data
 * @returns {(target: any, propertyKey: string, descriptor: PropertyDescriptor) => void}
 */
export function Get(data: MethodInterface | string) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        if (typeof data == 'string') {
            // If data is a string, assume its the path
            data = {
                path: data,
            };
        }
        const route_item = {
            method: Method.GET,
            handler: target.constructor.name + '@' + propertyKey,
        };
        PathHandler.addPendingRoute(Object.assign(data, route_item));
    };
}

/**
 * Create a new POST route
 * @param {MethodInterface} data
 * @returns {(target: any, propertyKey: string, descriptor: PropertyDescriptor) => void}
 */
export function Post(data: MethodInterface | string) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        if (typeof data == 'string') {
            // If data is a string, assume its the path
            data = {
                path: data,
            };
        }
        const route_item = {
            method: Method.POST,
            handler: target.constructor.name + '@' + propertyKey,
        };
        PathHandler.addPendingRoute(Object.assign(data, route_item));
    };
}

/**
 * Create a new PUT route
 * @param {MethodInterface} data
 * @returns {(target: any, propertyKey: string, descriptor: PropertyDescriptor) => void}
 */
export function Put(data: MethodInterface | string) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        if (typeof data == 'string') {
            // If data is a string, assume its the path
            data = {
                path: data,
            };
        }
        const route_item = {
            method: Method.PUT,
            handler: target.constructor.name + '@' + propertyKey,
        };
        PathHandler.addPendingRoute(Object.assign(data, route_item));
    };
}

/**
 * Create a new DELETE route
 * @param {MethodInterface} data
 * @returns {(target: any, propertyKey: string, descriptor: PropertyDescriptor) => void}
 */
export function Delete(data: MethodInterface | string) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        if (typeof data == 'string') {
            // If data is a string, assume its the path
            data = {
                path: data,
            };
        }
        const route_item = {
            method: Method.DELETE,
            handler: target.constructor.name + '@' + propertyKey,
        };
        PathHandler.addPendingRoute(Object.assign(data, route_item));
    };
}

/**
 * Create a new route
 * @param {MethodInterface} data
 * @returns {(target: any, propertyKey: string, descriptor: PropertyDescriptor) => void}
 */
export function All(data: MethodInterface | string) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        if (typeof data == 'string') {
            // If data is a string, assume its the path
            data = {
                path: data,
            };
        }
        const route_item = {
            method: Method.ALL,
            handler: target.constructor.name + '@' + propertyKey,
        };
        PathHandler.addPendingRoute(Object.assign(data, route_item));
    };
}

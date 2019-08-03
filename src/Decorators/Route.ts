// noinspection JSUnusedGlobalSymbols
import { MethodInterface, RouteInterface } from '../Interfaces';
import { Method } from '../Enums';
import {DecoratorUtils} from './DecoratorUtils';


/**
 * Create a new route
 * @param {RouteInterface} data
 * @returns {(target: any, propertyKey: string, descriptor: PropertyDescriptor) => void}
 */
export function Route(data: RouteInterface) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const routeItem = {
            handler: target.constructor.name + '@' + propertyKey,
        };
        DecoratorUtils.addPendingRoute(Object.assign(data, routeItem));
    };
}

/**
 * Create a new GET route
 * @param {MethodInterface} data
 * @returns {(target: any, propertyKey: string, descriptor: PropertyDescriptor) => void}
 */
export function Get(data: MethodInterface | string) {
    return makeRoute(data, Method.GET);
}

/**
 * Create a new POST route
 * @param {MethodInterface} data
 * @returns {(target: any, propertyKey: string, descriptor: PropertyDescriptor) => void}
 */
export function Post(data: MethodInterface | string) {
    return makeRoute(data, Method.POST);
}

/**
 * Create a new PUT route
 * @param {MethodInterface} data
 * @returns {(target: any, propertyKey: string, descriptor: PropertyDescriptor) => void}
 */
export function Put(data: MethodInterface | string) {
    return makeRoute(data, Method.PUT);
}

/**
 * Create a new DELETE route
 * @param {MethodInterface} data
 * @returns {(target: any, propertyKey: string, descriptor: PropertyDescriptor) => void}
 */
export function Delete(data: MethodInterface | string) {
    return makeRoute(data, Method.DELETE);
}

/**
 * Create a new route
 * @param {MethodInterface} data
 * @returns {(target: any, propertyKey: string, descriptor: PropertyDescriptor) => void}
 */
export function All(data: MethodInterface | string) {
    return makeRoute(data, Method.ALL);
}

/**
 * A common function for the GET, POST, PUT, DELETE decorators
 * @param data
 * @param method
 */
function makeRoute(data: MethodInterface | string, method: Method) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        if (typeof data == 'string') {
            // If data is a string, assume its the path
            data = {
                path: data,
            };
        }
        const routeItem = {
            method: method,
            handler: target.constructor.name + '@' + propertyKey,
        };
        DecoratorUtils.addPendingRoute(Object.assign(data, routeItem));
    };
}

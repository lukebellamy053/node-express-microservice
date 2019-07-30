// noinspection JSUnusedGlobalSymbols
import { PathHandler } from '../Utils';
import { RouteInterface } from '../Interfaces';

/**
 * Create a new route
 * @param {RouteInterface} data
 * @returns {(target: any, propertyKey: string, descriptor: PropertyDescriptor) => void}
 */
export function route(data: RouteInterface) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const route_item = {
            handler: target.constructor.name + '@' + propertyKey,
        };
        PathHandler.addPendingRoute(Object.assign(data, route_item));
    };
}

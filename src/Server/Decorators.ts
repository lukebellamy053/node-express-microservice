import {PathHandler} from "../Utils/PathHandler";
import {RouteInterface} from "../Interfaces/RouteInterface";
import {Controller} from "./Controller";

// noinspection JSUnusedGlobalSymbols
/**
 * Create a new route
 * @param {RouteInterface} data
 * @returns {(target: any, propertyKey: string, descriptor: PropertyDescriptor) => void}
 */
export function route(data: RouteInterface) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const route_item = {
            handler: target.constructor.name + "@" + propertyKey
        };
        PathHandler.addPendingRoute(Object.assign(data, route_item));
    };
}

// noinspection JSUnusedGlobalSymbols
/**
 * Require the named parameters to be present to continue
 * @param {string[]} items
 */
export function params(items: string[]) {
    return function (target: any, propertyKey: string) {
        const method = target.constructor.name + "@" + propertyKey;
        Controller.addRequired(method, items);
    };
}
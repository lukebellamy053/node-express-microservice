import { PathHandler } from '../Utils';
import { RouteInterface } from '../Interfaces';
import { HTTPControllerInterface } from '../Interfaces';

/**
 * Create a new route
 * @param {RouteInterface} data
 * @returns {(target: any, propertyKey: string, descriptor: PropertyDescriptor) => void}
 */
export function HTTPController(data: HTTPControllerInterface) {
    return function(target: any) {
        PathHandler.addControllerPath(data, target.name);
    };
}

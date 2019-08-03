import { RouteInterface } from '../Interfaces';
import { HTTPControllerInterface } from '../Interfaces';
import {DecoratorUtils} from './DecoratorUtils';

/**
 * Create a new route
 * @param {RouteInterface} data
 * @returns {(target: any, propertyKey: string, descriptor: PropertyDescriptor) => void}
 */
export function HTTPController(data: HTTPControllerInterface) {
    return function(target: any) {
        DecoratorUtils.addControllerPath(data, target.name);
    };
}

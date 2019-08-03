/**
 * Add a timeout limit to a method, default is 10 seconds
 * @param limit
 */
import {DecoratorUtils} from './DecoratorUtils';

export function Timeout(limit: number) {
    return function (target: any, propertyKey: string) {
        const method = target.constructor.name + '@' + propertyKey;
        DecoratorUtils.addTimeout(method, limit);
    };
}

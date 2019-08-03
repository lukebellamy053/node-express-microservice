import { Controller } from '../Server';

/**
 * Add a timeout limit to a method, default is 10 seconds
 * @param limit
 */
export function Timeout(limit: number) {
    return function(target: any, propertyKey: string) {
        const method = target.constructor.name + '@' + propertyKey;
        Controller.addTimeout(method, limit);
    };
}

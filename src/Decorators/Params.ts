// noinspection JSUnusedGlobalSymbols
import { Controller } from '../Server';

/**
 * Require the named parameters to be present to continue
 * @param {string[]} items
 */
export function params(items: string[]) {
    return function(target: any, propertyKey: string) {
        const method = target.constructor.name + '@' + propertyKey;
        Controller.addRequired(method, items);
    };
}

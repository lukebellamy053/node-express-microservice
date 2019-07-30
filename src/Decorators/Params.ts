// noinspection JSUnusedGlobalSymbols
import { Controller } from '../Server';

/**
 * Require the named parameters to be present to continue
 * @param {string[]} items
 */
export function Params(items: string[]) {
    return function(target: any, propertyKey: string) {
        const method = target.constructor.name + '@' + propertyKey;
        Controller.addRequired(method, items);
    };
}

/**
 * Require the named parameters to be present to continue
 * @param {string[]} items
 * @deprecated use Params instead
 */
export function params(items: string[]) {
    return Params(items);
}

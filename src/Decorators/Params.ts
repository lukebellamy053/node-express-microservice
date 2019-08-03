// noinspection JSUnusedGlobalSymbols
import {DecoratorUtils} from './DecoratorUtils';

/**
 * Require the named parameters to be present to continue
 * @param {string[]} items
 */
export function Params(items: string[]) {
    return function(target: any, propertyKey: string) {
        const method = target.constructor.name + '@' + propertyKey;
        DecoratorUtils.addRequired(method, items);
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

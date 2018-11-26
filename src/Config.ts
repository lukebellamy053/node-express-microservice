import {Environment} from './Environment';

/**
 * Holds the environment to use
 * Default to the default environment
 */
export class EnvironmentConfig {
    public static env_to_use: any = Environment;

    /**
     * Add values to the environment
     * @param values
     */
    public static addValues(values: Object) {
        EnvironmentConfig.env_to_use = Object.assign(EnvironmentConfig.env_to_use, values);
    }

    constructor(merge?: any) {
        if (merge === undefined) {
            merge = {};
        }
        EnvironmentConfig.env_to_use = Object.assign(Environment, merge);
    }

}

/**
 * Load a value from the environment
 * @param {string} parameter
 * @param def
 * @returns The value if found, the default if present or undefined
 */
export function env(parameter: string, def?: any): any {
    if (EnvironmentConfig.env_to_use[parameter] !== undefined) {
        return EnvironmentConfig.env_to_use[parameter];
    }
    return def;
}
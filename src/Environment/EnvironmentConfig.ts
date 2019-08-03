/**
 * Holds the environment to use
 * Default to the default environment
 */
export class EnvironmentConfig {
    protected static EnvToUse: { [x: string]: any } = {};

    /**
     * Get the environment
     */
    public static get environment(): { [x: string]: any } {
        return EnvironmentConfig.EnvToUse;
    }

    public static set environment(_environment: { [x: string]: any }) {
        EnvironmentConfig.EnvToUse = _environment;
    }

    /**
     * Add values to the environment
     * @param values
     */
    public static addValues(values: Record<string, any>) {
        EnvironmentConfig.EnvToUse = Object.assign({}, EnvironmentConfig.EnvToUse, values);
    }

    constructor(merge?: any) {
        if (merge === undefined) {
            merge = {};
        }
        EnvironmentConfig.EnvToUse = Object.assign({}, EnvironmentConfig.EnvToUse, merge);
    }
}

/**
 * Load a value from the environment
 * @param {string} parameter
 * @param def
 * @returns The value if found, the default if present or undefined
 */
export function env(parameter: string, def?: any): any {
    // Check if the value exists in the config set
    if (EnvironmentConfig.environment[parameter] !== undefined) {
        return EnvironmentConfig.environment[parameter];
    }
    // Check if the value exists in the environment
    if (process.env[parameter] !== undefined) {
        return process.env[parameter];
    }
    // Return the default
    return def;
}

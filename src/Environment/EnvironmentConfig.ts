/**
 * Holds the environment to use
 * Default to the default environment
 */
export class EnvironmentConfig {

    /**
     * Get the environment
     */
    public static get environment(): { [x: string]: any } {
        return process.env;
    }

    /**
     * Set the environment variables
     */
    public static set environment(_environment: { [x: string]: any }) {
        process.env = _environment;
    }

    /**
     * Add values to the environment
     * @param values
     */
    public static addValues(values: Record<string, any>) {
       Object.assign(process.env, values);
    }

}

/**
 * Load a value from the environment
 * @param {string} parameter
 * @param def
 * @returns The value if found, the default if present or undefined
 */
export function env(parameter: string, def?: any): any {
    // Check if the value exists in the environment
    if (process.env[parameter] !== undefined) {
        return process.env[parameter];
    }
    // Return the default
    return def;
}

import { Response } from 'express';
import { env, EnvironmentVariables } from '..';

/**
 * Respond with a success message
 * @param req
 * @param data
 * @param code
 */
export function success(req: Response, data?: any, code: number = 200) {
    req.status(code).json({
        success: true,
        version: env(EnvironmentVariables.APP_VERSION),
        build: env(EnvironmentVariables.APP_BUILD),
        service: env(EnvironmentVariables.SERVICE_NAME),
        data: data,
    });
}

/**
 * Send a failed request message
 * @param req
 * @param {string} reason
 * @param code
 */
export function fail(req: Response, reason: string, code: number = 200) {
    req.status(code).json({
        success: false,
        version: env(EnvironmentVariables.APP_VERSION),
        build: env(EnvironmentVariables.APP_BUILD),
        service: env(EnvironmentVariables.SERVICE_NAME),
        error: reason.toString(),
    });
}

import {Response} from 'express';
import {env} from '..'

/**
 * Respond with a success message
 * @param req
 * @param data
 * @param code
 */
export function success(req: Response, data?: any, code: number = 200) {
    req.status(code).json({
        success: true,
        version: env('APP_VERSION'),
        build: env('APP_BUILD'),
        service: env('SERVICE_NAME', 'Unknown'),
        data: data
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
        version: env('APP_VERSION'),
        build: env('APP_BUILD'),
        service: env('SERVICE_NAME', 'Unknown'),
        error: reason
    });
}
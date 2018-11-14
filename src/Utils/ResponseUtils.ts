import {Response} from "express";
import {env} from ".."

/**
 * Respond with a success message
 * @param req
 * @param data
 */
export function success(req: Response, data?: any) {
    req.status(200).json({
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
 */
export function fail(req: Response, reason: string) {
    req.status(200).json({
        success: false,
        version: env('APP_VERSION'),
        build: env('APP_BUILD'),
        service: env('SERVICE_NAME', 'Unknown'),
        error: reason
    });
}
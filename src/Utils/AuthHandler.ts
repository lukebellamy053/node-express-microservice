import {Response} from 'express'
import { env } from "..";
const jwt = require('jsonwebtoken');

/**
 * Verify the token for a request and set the user_id
 * @param req
 * @param res
 * @param next
 */
export function verifyRequest(req: any, res: any, next: any) {

    let token = getToken(req);

    if (token !== null) {
        verifyJWTToken(token)
            .then((decodedToken: any) => {
                req.active_user_id = decodedToken.data.user_id;
                next();
            })
            .catch((err) => {
                fail(res);
            });
    } else {
        fail(res);
    }
}

/**
 * Get the JWT from a request
 * @param req
 * @returns string | null
 */
export function getToken(req: any): string | null {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        // Handle token presented as a Bearer token in the Authorization header
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        // Handle token presented as URI param
        return req.query.token;
    } else if (req.cookies && req.cookies.token) {
        // Handle token presented as a cookie parameter
        return req.cookies.token;
    }
    // If we return null, we couldn't find a token.
    // In this case, the JWT middleware will return a 401 (unauthorized) to the client for this request
    return null;
}


/**
 * Send a failed request message
 * @param res
 */
function fail(res: Response) {
    res.status(200)
        .json({
            success: false, 
            error: "Invalid auth token provided.",
            version: env('APP_VERSION', 'Unknown'),
            build: env('APP_BUILD', 'Unknown'),
            service: env('SERVICE_NAME', 'Unknown')
        });
}

/**
 * Verify that a token is valid
 * @param {string} token
 * @returns {Promise<any>}
 */
export async function verifyJWTToken(token: string) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, env('APP_KEY'), (err: any, decodedToken: any) => {
            if (err || !decodedToken) {
                return reject(err)
            }

            let user_id = decodedToken.data.user_id;

            if (!user_id) {
                reject('Invalid token supplied');
            }
            resolve(decodedToken)
        })
    })
}
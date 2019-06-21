import {env, EnvironmentVariables, ErrorResponses} from '..';

const jwt = require('jsonwebtoken');

/**
 * Verify the token for a request and set the user_id
 * @param req
 */
export async function verifyRequest(req: any) {
    let token = getToken(req);
    if (token !== null) {
        req.token = await verifyJWTToken(token);
    } else {
        throw new Error(ErrorResponses.Invalid_Token);
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
    return null;
}

/**
 * Verify that a token is valid
 * @param {string} token
 * @returns {Promise<any>}
 */
export function verifyJWTToken(token: string) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, env(EnvironmentVariables.APP_KEY), (err: any, decodedToken: any) => {
            if (err || !decodedToken) {
                return reject(err)
            }
            resolve(decodedToken)
        })
    })
}
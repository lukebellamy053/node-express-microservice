import { EnvironmentVariables, ErrorResponses } from '../Enums';
import { env } from '../EnvironmentConfig';
import { CustomAuthentication } from '../Interfaces/CustomAuthentication';
import { Request, Response } from 'express';

const jwt = require('jsonwebtoken');

/**
 * A class that handles the authentication of users
 */
export class Passport {
    // A map of methods to their authentication methods
    private static mRouteAuthenticators: { [x: string]: (_: any) => Promise<boolean> } = {};
    // Holds a reference to the passport class to use
    private static mCustomPassport: Passport;

    /**
     * Set the passport instance to use
     * @param _passport
     */
    public static set passport(_passport: Passport) {
        this.mCustomPassport = _passport;
    }

    /**
     * Get the active passport instance
     */
    public static get passport(): Passport {
        if (!Passport.mCustomPassport) {
            Passport.passport = new Passport();
        }
        return Passport.mCustomPassport;
    }

    /**
     * Add a new gate for a method
     * @param methodName
     * @param handler
     */
    public static addGatedMethod(methodName: string, handler: (_: any) => Promise<boolean>) {
        this.mRouteAuthenticators[methodName] = handler;
    }

    /**
     * Get the gate for a method
     * @param methodName
     */
    public static getGateForMethod(methodName: string): ((_: any) => Promise<boolean>) | undefined {
        return this.mRouteAuthenticators[methodName];
    }

    /**
     * Verify that a user is valid
     * This is not static so that it can be overridden easier
     * @throws ErrorResponses.InvalidToken
     * @param request
     */
    public async verifyRequest(request: Request & { token?: any; decodedToken?: any }) {
        if ('customAuth' in this) {
            // Activate the custom authentication method
            return await (<CustomAuthentication>this).customAuth(request);
        }
        // Get the token from the request
        let token = this.getToken(request);
        if (token !== null) {
            // Confirm that the token is valid
            request.token = await this.verifyJWTToken(token);
        } else {
            // The token is invalid, reject the request
            throw ErrorResponses.InvalidToken;
        }
    }

    /**
     * Get the token from the request
     * @param req
     */
    public getToken(req: any): string | null {
        if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
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
     * Verify the JWT Token is correct
     * @param token
     */
    public verifyJWTToken(token: string) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, env(EnvironmentVariables.APP_KEY), (err: any, decodedToken: any) => {
                if (err || !decodedToken) {
                    return reject(err);
                }
                resolve(decodedToken);
            });
        });
    }
}

import {PathHandler} from '../Utils';
import {EnvironmentInterface} from '../Interfaces';
import {Express, Request, Response} from 'express';
import {DBHandler, env, EnvironmentConfig, Method} from '..';
import {RouteItem} from '../Classes/RouteItem';

const parser = require('body-parser');

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
    console.error(JSON.stringify(err));
});

/**
 * The core server component
 * Creates the express application
 */
export class ExpressServer {
    // The static app reference
    private static mApp: Express;
    // Holds a reference to the controllers
    protected controllers = {};

    /**
     * Get the express app
     */
    public static get serverApp() {
        return ExpressServer.mApp;
    }

    protected get app() {
        return ExpressServer.serverApp;
    }

    /**
     * Set the express app
     * @param _app
     */
    protected set app(_app) {
        ExpressServer.mApp = _app;
    }


    /**
     * Class constructor
     * Create the new env settings
     * @param {EnvironmentInterface} env_config
     */
    constructor(env_config: EnvironmentInterface) {
        // Require these here so they can be used in child classes
        const express = require('express');
        // Create the express app
        this.app = express();
        // Merge the environment variables to the provided list\\
        new EnvironmentConfig(Object.assign({}, process.env, env_config));
        this.init();
        this.middleware();
        this.paths();
        this.errorHandler();
        this.listen();
    }

    /**
     * Init the server
     */
    init() {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        // Check if the user wants to use a custom DB system
        if (!env('CUSTOM_DB', false)) {
            new DBHandler();
        }
    }

    /**
     * Register any middleware
     */
    middleware() {
        this.app.use(parser.urlencoded({extended: true}));
        this.app.use(parser.json());
    }

    paths() {
        // Register paths here
        PathHandler.register(new RouteItem('/ping', (req:any, res:any) => {
            res.send('pong');
        }, Method.GET));
    }

    /**
     * Handle any uncaught errors
     */
    errorHandler() {
        this.app.use((error: any, request: Request, response: Response, next: any) => {
            console.log('Exception caught');
            console.error(error);
            response.status(500);
            response.send(JSON.stringify({
                success: false,
                error: error
            }));
        });
    }

    /**
     * Start the server and listen to the required port
     */
    listen() {
        const server = this.app.listen(env('PORT', 8080), () => {
            // @ts-ignore
            const port = server.address().port;
            console.log(`Service listening on ${port}`);
        });
    }
}
import {PathHandler} from '../Utils';
import {EnvironmentInterface} from '../Interfaces';
import {Request, Response} from 'express';
import {EnvironmentConfig, DBHandler, env} from '..';
import {app} from './App';

const parser = require('body-parser');

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});

/**
 * The core server component
 * Creates the express application
 */
export class ExpressServer {

    // Holds a reference to the controllers
    protected controllers = {};

    /**
     * Get the express app
     */
    public get serverApp() {
        return app;
    }


    /**
     * Class constructor
     * Create the new env settings
     * @param {EnvironmentInterface} env_config
     */
    constructor(env_config: EnvironmentInterface) {
        // Merge the environment variables to the provided list
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
        app.use(parser.urlencoded({extended: true}));
        app.use(parser.json());
    }

    /**
     * Add the paths
     */
    paths() {
        // Add the proxy routes
        PathHandler.app = app;
    }

    /**
     * Handle any uncaught errors
     */
    errorHandler() {
        app.use((error: any, request: Request, response: Response, next: any) => {
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
        const server = app.listen(env('PORT', 8080), () => {
            const port = server.address().port;
            console.log(`Service listening on ${port}`);
        });
    }
}
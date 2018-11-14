import { PathHandler } from "../Utils";
import { EnvironmentInterface } from "../Interfaces";
import { Request, Response } from "express";
import { EnvironmentConfig, DBHandler, env } from "..";

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});

/**
 * The core server component
 * Creates the express application
 */
export class ExpressServer {

    // Require these here so they can be used in child classes
    protected express = require('express');
    protected parser = require('body-parser');
    // Create the express app
    protected app = this.express();
    // Holds a reference to the controllers
    protected controllers = {};

    /**
     * Get the express app
     */
    public get serverApp() {
        return this.app;
    }


    /**
     * Class constructor
     * Create the new env settings
     * @param {EnvironmentInterface} env_config
     */
    constructor(env_config: EnvironmentInterface) {
        // Merge the environment variables to the provided list
        new EnvironmentConfig(Object.assign({},process.env,env_config));
        this.init();
    }

    /**
     * Init the server
     */
    init() {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        // Check if the user wants to use a custom DB system
        if(!env('CUSTOM_DB',false)) {
            new DBHandler();
        }
        this.middleware();
        this.paths();
        this.errorHandler();
        this.listen();
    }

    /**
     * Register any middleware
     */
    middleware() {
        this.app.use(this.parser.urlencoded({ extended: true }));
        this.app.use(this.parser.json());
    }

    /**
     * Add the paths
     */
    paths() {
        // Add the proxy routes
        PathHandler.app = this.app;
    }

    /**
     * Handle any uncaught errors
     */
    errorHandler() {
        this.app.use((error: any, request: Request, response: Response, next: any) => {
            console.log("Exception caught");
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
            const port = server.address().port;
            console.log(`Service listening on ${port}`);
        });
    }
}
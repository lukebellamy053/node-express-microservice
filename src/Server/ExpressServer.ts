import {PathHandler} from '../Utils';
import {EnvironmentInterface} from '../Interfaces';
import {Express, Request, Response} from 'express';
import {DBHandler, env, EnvironmentConfig, Method} from '..';
import {RouteItem} from '../Classes';
import * as http from 'http';
import {EventEmitter} from 'events';
import {ServiceController, HealthController} from '../Controllers/index';

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
    protected static mServer: http.Server;
    // Holds a reference to the controllers
    protected controllers = {};
    protected static mDatabaseHealthModels: Array<any> = [];

    public static events = new EventEmitter();


    /**
     * Get the express app
     */
    public static get serverApp() {
        return ExpressServer.mApp;
    }

    /**
     * Get the server object
     */
    public static get server() {
        return ExpressServer.mServer;
    }

    /**
     * Check the connection to the database
     */
    protected async databaseHealthCheck() {
        let response = {
            database: {}
        };
        const models = ExpressServer.mDatabaseHealthModels;
        for (let i = 0; i < models.length; i++) {
            const model: any = models[i];
            try {
                await model.findOne().maxTime(1000);
                response.database[model.collection.name] = true;
            } catch (e) {
                response.database[model.collection.name] = false;
            }
        }
        return response;
    }

    /**
     * Shutdown the server
     */
    public static async shutDown() {
        if (this.mServer) {
            this.mServer.close();
            console.log('Server closed');
        }
        const mongoose = DBHandler.mongoose;
        if (mongoose && mongoose.connection) {
            await mongoose.connection.close();
            console.log('Mongoose closed');
        }
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
        PathHandler.addController({
            ServiceController: ServiceController,
            HealthController: HealthController
        });
        PathHandler.registerDefaults();
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
            const dbHandler = new DBHandler();
            dbHandler.onConnected.on('connected', (connected) => {
                ExpressServer.events.emit('connected', connected);
            });
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
        // Add any other controllers here
        HealthController.addHealthMethod(this.databaseHealthCheck);
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
        ExpressServer.mServer = this.app.listen(env('PORT', 8080), () => {
            // @ts-ignore
            const port = ExpressServer.mServer.address().port;
            console.log(`Service listening on ${port}`);
            ExpressServer.events.emit('ready', true);
        });
    }
}
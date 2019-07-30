import { EnvironmentInterface } from '../Interfaces';
import { Express, Request, Response } from 'express';
import { env, EnvironmentConfig } from '..';
import { EventEmitter } from 'events';
import { HealthController, ServiceController } from '../Controllers';
import { PathHandler } from '../Utils';
import { MongoHandler } from '../Classes/Database';
import * as parser from 'body-parser';
import * as http from 'http';
import { AddressInfo } from 'net';
import * as mongoose from 'mongoose';
import { ServerEvents } from '../Enums';

/**
 * The core server component
 * Creates the express application
 */
export abstract class ExpressServer {
    // Holds a reference to the running express server
    protected static mServer: http.Server;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    protected static mDatabaseHealthModels: mongoose.Model<any>[] = [];
    // The database models for the health checks
    // An event emitter to let other classes know when key events occur
    protected static mEvents: EventEmitter = new EventEmitter();
    // The static app reference
    private static mApp: Express;

    /**
     * Class constructor
     * Create the new env settings
     * @param {EnvironmentInterface} envConfig
     */
    public constructor(envConfig: EnvironmentInterface) {
        // Require these here so they can be used in child classes
        const express = require('express');
        // Create the express app
        this.app = express();
        PathHandler.pathHandler.app = this.app;
        // Merge the environment variables to the provided list
        new EnvironmentConfig(Object.assign({}, process.env, envConfig));
        this.init();
        this.middleware();
        this.paths();
        PathHandler.pathHandler.addController([ServiceController, HealthController]);
        PathHandler.pathHandler.registerDefaults();
        this.errorHandler();
        this.listen();
    }

    /**
     * Get the event emitter
     * @returns {module:events.internal.EventEmitter}
     */
    public static get events(): EventEmitter {
        return ExpressServer.mEvents;
    }

    /**
     * Get the express app
     */
    public static get serverApp(): Express {
        return ExpressServer.mApp;
    }

    /**
     * Get the server object
     */
    public static get server(): http.Server {
        return ExpressServer.mServer;
    }

    /**
     * Set the express app
     * @param _app
     */
    protected set app(_app) {
        ExpressServer.mApp = _app;
    }

    /**
     * Set the express app
     */
    protected get app() {
        return ExpressServer.mApp;
    }

    /**
     * Shutdown the server
     */
    public static async shutDown(): Promise<void> {
        if (this.mServer) {
            this.mServer.close();
            console.log('Server closed');
        }
        const mongoose = MongoHandler.mongoose;
        if (mongoose && mongoose.connection) {
            await mongoose.connection.close();
            console.log('Mongoose closed');
        }
    }

    /**
     * Check the connection to the database
     */
    protected async databaseHealthCheck() {
        let response = {
            database: {},
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
     * Init the server
     */
    protected init(): void {
        // Check if we're running in production mode
        if (!env('PRODUCTION', true)) {
            // Allow unauthorised certificates in development mode
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        }
        // Check if the user wants to use a custom DB system
        if (!env('CUSTOM_DB', false)) {
            const dbHandler = new MongoHandler();
            dbHandler.onConnected.on(ServerEvents.DATABASE_CONNECTED, (connected: boolean): void => {
                ExpressServer.events.emit(ServerEvents.DATABASE_CONNECTED, connected);
            });
        }
    }

    // noinspection JSMethodCanBeStatic
    /**
     * Register any middleware
     */
    protected middleware(): void {
        this.app.use(parser.urlencoded({ extended: true }));
        this.app.use(parser.json());
    }

    /**
     * Register any relevant paths here
     */
    protected paths(): void {
        // Add any other controllers here
        HealthController.addHealthMethod(this.databaseHealthCheck);
    }

    /**
     * Handle any uncaught errors
     */
    protected errorHandler(): void {
        // Register the error handler
        this.app.use((error: any, request: Request, response: Response, next: any) => {
            console.log('Exception caught');
            console.error(error);
            // Check if the headers have already been sent
            if (response.headersSent) {
                // Send the error to the next function
                return next(error);
            }
            // Return the error response
            response.status(500);
            response.send(
                JSON.stringify({
                    success: false,
                    error: error,
                }),
            );
        });
    }

    /**
     * Start the server and listen to the required port
     */
    protected listen() {
        ExpressServer.mServer = this.app.listen(env('PORT', 8080), () => {
            const port = (<AddressInfo>ExpressServer.mServer.address()).port;
            console.log(`Service listening on ${port}`);
            ExpressServer.events.emit(ServerEvents.SERVER_READY, true);
        });
    }
}

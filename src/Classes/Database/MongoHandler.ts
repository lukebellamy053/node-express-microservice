import { EventEmitter } from 'events';
import { DBHandler } from './DBHandler';
import { env } from '../../EnvironmentConfig';
import * as mongoose from 'mongoose';
import { ServerEvents } from '../../Enums';

/**
 * A class to handle MongoDB connections
 */
export class MongoHandler extends DBHandler {
    private static mActiveMongoose;

    /**
     * Get the active mongoose connection
     */
    public static get mongoose(): mongoose.Mongoose {
        return MongoHandler.mActiveMongoose;
    }

    /**
     * Set the active mongoose connection
     * @param connection
     */
    public static set mongoose(connection: mongoose.Mongoose) {
        MongoHandler.mActiveMongoose = connection;
    }

    /**
     * Get the DB Connected event emitter
     */
    public get onConnected(): EventEmitter {
        return this.mConnectedEvent;
    }

    /**
     * Create a connection to MongoDB
     */
    public constructor() {
        super();
        this.init().catch((err: Error): void => {
            console.log('Failed to connect to mongo');
            console.log(err);
            this.mConnectedEvent.emit(ServerEvents.DATABASE_CONNECTED, false, err);
        });
    }

    protected async init(): Promise<void> {
        // Check if mongoose is already open
        if (!MongoHandler.mActiveMongoose) {
            MongoHandler.mActiveMongoose = mongoose;
        }

        /**
         * Check which connection to make
         */
        if (env('mongoDSN', '').length > 0) {
            await this.connectWithDSN();
        } else if (env('mongoHost', '').length > 0) {
            await this.connectWithDetails();
        } else {
            this.onConnected.emit(ServerEvents.DATABASE_CONNECTED, true);
        }
    }

    /**
     * Connect to MongoDB with a DSN connection
     * @returns {Promise<void>}
     */
    protected async connectWithDSN(): Promise<void> {
        // Connect to Mongo using a DSN string
        console.log('Initiating connection to Mongo');
        console.log('Connecting with DSN');

        await mongoose.connect(env('mongoDSN'), {
            useNewUrlParser: true,
            replicaSet: env('mongoRep', ''),
            authSource: env('authSource', ''),
        });
        console.log('Connected to mongo');
        this.mConnectedEvent.emit(ServerEvents.DATABASE_CONNECTED, true);
    }

    /**
     * Connect to MongoDB with authentication details
     * @returns {Promise<void>}
     */
    protected async connectWithDetails(): Promise<void> {
        // Connect to MongoDB the old fashioned way
        console.log('Initiating connection to Mongo');
        console.log('Creating DSN from details');
        let mongooseString = 'mongodb+srv://';
        if (env('mongoUsername', '').length > 0) {
            mongooseString += env('mongoUsername', '') + ':' + env('mongoPassword', '') + '@';
        }
        mongooseString += env('mongoHost', '') + ':' + env('mongoPort', '') + '/' + env('mongoDB', '');

        // Connect to the mongoDB server
        await mongoose.connect(mongooseString, {
            useNewUrlParser: true,
            replicaSet: env('mongoRep', undefined),
            authSource: env('authSource', undefined),
        });
        // The connection was successful
        console.log('Connected to mongo');
        this.onConnected.emit(ServerEvents.DATABASE_CONNECTED, true);
    }
}

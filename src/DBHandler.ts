import {env} from './EnvironmentConfig';
import {EventEmitter} from 'events';

const mongoose = require('mongoose');

/**
 * A class to handle connecting to MongoDB
 */
export class DBHandler {
    // An event emitter for once the connection is made or failed
    private mConnectedEvent: EventEmitter = new EventEmitter();

    private static mActiveMongoose;

    /**
     * Get the active mongoose connection
     */
    public static get mongoose() {
        return DBHandler.mActiveMongoose;
    }

    /**
     * Set the active mongoose connection
     * @param connection
     */
    public static set mongoose(connection) {
        DBHandler.mActiveMongoose = connection;
    }

    /**
     * Get the DB Connected event emitter
     */
    get onConnected(): EventEmitter {
        return this.mConnectedEvent;
    }

    /**
     * Create a connection to MongoDB
     */
    constructor() {

        if (!DBHandler.mActiveMongoose) {
            DBHandler.mActiveMongoose = mongoose;
        }

        if (env('mongoDSN', '').length > 0) {
            // Connect to Mongo using a DSN string
            console.log('Initiating connection to Mongo');
            console.log('Connecting with DSN');
            mongoose.connect(env('mongoDSN'), {
                useNewUrlParser: true,
                replicaSet: env('mongoRep', ''),
                authSource: env('authSource', '')
            }).then((connected: any) => {
                console.log('Connected to mongo');
                this.mConnectedEvent.emit('connected', true);
            }).catch((err: any) => {
                console.log('Failed to connect to mongo');
                console.log(err);
                this.mConnectedEvent.emit('connected', false, err);
            });
        } else if (env('mongoHost', '').length > 0) {
            // Connec to MongoDB the old fashioned way
            console.log('Initiating connection to Mongo');
            console.log('Creating DSN from details');
            let mongooseString = 'mongodb+srv://';
            if (env('mongoUsername', '').length > 0) {
                mongooseString += env('mongoUsername', '') + ':' + env('mongoPassword', '') + '@'
            }
            mongooseString += env('mongoHost', '') + ':' + env('mongoPort', '') + '/' + env('mongoDB', '');
            // Connect to the mongoDB server
            mongoose.connect(mongooseString, {
                useNewUrlParser: true,
                replicaSet: env('mongoRep', undefined),
                authSource: env('authSource', undefined)
            }).then((connected: any) => {
                // The connection was successful
                console.log('Connected to mongo');
                this.onConnected.emit('connected', true);
            }).catch((err: any) => {
                // Something has gone wrong, report it to the admin
                console.log('Failed to connect to mongo');
                console.log(err);
                this.onConnected.emit('connected', false, err);
            });
        } else {
            this.onConnected.emit('connected', true);
        }
    }
}
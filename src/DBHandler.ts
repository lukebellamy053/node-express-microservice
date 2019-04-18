import mongoose = require('mongoose');
import {env} from '..';
import {EventEmitter} from 'events';

/**
 * A class to handle connecting to MongoDB
 */
export class DBHandler {
    // An event emitter for once the connection is made or failed
    private mConnectedEvent: EventEmitter = new EventEmitter();

    public static mongoose() {
        return mongoose;
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
            // There are no environment settings to connect to the DB at this time
            console.log('Not attempting a DB connection at this time');
            this.onConnected.emit('connected', true);
        }
    }
}
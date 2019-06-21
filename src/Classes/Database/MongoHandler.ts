import {EventEmitter} from 'events';
import {DBHandler} from './DBHandler';
import {env} from '../../EnvironmentConfig';

const mongoose = require('mongoose');

export class MongoHandler extends DBHandler {

    private static mActiveMongoose;

    /**
     * Get the active mongoose connection
     */
    public static get mongoose() {
        return MongoHandler.mActiveMongoose;
    }

    /**
     * Set the active mongoose connection
     * @param connection
     */
    public static set mongoose(connection) {
        MongoHandler.mActiveMongoose = connection;
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
        super();
        this.init().catch(err => {
            console.log('Failed to connect to mongo');
            console.log(err);
            this.mConnectedEvent.emit('connected', false, err);
        });
    }

    private async init() {
        if (!MongoHandler.mActiveMongoose) {
            MongoHandler.mActiveMongoose = mongoose;
        }

        if (env('mongoDSN', '').length > 0) {
            await this.connectWIthDSN();
        } else if (env('mongoHost', '').length > 0) {
            await this.connectWithDetails();
        } else {
            this.onConnected.emit('connected', true);
        }
    }

    private async connectWIthDSN() {
        // Connect to Mongo using a DSN string
        console.log('Initiating connection to Mongo');
        console.log('Connecting with DSN');

        await mongoose.connect(env('mongoDSN'), {
            useNewUrlParser: true,
            replicaSet: env('mongoRep', ''),
            authSource: env('authSource', '')
        });
        console.log('Connected to mongo');
        this.mConnectedEvent.emit('connected', true);

    }

    private async connectWithDetails() {
        // Connect to MongoDB the old fashioned way
        console.log('Initiating connection to Mongo');
        console.log('Creating DSN from details');
        let mongooseString = 'mongodb+srv://';
        if (env('mongoUsername', '').length > 0) {
            mongooseString += env('mongoUsername', '') + ':' + env('mongoPassword', '') + '@'
        }
        mongooseString += env('mongoHost', '') + ':' + env('mongoPort', '') + '/' + env('mongoDB', '');

        // Connect to the mongoDB server
        await  mongoose.connect(mongooseString, {
            useNewUrlParser: true,
            replicaSet: env('mongoRep', undefined),
            authSource: env('authSource', undefined)
        });
        // The connection was successful
        console.log('Connected to mongo');
        this.onConnected.emit('connected', true);
    }

}
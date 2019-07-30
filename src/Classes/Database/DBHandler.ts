import { EventEmitter } from 'events';

/**
 * A class to handle database connections
 */
export abstract class DBHandler {
    // An event emitter for once the connection is made or failed
    protected mConnectedEvent: EventEmitter = new EventEmitter();

    /**
     * Get the DB Connected event emitter
     */
    public get onConnected(): EventEmitter {
        return this.mConnectedEvent;
    }

    /**
     * Class Constructor
     */
    protected constructor() {}
}

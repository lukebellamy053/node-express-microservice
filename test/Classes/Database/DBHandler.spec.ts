/**
 * A file to test the DB handler works as expected
 * Checks that the database is connected to
 */
import { DBHandler } from '../../../src/Classes/Database';
import { ServerEvents } from '../../../src/Enums';

describe('DB Handler', () => {
    let testHandler: TestDBHandler;

    before(function() {
        testHandler = new TestDBHandler();
    });

    it('Returns an event handler', function(done) {
        testHandler.onConnected.on(ServerEvents.DATABASE_CONNECTED, done);
        testHandler.testConnected();
    });
});

class TestDBHandler extends DBHandler {
    public testConnected() {
        this.mConnectedEvent.emit(ServerEvents.DATABASE_CONNECTED);
    }
}

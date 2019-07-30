/**
 * A file to test the DB handler works as expected
 * Checks that the database is connected to
 */
import { MongoHandler } from '../../../src/Classes/Database';
import { ServerEvents } from '../../../src/Enums';
import { expect } from 'chai';
import 'mocha';
import { EnvironmentConfig } from '../../../src';
import Test = Mocha.Test;
import { SinonSandbox, SinonSpy } from 'sinon';

const sinon = require('sinon');

describe('Mongo Handler', function() {
    let testHandler: TestDBHandler;
    let sandbox: SinonSandbox;
    before(function() {
        testHandler = new TestDBHandler();
    });

    beforeEach(() => {
        sandbox = new sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('Returns an event handler', function(done) {
        testHandler.onConnected.on(ServerEvents.DATABASE_CONNECTED, done);
        testHandler.testConnected();
    });

    it('Can be created with DSN', function(done) {
        // Check the DSN method is called
        const spy = sandbox.spy(TestDBHandler.prototype, 'connectWithDSN');
        new EnvironmentConfig({
            mongoDSN: 'test@tester',
        });
        testHandler = new TestDBHandler();
        testHandler.onConnected.on(ServerEvents.DATABASE_CONNECTED, (connected: boolean) => {
            expect(spy.called).to.be.ok;
            spy.restore();
            done();
        });
    });

    it('Can be created with usernames and passwords', function(done) {
        this.timeout(3000);
        // Check the DSN method is called
        sandbox.spy(TestDBHandler.prototype, 'connectWithDetails');
        new EnvironmentConfig({
            mongoHost: 'test@tester',
            mongoPort: 8080,
            mongoDB: 'test',
        });
        testHandler = new TestDBHandler();
        testHandler.onConnected.on(ServerEvents.DATABASE_CONNECTED, (connected: boolean) => {
            expect((<SinonSpy>testHandler.connectWithDetails).called).to.be.ok;
            done();
        });
    });
});

class TestDBHandler extends MongoHandler {
    public testConnected() {
        this.mConnectedEvent.emit(ServerEvents.DATABASE_CONNECTED);
    }

    public async connectWithDetails(): Promise<void> {
        return super.connectWithDetails();
    }

    public async connectWithDSN(): Promise<void> {
        return super.connectWithDSN();
    }
}

import 'mocha';
import { Controller, ExpressServer } from '../../src/Server';
import { HTTPController } from '../../src/Decorators/HTTPController';
import { params, route, timeout } from '../../src/Decorators';
import { ErrorResponses, Method, ServerEvents } from '../../src/Enums';
import { PathHandler } from '../../src/Utils';

const chaiHttp = require('chai-http');
const chai = require('chai');
chai.should();
const expect = chai.expect;

describe('Decorators', function() {
    let serverObject: Server;

    before(done => {
        chai.use(chaiHttp);
        serverObject = new Server({ PORT: 8081, APP_BUILD: 1, APP_VERSION: '1', SERVICE_NAME: 'Test' });
        ExpressServer.events.on(ServerEvents.SERVER_READY, () => {
            done();
        });
    });

    after(async () => {
        await ExpressServer.shutDown();
    });

    /**
     * Check that the parameter decorator is working
     * This also verifies that the Route and HTTPController decorators work
     */
    describe('Params', function() {
        /**
         * Check that the method works with both parameters
         */
        it('Accepts 2 parameters', function(done) {
            chai.request(ExpressServer.server)
                .post('/test/handler')
                .send({
                    one: 'hello',
                    two: 'world',
                })
                .end((error, res) => {
                    res.should.have.status(200);
                    expect(res.body).to.not.haveOwnProperty('error');
                    expect(res.body.data).to.not.be.undefined;
                    res.body.data.should.eq('Hello World');
                    done();
                });
        });

        /**
         * Check the method rejects when one parameter is missing
         */
        it('Rejects missing parameters (One)', function(done) {
            chai.request(ExpressServer.server)
                .post('/test/handler')
                .send({
                    two: 'world',
                })
                .end((error, res) => {
                    res.should.have.status(500);
                    expect(res.body).to.haveOwnProperty('error');
                    expect(res.body.data).to.be.undefined;
                    done();
                });
        });

        /**
         * Check the method rejects when one parameter is missing
         */
        it('Rejects missing parameters (Two)', function(done) {
            chai.request(ExpressServer.server)
                .post('/test/handler')
                .send({
                    one: 'Hello',
                })
                .end((error, res) => {
                    res.should.have.status(500);
                    expect(res.body).to.haveOwnProperty('error');
                    expect(res.body.data).to.be.undefined;
                    done();
                });
        });

        /**
         * Check the method rejects when one parameter is missing
         */
        it('Allows additional parameters', function(done) {
            chai.request(ExpressServer.server)
                .post('/test/handler')
                .send({
                    one: 'Hello',
                    two: 'World',
                    three: 'Again',
                })
                .end((error, res) => {
                    res.should.have.status(200);
                    expect(res.body).to.not.haveOwnProperty('error');
                    expect(res.body.data).to.not.be.undefined;
                    res.body.data.should.eq('Hello World');
                    done();
                });
        });
    });

    describe('Timeout', function() {
        it('Expires after timeout', function() {
            chai.request(ExpressServer.server)
                .get('/test/timeout')
                .end((error, res) => {
                    res.body.error.should.not.be.undefined;
                    expect(res.body).to.not.haveOwnProperty('data');
                    res.body.error.should.eq(ErrorResponses.Timeout);
                });
        });

        it('Returns before timeout', function() {
            chai.request(ExpressServer.server)
                .get('/test/timeout/pass')
                .end((error, res) => {
                    expect(res.body).to.not.haveOwnProperty('error');
                    res.body.data.should.eq('Done');
                });
        });
    });
});

class Server extends ExpressServer {
    paths() {
        PathHandler.addController([TestController]);
        super.paths();
    }
}

@HTTPController({
    path: '/test',
})
class TestController extends Controller {
    @route({
        path: '/handler',
        method: Method.POST,
        protected: false,
    })
    @params(['one', 'two'])
    public async testMethod() {
        return 'Hello World';
    }

    @route({
        path: '/timeout',
        method: Method.GET,
    })
    @timeout(20)
    public timeoutTest() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve('Done');
            }, 25);
        });
    }

    @route({
        path: '/timeout/pass',
        method: Method.GET,
    })
    @timeout(2000)
    public timeoutTestTwo() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve('Done');
            }, 1000);
        });
    }
}

import 'mocha';
import { Controller, ExpressServer } from '../../src/Server';
import { HTTPController } from '../../src/Decorators/HTTPController';
import { ErrorResponses, Method, ServerEvents } from '../../src/Enums';
import { PathHandler } from '../../src/Utils';
import { All, Delete, Get, Post, Put, Route, timeout } from '../../src/Decorators';
import { Params } from '../../src/Decorators';
import { Timeout } from '../../src/Decorators';
import { loadActiveUser } from '../../src/Interfaces';
import { SinonSandbox } from 'sinon';
import * as sinon from 'sinon';

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

    describe('Get', function() {
        it('Accepts requests', function() {
            chai.request(ExpressServer.server)
                .get('/test/testURL')
                .end((error, res) => {
                    expect(res.body).to.not.haveOwnProperty('error');
                    res.body.data.should.eq('Get');
                });
        });
    });

    describe('Post', function() {
        it('Accepts requests', function() {
            chai.request(ExpressServer.server)
                .post('/test/testURL')
                .end((error, res) => {
                    expect(res.body).to.not.haveOwnProperty('error');
                    res.body.data.should.eq('Post');
                });
        });
    });

    describe('Put', function() {
        it('Accepts requests', function() {
            chai.request(ExpressServer.server)
                .put('/test/testURL')
                .end((error, res) => {
                    expect(res.body).to.not.haveOwnProperty('error');
                    res.body.data.should.eq('Put');
                });
        });
    });

    describe('Delete', function() {
        it('Accepts requests', function() {
            chai.request(ExpressServer.server)
                .delete('/test/testURL')
                .end((error, res) => {
                    expect(res.body).to.not.haveOwnProperty('error');
                    res.body.data.should.eq('Delete');
                });
        });
    });

    describe('All', function() {
        it('Accepts requests', function() {
            chai.request(ExpressServer.server)
                .get('/test/allTest')
                .end((error, res) => {
                    expect(res.body).to.not.haveOwnProperty('error');
                    res.body.data.should.eq('All');
                });

            chai.request(ExpressServer.server)
                .put('/test/allTest')
                .end((error, res) => {
                    expect(res.body).to.not.haveOwnProperty('error');
                    res.body.data.should.eq('All');
                });

            chai.request(ExpressServer.server)
                .post('/test/allTest')
                .end((error, res) => {
                    expect(res.body).to.not.haveOwnProperty('error');
                    res.body.data.should.eq('All');
                });

            chai.request(ExpressServer.server)
                .delete('/test/allTest')
                .end((error, res) => {
                    expect(res.body).to.not.haveOwnProperty('error');
                    res.body.data.should.eq('All');
                });
        });
    });

    describe('Security Checks', function() {
        let sandbox: SinonSandbox;

        before(function() {
            sandbox = sinon.createSandbox();
        });

        after(function() {
            sandbox.restore();
        });

        it('Applies the controller auth handler', function() {
            sandbox.stub(SecurityController.prototype, 'loadActiveUser').resolves({
                email: 'a.user@gmail.com',
                first: 'luke',
            });

            chai.request(ExpressServer.server)
                .get('/security/luke')
                .end((error, res) => {
                    expect(res.body).to.not.haveOwnProperty('error');
                    res.body.data.should.eq('Luke Secret');
                    sandbox.restore();
                });
        });

        it('Blocks invalid controller actions', function() {
            sandbox.stub(SecurityController.prototype, 'loadActiveUser').resolves({
                email: 'a.user@hotmail.com',
                first: 'luke',
            });

            chai.request(ExpressServer.server)
                .get('/security/luke')
                .end((error, res) => {
                    expect(res.body).to.haveOwnProperty('error');
                    expect(res.body).to.not.haveOwnPropertyDescriptor('data');
                    expect(res.body.error).to.eq(ErrorResponses.NOT_ALLOWED);
                    sandbox.restore();
                });
        });

        it('Allows valid controller actions', function() {
            sandbox.stub(SecurityController.prototype, 'loadActiveUser').resolves({
                email: 'a.user@gmail.com',
            });

            chai.request(ExpressServer.server)
                .get('/security/public')
                .end((error, res) => {
                    expect(res.body).to.not.haveOwnProperty('error');
                    res.body.data.should.eq('Public Stuff');
                    sandbox.restore();
                });
        });

        it('Blocks invalid method requests', function() {
            sandbox.stub(SecurityController.prototype, 'loadActiveUser').resolves({
                email: 'a.user@gmail.com',
                first: 'luke',
            });

            chai.request(ExpressServer.server)
                .get('/security/john')
                .end((error, res) => {
                    expect(res.body).to.haveOwnProperty('error');
                    expect(res.body).to.not.haveOwnPropertyDescriptor('data');
                    expect(res.body.error).to.eq(ErrorResponses.NOT_ALLOWED);
                    sandbox.restore();
                });
        });
    });
});

class Server extends ExpressServer {
    paths() {
        PathHandler.pathHandler.addController([TestController, SecurityController]);
        super.paths();
    }
}

@HTTPController({
    path: '/test',
})
class TestController extends Controller {
    @Route({
        path: '/handler',
        method: Method.POST,
        protected: false,
    })
    @Params(['one', 'two'])
    public async testMethod(): Promise<string> {
        return 'Hello World';
    }

    @Route({
        path: '/timeout',
        method: Method.GET,
    })
    @Timeout(20)
    public timeoutTest() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve('Done');
            }, 25);
        });
    }

    @Route({
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

    @Get('/testURL')
    public getTest() {
        return 'Get';
    }

    @Post('/testURL')
    public postTest() {
        return 'Post';
    }

    @Put('/testURL')
    public putTest() {
        return 'Put';
    }

    @Delete('/testURL')
    public deleteTest() {
        return 'Delete';
    }

    @All('/allTest')
    public allTest() {
        return 'All';
    }
}

@HTTPController({
    path: '/security',
    authenticationHandler: async function(controller: SecurityController) {
        const user = controller.activeUser;
        // Only let people with GMAIL emails use this controller
        return user && user.email && user.email.indexOf('gmail.com') > -1;
    },
})
class SecurityController extends Controller implements loadActiveUser {
    @Get({
        path: '/luke',
        authenticationHandler: async controller => {
            const user = controller.activeUser;
            // Only let people with GMAIL emails use this controller
            return user && user.first && user.first.toLowerCase() === 'luke';
        },
    })
    public async lukeMethod() {
        return 'Luke Secret';
    }

    @Get({
        path: '/john',
        authenticationHandler: async controller => {
            const user = controller.activeUser;
            // Only let people with GMAIL emails use this controller
            return user && user.first && user.first.toLowerCase() === 'john';
        },
    })
    public async johnMethod() {
        return 'John Secret';
    }

    @Get('/public')
    public async openMethod() {
        return 'Public Stuff';
    }

    public loadActiveUser(): Promise<any> {
        return Promise.resolve(undefined);
    }
}

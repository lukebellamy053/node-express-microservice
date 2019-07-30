import 'mocha';
import { expect } from 'chai';
import { SinonSandbox } from 'sinon';
import * as sinon from 'sinon';
import { PathHandler } from '../../src/Utils/PathHandler';
import { Controller, ExpressServer } from '../../src/Server';
import { Get } from '../../src/Decorators';
import { Method, ServerEvents } from '../../src/Enums';
import { Passport } from '../../src/Security';
import { CustomAuthentication, RouteInterface } from '../../src/Interfaces';
import { Request } from 'express';

const chaiHttp = require('chai-http');
const chai = require('chai');
chai.should();
const proxy = require('express-http-proxy');

describe('PathHandler', function() {
    let sandbox: SinonSandbox;

    before(function() {
        sandbox = sinon.createSandbox();
    });

    after(function() {
        sandbox.restore();
    });

    describe('RegisterProxy', function() {
        let serverObject: CustomServer;

        before(done => {
            let isDone = false;
            chai.use(chaiHttp);
            serverObject = new CustomServer({ PORT: 8081, APP_BUILD: 1, APP_VERSION: '1', SERVICE_NAME: 'Test' });
            ExpressServer.events.on(ServerEvents.SERVER_READY, () => {
                if (!isDone) {
                    done();
                    isDone = true;
                }
            });
        });

        after(async () => {
            await ExpressServer.shutDown();
        });

        it('Forwards requests', function() {
            chai.request(ExpressServer.server)
                .get('/proxy/test')
                .end((error, res) => {
                    expect(res.body).to.not.haveOwnProperty('error');
                    expect(res.body.success).to.be.ok;
                    expect(res.body.data).to.be.ok;
                });
        });
    });

    describe('RegisterArray', function() {
        let serverObject: CustomServer;

        before(done => {
            let isDone = false;
            chai.use(chaiHttp);
            serverObject = new CustomServer({ PORT: 8081, APP_BUILD: 1, APP_VERSION: '1', SERVICE_NAME: 'Test' });
            ExpressServer.events.on(ServerEvents.SERVER_READY, () => {
                if (!isDone) {
                    done();
                    isDone = true;
                }
            });
        });

        after(async () => {
            await ExpressServer.shutDown();
        });

        it('Registers routes in an array', function() {
            chai.request(ExpressServer.server)
                .get('/test/array/route')
                .end((error, res) => {
                    expect(res.body).to.not.haveOwnProperty('error');
                    expect(res.body.success).to.be.ok;
                    expect(res.body.data).to.be.ok;
                });
        });

        it('Handles invalid controllers', function() {
            chai.request(ExpressServer.server)
                .options('/test/array/route')
                .end((error, res) => {
                    expect(res.body).to.haveOwnProperty('error');
                    expect(res.body.success).to.not.be.ok;
                    expect(res.body.data).to.not.be.ok;
                });
        });
    });

    describe('Custom Path Handler', function() {
        it('Sets a custom handler', function() {
            PathHandler.pathHandler = new CustomHandler();
            expect((<CustomHandler>PathHandler.pathHandler).hello()).eq('World');
        });
    });

    describe('Register', function() {
        let serverObject: CustomServer;

        before(done => {
            let isDone = false;
            chai.use(chaiHttp);
            serverObject = new CustomServer({ PORT: 8081, APP_BUILD: 1, APP_VERSION: '1', SERVICE_NAME: 'Test' });
            ExpressServer.events.on(ServerEvents.SERVER_READY, () => {
                if (!isDone) {
                    done();
                    isDone = true;
                }
            });
        });

        after(async () => {
            await ExpressServer.shutDown();
        });

        it('Registers protected routes', function() {
            chai.request(ExpressServer.server)
                .get('/protected')
                .end((error, res) => {
                    expect(res.body).to.not.haveOwnProperty('error');
                    expect(res.body.success).to.be.ok;
                    expect(res.body.data).to.be.ok;
                });
        });

        it('Fails invalid requests for protected routes', function() {
            sandbox.stub(CustomPassport.prototype, 'customAuth').rejects('Nein!');
            chai.request(ExpressServer.server)
                .get('/protected')
                .end((error, res) => {
                    expect(res.body).to.haveOwnProperty('error');
                    expect(res.body.success).to.not.be.ok;
                    expect(res.body.data).to.not.be.ok;
                });
        });
    });
});

class CustomServer extends ExpressServer {
    protected init(): void {
        super.init();
        Passport.passport = new CustomPassport();
    }

    protected paths(): void {
        const routes: RouteInterface[] = [
            {
                path: '/test/array/route',
                protected: false,
                method: Method.GET,
                handler: 'CustomController@arrayOne',
            },
            {
                path: '/test/array/route',
                protected: false,
                method: Method.OPTIONS,
                handler: 'InvalidController@arrayTwo',
            },
        ];
        PathHandler.pathHandler.registerRouteArray(routes);

        PathHandler.pathHandler.addController([CustomController]);
        PathHandler.pathHandler.registerProxy(
            '/proxy/test',
            proxy('http://localhost:8081'),
            '/proxy',
            true,
            () => {
                return true;
            },
            false,
        );
        super.paths();
    }
}

class CustomHandler extends PathHandler {
    public hello(): string {
        return 'World';
    }
}

class CustomController extends Controller {
    @Get('/test')
    public async proxyTest() {
        return 'Hello Proxy';
    }

    @Get({
        path: '/protected',
        protected: true,
    })
    public async protectedMethod() {
        return 'Hello Secret';
    }

    public async arrayOne() {
        return 'One';
    }

    public async arrayTwo() {
        return 'Two';
    }
}

class CustomPassport extends Passport implements CustomAuthentication {
    customAuth(request: Request): Promise<any> {
        return Promise.resolve(true);
    }
}

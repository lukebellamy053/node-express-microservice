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
import { HealthController, ServiceController } from '../../src/Controllers';

const chaiHttp = require('chai-http');
const chai = require('chai');
chai.should();
const expect = chai.expect;

describe('Health Controller', function() {
    let serverObject: Server;

    before(done => {
        let isDone = false;
        chai.use(chaiHttp);
        serverObject = new Server({ PORT: 8081, APP_BUILD: 1, APP_VERSION: '1', SERVICE_NAME: 'Test' });
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

    describe('Health Check', function() {
        it('Accepts requests', function() {
            HealthController.addHealthMethod(async () => {
                return {
                    test: true,
                };
            });

            chai.request(ExpressServer.server)
                .get('/health_check')
                .end((error, res) => {
                    expect(res.body).to.not.haveOwnProperty('error');
                    expect(res.body.success).to.be.ok;
                    expect(res.body.data).to.be.ok;
                    const response = res.body.data;
                    expect(response.test).to.be.ok;
                });
        });
    });
});

class Server extends ExpressServer {}

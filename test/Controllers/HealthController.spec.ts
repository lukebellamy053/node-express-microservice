import 'mocha';
import { ExpressServer } from '../../src/Server';
import { ServerEvents } from '../../src/Enums';
import { HealthController} from '../../src/Controllers';

const chaiHttp = require('chai-http');
const chai = require('chai');
chai.should();
const expect = chai.expect;

describe('Health Controller', function() {
    let serverObject: Server;
    let http;

    before(() => {
        return new Promise(resolve => {
            chai.use(chaiHttp);
            serverObject = new Server({ PORT: 8081, APP_BUILD: 1, APP_VERSION: '1', SERVICE_NAME: 'Test' });
            ExpressServer.events.on(ServerEvents.ServerReady, () => {
                http = chai.request.agent(ExpressServer.server);
                resolve();
            });
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

            http.get('/health_check').end((error, res) => {
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

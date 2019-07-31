import 'mocha';
import { ExpressServer } from '../../src/Server';
import { ServerEvents } from '../../src/Enums';
import { PathHandler } from '../../src/Utils';

const chaiHttp = require('chai-http');
const chai = require('chai');
chai.should();
const expect = chai.expect;

describe('Service Controller', function() {
    let serverObject: Server;

    before(() => {
        return new Promise(resolve => {
            chai.use(chaiHttp);
            serverObject = new Server({ PORT: 8081, APP_BUILD: 1, APP_VERSION: '1', SERVICE_NAME: 'Test' });
            ExpressServer.events.on(ServerEvents.ServerReady, () => {
                resolve();
            });
        });
    });

    after(async () => {
        await ExpressServer.shutDown();
    });

    describe('Service Info', function() {
        it('Accepts requests', function() {
            chai.request(ExpressServer.server)
                .get('/_service_info_')
                .end((error, res) => {
                    expect(res.body).to.not.haveOwnProperty('error');
                    const response = res.body;
                    expect(response.success).to.be.ok;
                    expect(response.version).to.eq('1');
                    expect(response.build).to.eq(1);
                    expect(response.service).to.eq('Test');
                });
        });
    });

    describe('Path Not Found', function() {
        it('Handles 404 Requests', function() {
            chai.request(ExpressServer.server)
                .get('/this/does/not/exist')
                .end((error, res) => {
                    expect(res.body).to.haveOwnProperty('error');
                    expect(res.status).to.eq(404);
                    const response = res.body;
                    expect(response.success).to.not.be.ok;
                });
        });
    });
});

class Server extends ExpressServer {}

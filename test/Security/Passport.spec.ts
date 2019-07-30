import 'mocha';
import { expect } from 'chai';
import { SinonSandbox } from 'sinon';
import * as sinon from 'sinon';
import { Passport } from '../../src/Security';
import { ErrorResponses } from '../../src/Enums';

const jwt = require('jsonwebtoken');

describe('Passport', function() {
    let sandbox: SinonSandbox;

    before(function() {
        sandbox = sinon.createSandbox();
    });

    afterEach(function() {
        sandbox.restore();
    });

    describe('verifyJWTToken', function() {
        it('accepts valid tokens', async function() {
            sandbox.stub(jwt, 'verify').yields(undefined, { testToken: true });
            const result = await Passport.passport.verifyJWTToken('TestToken');
            expect(result).to.haveOwnProperty('testToken');
        });

        it('rejects invalid tokens', async function() {
            sandbox.stub(jwt, 'verify').yields('Invalid token provided', undefined);
            Passport.passport
                .verifyJWTToken('TestToken')
                .then(() => {
                    throw 'Didn\'t fail token';
                })
                .catch(e => {
                    expect(e).to.eq('Invalid token provided');
                });
        });
    });

    describe('getToken', function() {
        it('Gets Authorization tokens', function() {
            expect(Passport.passport.getToken({ headers: { authorization: 'Bearer 12345' } })).to.eq('12345');
        });

        it('Gets URI tokens', function() {
            expect(Passport.passport.getToken({ query: { token: '12345' } })).to.eq('12345');
        });

        it('Gets Cookie tokens', function() {
            expect(Passport.passport.getToken({ cookies: { token: '12345' } })).to.eq('12345');
        });
    });

    describe('verifyRequest', function() {
        it('Sets the token', async function() {
            sandbox.stub(jwt, 'verify').yields(undefined, { testToken: true });
            const request: any = {
                headers: {
                    authorization: 'Bearer 1234',
                },
            };
            await Passport.passport.verifyRequest(request);
            expect(request.token).to.be.ok;
            expect(request.token.testToken).to.be.ok;
        });

        it('Rejects invalid requests', function(done) {
            const request: any = {};
            Passport.passport
                .verifyRequest(request)
                .then(() => {
                    throw 'Didnt reject null token';
                })
                .catch(e => {
                    expect(e).to.eq(ErrorResponses.Invalid_Token);
                    done();
                });
        });

        it('Can be extended', function(done) {
            Passport.passport = new CustomPassport();
            Passport.passport.verifyRequest({}).catch(e => {
                expect(e).eq(ErrorResponses.Timeout);
                done();
            });
        });
    });
});

class CustomPassport extends Passport {
    async verifyRequest(req: any): Promise<void> {
        throw ErrorResponses.Timeout;
    }
}

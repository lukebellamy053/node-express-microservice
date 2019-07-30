import 'mocha';
import { expect } from 'chai';
import { SinonSandbox } from 'sinon';
import * as sinon from 'sinon';
import { Passport } from '../../src/Utils';
const jwt = require('jsonwebtoken');

describe('AuthHandler', function() {
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
        it('Gets Authorization tokens', function() {});
    });
});

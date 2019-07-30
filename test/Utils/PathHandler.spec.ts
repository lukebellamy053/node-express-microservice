import 'mocha';
import { expect } from 'chai';
import { SinonSandbox } from 'sinon';
import * as sinon from 'sinon';
import { Passport } from '../../src/Security';

describe('PathHandler', function() {
    let sandbox: SinonSandbox;

    before(function() {
        sandbox = sinon.createSandbox();
    });

    afterEach(function() {
        sandbox.restore();
    });
});

import 'mocha';

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

describe('ExpressServer', function() {
    describe('Shutdown', function() {
        it('Shuts down mongoose', function() {});
    });
});

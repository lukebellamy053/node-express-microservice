/**
 * A file to check the config.ts file works as expected
 */

import 'mocha';
import { expect } from 'chai';
import { env, EnvironmentConfig } from '../src';

describe('EnvironmentConfig', () => {
    let testData: EnvironmentConfig;

    before(() => {
        testData = new EnvironmentConfig({
            TEST_DATA: 123,
        });
    });

    it('Can be created', () => {
        expect(EnvironmentConfig.environment).to.not.equal(null);
        expect(EnvironmentConfig.environment.TEST_DATA).to.equal(123);
        expect(env('TEST_DATA', null)).to.equal(123);
        expect(env('FAKE_DATA', null)).to.equal(null);
    });

    it('Can add variables', function() {
        expect(env('ADDED_VALUE', false)).to.not.be.ok;
        EnvironmentConfig.addValues({ ADDED_VALUE: true });
        expect(env('ADDED_VALUE')).to.be.ok;
    });

    it('Accepts no parameters', function() {
        const config = new EnvironmentConfig();
        expect(config).to.be.ok;
    });

    it('Returns environment variables', function() {
        const time = Date.now().toString();
        process.env.CONFIG_UNIT_TEST_VARIABLE = time;
        new EnvironmentConfig();
        expect(env('CONFIG_UNIT_TEST_VARIABLE')).to.eq(time);
    });
});

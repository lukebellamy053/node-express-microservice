/**
 * A file to check the config.ts file works as expected
 */
import 'mocha';
import { EnvironmentConfig, env } from '..';
import { expect } from 'chai';

describe('Config Test', () => {
    it('Should start', () => {
        expect(EnvironmentConfig.env_to_use).to.not.equal(null);
        const test = new EnvironmentConfig({
            TEST_DATA: 123
        });
        expect(EnvironmentConfig.env_to_use.TEST_DATA).to.equal(123);
        expect(env('TEST_DATA',null)).to.equal(123);
        expect(env('FAKE_DATA', null)).to.equal(null);
    });
});
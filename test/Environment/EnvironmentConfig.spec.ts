import 'mocha';
import { expect } from 'chai';
import { env, EnvironmentConfig } from '../../src/Environment/EnvironmentConfig';

describe('Environment Config', function() {


    let originalEnv;


    before(function() {
        // Create a deep copy of the environment
        originalEnv = JSON.parse(JSON.stringify(process.env));
    });

    afterEach(function() {
        // Reset the environment
        process.env = originalEnv;
    });


    describe('Basic Functionality', function() {

        afterEach(function () {
            // Reset the environment
            process.env = originalEnv;
        });


        it('Loads process env variables', function() {
            process.env.TEST_VALUE = '1234';
            expect(env('TEST_VALUE')).to.eq('1234');
        });

        it('Adds variables to the environment', function() {
            EnvironmentConfig.addValues({test_value_two: '1234'});
            expect(env('test_value_two')).to.be.ok;
            expect(env('test_value_two')).to.eq('1234');
        });

        it('Sets the environment', function() {
            const testEnv = {
                a: 'a',
                b: 'b'
            };
            EnvironmentConfig.environment = testEnv;
            expect(process.env).to.eq(testEnv);
            expect(EnvironmentConfig.environment).to.eq(testEnv);
        });

        it('Returns the correct environment', function() {
            expect(EnvironmentConfig.environment.TEST_VALUE).to.not.be.ok;
            process.env.TEST_VALUE = 'abcd';
            expect(EnvironmentConfig.environment.TEST_VALUE).to.eq('abcd');
        });

        it('Returns default values', function() {
            expect(env(`TEST_VALUE_${Date.now()}`, 'dcba')).to.eq('dcba');
        });

    });

});
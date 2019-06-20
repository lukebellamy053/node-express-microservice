/**
 * A file to test the DB handler works as expected
 * Checks that the database is connected to
 */
import { expect } from 'chai';
import {DBHandler} from './DBHandler';
var mongoose = require('mongoose');

describe('DB Handler', () => {
    it('Should connect', () => {
        return new Promise((resolve) => {
            const handler = new DBHandler();
            handler.onConnected
                .on('connected', (connected: boolean) => {
                    expect(connected).to.equal(true);
                    resolve();
                });
        })

    });
});
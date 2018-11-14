/**
 * A file to test the DB handler works as expected
 * Checks that the database is connected to
 */
import { DBHandler } from '..';
import { expect } from 'chai';
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
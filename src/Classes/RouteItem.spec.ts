/**
 * A file to check the route item class functions as expected
 */
import {Method, RouteItem} from '..';
import 'mocha'
import {expect} from 'chai';

describe('Route Item', () => {
    const path = '/test_item';
    const handler = 'Test@123';

    let item: RouteItem;
    let item2: RouteItem;
    it('Can be created', () => {
        item = new RouteItem(path, handler, Method.ALL, true);
        item2 = new RouteItem(path, handler, Method.GET, false);
        expect(item).to.not.equal(null);
        expect(item2).to.not.equal(null);
    });
    it('Returns the correct data', () => {
        expect(item.protected).to.equal(true, 'Is Protected');
        expect(item2.protected).to.equal(false, 'Is Protected');
        expect(item.path).to.equal(path, 'Path Matches');
        expect(item2.path).to.equal(path, 'Path Matches');
        expect(item.handler).to.equal(handler, 'Handler Matches');
        expect(item2.handler).to.equal(handler, 'Handler Matches');
        expect(item.method).to.equal(Method.ALL, 'Method Matches');
        expect(item2.method).to.equal(Method.GET, 'Method Matches');
    });
})

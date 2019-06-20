import {env} from '../EnvironmentConfig';
import {Controller, route, timeout} from '../Server';
import {Method} from '../Enums';

/**
 * A class to handle basic service operations
 */
export class ServiceController extends Controller {

    @route({
        path: '/_service_info_',
        method: Method.ALL,
        protected: false,
        priority: -1
    })
    public async serviceInfo() {
        this.success({
            success: true,
            version: env('APP_VERSION', 'Unknown'),
            build: env('APP_BUILD', 'Unknown'),
            service: env('SERVICE_NAME', 'Unknown'),
        });
    }

    @route({
        path: '*',
        method: Method.ALL,
        protected: false,
        priority: -5
    })
    public async pathNotFound() {
        this.responseCode = 404;
        this.fail({
            success: false,
            error: 'Path doesn\'t exist',
            version: env('APP_VERSION', 'Unknown'),
            build: env('APP_BUILD', 'Unknown'),
            service: env('SERVICE_NAME', 'Unknown'),
        });
    }

    fail(reason: any, code: number = this.responseCode || 500): void {
        if (typeof reason === 'string') {
            super.fail(reason);
        } else {
            if (this.res != null) {
                this.res.status(code);
                this.res.json(reason);
                this.res.end();
            }
        }
    }

    protected success(data?: any, code: number = this.responseCode || 200): void {
        if (typeof data === 'string') {
            super.fail(data);
        } else {
            if (this.res != null) {
                this.res.status(code);
                this.res.json(data);
                this.res.end();
            }
        }
    }


}
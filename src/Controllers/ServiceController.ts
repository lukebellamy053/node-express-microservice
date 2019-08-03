import { All, Route, route } from '../Decorators/Route';
import { env } from '../Environment/EnvironmentConfig';
import { Controller } from '../Server';
import { ErrorResponses } from '../Enums';

/**
 * A class to handle basic service operations
 */
export class ServiceController extends Controller {
    /**
     * Display the service information to the user
     */
    @All({
        path: '/_service_info_',
        protected: false,
        priority: -1,
    })
    public async serviceInfo(): Promise<void> {
        this.success();
    }

    /**
     * Inform the user of an unknown path
     */
    @All({
        path: '*',
        protected: false,
        priority: -5,
    })
    public async pathNotFound(): Promise<void> {
        this.responseCode = 404;
        this.fail(ErrorResponses.PathNotFound);
    }
}

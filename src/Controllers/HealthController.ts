import { All } from '../Decorators';
import { env } from '../EnvironmentConfig';
import { Controller } from '../Server';

/**
 * A class to handle the health checks for the service
 */
export class HealthController extends Controller {
    protected static mHealthCheckMethods: (() => Promise<any>)[] = [];

    /**
     * A method to add a new health check method
     * @param method
     */
    public static addHealthMethod(method: () => Promise<any>) {
        HealthController.mHealthCheckMethods.push(method);
    }

    /**
     * Perform a health check
     */
    @All({
        path: '/health_check',
        protected: false,
        priority: -2,
    })
    public async serviceHealthCheck() {
        let response = {
            message: 'Service Health Check',
            service: env('SERVICE_NAME', 'Unknown'),
        };

        for (let i = 0; i < HealthController.mHealthCheckMethods.length; i++) {
            const method: any = HealthController.mHealthCheckMethods[i];
            try {
                const resp = await method.apply();
                response = Object.assign({}, response, resp);
            } catch (e) {
                response = Object.assign({}, response, e);
            }
        }

        return response;
    }
}

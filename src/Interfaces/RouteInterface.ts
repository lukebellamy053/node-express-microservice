/**
 * An interface to generate a new route
 */
export interface RouteInterface {
    path: string,
    handler?: any,
    method?: number,
    protected?: boolean,
    admin?: boolean,
    verify?: boolean
}
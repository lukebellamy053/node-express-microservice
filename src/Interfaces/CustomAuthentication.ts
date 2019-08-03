import { Request } from 'express';

export interface CustomAuthentication {
    customAuth(request: Request): Promise<any>;
}

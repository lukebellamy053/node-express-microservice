export interface PreConstruct {
    preConstruct(): Promise<void> | void;
}

export interface PreRequest {
    preRequest(): Promise<void> | void;
}

export interface loadActiveUser {
    loadActiveUser(): Promise<any> | any;
}

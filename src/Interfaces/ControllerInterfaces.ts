export interface PreConstruct {
    preConstruct(): Promise<void>;
}

export interface PreRequest {
    preRequest(): Promise<void>;
}

export interface loadActiveUser {
    loadActiveUser(): Promise<void>;
}

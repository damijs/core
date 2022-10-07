declare namespace Express {
    interface Request {
        user?: any;
        authToken?: any;
        authJson?: any;
        files?: any;
    }
}

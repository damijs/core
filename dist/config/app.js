import GuestUser from '../auth/GuestUser';
const appConfig = {
    appName: "Dami App",
    production: false,
    port: 3000,
    loginUser: {
        authUser: GuestUser,
    },
    publicDir: { path: 'public' },
    baseUrl: '',
    basePath: 'storage',
    path: {},
    initAction: () => {
    },
    requiredLogin: () => {
        return false;
    },
    beforeAction: () => {
        return [];
    },
    afterAction: () => {
        return [];
    },
    rbac: (userModel, path) => {
        return true;
    },
    dbConfig: {},
    enableRbac: false,
    controllers: null,
    services: [],
};
export default appConfig;

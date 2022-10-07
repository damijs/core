import DamiCache from '@damijs/cache';
import MiddleWare from './MiddleWare';
import { IDatabase, IPubdirConfig, IUserAuth, IUserAuthList, _IUserConfig, IDamiConfig } from "../config/IConfig";
import { Mysql } from '@damijs/mysql';
import IAuth from '../auth/IAuth';
declare class Dami {
    static config: IDamiConfig;
    static port: number;
    static publicDir: IPubdirConfig;
    static dbConfig: IDatabase;
    static db: Mysql;
    static baseUrl: string;
    static loginUser: IUserAuth | IUserAuthList;
    static enableRbac: boolean;
    private static store;
    private static _dirname;
    static authTokens: DamiCache;
    [x: string]: any;
    static init(configSetting: IDamiConfig): void;
    static requiredLogin: () => boolean | [];
    static beforeAction: () => (MiddleWare)[];
    static afterAction: () => (MiddleWare)[];
    static rbac: (userModel: any, route: any) => boolean;
    static set(key: string, value: any, config?: {
        ttl?: number;
        expireOn?: number;
    }): void;
    static has(key: string): boolean;
    static get(key: string): any;
    static getCurrentPath(): string;
    static getPath(path?: string, name?: string): string;
    static setAuth(token: string, authModel: IAuth): void;
    static hasAuth(value: string, authUser: IAuth): boolean;
    static deleteAuth(value: string, config: _IUserConfig): void;
    static parseJwt(token: string): any;
}
export default Dami;

import { _IUserConfig } from '../config/IConfig';
import IAuth from './IAuth';
declare class GuestUser implements IAuth {
    username: string;
    rules: () => {
        username: string[];
    };
    signToken: () => string;
    getRefreshToken: () => string;
    validatePassword: (password: string) => boolean;
    hashPassword: (passowrd: string) => string;
    validateToken: (token: string) => boolean;
    getAuthKey: () => string;
    findUser: (username: string) => any;
    findById: (id: number) => any;
    findByAuthKey: (token: string) => any;
    getConfig: () => _IUserConfig;
}
export default GuestUser;

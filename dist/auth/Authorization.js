var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Dami from '../app/Dami';
import MiddleWare from '../app/MiddleWare';
import HttpCode from '../helpers/HttpCode';
import HttpHead from '../helpers/HttpHead';
class Authorization extends MiddleWare {
    constructor(controller) {
        super();
        this.run = (req, res, next) => {
            return this.auth(req, res, next);
        };
        this.auth = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const guardActions = this.controller.requiredLogin();
            let userModel = null;
            if ("authUser" in Dami.loginUser) {
                userModel = new Dami.loginUser.authUser();
            }
            else {
                const cpath = this.controller.getPath();
                let kpath = null;
                Object.keys(Dami.loginUser).forEach(e => {
                    if (cpath.startsWith(e)) {
                        kpath = e;
                    }
                });
                if (kpath != null) {
                    userModel = new Dami.loginUser[kpath].authUser();
                }
            }
            // console.log(guardActions,userModel, 'ga')
            /**
             * check if we need to protect the action form access.
             * if not let user visit action
             */
            if (typeof guardActions === 'boolean') {
                if (!guardActions) {
                    return next();
                }
                else if (userModel == null) {
                    return res.status(HttpCode.UNAUTHORIZED).send('Login required :1001').end();
                }
            }
            else {
                const action = this.controller.getActionName(req);
                // check if action exists
                if (action === null) {
                    return next();
                }
                if (guardActions.indexOf(action) < 0) {
                    return next();
                }
            }
            /**
             * check if current action required login
             */
            const bearerHeader = req.headers[HttpHead.AUTHORIZATION];
            if (typeof bearerHeader === 'undefined') {
                // when token is not set on header
                return res.status(HttpCode.UNAUTHORIZED).send('Login required :1002').end();
            }
            // get token by spliting bearer and token
            const bearerToken = bearerHeader.split(' ')[1];
            if (userModel == null) {
                return res.status(HttpCode.UNAUTHORIZED).send('Login required :1001').end();
            }
            // decode the token to verify user
            if (!userModel.validateToken(bearerToken)) {
                return res.status(HttpCode.UNAUTHORIZED).send('Login required :1003').end();
            }
            const jwtJson = Dami.parseJwt(bearerHeader);
            // find user by token
            /* tslint:disable:no-string-literal */
            const model = yield userModel.findByAuthKey(jwtJson['authkey']);
            if (model === null) {
                // if user not found
                return res.status(HttpCode.UNAUTHORIZED).send('Login required :1004').end();
            }
            // set auth-token
            // res.headers["auth-token"] = bearerToken;
            req.user = model;
            req.authToken = bearerHeader;
            req.authJson = jwtJson;
            if (this.controller.runRbac(userModel, req.originalUrl)) {
                return next();
            }
            return res.status(HttpCode.FORBIDDEN).send('Forbidden').end();
        });
        this.controller = controller;
    }
}
export default Authorization;

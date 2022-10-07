import { IRoute } from './Route';
import MiddleWare from '../app/MiddleWare';
import '../customs/custom';
import { ActiveRecords } from '@damijs/mysql';
import IController from './IController';
import IAuth from '../auth/IAuth';
declare abstract class BaseController<Model> implements IController {
    private model;
    protected path: string;
    constructor(model?: any);
    /**
      * set path to current controller
      *  */
    setPath(path: string): void;
    /**
     * get path to current controller
     *  */
    getPath(): string;
    /**
          @Route function
          this function holds the defination for routes for actions in controllers
          ----------------------------
          It is array of object that has 3 values as method, path, action
          method : it type of Methods which id one of get,post,put,delete
          path : url path to the action
          action : name of method to execute
      */
    route: () => IRoute[];
    getModel(): Model;
    getModelExtend<M extends ActiveRecords>(): M;
    hasModel(): boolean;
    rbac: (userModel: IAuth, route: string) => boolean;
    runRbac(userModel: IAuth, route: string): boolean;
    /**
     * list action that required login
     * */
    requiredLogin: () => boolean | string[];
    /**
     * method that get current action name
     * */
    getActionName(req: any): string;
    /**
     *  list of middleware that run before any action
     * */
    beforeAction: () => MiddleWare[];
    /**
     *  list of middleware that run after action
     * */
    afterAction: () => MiddleWare[];
}
export default BaseController;

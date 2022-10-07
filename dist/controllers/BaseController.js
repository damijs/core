import Dami from '../app/Dami';
import '../customs/custom';
import { PathMatch } from '../helpers/PathMatch';
class BaseController {
    constructor(model) {
        /**
              @Route function
              this function holds the defination for routes for actions in controllers
              ----------------------------
              It is array of object that has 3 values as method, path, action
              method : it type of Methods which id one of get,post,put,delete
              path : url path to the action
              action : name of method to execute
          */
        this.route = () => {
            return [];
        };
        this.rbac = (userModel, route) => {
            return Dami.rbac(userModel, route);
        };
        /**
         * list action that required login
         * */
        this.requiredLogin = () => {
            return Dami.requiredLogin();
        };
        /**
         *  list of middleware that run before any action
         * */
        this.beforeAction = () => {
            return Dami.beforeAction();
        };
        /**
         *  list of middleware that run after action
         * */
        this.afterAction = () => {
            return Dami.afterAction();
        };
        this.model = model;
    }
    /**
      * set path to current controller
      *  */
    setPath(path) {
        this.path = path;
    }
    /**
     * get path to current controller
     *  */
    getPath() {
        return this.path;
    }
    getModel() {
        if (this.model === undefined) {
            throw new Error('Active Model not set');
        }
        return new this.model();
    }
    getModelExtend() {
        if (this.model === undefined) {
            throw new Error('Active Model not set');
        }
        return new this.model();
    }
    hasModel() {
        if (this.model === undefined) {
            return false;
        }
        return true;
    }
    runRbac(userModel, route) {
        return this.rbac(userModel, route);
    }
    /**
     * method that get current action name
     * */
    getActionName(req) {
        const urloriginal = req.originalUrl.replace(req._parsedUrl.search, '');
        for (const rout of this.route()) {
            if (rout.method === req.method.toLowerCase() && PathMatch(this.path + rout.path, urloriginal)) {
                return rout.action;
            }
        }
        return null;
    }
}
export default BaseController;

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { RoleAction, Role } from '../models';
import Controller from '../../controllers/Controller';
import Methods from '../../controllers/Methods';
import HttpCode from '../../helpers/HttpCode';
import ReadRbac from '../Helper/ReadRbac';
class RbacController extends Controller {
    constructor() {
        super();
        this.init = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { type } = req.body;
            let result = false;
            if (type === 'check') {
                result = yield ReadRbac.checkInit();
            }
            else {
                result = yield ReadRbac.redo();
            }
            if (result) {
                res.send('Success');
            }
            else {
                res.sendStatus(HttpCode.CONFLICT);
            }
            return next();
        });
        this.listRole = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const model = new Role();
            try {
                const result = yield model.asModel().findAll();
                res.send(yield result.toJson());
            }
            catch (err) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).send({});
            }
            next();
        });
        this.viewRole = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const model = new Role();
            try {
                yield model.findOne(req.params.id); // if empty it will return null else it will return a model with data
                if (model.isEmpty) {
                    res.status(HttpCode.NOT_FOUND).end();
                }
                else {
                    res.send(model.toJson());
                }
            }
            catch (err) {
                // console.log(err);
                res.sendStatus(HttpCode.INTERNAL_SERVER_ERROR);
            }
            next();
        });
        this.addRole = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const model = new Role();
            try {
                if (model.load(req.body)) {
                    if (yield model.save()) {
                        res.status(HttpCode.ACCEPTED).send(model.toJson()); // return 204 on success
                    }
                    else {
                        res.status(HttpCode.UNPROCESSABLE_ENTITY).send({}); // return unprocessable status
                    }
                }
                else {
                    res.status(HttpCode.BAD_REQUEST).send({});
                }
            }
            catch (err) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).send({});
            }
            next();
        });
        this.updateRole = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const model = new Role();
            try {
                if (model.load(req.body)) {
                    if (yield model.update(req.params.id)) {
                        res.status(HttpCode.ACCEPTED).send({}); // return 204 on success
                    }
                    else {
                        res.status(HttpCode.UNPROCESSABLE_ENTITY).send({}); // return unprocessable status
                    }
                }
                else {
                    res.status(HttpCode.BAD_REQUEST).send({});
                }
            }
            catch (err) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).send({});
            }
            next();
        });
        this.listAction = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const model = new RoleAction();
            try {
                const result = yield model.getActionsByRole(req.params.id);
                res.send(result);
            }
            catch (err) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).send({});
            }
            next();
        });
        this.updateAction = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const model = new RoleAction();
            try {
                yield model.findOne(req.params.id); // if empty it will return null else it will return a model with data
                if (model.isEmpty) {
                    res.status(HttpCode.NOT_FOUND).end();
                }
                else {
                    model.load({ status: model.getValue('status') === 1 ? 0 : 1 });
                    if (yield model.update(req.params.id)) {
                        res.status(HttpCode.ACCEPTED).send({}); // return HttpCode.ACCEPTED on success
                    }
                    else {
                        res.status(HttpCode.UNPROCESSABLE_ENTITY).send({}); // return unprocessable status
                    }
                }
            }
            catch (err) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).send({});
            }
            next();
        });
        this.route = () => {
            return [
                { method: Methods.GET, path: '/init', action: 'init' },
                { method: Methods.GET, path: '/role', action: 'listRole' },
                { method: Methods.GET, path: '/role/:id', action: 'viewRole' },
                { method: Methods.POST, path: '/role/:id', action: 'addRole' },
                { method: Methods.PUT, path: '/role/:id', action: 'updateRole' },
                { method: Methods.GET, path: '/action/:id', action: 'listAction' },
                { method: Methods.PUT, path: '/action/:id', action: 'updateAction' },
            ];
        };
    }
}
export default RbacController;

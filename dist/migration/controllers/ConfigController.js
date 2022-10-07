var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Dami from '../../app/Dami';
import Controller from '../../controllers/Controller';
import Methods from '../../controllers/Methods';
import HttpCode from '../../helpers/HttpCode';
import MigType from '../config/const';
import ReadSchema from '../Helper/ReadSchema';
import TestSpecialChar from '../Helper/SpecialCharacter';
class ConfigController extends Controller {
    constructor() {
        super('');
        this.tables = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const result = yield Dami.db
                .query('SHOW TABLES')
                .then((e) => {
                if (e.length > 0) {
                    const ef = e.map((e2) => {
                        const val = Object.values(e2)[0];
                        return {
                            id: val,
                            label: val,
                        };
                    });
                    return ef.filter((tn) => {
                        return !tn[MigType.LABEL].includes(MigType.NAME);
                    });
                }
                return [];
            });
            res.send(result);
            next();
        });
        this.previewModel = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { table_name, model_name, model_path } = req.body;
            if (table_name === undefined || model_name === undefined || model_path === undefined) {
                res.status(HttpCode.BAD_REQUEST).send();
                return next();
            }
            if (TestSpecialChar(table_name) ||
                TestSpecialChar(model_name) ||
                TestSpecialChar(model_path.replace(/\\/g, '__a__').replace('@', ''))) {
                res.status(HttpCode.BAD_REQUEST).send();
                return next();
            }
            const readSchema = new ReadSchema();
            const result = yield readSchema.preview(model_name, table_name, model_path);
            if (result === false) {
                res.status(HttpCode.BAD_REQUEST).send(readSchema.getError());
                return next();
            }
            res.send([result]);
            return next();
        });
        this.codeModel = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { code } = req.body;
            if (code === undefined) {
                res.status(HttpCode.BAD_REQUEST).send();
                return next();
            }
            const readSchema = new ReadSchema();
            const result = yield readSchema.create(code, false);
            res.send(result);
            return next();
        });
        this.createModel = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { code } = req.body;
            if (code === undefined) {
                res.status(HttpCode.BAD_REQUEST).send();
                return next();
            }
            const readSchema = new ReadSchema();
            const result = yield readSchema.create(code, true);
            res.send(result);
            return next();
        });
        this.route = () => {
            return [
                { method: Methods.GET, path: '/table', action: 'tables' },
                { method: Methods.POST, path: '/preview', action: 'previewModel' },
                { method: Methods.POST, path: '/code', action: 'codeModel' },
                { method: Methods.POST, path: '/create', action: 'createModel' },
            ];
        };
    }
}
export default ConfigController;

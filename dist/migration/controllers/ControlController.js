var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Controller from '../../controllers/Controller';
import Methods from '../../controllers/Methods';
import HttpCode from '../../helpers/HttpCode';
import ReadControl from '../Helper/ReadControl';
import TestSpecialChar from '../Helper/SpecialCharacter';
class CrudController extends Controller {
    constructor() {
        super('');
        this.previewCrud = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { c_name, c_path } = req.body;
            if (c_name === undefined || c_path === undefined) {
                res.status(HttpCode.BAD_REQUEST).send();
                return next();
            }
            console.log(c_name, c_path);
            if (TestSpecialChar(c_name) || TestSpecialChar(c_path.replace(/\\/g, '__a__').replace('@', ''))) {
                res.status(HttpCode.BAD_REQUEST).send();
                return next();
            }
            const readSchema = new ReadControl();
            const result = readSchema.preview(c_name, c_path);
            if (result === false) {
                res.status(HttpCode.BAD_REQUEST).send(readSchema.getError());
                return next();
            }
            res.send([result]);
            return next();
        });
        this.codeCrud = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { code } = req.body;
            if (code === undefined) {
                res.status(HttpCode.BAD_REQUEST).send();
                return next();
            }
            const readSchema = new ReadControl();
            const result = yield readSchema.create(code, false);
            res.send(result);
            return next();
        });
        this.createCrud = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { code } = req.body;
            if (code === undefined) {
                res.status(HttpCode.BAD_REQUEST).send();
                return next();
            }
            const readSchema = new ReadControl();
            const result = yield readSchema.create(code, true);
            res.send(result);
            return next();
        });
        this.route = () => {
            return [
                { method: Methods.POST, path: '/preview', action: 'previewCrud' },
                { method: Methods.POST, path: '/code', action: 'codeCrud' },
                { method: Methods.POST, path: '/create', action: 'createCrud' },
            ];
        };
    }
}
export default CrudController;

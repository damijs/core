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
import ReadFile from '../Helper/ReadFile';
class DamiController extends Controller {
    constructor() {
        super('');
        this.index = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.send(ReadFile.index());
            return next();
        });
        this.static = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { type, name } = req.params;
            const response = ReadFile.readPath(type, name);
            res.sendFile(response);
        });
        this.route = () => {
            return [
                { method: Methods.GET, path: '/', action: 'index' },
                { method: Methods.GET, path: '/static/:type/:name', action: 'static' },
            ];
        };
    }
}
export default DamiController;

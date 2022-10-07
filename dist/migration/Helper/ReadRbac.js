var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MODELS } from './constants';
import * as fs from 'fs';
import Dami from '../../app/Dami';
class ReadRbac {
    static checkInit() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Dami.db
                .query('SHOW TABLES')
                .then((e1) => {
                let flag = false;
                if (e1.length > 0) {
                    e1.forEach((e) => {
                        const val = Object.values(e)[0];
                        if (val.includes(MODELS.ACTION)) {
                            flag = true;
                        }
                    });
                }
                return flag;
            });
        });
    }
    static redo() {
        return __awaiter(this, void 0, void 0, function* () {
            const rbacQuery = fs.readFileSync(__dirname + '/../resource/db/rbac.mysql', 'utf8');
            return Dami.db
                .query(rbacQuery)
                .then(() => {
                return true;
            });
        });
    }
}
export default ReadRbac;

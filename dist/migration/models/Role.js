var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Query, ActiveRecords } from '@damijs/mysql';
import { MODELS } from '../Helper/constants';
import Actions from './Actions';
import RoleAction from './RoleAction';
class Role extends ActiveRecords {
    constructor() {
        super(MODELS.ROLE);
        this.rules = () => {
            return {
                id: ['number'],
                name: ['required', 'string', { max: 100 }],
                description: ['required', 'string'],
                status: ['number'],
            };
        };
        this.init();
    }
    afterSave(type) {
        return __awaiter(this, void 0, void 0, function* () {
            if (type === Query.INSERT) {
                const action = new Actions();
                action
                    .asObject()
                    .onResult((result) => {
                    const insert = [];
                    for (const res of result) {
                        /* tslint:disable:no-string-literal */
                        insert.push([this.getValue('id'), res['id']]);
                    }
                    const roleAction = new RoleAction();
                    roleAction.insertAll(['fk_role_id', 'fk_action_id'], insert);
                })
                    .findAll();
            }
            return true;
        });
    }
}
export default Role;

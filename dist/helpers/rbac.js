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
import Actions from '../migration/models/Actions';
import { camelToText } from './TextHelper';
import CTypes from '../config/ConfigTypes';
var CListType;
(function (CListType) {
    CListType["NAME"] = "name";
    CListType["ACTION"] = "action";
    CListType["METHOD"] = "method";
})(CListType || (CListType = {}));
export function initRbac() {
    return __awaiter(this, void 0, void 0, function* () {
        const controllerList = {};
        const controllers = Dami[CTypes.CONTROLLER];
        for (const control of Object.keys(controllers)) {
            const controller = controllers[control];
            controller.setPath(`/${control}`);
            const routList = controller.route();
            for (const actions of Object.keys(routList)) {
                const { path, method, action } = routList[actions];
                controllerList['/' + control + path.substring(0, path.indexOf('/:')) + '/' + method] = {
                    name: camelToText(action),
                    action: '/' + control + path.substring(0, path.indexOf('/:')),
                    method,
                };
            }
        }
        const actionModel = new Actions();
        const result = yield actionModel.asObject().findAll();
        const insert = [];
        const update = [];
        for (const { id, name, action, method } of result) {
            if (controllerList.hasOwnProperty(action + '/' + method)) {
                if (controllerList[action + '/' + method][CListType.NAME] !== name) {
                    update.push([
                        {
                            name: controllerList[action + '/' + method][CListType.NAME],
                            status: 1,
                        },
                        { id },
                    ]);
                }
                delete controllerList[action + '/' + method];
            }
            else {
                update.push([
                    {
                        name,
                        status: 0,
                    },
                    { id },
                ]);
            }
        }
        for (const cl of Object.keys(controllerList)) {
            insert.push([controllerList[cl][CListType.NAME], controllerList[cl][CListType.ACTION], controllerList[cl][CListType.METHOD]]);
        }
        if (insert.length > 0) {
            actionModel.insertAll([CListType.NAME, CListType.ACTION, CListType.METHOD], insert);
        }
        for (const [up, con] of update) {
            actionModel.updateAll(up, con);
        }
    });
}

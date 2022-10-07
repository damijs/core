var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as fs from 'fs';
import * as _path from 'path';
import { fileURLToPath } from 'url';
const __dirname = _path.dirname(fileURLToPath(import.meta.url));
class ReadControl {
    constructor() {
        this.errors = [];
    }
    getError() {
        return this.errors;
    }
    preview(cName, cPath) {
        let overWrite = 0;
        if (!cPath.includes('@app')) {
            this.errors.push('Invalid controller path format');
            return false;
        }
        const controllerPath = cPath.replace('@app\\', '').replace(/\\/g, '/') + cName + '.ts';
        if (fs.existsSync(controllerPath)) {
            overWrite = 1;
        }
        return {
            isNew: overWrite,
            path: cPath + cName + '.ts',
            date: new Date().getFullYear(),
            code: btoa(cName + '_&_' + cPath),
        };
    }
    create(code, isCreate) {
        return __awaiter(this, void 0, void 0, function* () {
            let commandString = '';
            try {
                const [cName, cPath] = atob(code).split('_&_');
                const filePath = cPath.replace('@app\\', '').replace(/\\/g, '/');
                let model = fs.readFileSync(__dirname + '/../resource/template/controller_control.txt', 'utf8');
                model = model.replace(new RegExp('{{@controllerName}}', 'g'), cName);
                if (!isCreate) {
                    return model;
                }
                const tmpFile = cPath + cName + '.ts';
                const fullPath = filePath + cName + '.ts';
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath, { recursive: true });
                    commandString += 'command `mkdir -p ' + cPath + '`\n';
                }
                if (!fs.existsSync(fullPath)) {
                    fs.writeFileSync(fullPath, model);
                    commandString += 'writing new file `' + tmpFile + '`\n';
                }
                else {
                    fs.writeFileSync(fullPath, model);
                    commandString += 'overwriting file `' + tmpFile + '`\n';
                }
                return commandString;
            }
            catch (e) {
                commandString += e.message;
            }
            return commandString;
        });
    }
}
export default ReadControl;

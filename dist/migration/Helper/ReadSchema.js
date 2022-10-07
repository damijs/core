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
import * as util from 'util';
import * as _path from 'path';
import { fileURLToPath } from 'url';
import Dami from '../../app/Dami';
const __dirname = _path.dirname(fileURLToPath(import.meta.url));
const NumericType = [
    'tinyint',
    'bool',
    'boolean',
    'smallint',
    'mediumint',
    'int',
    'integer',
    'bigint',
    'float',
    'double',
    'decimal',
    'dec',
];
const StringType = [
    'char',
    'varchar',
    'binary',
    'varbinary',
    'tinyblob',
    'text',
    'blob',
    'mediumtext',
    'mediumblob',
    'longtext',
    'longblob',
    'enum',
];
const DateType = ['date', 'datetime', 'timestamp', 'time', 'year'];
const StringSize = ['char', 'varchar', 'binary', 'varbinary', 'tinyblob'];
class ReadSchema {
    constructor() {
        this.tableName = '';
        this.errors = [];
    }
    getTableRules() {
        return __awaiter(this, void 0, void 0, function* () {
            const tableinfo = {};
            return Dami.db
                .query(`SHOW FULL COLUMNS FROM ${this.tableName}`)
                .then((e) => {
                e.forEach(({ Field, Type, Null, Default, Key }) => {
                    const rules = [];
                    let type = Type;
                    if (Type.indexOf('(') > -1) {
                        type = Type.substring(0, Type.indexOf('(')).toLowerCase();
                    }
                    if (Null === 'NO' && Default === null && Key !== 'PRI') {
                        rules.push('required');
                    }
                    if (Field === 'email') {
                        rules.push('email');
                    }
                    if (StringType.includes(type)) {
                        rules.push('string');
                        if (StringSize.includes(type)) {
                            rules.push({ max: parseInt(Type.match(/\d+/)[0], 10) });
                        }
                    }
                    if (NumericType.includes(type)) {
                        rules.push('number');
                    }
                    tableinfo[Field] = rules;
                });
                return tableinfo;
            })
                .catch((e) => {
                return false;
            });
        });
    }
    getError() {
        return this.errors;
    }
    preview(modelName, tableName, modelPath) {
        return __awaiter(this, void 0, void 0, function* () {
            let overWrite = 0;
            if (!modelPath.includes('@app')) {
                this.errors.push('Invalid model path format');
                return false;
            }
            const filePath = modelPath.replace('@app\\', '').replace(/\\/g, '/');
            const fullPath = filePath + modelName + '.ts';
            if (fs.existsSync(fullPath)) {
                overWrite = 1;
            }
            return {
                isNew: overWrite,
                path: modelPath + modelName + '.ts',
                date: new Date().getFullYear(),
                code: btoa(tableName + '_&_' + modelName + '_&_' + modelPath),
            };
        });
    }
    create(code, isCreate) {
        return __awaiter(this, void 0, void 0, function* () {
            let commandString = '';
            const [tableName, modelName, modelPath] = atob(code).split('_&_');
            this.tableName = tableName;
            const tmpFile = modelPath + modelName + '.ts';
            const filePath = modelPath.replace('@app\\', '').replace(/\\/g, '/');
            return new Promise((resolve, reject) => {
                resolve(this.getTableRules());
            })
                .then((rules) => {
                const rulesUpdate = util.inspect(rules);
                let model = fs.readFileSync(__dirname + '/../resource/template/model.txt', 'utf8');
                model = model
                    .replace(new RegExp('{{@modelName}}', 'g'), modelName)
                    .replace('{{@tableName}}', tableName)
                    .replace('{{@rules}}', rulesUpdate)
                    .replace('{{@hasOne}}', '')
                    .replace('{{@hasMany}}', '');
                if (!isCreate) {
                    return model;
                }
                const fullPath = filePath + modelName + '.ts';
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath, { recursive: true });
                    commandString += 'command `mkdir -p ' + modelPath + '`\n';
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
            })
                .catch((e) => {
                console.log(e);
                commandString += e.message;
            })
                .finally(() => {
                return commandString;
            });
        });
    }
}
export default ReadSchema;

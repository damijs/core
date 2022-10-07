import { ActiveRecords } from '@damijs/mysql';
declare class Actions extends ActiveRecords {
    constructor();
    rules: () => {
        id: string[];
        name: (string | {
            max: number;
        })[];
        action: (string | {
            max: number;
        })[];
        method: (string | {
            max: number;
        })[];
        parent_id: string[];
        can_update: string[];
        allow: string[];
        status: string[];
    };
}
export default Actions;

import { ActiveRecords } from '@damijs/mysql';
declare class Role extends ActiveRecords {
    constructor();
    rules: () => {
        id: string[];
        name: (string | {
            max: number;
        })[];
        description: string[];
        status: string[];
    };
    afterSave(type: string): Promise<boolean>;
}
export default Role;

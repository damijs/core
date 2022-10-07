import { ActiveRecords } from '@damijs/mysql';
declare class RoleAction extends ActiveRecords {
    constructor();
    rules: () => {
        id: string[];
        fk_role_id: string[];
        fk_action_id: string[];
        allow: string[];
    };
    getActionsByRole(id: string): Promise<object[]>;
}
export default RoleAction;

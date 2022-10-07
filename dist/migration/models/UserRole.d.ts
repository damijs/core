import { ActiveRecords } from '@damijs/mysql';
declare class UserRole extends ActiveRecords {
    constructor();
    rules: () => {
        id: string[];
        fk_user_id: string[];
        fk_role_id: string[];
    };
}
export default UserRole;

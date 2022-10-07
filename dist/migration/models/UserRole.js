import { MODELS } from '../Helper/constants';
import { ActiveRecords } from '@damijs/mysql';
class UserRole extends ActiveRecords {
    constructor() {
        super(MODELS.USER_ROLE);
        this.rules = () => {
            return {
                id: ['number'],
                fk_user_id: ['required', 'number'],
                fk_role_id: ['required', 'number'],
            };
        };
        this.init();
    }
}
export default UserRole;

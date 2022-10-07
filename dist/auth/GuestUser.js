class GuestUser {
    constructor() {
        this.rules = () => {
            return {
                "username": ["string"]
            };
        };
    }
}
export default GuestUser;

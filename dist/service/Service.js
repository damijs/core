export default class Service {
    constructor() {
        this.register = () => {
            return [];
        };
        this.registerService = this.register();
    }
    run() {
        this.registerService.forEach((element) => {
            const interval = setInterval(() => {
                element.callback(interval);
            }, element.tick);
        });
    }
}

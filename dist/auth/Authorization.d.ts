import MiddleWare from '../app/MiddleWare';
import IMiddleWare from '../app/IMiddleWare';
import IController from '../controllers/IController';
declare class Authorization extends MiddleWare implements IMiddleWare {
    controller: IController;
    constructor(controller: IController);
    run: (req: any, res: any, next: any) => Promise<any>;
    protected auth: (req: any, res: any, next: any) => Promise<any>;
}
export default Authorization;

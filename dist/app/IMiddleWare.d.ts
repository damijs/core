import IController from '../controllers/IController';
export default interface IMiddleWare {
    controller: IController;
    run: (req: any, res: any, next: any) => void;
}

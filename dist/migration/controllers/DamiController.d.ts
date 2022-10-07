import { NextFunction, Request, Response } from 'express';
import Controller from '../../controllers/Controller';
import Methods from '../../controllers/Methods';
declare class DamiController extends Controller<any> {
    constructor();
    index: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    static: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    route: () => {
        method: Methods;
        path: string;
        action: string;
    }[];
}
export default DamiController;

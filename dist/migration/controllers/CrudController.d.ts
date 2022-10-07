import { NextFunction, Request, Response } from 'express';
import Controller from '../../controllers/Controller';
import Methods from '../../controllers/Methods';
declare class CrudController extends Controller<any> {
    constructor();
    previewCrud: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    codeCrud: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    createCrud: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    route: () => {
        method: Methods;
        path: string;
        action: string;
    }[];
}
export default CrudController;

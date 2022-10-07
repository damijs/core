import { NextFunction, Request, Response } from 'express';
import Controller from '../../controllers/Controller';
import Methods from '../../controllers/Methods';
declare class ConfigController extends Controller<any> {
    constructor();
    tables: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    previewModel: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    codeModel: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    createModel: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    route: () => {
        method: Methods;
        path: string;
        action: string;
    }[];
}
export default ConfigController;

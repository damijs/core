import { NextFunction, Request, Response } from 'express';
import Controller from '../../controllers/Controller';
import Methods from '../../controllers/Methods';
declare class RbacController extends Controller<any> {
    constructor();
    init: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    listRole: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    viewRole: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    addRole: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateRole: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    listAction: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateAction: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    route: () => {
        method: Methods;
        path: string;
        action: string;
    }[];
}
export default RbacController;

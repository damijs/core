import { NextFunction, Request, Response } from 'express';
import { ActiveRecords } from '@damijs/mysql';
import BaseController from './BaseController';
import { IRoute } from './Route';
declare abstract class Controller<Model extends ActiveRecords> extends BaseController<Model> {
    constructor(model?: any);
    /**
     *  @Index action
     *  this action list the data
     */
    index: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    /**
            @Create action
            this action create the data
            ----------------------------
            this can also be use as follow
    
            ```
            this.getModelExtend().onResult((result)=>{
                if(result==null){
                   res.status(HttpCode.NOT_FOUND).send({});
                }
                result.onResult((result)=>{
                    if(result){
                        res.status(HttpCode.ACCEPTED).send({});
                    }else{
                        res.status(HttpCode.NOT_FOUND).send({});
                    }
                })
                .delete();
            }).findOne(req.params.id);
            ```
        */
    create: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    /**
      *  @View action
      *  this action view the data
      *  ----------------------------
      *  this can also be use as follow
      *
      *  ```
      *  this.getModelExtend().onResult((model) => {
      *      if (model === null) {
      *          return res.send("not found");
      *      }else{
      *          // return not found status
      *          res.status(HttpCode.NOT_FOUND).send({});
      *      }
      *  }).asModel().findOne(req.params.id);
      *  ```
    */
    view: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    update: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    delete: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    route: () => IRoute[];
}
export default Controller;

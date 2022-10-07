var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import HttpCode from '../helpers/HttpCode';
import { DataProvider } from '@damijs/mysql';
import BaseController from './BaseController';
import Methods from './Methods';
class Controller extends BaseController {
    // model:any;
    constructor(model) {
        super(model);
        /**
         *  @Index action
         *  this action list the data
         */
        this.index = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const model = this.getModelExtend();
            const dataProvider = new DataProvider({ request: req, response: res });
            try {
                dataProvider.setModel(model);
                const result = yield dataProvider.getList();
                res.send(result.toJson());
            }
            catch (err) {
                console.log(err);
                res.status(HttpCode.INTERNAL_SERVER_ERROR).send({});
            }
            next();
        });
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
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const model = this.getModelExtend();
            try {
                if (model.load(req.body)) {
                    if (yield model.save()) {
                        // return HttpCode.ACCEPTED on success
                        res.status(HttpCode.ACCEPTED).send(model.toJson());
                    }
                    else {
                        // return unprocessable status
                        res.status(HttpCode.UNPROCESSABLE_ENTITY).send({});
                    }
                }
                else {
                    res.status(HttpCode.BAD_REQUEST).send({});
                }
            }
            catch (err) {
                console.log(err);
                res.status(HttpCode.INTERNAL_SERVER_ERROR).send({});
            }
            next();
        });
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
        this.view = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const model = this.getModelExtend();
            try {
                // if empty it will return null else it will return a model with data
                yield model.findOne(req.params.id);
                if (model.isEmpty) {
                    res.status(HttpCode.NOT_FOUND).end();
                }
                else {
                    res.send(model.toJson());
                }
            }
            catch (err) {
                console.log(err);
                res.sendStatus(HttpCode.INTERNAL_SERVER_ERROR);
            }
            next();
        });
        /*
                @Update action
                this action update the data
                ----------------------------
                this can also be use as follow
        
                ```
                this.getModelExtend().onResult((model) => {
                    if (model === null) {
                        return res.send("not found");
                    }
                    model.load(req.body)
                        .onResult(([model, upCount]) => {
                            if (upCount) {
                                // return HttpCode.ACCEPTED on success
                                res.status(HttpCode.ACCEPTED).send({});
                            } else {
                                // return not found status
                                res.status(HttpCode.NOT_FOUND).send({});
                            }
                            next();
                        }).update();
                }).asModel().findOne(req.params.id);
                ```
            */
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const model = this.getModelExtend();
            try {
                if (model.load(req.body)) {
                    if (yield model.update(req.params.id)) {
                        // return HttpCode.ACCEPTED on success
                        res.status(HttpCode.ACCEPTED).send({});
                    }
                    else {
                        // return not found status
                        res.status(HttpCode.NOT_FOUND).send({});
                    }
                }
                else {
                    res.status(HttpCode.BAD_REQUEST).send({});
                }
            }
            catch (err) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).send({});
            }
            next();
        });
        /*
                @Delete action
                this action deletes the data
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
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            // create new instant of model
            const model = this.getModelExtend();
            try {
                // delete operation
                if (yield model.delete(req.params.id)) {
                    res.status(HttpCode.ACCEPTED).send({});
                }
                else {
                    res.status(HttpCode.NOT_FOUND).send({});
                }
            }
            catch (err) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).send({});
            }
            next();
        });
        /*
                @Route function
                this function holds the defination for routes for actions in controllers
                ----------------------------
                It is array of object that has 3 values as method, path, action
                method : it type of Methods which id one of get,post,put,delete
                path   : url path to the action
                action : name of method to execute
                ```
            */
        this.route = () => {
            if (!this.hasModel()) {
                return [];
            }
            return [
                { method: Methods.GET, path: '/', action: 'index' },
                { method: Methods.POST, path: '/', action: 'create' },
                { method: Methods.GET, path: '/:id', action: 'view' },
                { method: Methods.PUT, path: '/:id', action: 'update' },
                { method: Methods.DELETE, path: '/:id', action: 'delete' },
            ];
        };
    }
}
export default Controller;

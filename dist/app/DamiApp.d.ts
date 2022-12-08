import express from 'express';
import { IDamiConfig } from '../config/IConfig';
declare class DamiApp {
    static config: object;
    private controllers;
    private app;
    constructor();
    getApp(): any;
    getExpress(): typeof express;
    init: (configSetting: IDamiConfig) => void;
    configReq: (req: any, res: any, next: any) => void;
    run: (initRun?: (app: any) => {}) => void;
    private getServerResponse;
    private getControllers;
}
export default DamiApp;

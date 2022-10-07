declare class LogTrack {
    private startTime;
    private logId;
    private queryList;
    private maxTime;
    private maxMemory;
    private currentTime;
    private currentMemory;
    private countRequest;
    private isBreak;
    private averageMemory;
    private averageTime;
    constructor();
    start: (req: any, res: any, next: any) => void;
    queryLog: (query: any) => void;
    getQuery: () => void;
    memory: (req: any, res: any, next: any) => void;
    time: (req: any, res: any, next: any) => void;
    end: (req: any, res: any, next: any) => any;
}
export default LogTrack;

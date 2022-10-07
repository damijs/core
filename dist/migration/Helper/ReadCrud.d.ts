declare class ReadCrud {
    tableName: string;
    errors: string[];
    getError(): string[];
    preview(cName: string, cPath: string, modelPath: string, isMini: string): false | {
        isNew: number;
        path: string;
        date: number;
        code: string;
    };
    create(code: string, isCreate: boolean): Promise<string>;
}
export default ReadCrud;

declare class ReadSchema {
    tableName: string;
    errors: string[];
    getTableRules(): Promise<boolean | {}>;
    getError(): string[];
    preview(modelName: string, tableName: string, modelPath: string): Promise<false | {
        isNew: number;
        path: string;
        date: number;
        code: string;
    }>;
    create(code: string, isCreate: boolean): Promise<string | void>;
}
export default ReadSchema;

declare class ReadControl {
    errors: string[];
    getError(): string[];
    preview(cName: string, cPath: string): false | {
        isNew: number;
        path: string;
        date: number;
        code: string;
    };
    create(code: string, isCreate: boolean): Promise<string>;
}
export default ReadControl;

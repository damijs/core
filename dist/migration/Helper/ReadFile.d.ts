declare class ReadFile {
    static index(): string;
    static readPath(type: string, name: string): string;
    static read(type: string, name: string): {
        type: string;
        model: string;
    } | boolean;
}
export default ReadFile;

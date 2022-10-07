declare class ReadRbac {
    static checkInit(): Promise<boolean>;
    static redo(): Promise<boolean>;
}
export default ReadRbac;

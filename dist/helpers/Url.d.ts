declare class Url {
    static to(path: string, params?: object | (string | number)[], absolute?: boolean): string;
}
export default Url;

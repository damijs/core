interface IUrlParamsObject {
    [key: string]: string;
}
interface IUrlConfig {
    params?: IUrlParamsObject | (string | number)[];
    absolute?: boolean;
    basePath?: boolean;
}
declare class Url {
    static to(path: string, config: IUrlConfig): string;
}
export default Url;

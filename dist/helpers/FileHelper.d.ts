interface ImageConfig {
    name?: string;
    size?: number;
    t_size?: number;
}
declare class FileHelper {
    private static sap;
    static getImage(name: string, thumb?: boolean): string | boolean;
    static saveFile(file: any, path: string, name?: string): Promise<string | boolean>;
    static saveImage(image: any, path: string, imageConfig?: ImageConfig): Promise<string | boolean>;
}
export default FileHelper;

import { isEmpty } from '@damijs/hp';
import Dami from '../app/Dami';
class Url {
    static to(path, config) {
        let _url = '/' + path.replace(/^\//, "");
        const { params, absolute, basePath } = config;
        if (!isEmpty(params)) {
            if (Array.isArray(params)) {
                _url += '/' + params.map((e) => (e === null || e === undefined || e === '' ? 'null' : e)).join('/');
            }
            else if (Object.keys(params).length > 0) {
                _url +=
                    '?' +
                        Object.keys(params)
                            .map((key) => `${key}=${params[key]}`)
                            .join('&');
            }
        }
        if (basePath === true && !isEmpty(Dami.basePath)) {
            _url = "/" + Dami.basePath.replace(/^\//, '').replace(/\/$/, "") + _url;
        }
        if (absolute !== false) {
            _url = Dami.baseUrl.replace(/\/$/, "") + _url;
        }
        return _url;
    }
}
export default Url;

import ICallback from "../../interfaces/ICallback";
import IData from '../../interfaces/IData'


interface IOptions {
    [index: string]: string | undefined | null,
    apiKey?: string,
    sources?: string | null
}

interface IResp  {
    endpoint: Endpoint;
    options?: IOptions
}

type Endpoint =  'everything' | 'top-headlines' | 'sources';
type Method = 'GET' | 'POST';

class Loader {
    private baseLink: string;
    private options: IOptions;
    
    constructor(baseLink: string, options: IOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: IResp,
        callback = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: IOptions, endpoint: Endpoint): string {
        const urlOptions: IOptions = { ...this.options, ...options };
        let url: string = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            if(urlOptions[key]) {
                url += `${key}=${urlOptions[key]}&`;
            }
        });

        return url.slice(0, -1);
    }

    load(method: Method, endpoint: Endpoint, callback: ICallback<IData>, options: IOptions = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));

    }
}

export default Loader;


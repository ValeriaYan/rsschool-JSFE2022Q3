import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.up.railway.app/', {
            apiKey: '07b9d49d4ea94d17a47ddc3c1474eb68', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;

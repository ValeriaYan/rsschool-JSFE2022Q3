import AppLoader from './appLoader';
import ICallback from '../../interfaces/ICallback';
import IDataSource from '../../interfaces/IDataSource';
import IDataNews from '../../interfaces/IDataNews';

class AppController extends AppLoader {
    getSources(callback: ICallback<IDataSource>) {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );

    }

    getNews(e: Event, callback: ICallback<IDataNews>) {
        let target: EventTarget | null = e.target;
        const newsContainer: EventTarget | null = e.currentTarget;

        while (target !== newsContainer) {   
            if (target && (<HTMLElement>target).classList.contains('source__item')) {
                const sourceId: string | null = (<HTMLElement>target).getAttribute('data-source-id'); 
                if ((<HTMLElement>newsContainer).getAttribute('data-source') !== sourceId) {
                    if(typeof sourceId === 'string') {
                        (<HTMLElement>newsContainer).setAttribute('data-source', sourceId);
                    }
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                        );
                }
                return;
            }
            target = (<HTMLElement>target).parentNode;
        }
    }
}

export default AppController;

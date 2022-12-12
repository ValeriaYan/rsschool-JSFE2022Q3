import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import IDataSource from '../../interfaces/IDataSource';

class App {
    private controller: AppController;
    private view: AppView
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        const sourcesElem: Element | null = document.querySelector('.sources');
        if(sourcesElem) {
            sourcesElem.addEventListener('click', (e: Event) => this.controller.getNews(e, (data) => {
                if(data) {
                    this.view.drawNews(data);
                }
            }));
        }
        this.controller.getSources((data) => { 
            if(data){
                this.view.drawSources(data as IDataSource)
            };
        })

        
    }
}

export default App;
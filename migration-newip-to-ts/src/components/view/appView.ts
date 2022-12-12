import News from './news/news';
import Sources from './sources/sources';
import IDataNews from '../../interfaces/IDataNews';
import IDataSource from '../../interfaces/IDataSource';
import IArticle from '../../interfaces/IArticle';
import ISource from '../../interfaces/ISource';

export class AppView {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: IDataNews): void {
        const values: IArticle[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: IDataSource): void {
        const values: ISource[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;

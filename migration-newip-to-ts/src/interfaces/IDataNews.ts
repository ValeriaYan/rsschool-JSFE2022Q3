import IArticle from './IArticle'
import IData from './IData';

export default interface IDataNews extends IData{
    totalResults: number,
    articles: IArticle[],
}
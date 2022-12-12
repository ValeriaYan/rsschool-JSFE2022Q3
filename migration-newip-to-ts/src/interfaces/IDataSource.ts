import ISource from './ISource'
import IData from './IData';

export default interface IDataSource extends IData{
    sources: ISource[],
}
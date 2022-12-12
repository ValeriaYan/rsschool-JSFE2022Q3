import IData from './IData'

export default interface ICallback<T extends IData> {
    (data?: T): void;
}
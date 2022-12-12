import './sources.css';
import IDataSource from '../../../interfaces/IDataSource';

class Sources{
    draw(data: IDataSource['sources']): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');

        if(sourceItemTemp) {
            data.forEach((item) => {
                const sourceClone: HTMLTemplateElement | null = <HTMLTemplateElement>sourceItemTemp.content.cloneNode(true);
                const sourceName = sourceClone.querySelector('.source__item-name')
                if(sourceName){
                    sourceName.textContent = item.name;
                }
                const sourceItem = sourceClone.querySelector('.source__item')
                if(sourceItem){
                    sourceItem.setAttribute('data-source-id', item.id);
                }
            
                fragment.append(sourceClone);
            });
        }

        const sourcesElem = document.querySelector('.sources');
        if(sourcesElem) {
            sourcesElem.append(fragment);
        }
    }
}

export default Sources;

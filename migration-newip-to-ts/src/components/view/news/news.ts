import './news.css';
import IDataNews from '../../../interfaces/IDataNews';
import IArticle from '../../../interfaces/IArticle'

class News {
    draw(data: IDataNews["articles"]): void {
        const news: IArticle[] = data.length >= 10 ? data.filter((_item: IArticle, idx: number) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');

        news.forEach((item: IArticle, idx: number) => {
            if(newsItemTemp !== null) {
                const newsClone: HTMLTemplateElement | null = <HTMLTemplateElement>newsItemTemp.content.cloneNode(true);
                const newsItem: Element | null =  newsClone.querySelector('.news__item');
                if (idx % 2 && newsItem) newsItem.classList.add('alt');
        
                const newsPhoto: HTMLElement | null = <HTMLElement>newsClone.querySelector('.news__meta-photo')
                if(newsPhoto) {
                    newsPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
                } 
                const newsAuthor: Element | null = newsClone.querySelector('.news__meta-author');
                if(newsAuthor) {
                    newsAuthor.textContent = item.author || item.source.name;                    
                } 
                const newsDate: Element | null = newsClone.querySelector('.news__meta-date')
                if(newsDate){
                    newsDate.textContent = item.publishedAt
                        .slice(0, 10)
                        .split('-')
                        .reverse()
                        .join('-');
            
                }
                const newsTitle:Element | null = newsClone.querySelector('.news__description-title')
                if(newsTitle) {
                    newsTitle.textContent = item.title;
                }
                const newsSource: Element | null = newsClone.querySelector('.news__description-source')
                if(newsSource) {
                    newsSource.textContent = item.source.name;
                }
                const newsContent = newsClone.querySelector('.news__description-content')
                if(newsContent) {
                    newsContent.textContent = item.description;
                }
                const newsReadMore = newsClone.querySelector('.news__read-more a');
                if(newsReadMore) {
                    newsReadMore.setAttribute('href', item.url);
                }
    
                fragment.append(newsClone);
            }
        });

        const newsElem: HTMLTemplateElement | null = document.querySelector('.news');
        if(newsElem) {
            newsElem.innerHTML = '';
            newsElem.appendChild(fragment);

        }

    }
}

export default News;

type Source = {
    id: string,
    name: string
}

export default interface IArticle {
    source: Source,
    author: string,
    title: string,
    description: string,
    url: string,
    urlToImage: string,
    publishedAt: string,
    content: string
}
import Gallery from '../../src/scripts/Gallery.js'
import categories from '../../data/index.js'


export default class App {
    constructor() {

    }

    render() {
        const gallery = new Gallery();
        const container = document.querySelector('.gallery');
        gallery.createGallery(container, categories);
    }
}

new App().render();
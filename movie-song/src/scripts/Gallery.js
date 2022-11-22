import Elem from './Elem.js'
import Film from './Film.js'
import Player from './Player.js';

export default class Gallery {
    constructor() {
    }

    createPlayerElem() {
        const player = new Elem('div', 'player').getElem();
        const playerHeader = new Elem('div', 'player__header', player).getElem();
        const playerControls = new Elem('div', 'player__controls', player).getElem();
        const songName = new Elem('div', 'player__song-name', playerHeader).getElem();
        const time = new Elem('div', 'player__time', playerHeader).getElem();
        const timeCurrent = new Elem('div', 'player__time-current', time).getElem();
        timeCurrent.textContent = '0:00';
        const timeDivider = new Elem('div', 'player__time-divider', time).getElem();
        timeDivider.textContent = '/';
        const timeDuration = new Elem('div', 'player__time-duration', time).getElem();
        const buttons = new Elem('div', 'player__buttons', playerControls).getElem();
        const playerIcon = new Elem('div', 'play player__icon', buttons).getElem();
        const timeline = new Elem('div', 'player__timeline', playerControls).getElem();
        const progress = new Elem('div', 'player__progress', timeline).getElem();
        const volume = new Elem('div', 'player__volume', playerControls).getElem();
        const volumeIcon = new Elem('div', 'player__volume-icon',volume).getElem();
        const volumeRange = new Elem('input', 'player__volume-range', volume).getElem();
        volumeRange.type = 'range';
        volume.min = '0';
        volume.max = '100';
        volume.value = '50';

        return player;
    }

    createItem(filmObj, container) {
        const film = new Film(filmObj);

        const item = new Elem('div', 'gallery__item', container).getElem();
        const imgWrap = new Elem('div', 'gallery__img', item).getElem();
        const img = new Elem('img', '', imgWrap).getElem();
        img.src = film.getImg();
        const playerElem = this.createPlayerElem();
        playerElem.classList.add('gallery__player');
        playerElem.querySelector('.player__song-name').textContent = film.getName();
        const player = new Player(film.getAudio(), playerElem);
        item.append(playerElem);
        const description = new Elem('div', 'gallery__description', item).getElem();
        description.textContent = film.getDescription();
    }

    createGallery(container, content) {
        for(let item in content) {
            for(let i of content[item]) {
                this.createItem(i, container)
            }
        }
    }
}
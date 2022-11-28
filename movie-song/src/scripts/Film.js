export default class Film {
    constructor(filmObj) {
        this.name = filmObj.name;
        this.audio = filmObj.audio;
        this.img = filmObj.img; 
        this.description = filmObj.description;
    }

    getName() {
        return this.name;
    }

    getAudio() {
        return this.audio;
    }

    getImg() {
        return this.img;
    }

    getDescription() {
        return this.description;
    }
}
export default class Film {
    constructor(name, audio, img, description) {
        this.name = name;
        this.audio = audio;
        this.img = img; 
        this.description = description;
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
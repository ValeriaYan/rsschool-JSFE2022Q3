export default class Storage {
    constructor() {
        this.save = {};
        this.tableResults = {};
    }

    saveGame(stats, arrayCells) {
        this.save['stats'] = JSON.stringify(stats);
        this.save['arrayCells'] = arrayCells;
        localStorage.setItem('save', JSON.stringify(this.save));
    }

    getSave() {
        return JSON.parse(localStorage.getItem('save'));
    }

    saveResult(stats) {

    }

}
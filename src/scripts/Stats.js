export default class Stats {
    constructor() {
        this.movements = 0;
        this.time = '00:00:00'
    }

    /**
     * @param {number} num
     */
    set movements(num) {
        if(num == 1) {
            this.movements++;
        }
    }

    /**
     * @param {string} time
     */
    set time(time) {
        this.time = time;
    }

    get movements() {
        return this.movements;
    }

    get time() {
        return this.time;
    }
}
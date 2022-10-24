export default class Stats {
    constructor() {
        this.movements = 0;
        this.time = '00:00:00'
    }

    setMovements(num) {
        if(num == 1) {
            this.movements++;
        }
    }

    setTime(time) {
        this.time = time;
    }

    getMovements() {
        return this.movements;
    }

    getTime() {
        return this.time;
    }
}
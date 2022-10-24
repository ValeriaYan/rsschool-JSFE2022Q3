import Puzzle from './Puzzle'
import Stats from './Stats'

export default class Game {
    constructor(size, cells) {
        this.puzzle = new Puzzle(size, cells)
        this.stats = new Stats();
    }

    getCells() {
        return this.puzzle.cells;
    }

    getStats() {
        return {
            movements: this.stats.movements,
            time: this.stats.time
        }
    }

    setStats(movements, time) {
        if(typeof movements === 'number') {
            this.stats.movements = movements;
        }
        if(typeof time === 'string') {
            this.stats.time = time;
        }
    }
}
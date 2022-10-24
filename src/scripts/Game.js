import Puzzle from './Puzzle'
import Stats from './Stats'

export default class Game {
    constructor(size, cells) {
        this.puzzle = new Puzzle(size, cells)
        this.stats = new Stats();
    }

    checkFinish() {
        return this.puzzle.checkFinish();
    }

    moveCell(cell) {
        return this.puzzle.move(cell);
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
        movements = +movements;
        if(typeof movements === 'number') {
            this.stats.movements = movements;
        }
        if(typeof time === 'string') {
            this.stats.time = time;
        }
    }
}
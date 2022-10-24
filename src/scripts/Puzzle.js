export default class Puzzle {
    constructor(size = 4, cells = []) {
        this.size = size;
        this.cells = cells;

        if(cells.length == 0) {
            for(let i = 0; i < size; i++) {
                this.cells.push([]);
            }
            this.shuffle();
        }
    }

    // get cells() {
    //     return this.cells;
    // }

    // set cells(cells) {
    //     if(Array.isArray(cells)) {
    //         this.cells = cells;
    //     }
    // }

    shuffle() {
        function getRandomNum(max) {
            return Math.floor(Math.random() * max);
        }

        
        let randomNums = [];
        for(let i = 0; i < this.size * this.size; i++) {
            let num = getRandomNum(this.size * this.size);
            while(randomNums.includes(num)) {
                num = getRandomNum(this.size * this.size);
            }

            randomNums.push(num);
        }

        let indexRandomNums = 0;
        for(let i = 0; i < this.cells.length; i++) {
            for(let j = 0; j < this.size; j++) {
                this.cells[i][j] = randomNums[indexRandomNums];
                indexRandomNums++;
            }
        }
    }

    swap(nullElemRow, nullElemCol, indexRowCell, indexColCell) {
        let temp = this.cells[indexRowCell][indexColCell]
        this.cells[nullElemRow][nullElemCol] = temp;
        this.cells[indexRowCell][indexColCell] = 0;
    }

    move(cell) {
        let indexRowCell = 0;
        let indexColCell = 0;
        for(let i = 0; i < this.size; i++) {
            for(let j = 0; j < this.size; j++) {
                if(this.cells[i][j] == cell){
                    indexRowCell = i;
                    indexColCell = j;
                }
            }
        }

        if(this.cells?.[indexRowCell - 1]?.[indexColCell] === 0) {
            this.swap(indexRowCell - 1, indexColCell, indexRowCell, indexColCell);
        }

        if(this.cells?.[indexRowCell + 1]?.[indexColCell] === 0) {
            this.swap(indexRowCell + 1, indexColCell, indexRowCell, indexColCell)
        }

        if(this.cells?.[indexRowCell]?.[indexColCell - 1] === 0) {
            this.swap(indexRowCell, indexColCell - 1, indexRowCell, indexColCell)

        }

        if(this.cells?.[indexRowCell]?.[indexColCell + 1] === 0) {
            this.swap(indexRowCell, indexColCell + 1, indexRowCell, indexColCell)
        }
    }
}

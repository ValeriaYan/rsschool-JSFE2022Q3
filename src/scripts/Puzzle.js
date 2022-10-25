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

        while(this.checkSolvability(randomNums) == false) {
            let randomNum = getRandomNum(this.size * this.size);
            let temp = randomNums[0];
            randomNums[0] = randomNums[randomNum];
            randomNums[randomNum] = temp;
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
            return 'top';
        }

        if(this.cells?.[indexRowCell + 1]?.[indexColCell] === 0) {
            this.swap(indexRowCell + 1, indexColCell, indexRowCell, indexColCell)
            return 'bottom';
        }

        if(this.cells?.[indexRowCell]?.[indexColCell - 1] === 0) {
            this.swap(indexRowCell, indexColCell - 1, indexRowCell, indexColCell)
            return 'left';
        }

        if(this.cells?.[indexRowCell]?.[indexColCell + 1] === 0) {
            this.swap(indexRowCell, indexColCell + 1, indexRowCell, indexColCell)
            return 'right';
        }
    }

    checkFinish() {
        let arrCells = [];
        
        for(let i = 0; i < this.size; i++) {
            arrCells.push(...this.cells[i]);
        }

        if(arrCells[0] !== 1 || arrCells[arrCells.length - 1] !== 0) {
            return false;
        }

        for(let i = 1; i < arrCells.length - 1; i++) {
            if(arrCells[i] - arrCells[i - 1] !== 1) {
                return false;
            }
        }
        return true;
    }

    checkSolvability(array) {
        let inversions = 0;
        for(let i = 0; i < array.length; i++) {
            for(let j = 0; j < i; j++) {
                if(array[i] < array[j]){
                    inversions++;
                }
            }
        }

        let indexRowWithNull = Math.floor(array.findIndex((item) => item == 0) / this.size) + 1;
        
        if((inversions + indexRowWithNull) % 2 == 0) {
            return true;
        } 
        return false;
    }
}

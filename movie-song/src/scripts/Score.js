export default class Score {
    constructor() {
        this.currentScore = 0;
        this.numberPointPerAnswer = 5;
    }

    getCurrentScore() {
        return this.currentScore;
    }

    reduceNumberPointPerAnswer(){
        if(this.numberPointPerAnswer > 0) {
            this.numberPointPerAnswer--;
        }
    }

    addPointsToScore() {
        this.currentScore += this.numberPointPerAnswer;
    }

    returnNumberPointPerAnswer() {
        this.numberPointPerAnswer = 5;
    }
}
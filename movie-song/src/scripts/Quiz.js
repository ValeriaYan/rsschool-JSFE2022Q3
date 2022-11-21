
import Question from "./Question.js";
import Score from "./Score.js";
import categories from '../../data/index.js'
import Film from "./Film.js";

export default class Quiz {
    constructor(categories) {
        this.categoriesName = Object.keys(categories);
        this.currentCategory = 0;
        this.question = new Question(categories[this.categoriesName[this.currentCategory]]);
        this.score = new Score();
    }

    getNameCurrentCategory() {
        return this.categories[this.categoriesName[this.currentCategory]];
    }

    nextCategory() {
        if(this.currentCategory + 1 < this.categoriesName.length) {
            this.score.returnNumberPointPerAnswer();
            this.question = new Question(categories[this.categoriesName[++this.currentCategory]]);
        }
    }

    getFilm() {
        return this.question.film;
    }

    getFilmByName(name) {
        const category = categories[this.categoriesName[this.currentCategory]];
        let film = category.find((film) => film.name == name);
        return new Film(film.name, film.audio, film.img, film.description);
    }

    getAnswers() {
        return this.question.answers;
    }

    getScore() {
        return this.score.getCurrentScore();
    }
    
    checkAnswer(answer) {
        let isRightAnswer = this.question.getAnswers()[answer];
        if(isRightAnswer) {
            this.score.addPointsToScore();
        }else {
            this.score.reduceNumberPointPerAnswer();
        }
        return isRightAnswer;
    }

}

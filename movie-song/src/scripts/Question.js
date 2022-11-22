import Film from './Film.js'

export default class Question {
    constructor(category) {
        this.category = category;
        this.film = this.getRandomFilm(this.category);
        this.answers = this.setAnswers(this.category);
    }

    getFilm() {
        return this.film;
    }

    getAnswers() {
        return this.answers;
    }

    getRandomNum(max) {
        return Math.floor(Math.random() * max);
    }

    getRandomFilm() {
        const randomNum = this.getRandomNum(this.category.length);
        const randomFilm = this.category[randomNum];
        return new Film(randomFilm);
    }

    setAnswers() {
        const answers = {};
        const quantityAnswers = 6;
        const numberRightAnswer = this.getRandomNum(quantityAnswers)
        for(let i = 0; i < quantityAnswers; i++) {
            let nameAnswer;
            if(i == numberRightAnswer) {
                nameAnswer = this.film.name;
                answers[nameAnswer] = true;
            }else {
                do{
                    nameAnswer = this.category[this.getRandomNum(this.category.length)].name
                }while(nameAnswer == this.film.name || answers.hasOwnProperty(nameAnswer))
                answers[nameAnswer] = false;
            }
        }

        return answers;
    }

}
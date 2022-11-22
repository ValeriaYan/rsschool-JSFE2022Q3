import Question from "./Question.js";
import Score from "./Score.js";
import categories from '../../data/index.js'
import Film from "./Film.js";
import Player from "./Player.js";
import Quiz from "./Quiz.js";
import animatedSerials from "../img/animated-serials/index.js";

export default class Render {
    constructor(quiz) {
        this.categoriesElem = Array.from(document.querySelectorAll('.main__category'));
        this.activeCategory = 0;
        this.questionImg = document.querySelector('.question__img');
        this.questionName = document.querySelector('.question__player .player__song-name');
        this.infoImg = document.querySelector('.info__img');
        this.infoName = document.querySelector('.info__player .player__song-name');
        this.answers = Array.from(document.querySelectorAll('.answers__answer'));
        this.score = document.querySelectorAll('.main__score-num');
        this.quiz = quiz;
        this.currentFilm = quiz.getFilm();
        this.infoBody = document.querySelector('.info__body');
        this.infoDescription = document.querySelector('.info__text')
        this.infoMessage = document.querySelector('.info__message');
        this.nextLevelBtn = document.querySelector('.main__btn_next-level'); 
        this.btnResult = document.querySelector('.main__btn_result');
        this.btnTryAgain = document.querySelector('.main__btn_try-again');
        this.messageFullScore = document.querySelector('.main__message_full-score');
        this.messageNotFullScore = document.querySelector('.main__message_not-full-score');
        this.resultsBlock = document.querySelector('.results');
        this.quizBlock = document.querySelector('.quiz');
        this.startBlock = document.querySelector('.start');
        this.startBtn = document.querySelector('.main__btn_start');

        this.questionPlayerElem = document.querySelector('.question__player');
        this.infoPlayerElem = document.querySelector('.info__player');
        this.questionPlayer = new Player(this.currentFilm.getAudio(),this.questionPlayerElem);
        this.infoPlayer;

        this.answersAreChecked = [];
        this.correctAnswerGiven = false;
    }

    showMessageInfo() {
        this.infoBody.classList.remove('_active');
        this.infoMessage.classList.add('_active');
    }

    hideMessageInfo() {
        this.infoBody.classList.add('_active');
        this.infoMessage.classList.remove('_active');
    }

    nextQuestion() {
        this.showMessageInfo();
        this.hideQuestionContent();
        this.setAnswers(this.quiz.getAnswers());
        this.changeActiveCategory();
        this.currentFilm = this.quiz.getFilm();
        this.questionPlayer.changeSong(this.currentFilm.getAudio());
        this.questionPlayer.fillProgressBar();
        this.correctAnswerGiven = false;
        this.nextLevelBtn.disabled = true;
        this.questionPlayer.pauseAudio();
        this.unmarkAnswers();
    }

    changeCurrentFilm(film) {
        this.currentFilm = film;
        this.questionPlayer.changeSong(film.getAudio());
    }

    changeActiveCategory() {
        if(this.activeCategory + 1 < this.categoriesElem.length) {
            this.categoriesElem[this.activeCategory].classList.remove('_active');
            this.activeCategory++;
            this.categoriesElem[this.activeCategory].classList.add('_active');
        }
    }

    changeButtons() {
        if(this.activeCategory + 1 == this.categoriesElem.length && this.correctAnswerGiven == true) {
            this.nextLevelBtn.style.display = 'none';
            this.btnResult.style.display = 'inline-block';
        }
    }

    showQuestionContent() {
        const filmImg = document.createElement('img');
        filmImg.src = this.currentFilm.getImg();

        this.questionImg.append(filmImg);
        this.questionName.textContent = this.currentFilm.getName();
    }

    hideQuestionContent() {
        if(this.questionImg.children[0]) {
            this.questionImg.removeChild(this.questionImg.children[0]);
        }
        this.questionName.textContent = '******';
    }

    showInfoContent(film) {
        const filmImg = document.createElement('img');
        filmImg.src = film.getImg();

        if(this.infoImg.children[0]) {
            this.infoImg.removeChild(this.infoImg.children[0]);
        }
        this.infoImg.append(filmImg);
        this.infoName.textContent = film.getName();

        this.infoDescription.textContent = film.getDescription();

        if(!this.infoPlayer) {
            this.infoPlayer = new Player(film.getAudio(), this.infoPlayerElem);
        }else {
            this.infoPlayer.changeSong(film.getAudio());
        }
        this.hideMessageInfo();
    }

    hideInfoContent() {
        this.infoImg.removeChild(this.infoImg.children[0]);
        this.infoName.textContent = '******';
    }

    checkAnswer(answer) {
        if(!this.answersAreChecked.includes(answer)) {
            this.answersAreChecked.push(answer);
            if(!this.correctAnswerGiven){
                if(this.quiz.checkAnswer(answer)) {
                    this.showQuestionContent();
                    this.setScore(this.quiz.getScore());
                    this.correctAnswerGiven = true;
                    this.nextLevelBtn.disabled = false;

                    return true;
                }
            }
        }
    }
    
    async markAnswer(answerElem) {
        const filmName = answerElem.textContent;
        const answers = this.quiz.getAnswers();
        if(!this.correctAnswerGiven) {
            if(answers[filmName]) {
                answerElem.classList.add('true');
                const correctAnswerAudio = new Audio();
                correctAnswerAudio.src = '../../src/audio/correct.mp3';
                await correctAnswerAudio.play();
                this.questionPlayer.pauseAudio();
            }else{
                answerElem.classList.add('false');
                const incorrectAnswerAudio = new Audio();
                incorrectAnswerAudio.src = '../../src/audio/incorrect.mp3';
                await incorrectAnswerAudio.play();
            }
        }
    }


    unmarkAnswers() {
        for(let answer of this.answers) {
            answer.classList.remove('true');
            answer.classList.remove('false');
        }
    }

    setAnswers(answers) {
        for(let i = 0; i  < this.answers.length; i++) {
            this.answers[i].textContent = Object.keys(answers)[i];
        }
    }

    setScore(score) {
        for(let item of this.score){
            item.textContent = score;
        }
    }

    showFullScoreMessage() {
        this.messageFullScore.style.display = 'block';
        this.btnTryAgain.style.display = 'none';
        this.messageNotFullScore.style.display = 'none';
    }

    showNotFullScoreMessage() {
        this.messageFullScore.style.display = 'none';
        this.btnTryAgain.style.display = 'inline-block';
        this.messageNotFullScore.style.display = 'block'
    }

    showResults() {
        this.resultsBlock.classList.add('_active');
        this.quizBlock.classList.remove('_active');
        if(this.quiz.getScore() == 25) {
            this.showFullScoreMessage();
        }else {
            this.showNotFullScoreMessage();
        }
    }

    hideResults() {
        this.resultsBlock.classList.remove('_active');
        this.quizBlock.classList.add('_active');
    }

    showQuiz() {
        this.quizBlock.classList.add('_active');
        this.startBlock.classList.remove('_active')
        this.resultsBlock.classList.remove('_active');
    }
}
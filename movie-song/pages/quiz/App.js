import Quiz from '../../src/scripts/Quiz.js'
import Render from '../../src/scripts/Render.js'
import categories from '../../data/index.js'
import Film from '../../src/scripts/Film.js';

export default class App {
    constructor() {}

    render() {
        const quiz = new Quiz(categories);
        const render = new Render(quiz);
        let answers = quiz.getAnswers();
        render.setAnswers(answers);
        const answerWrap = document.querySelector('.main__answers');
        answerWrap.addEventListener('click', function(event) {
            if(event.target.classList.contains('answers__answer')) {
                const filmName = event.target.textContent;
                const film = quiz.getFilmByName(filmName);
                render.showInfoContent(film);
                
                render.markAnswer(event.target);
                if(render.checkAnswer(filmName)) {
                    render.changeButtons();
                }
            }
        })

        const nextLevelBtn = document.querySelector('.main__btn_next-level');
        nextLevelBtn.addEventListener('click', function() {
            if(!nextLevelBtn.disabled) {
                quiz.nextCategory();
                render.nextQuestion();
            }
        })

        const btnResult = document.querySelector('.main__btn_result');
        btnResult.addEventListener('click', render.showResults.bind(render));

        const btnTryAgain = document.querySelector('.main__btn_try-again');
        btnTryAgain.addEventListener('click', render.hideResults.bind(render));

        const btnStart = document.querySelector('.main__btn_start');
        btnStart.addEventListener('click', render.showQuiz.bind(render));

        const linkQuiz = document.querySelector('.nav__link_quiz');
        linkQuiz.addEventListener('click', render.showQuiz.bind(render))
    }
}

new App().render();
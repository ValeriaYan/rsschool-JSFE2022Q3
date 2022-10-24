import Elem from './Elem'

export default class Interface {
    constructor() {
        this.elems = {}

        const game = new Elem('div', document.body, 'game').elem;
        const container = new Elem('div', game, 'container').elem;
        const buttons = new Elem('div', container, 'buttons').elem;
        const buttonShuffle = new Elem('button', buttons, 'buttons__button buttons__button-shuffle').elem;
        buttonShuffle.textContent = 'Shuffle';
        const buttonStart = new Elem('button', buttons, 'buttons__button buttons__button-start').elem;
        buttonStart.textContent = 'Start';
        const buttonSave = new Elem('button', buttons, 'buttons__button buttons__button-save').elem;
        buttonSave.textContent = 'Save';
        const buttonResults = new Elem('button', buttons, 'buttons__button buttons__button-result').elem;
        buttonResults.textContent = 'Results';
        const stats = new Elem('div', container, 'stats').elem;

        const statsMovements = new Elem('div', stats, 'stats__movement movement').elem;
        const movementText = new Elem('span', statsMovements, 'movement__text').elem;
        movementText.textContent = 'Move: ';
        const movementMove = new Elem('span', statsMovements, 'movement__move').elem;
        movementMove.textContent = '0';

        const statsTimer = new Elem('div', stats, 'stats__timer timer').elem;
        const timerText = new Elem('span', statsTimer, 'timer__text').elem;
        timerText.textContent = 'Time: ';
        const timerHours = new Elem('span', statsTimer, 'timer__hours').elem;
        timerHours.textContent = '00';
        const timerSeparator = new Elem('span', statsTimer).elem;
        timerSeparator.textContent = ':';
        
        const timerMinutes = new Elem('span', statsTimer, 'timer__minute').elem;
        timerMinutes.textContent = '00';
        const timerSeparator2 = new Elem('span', statsTimer).elem;
        timerSeparator2.textContent = ':';
        
        const timerSeconds = new Elem('span', statsTimer, 'timer__seconds').elem;
        timerSeconds.textContent = '00';

        const gameField = new Elem('div', container, 'game-field').elem;


        this.elems['container'] = container;
        this.elems['buttons'] = buttons;
        this.elems['button-shuffle'] = buttonShuffle;
        this.elems['button-start'] = buttonStart;
        this.elems['button-save'] = buttonSave;
        this.elems['button-results'] = buttonResults;
        this.elems['stats'] = stats;
        this.elems['stats-movements'] = statsMovements;
        this.elems['movement-text'] = movementText;
        this.elems['movement-move'] = movementMove;
        this.elems['game-field'] = gameField;
        this.elems['stats-timer'] = statsTimer;
        this.elems['timer-seconds'] = timerSeconds;
        this.elems['timer-minutes'] = timerMinutes;
        this.elems['timer-hours'] = timerHours;
    }

    createGameField(cells) {
        this.elems['game-field-rows'] = [];
        for(let i = 0; i < cells.length; i++) {
            const gameFieldRow = new Elem('div', this.elems['game-field'], 'game-field__row row').elem;
            gameFieldRow.style.position = 'relative'
            gameFieldRow.style.left = 0;
            gameFieldRow.style.top = 0;
            this.elems['game-field-rows'].push(gameFieldRow);

            for(let j = 0; j < cells[i].length; j++) {
                const rowItem = new Elem('div', this.elems['game-field-rows'][i], 'row__item').elem;
                rowItem.textContent = `${cells[i][j]}`;
            }
        }

    } 

    moveCell(cell, orientation) {
        if(orientation == 'top'){
            cell.style.top = parseInt(cell.style.top) - cell.offsetHeight + 'px';
        }
        if(orientation == 'bottom'){ 
            cell.style.top = parseInt(cell.style.top) + cell.offsetHeight + 'px';
        }
        if(orientation == 'left'){
            cell.style.left = parseInt(cell.style.left) - cell.offsetWidth + 'px';
        }
        if(orientation == 'right'){
            cell.style.left = parseInt(cell.style.left) + cell.offsetWidth + 'px';
        }
    }

    changeMovements() {
        const numberMoves = this.elems['movement-move'];
        numberMoves.textContent = +numberMoves.textContent + 1;
    }

    setTime(time) {
        time = time.split(':');
        if(time.length == 3) {
            this.elems['timer-seconds'].textContent = time[2];
            this.elems['timer-minutes'].textContent = time[1];
            this.elems['timer-hours'].textContent = time[0];
        }
    }

    countdown() {
        let seconds = +this.elems['timer-seconds'].textContent;
        let minutes = +this.elems['timer-minutes'].textContent;
        let hours = +this.elems['timer-hours'].textContent;

        if(seconds > 59) {
            seconds = 0;
        }

        seconds++;
        if(seconds < 9) {
            this.elems['timer-seconds'].textContent = '0' + seconds;
        }

        if(seconds > 9) {
            this.elems['timer-seconds'].textContent = seconds;
        }

        if(seconds > 59) {
            minutes++;
            seconds = 0;

            this.elems['timer-seconds'].textContent = '0' + seconds;
            this.elems['timer-minutes'].textContent = '0' + minutes;
        }

        if(minutes < 9) {
            this.elems['timer-minutes'].textContent = '0' + minutes;
        }

        if(minutes > 9) {
            this.elems['timer-minutes'].textContent = minutes;
        }

        if(minutes > 59) {
            hours++;
            minutes = 0;

            this.elems['timer-minutes'].textContent = '0' + minutes;
            this.elems['timer-hours'].textContent = '0' + hours;
        }

        if(hours < 9) {
            this.elems['timer-hours'].textContent = '0' + hours;
        }

        if(hours > 9) {
            this.elems['timer-hours'].textContent = hours;
        }

        if(hours > 23) {
            this.elems['timer-hours'].textContent = '00';
            this.elems['timer-minutes'].textContent = '00';
            this.elems['timer-seconds'].textContent = '00';
        }
    }

    startTime() {
        this.countdown();
        setInterval(this.countdown.bind(this), 1000)
    }
        

}
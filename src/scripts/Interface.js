import Elem from './Elem'

export default class Interface {
    constructor() {
        this.elems = {}
        this.interval;
        const container = new Elem('div', document.body, 'container').elem;
        const game = new Elem('div', container, 'game').elem;
        const buttons = new Elem('div', game, 'buttons').elem;
        const buttonStart = new Elem('button', buttons, 'buttons__button buttons__button-start').elem;
        buttonStart.textContent = 'Start';
        const buttonRestart = new Elem('button', buttons, 'buttons__button buttons__button-restart').elem;
        buttonRestart.textContent = 'New Game';
        const buttonSave = new Elem('button', buttons, 'buttons__button buttons__button-save').elem;
        buttonSave.textContent = 'Save';
        const buttonUpload = new Elem('button', buttons, 'buttons__button buttons__button-upload').elem;
        buttonUpload.textContent = 'Upload save';
        const buttonResults = new Elem('button', buttons, 'buttons__button buttons__button-result').elem;
        buttonResults.textContent = 'Results';
        const buttonSound = new Elem('button', buttons, 'buttons__button buttons__button-sound').elem;

        buttonSound.textContent = 'on/off sound';

        const stats = new Elem('div', game, 'stats').elem;

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

        const gameField = new Elem('div', game, 'game-field').elem;

        const resize = new Elem('div', game, 'resize').elem;

        const size3 = new Elem('button', resize, 'resize__size').elem;
        size3.textContent = '3x3';
        size3.dataset.size = 3;

        const size4 = new Elem('button', resize, 'resize__size').elem;
        size4.textContent = '4x4';
        size4.dataset.size = 4;

        const size5 = new Elem('button', resize, 'resize__size').elem;
        size5.textContent = '5x5';
        size5.dataset.size = 5;

        const size6 = new Elem('button', resize, 'resize__size').elem;
        size6.textContent = '6x6';
        size6.dataset.size = 6;

        const size7 = new Elem('button', resize, 'resize__size').elem;
        size7.textContent = '7x7';
        size7.dataset.size = 7;

        const size8 = new Elem('button', resize, 'resize__size').elem;
        size8.textContent = '8x8';
        size8.dataset.size = 8;

        const winMessage = new Elem('div', game, 'win-message').elem;
        winMessage.textContent = '';


        
        
        
        this.elems['container'] = container;
        this.elems['game'] = game;

        const tableResults = new Elem('table', this.elems['game'], 'table').elem;
        this.elems['table'] = tableResults;
        this.createTableResults();
        const overlay = new Elem('div', game, 'overlay').elem;

        this.elems['buttons'] = buttons;
        this.elems['button-restart'] = buttonRestart;
        this.elems['button-start'] = buttonStart;
        this.elems['button-save'] = buttonSave;
        this.elems['button-results'] = buttonResults;
        this.elems['button-upload'] = buttonUpload;
        this.elems['button-sound'] = buttonSound;
        this.elems['stats'] = stats;
        this.elems['stats-movements'] = statsMovements;
        this.elems['movement-text'] = movementText;
        this.elems['movement-move'] = movementMove;
        this.elems['game-field'] = gameField;
        this.elems['stats-timer'] = statsTimer;
        this.elems['timer-seconds'] = timerSeconds;
        this.elems['timer-minutes'] = timerMinutes;
        this.elems['timer-hours'] = timerHours;
        this.elems['win-message'] = winMessage;
        this.elems['resize'] = resize;
        this.elems['overlay'] = overlay;
        
    }

    createGameField(cells) {
        while(this.elems['game-field'].firstChild) {
            this.elems['game-field'].removeChild(this.elems['game-field'].firstChild);
        }
        let order = 0;
        for(let i = 0; i < cells.length; i++) {
            for(let j = 0; j < cells[i].length; j++) {
                const rowItem = new Elem('div', this.elems['game-field'], 'game-field__item').elem;
                rowItem.textContent = `${cells[i][j]}`;
                rowItem.draggable = 'true'
                if(cells[i][j] == '0') {
                    rowItem.textContent = ``;
                    rowItem.style.zIndex = -1;
                }
                rowItem.style.order = order++;
            }
        }

    } 

    createTableResults() {
        const tableMainRow = new Elem('tr', this.elems['table'], 'table__main-row main-row').elem;
        const tableTh = new Elem('th', tableMainRow, 'main-row__item').elem;
        const tableTh2 = new Elem('th', tableMainRow, 'main-row__item').elem;
        tableTh2.textContent = 'Size';
        const tableTh3 = new Elem('th', tableMainRow, 'main-row__item').elem;
        tableTh3.textContent = 'Move';
        const tableTh4 = new Elem('th', tableMainRow, 'main-row__item').elem;
        tableTh4.textContent = 'Time';

        for(let i = 0; i < 10; i++) {
            const tableRow = new Elem('tr', this.elems['table'], 'table__row row').elem;
            const tableTd = new Elem('td', tableRow, 'row__item').elem;
            tableTd.textContent = i + 1;
            const tableTd2 = new Elem('td', tableRow, 'row__item row__item_size').elem;
            const tableTd3 = new Elem('td', tableRow, 'row__item row__item_move').elem;
            const tableTd4 = new Elem('td', tableRow, 'row__item row__item_time').elem;
        }
    }

    fillTableResults(tableResults) {
        let sizeItems = this.elems['table'].querySelectorAll('.row__item_size');
        let moveItems = this.elems['table'].querySelectorAll('.row__item_move');
        let timeItems = this.elems['table'].querySelectorAll('.row__item_time');
        for(let i = 0; i < tableResults.length; i++) {
            sizeItems[i].textContent = tableResults[i]['size'] + 'x' +  tableResults[i]['size'];
            moveItems[i].textContent = tableResults[i]['stats']['movements'];
            timeItems[i].textContent = tableResults[i]['stats']['time'];
        }
    }

    moveCell(cell, orientation, audio) {
        if(!orientation) {
            return;
        }
        let cells = this.elems['game-field'].querySelectorAll('.game-field__item');
        let cellWithNull = Array.from(cells).find((item) => item.textContent == 0);
        cell.style.animationName = orientation;
        let temp = cell.textContent;
        audio.play();

        setTimeout(function() {
            cell.style.zIndex = -1;
            cellWithNull.style.zIndex = 2;
            cell.textContent = cellWithNull.textContent;
            cellWithNull.textContent = temp;
        }, 180);

        cellWithNull.style.animationName = 'none';
        this.changeMovements();
    }

    changeMovements(num) {
        const numberMoves = this.elems['movement-move'];
        if(num) {
            numberMoves.textContent = num;
        }else {
            numberMoves.textContent = +numberMoves.textContent + 1;
        }
        if(num == 0) {
            numberMoves.textContent = 0;
        }
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
        if(seconds <= 9) {
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

        if(minutes <= 9) {
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

        if(hours <= 9) {
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

    stopTime() {
        clearInterval(this.interval);
    }

    startTime() {
        this.stopTime();
        this.interval = setInterval(this.countdown.bind(this), 1000)
    }
        
    setWinMessage(movements, time) {
        this.elems['win-message'].textContent = `Hooray! You solved the puzzle in ${time} and ${movements} moves!`;
    }

    toggleTable() {
        // console.log(this.elems['table'])
        console.log(this.elems)
        this.elems['table'].classList.toggle('_active');
    }
}
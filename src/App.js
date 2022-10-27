import './style';
import Interface from './scripts/Interface'
import Game from './scripts/Game'
import Storage from './scripts/Storage'

class App {
    constructor() {}

    render() {
        let currentSize = 4;
        let interfaceElem = new Interface();
        let game = new Game(currentSize);
        let interval;
        let storage = new Storage();
        let audio = new Audio('./src/audio/sound.mp3');
        interfaceElem.createGameField(game.getCells());

        let gameField = interfaceElem.elems['game-field'];
        let gameItems = gameField.querySelectorAll('.game-field__item');
        let resize = interfaceElem.elems['resize'];
        let resizeItems = resize.querySelectorAll('.resize__size');

        gameField.addEventListener('dragover', function(event) {
            event.preventDefault()
        })

        resize.addEventListener('click', function(event) {
            for(let item of resizeItems) {
                if(item.contains(event.target)) {
                    currentSize = item.dataset.size;
                }
            }
            game = new Game(currentSize);
            interfaceElem.createGameField(game.getCells());
            gameItems = gameField.querySelectorAll('.game-field__item');

            interfaceElem.stopTime();
            interfaceElem.setTime('00:00:00');
            interfaceElem.changeMovements(0);
            gameField.style.pointerEvents = 'none';

            gameField.style.gridTemplateColumns = `repeat(${currentSize}, 1fr)`;
            gameField.style.gridTemplateRows = `repeat(${currentSize}, 1fr)`;

            gameField.classList.remove('_active');
        })

        gameField.addEventListener('click', function(event) {
           for(let item of gameItems) {
            if(item.contains(event.target)) {
                interfaceElem.moveCell(item, game.moveCell(item.textContent), audio);
                gameField.style.pointerEvents = 'none';
                setTimeout(function() {
                    gameField.style.pointerEvents = 'auto';
                },200)

                if(game.checkFinish()){
                    let time = interfaceElem.elems['timer-hours'].textContent + ':' + interfaceElem.elems['timer-minutes'].textContent + ':' + interfaceElem.elems['timer-seconds'].textContent;
                    let move = interfaceElem.elems['movement-move'].textContent;
                    gameField.style.pointerEvents = 'none';
                    interfaceElem.setWinMessage(move, time);
                    interfaceElem.elems['win-message'].classList.add('_active');
                    interfaceElem.stopTime();

                    storage.saveResult({'time': time, 'movements': move}, currentSize);
                }
            }
           }
        })

        let startBtn = interfaceElem.elems['button-start'];
        
        startBtn.addEventListener('click', function(){
            gameField.style.pointerEvents = 'auto';
            interval = interfaceElem.startTime();
            gameField.classList.add('_active')
        })
        
        let restartBtn = interfaceElem.elems['button-restart'];
        restartBtn.addEventListener('click', function() {
            game = new Game(currentSize);
            interfaceElem.createGameField(game.getCells());
            gameItems = gameField.querySelectorAll('.game-field__item');

            interfaceElem.setTime('00:00:00');
            interfaceElem.stopTime();
            gameField.classList.remove('_active');
            gameField.style.pointerEvents = 'none';
            interfaceElem.changeMovements(0);
        })

        let saveBtn = interfaceElem.elems['button-save'];
        saveBtn.addEventListener('click', function() {
            let time = interfaceElem.elems['timer-hours'].textContent + ':' + interfaceElem.elems['timer-minutes'].textContent + ':' + interfaceElem.elems['timer-seconds'].textContent;
            game.setStats(interfaceElem.elems['movement-move'].textContent, time);
    
            storage.saveGame(game.getStats(), game.getCells());
        })

        let uploadBtn = interfaceElem.elems['button-upload'];
        uploadBtn.addEventListener('click', function() {
            let save = storage.getSave();
    
            if(Object.keys(save).length !== 0) {
                gameField.style.pointerEvents = 'none';
                let cells = save['arrayCells'];
                game = new Game(cells.length, cells);
                currentSize = cells.length;
                interfaceElem.createGameField(game.getCells());
                gameItems = gameField.querySelectorAll('.game-field__item');

                let time = JSON.parse(save['stats'])['time'];
                let move = JSON.parse(save['stats'])['movements']
                interfaceElem.stopTime();
                interfaceElem.setTime(time);
                interfaceElem.changeMovements(move);

                gameField.style.gridTemplateColumns = `repeat(${currentSize}, 1fr)`;
                gameField.style.gridTemplateRows = `repeat(${currentSize}, 1fr)`;
                gameField.classList.remove('_active');
            }
        })

        let resultsBtn = interfaceElem.elems['button-results'];
        resultsBtn.addEventListener('click', function() {
            interfaceElem.fillTableResults(storage.getTableResults());
            interfaceElem.elems['table'].classList.add('_active');

            interfaceElem.stopTime();
        })
        
        let overlay = interfaceElem.elems['overlay'];
        overlay.addEventListener('click', function() {
            interfaceElem.elems['table'].classList.remove('_active');
            gameField.classList.remove('_active');
            interfaceElem.elems['win-message'].classList.remove('_active');
        });

        let soundBtn = interfaceElem.elems['button-sound'];
        soundBtn.addEventListener('click', function() {
            if(audio.volume == 0) {
                audio.volume = 1;
            }else {
                audio.volume = 0;
            }
        })
    }
}

const app = new App();
app.render();
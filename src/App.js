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
        interfaceElem.createGameField(game.getCells());

        let gameField = interfaceElem.elems['game-field'];
        let gameItems = gameField.querySelectorAll('.game-field__item');
        let resize = interfaceElem.elems['resize'];
        let resizeItems = resize.querySelectorAll('.resize__size');

        resize.addEventListener('click', function(event) {
            console.log(true)
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
        })

        gameField.addEventListener('click', function(event) {
           for(let item of gameItems) {
            if(item.contains(event.target)) {
                interfaceElem.moveCell(item, game.moveCell(item.textContent));
                interfaceElem.changeMovements();
                if(game.checkFinish()){
                    let time = interfaceElem.elems['timer-hours'].textContent + ':' + interfaceElem.elems['timer-minutes'].textContent + ':' + interfaceElem.elems['timer-seconds'].textContent;
                    gameField.style.pointerEvents = 'none';
                    interfaceElem.setWinMessage(interfaceElem.elems['movement-move'].textContent,time)
                    interfaceElem.elems['win-message'].style.display = 'block';
                    interfaceElem.stopTime();
                }
            }
           }
        })

        let startBtn = interfaceElem.elems['button-start'];
        startBtn.addEventListener('click', function(){
            gameField.style.pointerEvents = 'auto';
            interval = interfaceElem.startTime();
        })
        
        let restartBtn = interfaceElem.elems['button-restart'];
        restartBtn.addEventListener('click', function() {
            game = new Game(currentSize);
            interfaceElem.createGameField(game.getCells());
            gameItems = gameField.querySelectorAll('.game-field__item');

            interfaceElem.setTime('00:00:00');
            interfaceElem.startTime();
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
            }
        })
    }
}

const app = new App();
app.render();
alert('Привет! Проверь, пожалуйста работу 25.10 вечером\nЧуть-чуть осталось доделать, спать уже хочу :( Можешь пока поставить 0, но оставить контакты, чтобы я могла связаться и попросить перепроверить\nСпасибо!')
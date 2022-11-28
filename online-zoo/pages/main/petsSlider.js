import animalsData from '../../data/animals.js'


// function preloadImages(images) {
//     images.forEach((image, i) => {
//         image = new Image();
//         image.src = images[i].images;
//     })
// }

// document.addEventListener('DOMContentLoaded', function() {
//     preloadImages(animalsData);
// });

let cards1 = document.querySelectorAll('.pets__cards_top > .pets__cards');
let cards2 = document.querySelectorAll('.pets__cards_bottom > .pets__cards');
const arrowLeft = document.querySelector('.pets__arrow_left');
const arrowRight = document.querySelector('.pets__arrow_right');

let currentCard = 0;

let isEnable = true;

function getRandomNum() {
    return Math.floor((Math.random() * animalsData.length));
}

function getNumbersCards() {
    let numsCards = [];
    for(let i = 0; i < 6; i++) {
        let randomNum = getRandomNum();
        while(numsCards.includes(randomNum)) {
            randomNum = getRandomNum();
        }
        numsCards.push(randomNum);
    }

    return numsCards;
}

function generateCards(index) {
    let numsCards = getNumbersCards();
    let indexArray = 0;
    for(let card of cards1[index].children) {
        let img = card.querySelector('.card__img img');
        img.src = animalsData[numsCards[indexArray]].images;

        let name = card.querySelector('.card__name');
        name.textContent = animalsData[numsCards[indexArray]].name;

        let location = card.querySelector('.card__location');
        location.textContent = animalsData[numsCards[indexArray]].location;

        let cardBottom = card.querySelector('.card__bottom');
        cardBottom.className = `card__bottom card__bottom_${animalsData[numsCards[indexArray]].icon}`;

        indexArray++;
    }

    for(let card of cards2[index].children) {
        let img = card.querySelector('.card__img img');
        img.src = animalsData[numsCards[indexArray]].images;

        let name = card.querySelector('.card__name');
        name.textContent = animalsData[numsCards[indexArray]].name;

        let location = card.querySelector('.card__location');
        location.textContent = animalsData[numsCards[indexArray]].location;

        let cardBottom = card.querySelector('.card__bottom');
        cardBottom.className = `card__bottom card__bottom_${animalsData[numsCards[indexArray]].icon}`;

        indexArray++;
    }
    
}

function getCurrentCard(n) {
    return Math.abs(n % cards1.length);
}

function toggleState(state, index) {
    if(cards1[index].classList.contains(`_${state}`)) {
        cards1[index].classList.remove(`_${state}`);
        cards2[index].classList.remove(`_${state}`);
    }else {
        cards1[index].classList.add(`_${state}`);
        cards2[index].classList.add(`_${state}`);
    }
}

function moveLeft() {
    cards1[currentCard].style.animationName = 'move-left';
    cards2[currentCard].style.animationName = 'move-left';
    
    cards1[getCurrentCard(currentCard + 1)].style.animationName = 'move-left-next';
    cards2[getCurrentCard(currentCard + 1)].style.animationName = 'move-left-next';
    
    currentCard = getCurrentCard(currentCard + 1);
}

function moveRight() {
    cards1[currentCard].style.animationName = 'move-right';
    cards2[currentCard].style.animationName = 'move-right';

    cards1[getCurrentCard(currentCard - 1)].style.animationName = 'move-right-prev';
    cards2[getCurrentCard(currentCard - 1)].style.animationName = 'move-right-prev';

    currentCard = getCurrentCard(currentCard - 1);
}

function clickArrowRight() {
    if(isEnable) {
        isEnable = false;
        toggleState('next',getCurrentCard(currentCard + 1));
        generateCards(getCurrentCard(currentCard + 1));
        setTimeout(moveLeft, 100);
        setTimeout(function() {
            toggleState('active', getCurrentCard(currentCard - 1));
            toggleState('active', currentCard);
            toggleState('next', currentCard);
            isEnable = true;
        },1000)
    }
}

function clickArrowLeft() {
    if(isEnable) {
        isEnable = false;
        toggleState('prev', getCurrentCard(currentCard - 1));
        generateCards(getCurrentCard(currentCard - 1));
        setTimeout(moveRight, 100);
        
        setTimeout(function() {
            toggleState('active',getCurrentCard(currentCard + 1));
            toggleState('active',currentCard);
            toggleState('prev',currentCard);
            isEnable = true;
        },900)
    }
}

arrowRight.addEventListener('click', clickArrowRight)

arrowLeft.addEventListener('click', clickArrowLeft)
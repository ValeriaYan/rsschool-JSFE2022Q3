const burger = document.querySelector('.burger-menu')
const burgerIcon = document.querySelector('.header__burger-icon');
const burgerClose = document.querySelector('.burger-menu__close');
const overlay = document.querySelector('.burger-menu > .overlay');

function toggleBurger() {
    burger.classList.toggle('_active');
}

burgerIcon.addEventListener('click', toggleBurger);
burgerClose.addEventListener('click', toggleBurger);
overlay.addEventListener('click', toggleBurger);
const mediaQuery = window.matchMedia('(max-width: 640px)')

const reviewsBlock = document.querySelector('.testimonials__reviews');
const reviewItems = document.querySelectorAll('.testimonials__review > .review');
const popup = document.querySelector('.popup');
const overlayPopup = document.querySelector('.popup > .overlay');
const popupClose = document.querySelector('.popup__close');

function togglePopup() {
    popup.classList.toggle('_active');
    if(popup.classList.contains('_active')) {
        document.body.style.overflow = 'hidden';
    }else {
        document.body.style.overflow = 'auto'
    }
}

function fillPopup(review){
    let currentName = popup.querySelector(".review__name");
    let currentLocal = popup.querySelector('.review__local');
    let currentText = popup.querySelector('.review__text p');
    let currentAvatar = popup.querySelector('.review__avatar img')

    let name = review.querySelector(".review__name").textContent;
    let local = review.querySelector('.review__local').textContent;
    let text = review.querySelector('.review__text p').textContent;
    let avatar = review.querySelector('.review__avatar img');
    if(avatar !== null) {
        avatar = avatar.src;
        currentAvatar.src = avatar;
    }else {
        currentAvatar.src = "";
    }

    currentName.textContent = name;
    currentLocal.textContent = local;
    currentText.textContent = text;
}

if(document.body.offsetWidth <= 640){
    reviewsBlock.addEventListener('click', function(event) {
        for(let item of reviewItems){
            if(item.contains(event.target)){
                fillPopup(item);
                togglePopup();
            }
        }
    })
}

overlayPopup.addEventListener('click', togglePopup);
popupClose.addEventListener('click', togglePopup)
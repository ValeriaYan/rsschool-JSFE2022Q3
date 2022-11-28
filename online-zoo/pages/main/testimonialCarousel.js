const range = document.querySelector('.testimonials__range');
const reviews = document.querySelectorAll('.testimonials__review');

range.addEventListener('input', function() {
    let valueRange = range.value;
    let widthReview = reviews[0].offsetWidth;
    for(let review of reviews) {
        review.style.left = -(valueRange * widthReview) + "px";
    }
})
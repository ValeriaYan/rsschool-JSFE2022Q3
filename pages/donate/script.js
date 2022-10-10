const amountInput = document.querySelector('.amount__input input');
const amountScaleItems = document.querySelectorAll('.amount__scale-item');
const amountScaleInputs = document.querySelectorAll('.amount__scale-item input')
const amountScale = document.querySelector('.amount__scale');

amountScale.addEventListener('click', function(event) {
    for(let item of amountScaleItems) {
        if(item.contains(event.target)) {
            let input = item.querySelector('.amount__scale-item input');
            amountInput.value = input.value;
        }
    }
})

amountInput.addEventListener('input', function() {
    for(let item of amountScaleInputs) {
        if(item.value == amountInput.value) {
            item.checked = true;
        }else{
            item.checked = false;
        }
    }
    if(amountInput.value.length > 4) {
        amountInput.value = amountInput.value.slice(0, 4);
    }
})
const defaultChecked = document.querySelector('.amount__scale-item input[value="100"]')
const amountInput = document.querySelector('.amount__input input');
const amountScaleItems = document.querySelectorAll('.amount__scale-item');
const amountScaleInputs = document.querySelectorAll('.amount__scale-item input')
const amountScale = document.querySelector('.amount__scale');

amountScale.addEventListener('click', function(event) {
    for(let item of amountScaleItems) {
        if(item.contains(event.target)) {
            let input = item.querySelector('.amount__scale-item input');
            console.log(input.value)
            amountInput.value = input.value;
        }
    }
})

amountInput.addEventListener('input', function() {
    for(let item of amountScaleInputs) {
        if(item.value == amountInput.value) {
            console.log(item.value)
            console.log(amountInput.value)
            item.checked = true;
        }
        if(amountInput.value == ''){
            defaultChecked.checked = true;
        }
    }
})
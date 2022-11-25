let currencyOne = document.querySelectorAll('#currencyOne'); 
let currencyTwo = document.querySelectorAll('#currencyTwo'); 
let inputCurrencyOne = document.querySelector('#number__class__one');  
let inputCurrencyTwo = document.querySelector('#number__class__two'); 
let parCorOne = document.querySelector('#currency__coursOne');
let parCorTwo = document.querySelector('#currency__coursTwo');

let one = 'RUB';
let two = 'USD';
const ACTIVE_CURRENCY_COLOR = '#C6C6C6';
let sum = inputCurrencyOne.value = 1;
let sumTwo = inputCurrencyTwo.value;
let flag = true;

currencyOne.forEach((currencyOne) => {  
    if(currencyOne.innerText == one) {     
        currencyOne.style.background = '#833AE0';
        currencyOne.style.color = 'white'; 
    }
    currencyOne.addEventListener('click', clickButtonCurrencyOne);
});

currencyTwo.forEach((currencyTwo) => {  
    if(currencyTwo.innerText == two) {
        currencyTwo.style.background = '#833AE0';
        currencyTwo.style.color = 'white'; 
    }
    currencyTwo.addEventListener('click', clickButtonCurrencyTwo);
});
   
function clickButtonCurrencyOne(event) {
    currencyOne.forEach((currencyOne) => {  
        if(currencyOne.style.background !== '') {
            currencyOne.style.background = '';
            currencyOne.style.color = ACTIVE_CURRENCY_COLOR;
        }
    });
    event.target.style.background = '#833AE0';
    event.target.style.color = 'white';
    one = event.target.innerText;
    result();
}

function clickButtonCurrencyTwo(event) {
    currencyTwo.forEach((currencyTwo) => {  
        if(currencyTwo.style.background !== '') {
            currencyTwo.style.background = '';
            currencyTwo.style.color = ACTIVE_CURRENCY_COLOR;  
        }
    });
    event.target.style.background = '#833AE0';
    event.target.style.color = 'white';
    two = event.target.innerText;
    result();
}

function result () {
    sum = inputCurrencyOne.value;
    sumTwo = inputCurrencyTwo.value;
    converter();
}

function converter() { 
    let urlTwo = `https://api.exchangerate.host/convert?from=${one}&to=${two}&amount=1`;
    fetch(urlTwo)
    .then(res => res.json())
    .then(data => {
        parCorOne.innerText = `1 ${one} = ${data.result.toFixed(4)} ${two}`;
    })   
    let urlThree = `https://api.exchangerate.host/convert?from=${two}&to=${one}&amount=1`;
    fetch(urlThree)
    .then(res => res.json())
    .then(data => {
        parCorTwo.innerText = `1 ${two} = ${data.result.toFixed(4)} ${one}`;
    })   
    if(flag == true && one == two) { 
        inputCurrencyTwo.value = inputCurrencyOne.value;
        return;
    }
    if(flag == false && two == one) { 
        inputCurrencyOne.value = inputCurrencyTwo.value;
        return;
    }
    if(flag == true) {
        let url = `https://api.exchangerate.host/convert?from=${one}&to=${two}&amount=${sum}`;
        fetch(url)
        .then(res => res.json())
        .then(data => {
        inputCurrencyTwo.value = data.result.toFixed(4);
        })
        .catch((err) => {
            alert('Что-то пошло не так!');
   })
    } if(flag == false) {
        let url = `https://api.exchangerate.host/convert?from=${two}&to=${one}&amount=${sumTwo}`;
        fetch(url)
        .then(res => res.json())
        .then(data => {
         inputCurrencyOne.value = data.result.toFixed(4);
        })
        .catch((err) => {
            alert('Что-то пошло не так!');
        })
    }
}
converter();
inputCurrencyOne.addEventListener('click', rev); 
inputCurrencyTwo.addEventListener('click', revTwo);

function rev() {
    flag = true;
};

function revTwo() {
    flag = false;
};


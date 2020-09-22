let calcScreen = document.querySelector('#input');
let calcBody = document.querySelector('#calc-body');

let numButtons = document.querySelectorAll('.btn-num');
let decimalButton = document.querySelector('#decimal');
let negativeButton = document.querySelector('#negative');

let opButtons = document.querySelectorAll('.btn-op');
let equalButton = document.querySelector('#equals');
let clearButton = document.querySelector('#clear');

let colorPicker = document.querySelector('#color-picker');
let flipButton = document.querySelector('#flip');

// Event listeners for buttons
numButtons.forEach(btn => {
    btn.addEventListener('click', numPress);
})

decimalButton.addEventListener('click', addDecimal);

negativeButton.addEventListener('click', makeNegative);

opButtons.forEach(btn => {
    btn.addEventListener('click', opPress);
})

equalButton.addEventListener('click', equals);

clearButton.addEventListener('click', clear);

colorPicker.addEventListener('change', changeBackground);

flipButton.addEventListener('click', flip);


//functions for button presses
function numPress(e) {
    let num = e.target.getAttribute('id');
    let input = document.querySelector('.current-input');
    let prevInput = document.querySelector('.previous-input');

    if(input.textContent == '' && input.textContent !== 'ERROR TOO LARGE') {
        input.textContent = num;
    }
    else {
        if(input.textContent.length <= 15 && !prevInput && input.textContent !=='ERROR TOO LARGE'
            || (input.textContent.length + prevInput.textContent.length) <14) {
            input.textContent = input.textContent.concat(num);
        }
        else {
            clear();
            let input = document.querySelector('.current-input');
            input.textContent = 'ERROR TOO LARGE';
        }
    }
}

function addDecimal() {
    let currentInput = document.querySelector('.current-input')
    let currentNumber = currentInput.textContent;
    console.log(currentNumber.indexOf('.'));
    if(currentNumber.indexOf('.') == -1) {
        currentInput.textContent = currentNumber.concat('.');
    }
}

function makeNegative() {
    let currentInput = document.querySelector('.current-input')
    let currentNumber = currentInput.textContent;

    currentInput.textContent = currentNumber * -1;
}

function opPress(e) {
    let op = parseOp(e.target.getAttribute('id'));
    let prevInput = document.querySelector('.previous-input');
    let currentInput = document.querySelector('.current-input');
    
    //Checks if there is are already 2 numbers. If not, it moves the current number over, adds the operator symbol, and creates a new current number
    if(!prevInput) {
        let newInput = document.createElement('span');
        let opInput = document.createElement('span');
        opInput.classList.add('prevOp');
        currentInput.classList.remove('current-input');
        currentInput.classList.add('previous-input');
        newInput.classList.add('current-input');
        opInput.textContent = op;
        newInput.textContent = '';

        calcScreen.appendChild(opInput);
        calcScreen.appendChild(newInput);
    }

    //If there are two numbers, perform the operation and prepare for a new input.
    else {
        let prevOpInput = document.querySelector('.prevOp')
        let prevOp = prevOpInput.textContent;
        let num1 = parseFloat(prevInput.textContent);
        let num2 = parseFloat(currentInput.textContent);

        let result = calculate(prevOp, num1, num2);
        
        prevInput.textContent = result;
        prevOpInput.textContent = op;
        currentInput.textContent = '';
    }
}

function equals() {
        let prevInput = document.querySelector('.previous-input');
        let currentInput = document.querySelector('.current-input');
        let prevOpInput = document.querySelector('.prevOp')
        let prevOp = prevOpInput.textContent;
        let num1 = parseFloat(prevInput.textContent);
        let num2 = parseFloat(currentInput.textContent);

        let result = calculate(prevOp, num1, num2);
        if(result.toFixed(5).length > 16) {
            currentInput.textContent = 'ERROR: TOO LARGE';
        }
        else {
            currentInput.textContent = parseFloat(result.toFixed(5));
        }
        
        calcScreen.removeChild(prevInput);
        calcScreen.removeChild(prevOpInput);
}

function clear() {
    while(calcScreen.firstChild) {
        calcScreen.removeChild(calcScreen.firstChild);
    }
    let newInput = document.createElement('span');
    newInput.classList.add('current-input');
    calcScreen.appendChild(newInput);
}


function parseOp(op) {
    switch(op) {
        case 'plus':
            return '+';
            break;

        case 'minus':
            return '-';
            break;
        
        case 'divide':
            return '/';
            break;

        case'multiply':
        return '*';
        break;
    }
}

function calculate(operator, num1, num2) {
    switch(operator) {
        case '+':
            return add(num1, num2);
            break;

        case '-':
            return subtract(num1, num2);
            break;
        
        case '/':
            return divide(num1, num2);
            break;

        case '*':
            return multiply(num1, num2);
            break;
    }
}

// OPERATOR FUNCTIONS
function add(a,b) {
    return a + b;
}

function subtract(a,b) {
    return a - b;
}

function multiply(a,b) {
    return a * b;
}

function divide(a,b) {
    return a / b;
}




//Keyboard listener
// window.addEventListener('keydown', keydownHandler);

// function keydownHandler(e) {
//     let key = e.key;
//      if(/[0-9]/.test(key)) {
//          numHandler(key);
//      }

//      else if(/[+|\-|\*|\/]/.test(key)) {
//          operatorHandler(key);
//      }
// }

// function numHandler(key) {
//     console.log(key + ' is a number');
// }

// function operatorHandler(key) {
//     console.log(key + ' is an operator');
// }

function flip() {
    calcBody.classList.toggle('flip');
}

function changeBackground() {
    calcBody.style.background = colorPicker.value;
}

colorPicker.value = "#347586";
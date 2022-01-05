const display = document.querySelector('.display');
const clearBtn = document.querySelector('.clear')
let firstNumber;
let secondNumber;
let oldSecondNumber;
let operatorValue;
let isCleared = false;

// Create the basic math functions
function add(num1, num2){
  return +(parseFloat(num1) + parseFloat(num2)).toFixed(2);
}

function subtract(num1, num2) {
  return +(parseFloat(num1) - parseFloat(num2)).toFixed(2);
}

function multiply(num1, num2){
  return +(parseFloat(num1) * parseFloat(num2)).toFixed(2);
}

function divide(num1, num2){
  return +(parseFloat(num1) / parseFloat(num2)).toFixed(2);
}

// Create operator function
function operate(operator, num1, num2, clear){
  if (!operator || !num1 || !num2 || !clear){
    return 'Error.';
  }
  if (operator === '+'){
    return add(num1, num2);
  } else if (operator === '-') {
    return subtract(num1, num2);
  }else if (operator === '/') {
    return divide(num1, num2);
  }else if (operator === '*') {
    return multiply(num1, num2);
  }
}

// Change background color when number key is pressed
const allButtons = document.querySelectorAll('.btn');
allButtons.forEach((btn) => {
  btn.addEventListener('mousedown', () => {
    btn.classList.toggle('num-pressed');
  });
  btn.addEventListener('mouseup', () => {
    btn.classList.toggle('num-pressed');
  });
});

// Change background color when operator key is pressed
const opButtons = document.querySelectorAll('.btn-op');
opButtons.forEach((btn) => {
  btn.addEventListener('mousedown', () => {
    btn.classList.toggle('operator-pressed');
  });
  btn.addEventListener('mouseup', () => {
    btn.classList.toggle('operator-pressed');
  });
});

// Clear display div and reset global variables when clear button is pressed
function clearDisplay(){
  display.innerText = '';
  firstNumber = null;
  secondNumber = null;
  operatorValue = null;
  isCleared = false;
}

clearBtn.addEventListener('click', clearDisplay);

// Function to populate display with clicked number
function populateDisplay(obj){
  if(!isCleared) {
    display.innerText = '';
    isCleared = true;
  }
  if(obj.type === 'keypress'){
    display.innerText += obj.key;
  } else {
    display.innerText += obj.target.innerText
  }
}

const numButtons = document.querySelectorAll('.btn-num');
numButtons.forEach((btn) => {
  btn.addEventListener('click', populateDisplay);
});


// Function for decimal button
function addDecimal(){
  if(!isCleared) {
    display.innerText = '';
    isCleared = true;
  }
  if(display.innerText.indexOf('.') !== -1){
    return
  }
  display.innerText += '.';
}

const decBtn = document.querySelector('.btn-dec');
decBtn.addEventListener('click', addDecimal);

// Function for the backspace button
function backspace(){
  let displayText = display.innerText;
  displayText = displayText.slice(0,-1);
  display.innerText = displayText;
}

const backBtn = document.querySelector('.btn-back');
backBtn.addEventListener('click', backspace);

// Function to run when operator buttons are pressed
function selectOperator(obj){
  if(!firstNumber) {
    firstNumber = display.innerText;
    if(obj.type === 'keypress'){
      operatorValue = obj.key;
    } else {
      operatorValue = obj.target.innerText;
    }
    console.log(firstNumber);
    isCleared = false;
  } else {
    secondNumber = display.innerText;
    console.log(secondNumber);
    let displayOutput = operate(operatorValue, firstNumber, secondNumber, isCleared);
    isCleared = false;
    if(obj.type === 'keypress'){
      operatorValue = obj.key;
    } else {
      operatorValue = obj.target.innerText;
    }
    console.dir(displayOutput);
    display.innerText = displayOutput;
    firstNumber = displayOutput;
    secondNumber = null; 
  }
  
  
}
                                                                           
const operatorButtons = document.querySelectorAll('.btn-operator');
operatorButtons.forEach((btn) => {
  btn.addEventListener('click', selectOperator);
});

// Run operate function when equals sign is pressed
function evaluate(){
  if(!isCleared && firstNumber === null && operatorValue){
    firstNumber = display.innerText
    display.innerText = operate(operatorValue, firstNumber, oldSecondNumber, true);
    firstNumber = null;
  } else {
    oldSecondNumber = display.innerText;
    secondNumber = display.innerText;
    display.innerText = operate(operatorValue, firstNumber, secondNumber, isCleared);
    isCleared = false;
    firstNumber = null;
    secondNumber = null;
  }
}

const equalsBtn = document.getElementById('equals')
equalsBtn.addEventListener('click', evaluate);

// Event listeners for keypresses
document.addEventListener('keypress', (event) => {
  if(isFinite(event.key)){
    populateDisplay(event);
  } else if(event.key === '+' || event.key === '-' || event.key === '/' || event.key === '*'){
    selectOperator(event);
  } else if(event.key === 'Enter'){
    evaluate();
  } else if(event.key === '.'){
    addDecimal();
  }
})
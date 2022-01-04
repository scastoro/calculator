// Create the basic math functions
function add(num1, num2){
  return parseFloat(num1) + parseFloat(num2);
}

function subtract(num1, num2) {
  return parseFloat(num1) - parseFloat(num2);
}

function multiply(num1, num2){
  return parseFloat(num1) * parseFloat(num2);
}

function divide(num1, num2){
  return parseFloat(num1) / parseFloat(num2);
}

// Create operator function
function operate(operator, num1, num2){
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
const display = document.querySelector('.display');
const clearBtn = document.querySelector('.clear')
let firstNumber;
let secondNumber;
let operatorValue;
let isCleared = true;

// Clear display div when clear button is pressed
function clearDisplay(){
  display.innerText = '';
  firstNumber = null;
  secondNumber = null;
  operatorValue = null;
}

clearBtn.addEventListener('click', clearDisplay);

// Function to populate display with clicked number
function populateDisplay(obj){
  if(isCleared) {
    display.innerText = '';
    isCleared = false;
  }
  display.innerText += obj.target.innerText
  console.dir(obj.target.innerText);
}

const numButtons = document.querySelectorAll('.btn-num');
numButtons.forEach((btn) => {
  btn.addEventListener('click', populateDisplay);
});

// Function to run when operator buttons are pressed
function selectOperator(obj){
  if(!firstNumber) {
    firstNumber = display.innerText;
    operatorValue = obj.target.innerText;
    console.log(firstNumber);
    isCleared = true;
  } else {
    secondNumber = display.innerText;
    console.log(secondNumber);
    let displayOutput = operate(operatorValue, firstNumber, secondNumber);
    operatorValue = obj.target.innerText;
    console.dir(displayOutput);
    display.innerText = displayOutput;
    firstNumber = displayOutput;
    secondNumber = null;
    isCleared = true;
  }
  
  
}

const operatorButtons = document.querySelectorAll('.btn-operator');
operatorButtons.forEach((btn) => {
  btn.addEventListener('click', selectOperator);
});

// Run operate function when equals sign is pressed
function evaluate(){
  secondNumber = display.innerText;
  display.innerText = operate(operatorValue, firstNumber, secondNumber);
  isCleared = true;
  firstNumber = null;
  secondNumber = null;
}

const equalsBtn = document.getElementById('equals')
equalsBtn.addEventListener('click', evaluate);
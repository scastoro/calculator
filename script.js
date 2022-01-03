// Create the basic math functions
function add(num1, num2){
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2){
  return num1 * num2;
}

function divide(num1, num2){
  return num1 / num2;
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

// Clear display div when clear button is pressed
function clearDisplay(){
  display.innerText = '';
}

clearBtn.addEventListener('click', clearDisplay);

// Function to populate display with clicked number
function populateDisplay(obj){
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
  } else {
    secondNumber = display.innerText;
    operate(operatorValue, firstNumber, secondNumber);
  }
  operatorValue = obj.target.innerText;
  console.dir(operatorValue);
  display.innerText = '';
}

const operatorButtons = document.querySelectorAll('.btn-operator');
operatorButtons.forEach((btn) => {
  btn.addEventListener('click', selectOperator);
});
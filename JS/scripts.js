// select the elements that I want to manipulate in my calcualtor
// Frontend - HTML/CSS/JS Flexbox - grid layout - OO/ Class, Methods and Obj. DOM
const previousOperationText = document.querySelector('#previous-operation');
const currentOperationText = document.querySelector('#current-operation');
const buttons = document.querySelectorAll('#buttons-container button');

// OO
class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperation = '';
  }

  //Inserting numbers
  addDigit(digit) {
    // check if current op already has a dot
    if (digit === '.' && this.currentOperationText.innerText.includes('.')) {
      return;
    }
    this.currentOperation = digit;
    this.updateScreen();
  }

  // Process all calc operation
  processOperation(operation) {
    // Check if current is empty
    if (this.currentOperationText.innerText === '' && operation !== 'C') {
      // Change op
      if (this.previousOperationText.innerText !== '') {
        this.changeOperation(operation);
      }
      return;
    }

    //Get current and previous value
    let operationValue;
    const previous = +this.previousOperationText.innerText.split(' ')[0];
    const current = +this.currentOperationText.innerText;

    switch (operation) {
      case '+':
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case '-':
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case '/':
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case '*':
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case 'DEL':
        this.processDelOperator();
        break;
      case 'CE':
        this.processCEOperator();
        break;
      case 'C':
        this.processClearOperator();
        break;
      case '=':
        this.processEqualOperator();
        break;
      default:
        return;
    }
  }

  // change values of calc screen
  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null,
  ) {
    if (operationValue === null) {
      this.currentOperationText.innerText += this.currentOperation;
    } else {
      //checking
      if (previous === 0) {
        operationValue = current;
      }
      // Add current value to previous
      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = '';
    }
  }
  // change math op
  changeOperation(operation) {
    const mathOperation = ['*', '/', '+', '-'];

    if (!mathOperation.includes(operation)) {
      return;
    }
    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operation;
  }
  //Dele last dig
  processDelOperator() {
    this.currentOperationText.innerText =
      this.currentOperationText.innerText.slice(0, -1);
  }
  // Clear current op
  processCEOperator() {
    this.currentOperationText.innerText = '';
  }
  // Clear all op
  processClearOperator() {
    this.currentOperationText.innerText = '';
    this.previousOperationText.innerText = '';
  }
  // Equal op
  processEqualOperator() {
    const operation = previousOperationText.innerText.split(' ')[1];

    this.processOperation(operation);
  }
}

const calc = new Calculator(previousOperationText, currentOperationText);

// Get values from buttons
buttons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const value = e.target.innerText;

    //Separating operations from numbers
    if (+value >= 0 || value === '.') {
      calc.addDigit(value);
    } else {
      calc.processOperation(value);
    }
  });
});

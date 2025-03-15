class Calculator {
  constructor(op1element, op2element) {
    this.op1element = op1element;
    this.op2element = op2element;
    this.clear();
  }

  clear() {
    this.op1 = 0;
    this.op2 = 0;
    this.operator = "";
    this.updateUI();
  }

  updateUI() {
    this.op1element.innerHTML = this.op1 + this.operator;
    this.op2element.innerHTML = this.op2;
  }

  appendNumber(number) {
    if (number === "." && this.op2.includes(".")) return;
    this.op2 = this.op2 === 0 ? number : this.op2.toString() + number;

    this.updateUI();
  }

  delete() {
    if (this.op2 === 0) return;
    this.op2 = +this.op2.toString().slice(0, -1);

    this.updateUI();
  }

  operation(operator) {
    if (this.operator) {
      this.calc();
    }
    this.operator = operator;
    this.op1 = +this.op2 === 0 ? this.op1 : this.op2;
    this.op2 = 0;
    this.updateUI();
  }

  calc() {
    switch (this.operator) {
      case "+":
        this.op1 = +this.op1 + +this.op2;
        break;
      case "-":
        this.op1 = +this.op1 - +this.op2;
        break;
      case "*":
        this.op1 = +this.op1 * +this.op2;
        break;
      case "/":
        this.op1 = +this.op1 / +this.op2;
        break;
    }
    this.operator = "";
    this.op2 = 0;
    this.updateUI();
  }
}

const op1element = document.querySelector("[data-operand-1]");
const op2element = document.querySelector("[data-operand-2]");
const clearButton = document.querySelector("[data-clear]");
const numberButtons = document.querySelectorAll("[data-number]");
const deleteButton = document.querySelector("[data-delete]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector("[data-equal]");

const calculator = new Calculator(op1element, op2element);

clearButton.addEventListener("click", () => {
  calculator.clear();
});

numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerHTML);
  });
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
});

operationButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.operation(button.innerHTML);
  });
});

equalButton.addEventListener("click", () => {
  calculator.calc();
});

document.addEventListener("keydown", function(event) {
  const tecla = event.key;
  if (!isNaN(tecla)) {
    calculator.appendNumber(tecla);
  }

  if (tecla === "Backspace") {
    calculator.delete();
  }

  if (tecla === "Enter") {
    calculator.calc();
  }

  const operators = ["+","-","*","/"];

  if(operators.includes(tecla)){
      calculator.operation(tecla);

  }
});

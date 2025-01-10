const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperation = "";
  }

  // Adiciona um dígito à tela da calculadora
  addDigit(digit) {
    // Verifica se o número já contém um ponto decimal
    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      return;
    }

    this.currentOperation = digit;
    this.updateScreen();
  }

  // Processa todas as operações da calculadora
  processOperation(operation) {
    // Verifica se o valor atual está vazio
    if (this.currentOperationText.innerText === "" && operation !== "C") {
      // Altera a operação
      if (this.previousOperationText.innerText !== "") {
        this.changeOperation(operation);
      }
      return;
    }

    // Obtém os valores atual e anterior
    let operationValue;
    let previous = +this.previousOperationText.innerText.split(" ")[0];
    let current = +this.currentOperationText.innerText;

    switch (operation) {
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "*":
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "/":
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "DEL":
        this.processDelOperator();
        break;
      case "CE":
        this.processClearCurrentOperator();
        break;
      case "C":
        this.processClearOperator();
        break;
      case "=":
        this.processEqualOperator();
        break;
      default:
        return;
    }
  }

  // Atualiza os valores da tela da calculadora
  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    if (operationValue === null) {
      // Adiciona o número ao valor atual
      this.currentOperationText.innerText += this.currentOperation;
    } else {
      // Verifica se o valor é zero; se for, apenas adiciona o valor atual
      if (previous === 0) {
        operationValue = current;
      }

      // Se a operação é "=", limpa o texto anterior e destaca o resultado
      if (operation === "=") {
        this.previousOperationText.innerText = "";
        this.currentOperationText.innerText = operationValue;
      } else {
        // Adiciona o valor atual ao anterior com o operador
        this.previousOperationText.innerText = `${operationValue} ${operation}`;
        this.currentOperationText.innerText = "";
      }
    }
  }

  // Altera a operação matemática
  changeOperation(operation) {
    const mathOperations = ["*", "-", "+", "/"];

    if (!mathOperations.includes(operation)) {
      return;
    }

    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operation;
  }

  // Exclui um dígito
  processDelOperator() {
    this.currentOperationText.innerText =
      this.currentOperationText.innerText.slice(0, -1);
  }

  // Limpa a operação atual
  processClearCurrentOperator() {
    this.currentOperationText.innerText = "";
  }

  // Limpa todas as operações
  processClearOperator() {
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = "";
  }

  // Processa uma operação
  processEqualOperator() {
    let operation = this.previousOperationText.innerText.split(" ")[1];
    this.processOperation(operation);
    this.updateScreen(
      +this.previousOperationText.innerText.split(" ")[0],
      "="
    );
  }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;

    if (+value >= 0 || value === ".") {
      calc.addDigit(value);
    } else {
      calc.processOperation(value);
    }
  });
});

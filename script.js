let expression = "";

const expressionDisplay = document.getElementById("expression");
const resultDisplay = document.getElementById("result");

function updateDisplay() {
  expressionDisplay.textContent = expression || "0";
  resultDisplay.textContent = expression || "0";
}

function addValue(value) {
  const operators = ["+", "-", "*", "/", "%"];
  const lastChar = expression.slice(-1);

  if (value === "." && getCurrentNumber().includes(".")) {
    return;
  }

  if (operators.includes(value) && operators.includes(lastChar)) {
    expression = expression.slice(0, -1) + value;
  } else {
    expression += value;
  }

  updateDisplay();
}

function getCurrentNumber() {
  return expression.split(/[+\-*/%]/).pop();
}

function clearDisplay() {
  expression = "";
  updateDisplay();
}

function deleteLast() {
  expression = expression.slice(0, -1);
  updateDisplay();
}

function calculate() {
  try {
    if (!expression) return;

    const answer = Function('"use strict"; return (' + expression + ")")();

    if (!Number.isFinite(answer)) {
      resultDisplay.textContent = "Error";
      return;
    }

    expression = Number.isInteger(answer)
      ? answer.toString()
      : parseFloat(answer.toFixed(8)).toString();

    updateDisplay();
  } catch {
    resultDisplay.textContent = "Error";
  }
}

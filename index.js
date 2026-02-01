// Calculator state
let currentValue = "0";
let previousValue = null;
let operation = null;
let shouldResetDisplay = false;

// Get DOM elements
const display = document.querySelector(".display");
const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-action]");

// Initialize calculator
function init() {
  updateDisplay();
}

// Update display
function updateDisplay() {
  display.textContent = currentValue;
}

// Initialize on page load
init();

// Handle number button clicks
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const number = button.dataset.number;

    if (shouldResetDisplay) {
      currentValue = number;
      shouldResetDisplay = false;
    } else {
      if (currentValue === "0") {
        currentValue = number;
      } else {
        currentValue += number;
      }
    }

    updateDisplay();
  });
});
// Handle decimal point
function handleDecimal() {
  if (shouldResetDisplay) {
    currentValue = "0.";
    shouldResetDisplay = false;
  } else if (!currentValue.includes(".")) {
    currentValue += ".";
  }
  updateDisplay();
}

//Clear calculator
function clear() {
  currentValue = "0";
  previousValue = null;
  operation = null;
  shouldResetDisplay = false;
  updateDisplay();
}

// Handle percentage
function handlePercent() {
  currentValue = (parseFloat(currentValue) / 100).toString();
  updateDisplay();
}

// Handle negate
function handleNegate() {
  if (currentValue !== "0") {
    currentValue = (parseFloat(currentValue) * -1).toString();
    updateDisplay();
  }
}

// Perform calculation
function calculate(a, b, op) {
  const num1 = parseFloat(a);
  const num2 = parseFloat(b);

  switch (op) {
    case "add":
      return num1 + num2;
    case "subtract":
      return num1 - num2;
    case "multiply":
      return num1 * num2;
    case "divide":
      return num2 !== 0 ? num1 / num2 : "Error";
    default:
      return num2;
  }
}

// Handle operator
function handleOperator(op) {
  if (previousValue === null) {
    previousValue = currentValue;
    operation = op;
    shouldResetDisplay = true;
  } else if (operation) {
    const result = calculate(previousValue, currentValue, operation);
    currentValue = result.toString();
    previousValue = currentValue;
    operation = op;
    shouldResetDisplay = true;
    updateDisplay();
  }
}

// Handle equals
function handleEquals() {
  if (operation && previousValue !== null) {
    const result = calculate(previousValue, currentValue, operation);
    currentValue = result.toString();
    previousValue = null;
    operation = null;
    shouldResetDisplay = true;
    updateDisplay();
  }
}
// Event listeners for operators and functions
operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.action;

    switch (action) {
      case "clear":
        clear();
        break;
      case "negate":
        handleNegate();
        break;
      case "percent":
        handlePercent();
        break;
      case "decimal":
        handleDecimal();
        break;
      case "equals":
        handleEquals();
        break;
      case "add":
      case "subtract":
      case "multiply":
      case "divide":
        handleOperator(action);
        break;
    }
  });
});

// Keyboard support
document.addEventListener("keydown", (e) => {
  if (e.key >= "0" && e.key <= "9") {
    const btn = document.querySelector(`[data-number="${e.key}"]`);
    if (btn) btn.click();
  } else if (e.key === ".") {
    const btn = document.querySelector('[data-action="decimal"]');
    if (btn) btn.click();
  } else if (e.key === "Enter" || e.key === "=") {
    e.preventDefault();
    const btn = document.querySelector('[data-action="equals"]');
    if (btn) btn.click();
  } else if (e.key === "Escape" || e.key === "c" || e.key === "C") {
    const btn = document.querySelector('[data-action="clear"]');
    if (btn) btn.click();
  } else if (e.key === "+") {
    const btn = document.querySelector('[data-action="add"]');
    if (btn) btn.click();
  } else if (e.key === "-") {
    const btn = document.querySelector('[data-action="subtract"]');
    if (btn) btn.click();
  } else if (e.key === "*") {
    const btn = document.querySelector('[data-action="multiply"]');
    if (btn) btn.click();
  } else if (e.key === "/") {
    e.preventDefault();
    const btn = document.querySelector('[data-action="divide"]');
    if (btn) btn.click();
  } else if (e.key === "%") {
    const btn = document.querySelector('[data-action="percent"]');
    if (btn) btn.click();
  }
});

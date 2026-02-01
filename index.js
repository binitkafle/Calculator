// Calculator state
let currentValue = "0";
let previousValue = null;
let operation = null;
let shouldResetDisplay = false;
let lastPressedEquals = false;

// Get DOM elements
const displayCurrent =
  document.querySelector(".display-current") ||
  document.querySelector(".display");
const displayPrevious = document.querySelector(".display-previous");
const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-action]");

// Initialize calculator
function init() {
  updateDisplay();
}

// Update display
function updateDisplay() {
  if (displayCurrent) {
    displayCurrent.textContent = formatDisplay(currentValue);
  }
  if (displayPrevious) {
    displayPrevious.textContent = formatPrevious();
  }
}

function formatDisplay(value) {
  if (value === "Error") return value;
  const [integer, decimal] = value.split(".");
  const formattedInt = Number(integer).toLocaleString("en-US", {
    maximumFractionDigits: 0,
  });
  return decimal !== undefined ? `${formattedInt}.${decimal}` : formattedInt;
}

function formatPrevious() {
  if (previousValue === null || operation === null) return "";
  const symbolMap = {
    add: "+",
    subtract: "−",
    multiply: "×",
    divide: "÷",
  };
  return `${formatDisplay(previousValue)} ${symbolMap[operation]}`;
}

function resetIfError() {
  if (currentValue === "Error") {
    currentValue = "0";
    previousValue = null;
    operation = null;
    shouldResetDisplay = false;
  }
}

// Initialize on page load
init();

// Handle number button clicks
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    resetIfError();
    const number = button.dataset.number;

    if (shouldResetDisplay || currentValue === "0" || lastPressedEquals) {
      currentValue = number;
      shouldResetDisplay = false;
      if (lastPressedEquals) {
        previousValue = null;
      }
      lastPressedEquals = false;
    } else if (currentValue.replace("-", "").length < 12) {
      currentValue += number;
    }

    updateDisplay();
  });
});
// Handle decimal point
function handleDecimal() {
  resetIfError();
  if (shouldResetDisplay) {
    currentValue = "0.";
    shouldResetDisplay = false;
    lastPressedEquals = false;
  } else if (!currentValue.includes(".")) {
    currentValue += ".";
  }
  updateDisplay();
}

//Clear calculators
function clear() {
  currentValue = "0";
  previousValue = null;
  operation = null;
  shouldResetDisplay = false;
  lastPressedEquals = false;
  updateDisplay();
}

// Handle percentage logic
function handlePercent() {
  resetIfError();
  currentValue = (parseFloat(currentValue) / 100).toString();
  updateDisplay();
}

// Handle negate
function handleNegate() {
  resetIfError();
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
  resetIfError();

  if (operation && !shouldResetDisplay) {
    const result = calculate(previousValue, currentValue, operation);
    currentValue = result.toString();
    previousValue = currentValue;
  } else if (previousValue === null) {
    previousValue = currentValue;
  }

  operation = op;
  shouldResetDisplay = true;
  lastPressedEquals = false;
  updateDisplay();
}

// Handle equals
function handleEquals() {
  resetIfError();
  if (operation && previousValue !== null) {
    const secondValue = shouldResetDisplay ? previousValue : currentValue;
    const result = calculate(previousValue, secondValue, operation);
    currentValue = result.toString();
    previousValue = null;
    operation = null;
    shouldResetDisplay = true;
    lastPressedEquals = true;
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

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

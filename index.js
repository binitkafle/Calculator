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

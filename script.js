const numButtons = Array.from(document.querySelectorAll(".btn-numbers"));
const operationButtons = Array.from(document.querySelectorAll(".operators"));
const equalsButton = document.querySelector(".equals");
const deleteButton = document.querySelector(".delete");
const allClearButton = document.querySelector(".clear");
const previousDisplay = document.querySelector(".previous-display");
const currentDisplay = document.querySelector(".current-display");
let currentOperand = "";
let previousOperand = "";
let operation;

allClearButton.addEventListener("click", () => {
	currentDisplay.innerText = "";
	previousDisplay.innerText = "";
	currentOperand = "";
	previousOperand = "";
});

deleteButton.addEventListener("click", () => {
	currentDisplay.innerText = currentDisplay.innerText.slice(0, -1);
	currentOperand = currentDisplay.innerText;
});

function appendNumber(num) {
	if (num === "." && currentOperand.includes(".")) return;
	currentOperand = currentOperand.toString() + num.toString();
}

function chooseOperation(op) {
	if (operation === "") return;
	if (previousOperand !== "") {
		compute();
	}
	operation = op;
	previousOperand = currentOperand;
	currentOperand = "";
}

equalsButton.addEventListener("click", compute);
function compute() {
	let computation;
	const prev = parseFloat(previousOperand);
	const current = parseFloat(currentOperand);
	if (isNaN(prev) || isNaN(current)) return;
	switch (operation) {
		case "+":
			computation = prev + current;
			break;
		case "-":
			computation = prev - current;
			break;
		case "*":
			computation = prev * current;
			break;
		case "/":
			computation = prev / current;
			break;
		default:
			return;
	}
	currentOperand = computation;
	operation = undefined;
	previousOperand = "";
	updateDisplay();
}

function formatNumber(num) {
	const stringNumber = num.toString();
	const integerPart = parseFloat(stringNumber.split(".")[0]);
	const decimalPart = stringNumber.split(".")[1];
	let integerDisplay;
	if (isNaN(integerPart)) {
		integerDisplay = "";
	} else {
		integerDisplay = integerPart.toLocaleString("en", {
			maximumFractionDigits: 0,
		});
	}
	if (decimalPart != null) {
		return `${integerDisplay}.${decimalPart}`;
	} else {
		return integerDisplay;
	}
}

function updateDisplay() {
	currentDisplay.innerText = formatNumber(currentOperand);
	if (operation != null) {
		previousDisplay.innerText = `${formatNumber(previousOperand)} ${operation}`;
	} else {
		previousDisplay.innerText = "";
	}
}

numButtons.forEach((button) => {
	button.addEventListener("click", () => {
		appendNumber(button.innerText);
		updateDisplay();
	});
});

operationButtons.forEach((button) => {
	button.addEventListener("click", () => {
		chooseOperation(button.innerText);
		updateDisplay();
	});
});

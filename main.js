const display = document.querySelector("#display");
const buttons = document.querySelectorAll(".buttons");
let values = [];
let runningTotal = 0;
let operator = [];

document.querySelector("#backspace").addEventListener("click", removeNum);
document.querySelector("#clearButton").addEventListener("click", clearScreen);

Array.from(buttons).forEach((button) => {
	button.addEventListener("click", operate);
});

function operate() {
	display.innerText = display.innerText + this.innerText;
	let currentValue = Number(display.innerText.slice(0, -1));
	if (this.classList.contains("operators")) {
		operator.push(this.innerText);
		values.push(currentValue);
		display.innerText = "";
		if (values.length === 2 && operator.pop() === "=") {
			let value1 = values.shift();
			let value2 = values.pop();
			console.log(operator);
			runningTotal = doMath(value1, value2, operator.pop());
			// if (this.innerText === "+") {
			// 	runningTotal += add(value1, value2);
			// }
			display.innerText = runningTotal;
			values.push(runningTotal);
		}
	}
}

function removeNum() {
	let currentDisplay = display.innerText;
	currentDisplay = currentDisplay.slice(0, -1);
	display.innerText = currentDisplay;
}

function clearScreen() {
	display.innerText = "";
	runningTotal = 0;
	values = [];
}

function doMath(num, num2, operator) {
	if (operator === "+") return num + num2;
	if (operator === "-") return num - num2;
	if (operator === "*") return num * num2;
	if (operator === "/") return num / num2;
}

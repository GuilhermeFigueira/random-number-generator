import createRandomNumberGenerator from "./numberGenerator.js";

const numberGenerator = createRandomNumberGenerator();

const form = document.getElementById("randomNumberForm");

const decimalToggle = document.getElementById("decimalToggle");
const decimalPlaces = document.getElementById("decimalPlaces");
const decimalPlacesDiv = document.getElementById("decimalPlacesDiv");

const intervalToggle = document.getElementById("intervalToggle");
const intervalNumbersDiv = document.getElementById("intervalNumbers");

const minIntervalNumbersToGenerate = document.getElementById(
	"minIntervalNumbersToGenerate"
);
const maxIntervalNumbersToGenerate = document.getElementById(
	"maxIntervalNumbersToGenerate"
);
const numbersToGenerate = document.getElementById("numbersToGenerate");

const minNumber = document.getElementById("minNumber");
const maxNumber = document.getElementById("maxNumber");

const generatedResultTitle = document.getElementById("generatedResultTitle");
const generatedResult = document.getElementById("generatedResult");

const copyToClipboardButton = document.getElementById("copyToClipboardButton");
const clearButton = document.getElementById("clearButton");

//================================================================================================

// Generate number when DOM loads
document.addEventListener("DOMContentLoaded", () => {
	const numbersToGenerateValue = Number(numbersToGenerate.value);
	// if (intervalToggle.checked) {
	// 	 =
	// }
	const minNumberValue = Number(minNumber.value);
	const maxNumberValue = Number(maxNumber.value);
	numberGenerator.generate({
		numbersToGenerateValue,
		minNumberValue,
		maxNumberValue,
	});
});
//================================================================================================

numberGenerator.subscribe(appendResultToDOM);

// Toggles
decimalToggle.addEventListener("change", (e) => {
	decimalPlacesDiv.classList.toggle("hidden");
});

intervalToggle.addEventListener("change", (e) => {
	intervalNumbersDiv.classList.toggle("hidden");
	numbersToGenerate.classList.toggle("hidden");
});
//================================================================================================

// Generate numbers
form.addEventListener("submit", (e) => {
	e.preventDefault();
	const numbersToGenerateValue = Number(numbersToGenerate.value);
	const minNumberValue = Number(minNumber.value);
	const maxNumberValue = Number(maxNumber.value);
	const decimalPlacesValue = Number(decimalPlaces.value);
	decimalToggle.checked
		? numberGenerator.generateWithDecimal({
				numbersToGenerateValue,
				minNumberValue,
				maxNumberValue,
				decimalPlacesValue,
		  })
		: numberGenerator.generate({
				numbersToGenerateValue,
				minNumberValue,
				maxNumberValue,
		  });
});
//================================================================================================

clearButton.addEventListener("click", () => {
	numberGenerator.clearNumbers();
});

//
function appendResultToDOM(info) {
	generatedResultTitle.textContent = "";
	generatedResult.textContent = "";
	if ("minVal" in info && "maxVal" in info && "quantity" in info) {
		const quantity = info.quantity;
		const min = info.minVal;
		const max = info.maxVal;
		const numbers = info.numbers;
		generatedResultTitle.textContent = `${quantity} numbers generated (from ${min}-${max})`;
		generatedResult.textContent = `${numbers.join(", ")}`;
	}
}
//================================================================================================

//
function copyToClipboard(valueToCopy) {
	navigator.clipboard.writeText(valueToCopy);
}

copyToClipboardButton.addEventListener("click", () =>
	copyToClipboard(generatedResult.textContent.replaceAll(",", " "))
);
//================================================================================================

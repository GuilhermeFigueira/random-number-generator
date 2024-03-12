const form = document.getElementById("randomNumberForm");
const numbersToGenerate = document.getElementById("numbersToGenerate");
const minNumber = document.getElementById("minmNumber");
const maxNumber = document.getElementById("maxNumber");
const generatedResultTitle = document.getElementById("generatedResultTitle");
const generatedResult = document.getElementById("generatedResult");

const decimalToggle = document.getElementById("decimalToggle");
const decimalPlaces = document.getElementById("decimalPlaces");
const decimalPlacesDiv = document.getElementById("decimalPlacesDiv");

const numberGenerator = createRandomNumberGenerator();

decimalToggle.addEventListener("change", (e) => {
	numberGenerator.unsubscribe(appendResultToDOM);
	decimalPlacesDiv.classList.toggle("hidden-div");
	decimalToggle.checked
		? numberGenerator.subscribe(addDecimalPlaces)
		: numberGenerator.unsubscribe(addDecimalPlaces);
	numberGenerator.subscribe(appendResultToDOM);
});

numberGenerator.subscribe(appendResultToDOM);

document.addEventListener("DOMContentLoaded", () => {
	const numbersToGenerateValue = Number(numbersToGenerate.value);
	const minNumberValue = Number(minNumber.value);
	const maxNumberValue = Number(maxNumber.value);
	numberGenerator.generate({
		numbersToGenerateValue,
		minNumberValue,
		maxNumberValue,
	});
});

form.addEventListener("submit", (e) => {
	const numbersToGenerateValue = Number(numbersToGenerate.value);
	const minNumberValue = Number(minNumber.value);
	const maxNumberValue = Number(maxNumber.value);
	e.preventDefault();
	numberGenerator.generate({
		numbersToGenerateValue,
		minNumberValue,
		maxNumberValue,
	});
});

function createRandomNumberGenerator() {
	let observers = [];

	function subscribe(observerFunction) {
		observers.push(observerFunction);
	}

	function unsubscribe(observerFunction) {
		observers = observers.filter((func) => func !== observerFunction);
	}

	function notifyAll(info) {
		let modifiedInfo = info;
		for (const observerFunction of observers) {
			const result = observerFunction(modifiedInfo);
			if (result) {
				modifiedInfo = result;
			}
		}
	}
	function generate(values) {
		const numbers = [];
		let minVal = values.minNumberValue;
		let maxVal = values.maxNumberValue;
		let quantity = values.numbersToGenerateValue;

		minVal = minVal ? minVal : 0;
		maxVal = maxVal ? maxVal : 100;
		quantity = quantity && quantity > 0 ? quantity : 1;

		for (let i = 0; i < quantity; i++) {
			const randomNumber =
				Math.floor(Math.random() * (maxVal - minVal)) + minVal;
			numbers.push(randomNumber);
		}

		notifyAll({ numbers, minVal, maxVal, quantity });
	}
	return {
		subscribe,
		generate,
		unsubscribe,
	};
}

function appendResultToDOM(info) {
	const quantity = info.quantity;
	const min = info.minVal;
	const max = info.maxVal;
	const numbers = info.numbers;
	generatedResultTitle.textContent = `${quantity} numbers generated (from ${min}-${max})`;
	generatedResult.textContent = `${numbers.join(", ")}`;
}

function addDecimalPlaces(info) {
	let numbers = info.numbers;
	const decimalQuantity = decimalPlaces.value;

	numbers = numbers.map((number) => {
		number = String(number);
		let decimalPlacesString = ".";
		for (let i = 0; i < decimalQuantity; i++) {
			const randomPlaceNumber = Math.floor(Math.random() * 10);
			decimalPlacesString += String(randomPlaceNumber);
		}
		return (number += decimalPlacesString);
	});
	return {
		...info,
		numbers,
	};
}

const form = document.getElementById("randomNumberForm");
const numbersToGenerate = document.getElementById("numbersToGenerate");
const minNumber = document.getElementById("minmNumber");
const maxNumber = document.getElementById("maxNumber");
const generatedResultTitle = document.getElementById("generatedResultTitle");
const generatedResult = document.getElementById("generatedResult");

let placeString = 1;

const decimalToggle = document.getElementById("decimalToggle");
const decimalPlaces = document.getElementById("decimalPlaces");
const decimalPlacesDiv = document.getElementById("decimalPlacesDiv");

const numberGenerator = createRandomNumberGenerator();
numberGenerator.subscribe(appendResultToDOM);

decimalToggle.addEventListener("change", () => {
	decimalPlacesDiv.classList.toggle("hidden-div");
});

decimalPlaces.addEventListener("change", (e) => {
	placeString = "1";
	const step = e.target.value;
	for (i = 0; i < step; i++) {
		placeString += "0";
	}
	placeString = Number(placeString);
});

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
	const observers = [];

	function subscribe(observerFunction) {
		observers.push(observerFunction);
	}

	function unsubscribe(observerFunction) {
		delete observers[observerFunction];
	}

	function notifyAll(info) {
		for (const observerFunction of observers) {
			observerFunction(info);
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

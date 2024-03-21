export default function createRandomNumberGenerator() {
	let observers = [];
	let numbers = [];

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

	function clearNumbers() {
		numbers = [];
		notifyAll({ numbers });
	}

	function generate(values, decimal) {
		let generatedNumbers = [];
		let minVal = values.minNumberValue;
		let maxVal = values.maxNumberValue;
		let quantity = values.numbersToGenerateValue;

		minVal = minVal ? minVal : 0;
		maxVal = maxVal ? maxVal : 100;
		quantity = quantity && quantity > 0 ? quantity : 1;

		for (let i = 0; i < quantity; i++) {
			const randomNumber =
				Math.floor(Math.random() * (maxVal - minVal)) + minVal;
			generatedNumbers.push(randomNumber);
		}

		numbers.push(generatedNumbers);
		notifyAll({ numbers, generatedNumbers, minVal, maxVal, quantity });
	}

	function generateWithDecimal(values) {
		let generatedNumbers = [];
		let minVal = values.minNumberValue;
		let maxVal = values.maxNumberValue;
		let quantity = values.numbersToGenerateValue;
		const places = values.decimalPlacesValue;

		minVal = minVal ? minVal : 0;
		maxVal = maxVal ? maxVal : 100;
		quantity = quantity && quantity > 0 ? quantity : 1;

		for (let i = 0; i < quantity; i++) {
			const randomNumber =
				Math.floor(Math.random() * (maxVal - minVal)) + minVal;
			generatedNumbers.push(randomNumber);
		}

		generatedNumbers = generatedNumbers.map((number) => {
			number = String(number);
			let decimalPlacesString = ".";
			for (let i = 0; i < places; i++) {
				const randomPlaceNumber = Math.floor(Math.random() * 10);
				decimalPlacesString += String(randomPlaceNumber);
			}
			return (number += decimalPlacesString);
		});

		numbers.push(generatedNumbers);
		notifyAll({
			numbers,
			generatedNumbers,
			minVal,
			maxVal,
			quantity,
			places,
		});
	}
	return {
		numbers,
		subscribe,
		generate,
		unsubscribe,
		clearNumbers,
		generateWithDecimal,
	};
}

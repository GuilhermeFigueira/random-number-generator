export default function createRandomNumberGenerator() {
	let observers = [];
	let numbers = [];
	let generatedNumbers = [];
	let minVal;
	let maxVal;
	let quantity;

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

	function generate(values) {
		generatedNumbers = [];
		minVal = values.minNumberValue;
		maxVal = values.maxNumberValue;
		quantity =
			typeof values.numbersToGenerateValue === "object"
				? Math.floor(
						Math.random() *
							(values.numbersToGenerateValue[1] -
								values.numbersToGenerateValue[0] +
								1)
				  ) + values.numbersToGenerateValue[0]
				: values.numbersToGenerateValue;
		minVal = minVal ? minVal : 0;
		maxVal = maxVal ? maxVal : 100;
		quantity = quantity && quantity > 0 ? quantity : 1;

		for (let i = 0; i < quantity; i++) {
			const randomNumber =
				Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
			generatedNumbers.push(randomNumber);
		}

		numbers.push(...generatedNumbers);
		notifyAll({ numbers, generatedNumbers, minVal, maxVal, quantity });
	}

	function generateWithDecimal(values) {
		generatedNumbers = [];
		minVal = values.minNumberValue;
		maxVal = values.maxNumberValue;
		quantity =
			typeof values.numbersToGenerateValue === "object"
				? Math.floor(
						Math.random() *
							(values.numbersToGenerateValue[1] -
								values.numbersToGenerateValue[0] +
								1)
				  ) + values.numbersToGenerateValue[0]
				: values.numbersToGenerateValue;
		const places = values.decimalPlacesValue;

		minVal = minVal ? minVal : 0;
		maxVal = maxVal ? maxVal : 100;
		quantity = quantity && quantity > 0 ? quantity : 1;

		for (let i = 0; i < quantity; i++) {
			const randomNumber =
				Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
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

	function add(value) {
		value = Number(value);
		numbers = numbers.map((number) => {
			number = number + value;
			return number;
		});

		notifyAll({
			numbers,
			generatedNumbers,
			minVal,
			maxVal,
			quantity,
		});
	}

	function subtract(value) {
		value = Number(value);
		numbers = numbers.map((number) => {
			number = number - value;
			return number;
		});

		notifyAll({
			numbers,
			generatedNumbers,
			minVal,
			maxVal,
			quantity,
		});
	}

	function divide(value) {
		value = Number(value);
		numbers = numbers.map((number) => {
			number = number / value;
			return number;
		});

		notifyAll({
			numbers,
			generatedNumbers,
			minVal,
			maxVal,
			quantity,
		});
	}

	function multiply(value) {
		value = Number(value);
		numbers = numbers.map((number) => {
			number = number * value;
			return number;
		});

		notifyAll({
			numbers,
			generatedNumbers,
			minVal,
			maxVal,
			quantity,
		});
	}

	return {
		numbers,
		subscribe,
		generate,
		unsubscribe,
		clearNumbers,
		generateWithDecimal,
		add,
		subtract,
		divide,
		multiply,
	};
}

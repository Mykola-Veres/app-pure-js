import distanceData from '../distance.json';

const units = distanceData.distance;
const inputUnitElement = document.getElementById('inputUnit');
const inputValueElement = document.getElementById('inputValue');
const convertToElement = document.getElementById('convertTo');
const convertButton = document.getElementById('convertButton');
const resultElement = document.getElementById('result');

// units.forEach(unit => {
//   const option = document.createElement('option');
//   option.value = unit.symbol;
//   option.textContent = unit.name;
//   inputUnitElement.appendChild(option);

//   const convertToOption = document.createElement('option');
//   convertToOption.value = unit.symbol;
//   convertToOption.textContent = unit.name;
//   convertToElement.appendChild(convertToOption);
// });

function createOptionElement(value, text) {
  const option = document.createElement('option');
  option.value = value;
  option.textContent = text;
  return option;
}
// Створення масиву елементів <option> за допомогою методу map
const optionElements = units.map(unit =>
  createOptionElement(unit.symbol, unit.name)
);
// Додавання елементів <option> до HTML-елементів
optionElements.forEach(option => {
  inputUnitElement.appendChild(option.cloneNode(true));
  convertToElement.appendChild(option);
});

function convertDistance(inputDistance, convertTo) {
  const inputValue = inputDistance.distance.value;
  const inputUnit = inputDistance.distance.unit;

  const sourceUnitConversion = units.find(
    unit => unit.symbol === inputUnit
  ).conversion;

  const conversionFactor = sourceUnitConversion[convertTo];
  const convertedValue = inputValue * conversionFactor;

  return {
    unit: convertTo,
    value: convertedValue.toFixed(2),
  };
}

convertButton.addEventListener('click', () => {
  if ('number' !== typeof inputValueElement.value) {
    resultElement.textContent =
      'Please enter a valid value (Number) in the Input Value field.';
    return;
  }
  const inputDistance = {
    distance: {
      unit: inputUnitElement.value,
      value: parseFloat(inputValueElement.value),
    },
  };
  const convertTo = convertToElement.value;
  const convertedResult = convertDistance(inputDistance, convertTo);
  resultElement.textContent = `Converted Value: ${convertedResult.value} ${convertedResult.unit}`;
});

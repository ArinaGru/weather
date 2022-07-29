export

const celsius = document.querySelector(".celsius");
const fahrenheit = document.querySelector(".fahrenheit");
const changeTemp = document.querySelector(".change-temp");

const onTempCelsius = (event) => {
  changeTemp.textContent = changeTemp.value;
};

const onTempFahrenheit = (event) => {
  changeTemp.textContent = (30 * 9) / 5 + 32;
};

celsius.addEventListener("click", onTempCelsius);
fahrenheit.addEventListener("click", onTempFahrenheit);

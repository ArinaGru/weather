export const celsius = document.querySelector(".celsius");
const fahrenheit = document.querySelector(".fahrenheit");
const changeTemp = document.querySelector(".change-temp");

const onTempCelsius = (event) => {
  changeTemp.textContent = changeTemp.value;
  refs.celsius.classList.add("active");
  refs.fahrenheit.classList.remove("active");
};

const onTempFahrenheit = (event) => {
  changeTemp.textContent = (30 * 9) / 5 + 32;
  refs.celsius.classList.remove("active");
  refs.fahrenheit.classList.add("active");
};

celsius.addEventListener("click", onTempCelsius);
fahrenheit.addEventListener("click", onTempFahrenheit);

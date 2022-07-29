const refs = {
  form: document.querySelector(".search"),
  buttonSearchCity: document.querySelector(".search-button"),
  buttonCurrent: document.querySelector(".current-city"),
  inputSearchCity: document.querySelector("input"),
  currentCity: document.querySelector(".city-title"),
  currentTemp: document.querySelector(".change-temp"),
  celsius: document.querySelector(".celsius"),
  fahrenheit: document.querySelector(".fahrenheit"),
};

function onSearchCity(event) {
  event.preventDefault();
  const city = refs.inputSearchCity.value;
  // refs.currentCity.textContent = city;
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=31751a4d6f7e23a6c279c7058935d844`
    )
    .then(displayCurrWeather);
  refs.inputSearchCity.value = "";
}

refs.form.addEventListener("submit", onSearchCity);

// _________________axios_________________________

function handlePosition(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=31751a4d6f7e23a6c279c7058935d844`
    )
    .then(displayCurrWeather);
}
function displayCurrWeather(response) {
  setCurrentTemp(Math.round(response.data.main.temp));

  setCurrentCity(response.data.name);
}
function setCurrentTemp(temperature) {
  refs.currentTemp.innerHTML = temperature;
}

function setCurrentCity(city) {
  refs.currentCity.innerHTML = city;
}

function getCurrentLocation() {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}
refs.buttonCurrent.addEventListener("click", getCurrentLocation);

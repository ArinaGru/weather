const refs = {
  form: document.querySelector(".search"),
  buttonSearchCity: document.querySelector(".search-button"),
  buttonCurrent: document.querySelector(".current-city"),
  inputSearchCity: document.querySelector("input"),
  currentCity: document.querySelector(".city-title"),
  currentTemp: document.querySelector(".change-temp"),
  celsius: document.querySelector(".celsius"),
  fahrenheit: document.querySelector(".fahrenheit"),
  tempTitle: document.querySelector(".temp"),
  wind: document.querySelector(".wind"),
  humidity: document.querySelector(".humidity"),
  description: document.querySelector(".description"),
};

// _______________________Functions___________________
function search(city) {
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=31751a4d6f7e23a6c279c7058935d844`
    )
    .then(displayCurrWeather);
}

function onSearchCity(event) {
  event.preventDefault();
  const city = refs.inputSearchCity.value;

  search(city);
  refs.inputSearchCity.value = "";
}

function displayCurrWeather(response) {
  setCurrentTemp(Math.round(response.data.main.temp));
  setCurrentHum(Math.round(response.data.main.humidity));
  setCurrentWind(Math.round(response.data.wind.speed * 3.6));
  setCurrentDesc(response.data.weather[0].description);
  setCurrentCity(response.data.name);

  if (refs.tempTitle.children.length === 3) {
    setIcon(response.data.weather[0].description);
    return;
  } else {
    refs.tempTitle.removeChild(refs.tempTitle.firstChild);
    setIcon(response.data.weather[0].description);
  }
}

function setIcon(description) {
  switch (description) {
    case "clear sky":
      refs.tempTitle.insertAdjacentHTML(
        "afterbegin",
        '<svg class="current-weather"><use href="./img/symbol-defs.svg#icon-clear-sky"></use></svg>'
      );
      break;
    case "few clouds":
      refs.tempTitle.insertAdjacentHTML(
        "afterbegin",
        '<svg class="current-weather"><use href="./img/symbol-defs.svg#icon-few-clouds"></use></svg>'
      );
      break;
    case "overcast clouds":
      refs.tempTitle.insertAdjacentHTML(
        "afterbegin",
        '<svg class="current-weather"><use href="./img/symbol-defs.svg#icon-overcast-clouds"></use></svg>'
      );
      break;
    case "scattered clouds":
      refs.tempTitle.insertAdjacentHTML(
        "afterbegin",
        '<svg class="current-weather"><use href="./img/symbol-defs.svg#icon-scattered-clouds"></use></svg>'
      );
      break;
    case "broken clouds":
      refs.tempTitle.insertAdjacentHTML(
        "afterbegin",
        '<svg class="current-weather"><use href="./img/symbol-defs.svg#icon-broken-clouds"></use></svg>'
      );
      break;
    case "shower rain":
      refs.tempTitle.insertAdjacentHTML(
        "afterbegin",
        '<svg class="current-weather"><use href="./img/symbol-defs.svg#icon-shower-rain"></use></svg>'
      );
      break;
    case "rain":
      refs.tempTitle.insertAdjacentHTML(
        "afterbegin",
        '<svg class="current-weather"><use href="./img/symbol-defs.svg#icon-rain"></use></svg>'
      );
      break;
    case "thunderstorm":
      refs.tempTitle.insertAdjacentHTML(
        "afterbegin",
        '<svg class="current-weather"><use href="./img/symbol-defs.svg#icon-thunderstorm"></use></svg>'
      );
      break;
    case "snow":
      refs.tempTitle.insertAdjacentHTML(
        "afterbegin",
        '<svg class="current-weather"><use href="./img/symbol-defs.svg#icon-snow"></use></svg>'
      );
      break;
    case "mist":
      refs.tempTitle.insertAdjacentHTML(
        "afterbegin",
        '<svg class="current-weather"><use href="./img/symbol-defs.svg#icon-mist"></use></svg>'
      );
      break;
  }
}

function setCurrentTemp(temperature) {
  refs.currentTemp.innerHTML = temperature;
}

function setCurrentHum(humidity) {
  refs.humidity.innerHTML = humidity;
}

function setCurrentWind(wind) {
  refs.wind.innerHTML = wind;
}

function setCurrentDesc(description) {
  refs.description.innerHTML = description;
}

function setCurrentCity(city) {
  refs.currentCity.innerHTML = city;
}

refs.form.addEventListener("submit", onSearchCity);
search("Kharkiv");
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

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

refs.buttonCurrent.addEventListener("click", getCurrentLocation);

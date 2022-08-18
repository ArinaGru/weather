import { days } from "./script3.js";

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
  ulForecast: document.querySelector(".days"),
};
let celsiusTemp = null;

const API_KEY = `31751a4d6f7e23a6c279c7058935d844`;
const URL = `https://api.openweathermap.org/data/`;
// _______________________Functions__________________

// _______________________Search___________________
function search(city) {
  axios
    .get(`${URL}2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
    .then(({ data }) => {
      displayCurrWeather({ data });
    });
}

function onSearchCity(event) {
  event.preventDefault();
  const city = refs.inputSearchCity.value;

  search(city);
  refs.inputSearchCity.value = "";
}

// -----------------------------------Current Weather----------------------------
function displayCurrWeather({ data }) {
  celsiusTemp = Math.round(data.main.temp);
  setCurrentTemp(celsiusTemp);
  setCurrentHum(Math.round(data.main.humidity));
  setCurrentWind(Math.round(data.wind.speed * 3.6));
  setCurrentDesc(data.weather[0].description);
  setCurrentCity(data.name);
  getForecast(data.coord);
  if (refs.tempTitle.children.length === 3) {
    setIcon(data.weather[0].description);
    return;
  } else {
    refs.tempTitle.removeChild(refs.tempTitle.firstChild);
    setIcon(data.weather[0].description);
  }
}

// function setIcon(id) {
//   refs.currentCity.insertAdjacentHTML(
//     "afterbegin",
//     `<img
//     src="http://openweathermap.org/img/wn/${id}@2x.png"
//     alt=""
//     width="42"
//   />`
//   );
// }

function setIcon(description) {
  switch (description) {
    case "clear sky":
      refs.currentCity.insertAdjacentHTML(
        "afterbegin",
        '<svg class="current-weather"><use href="./img/symbol-defs.svg#icon-clear-sky"></use></svg>'
      );
      break;
    case "few clouds":
      refs.currentCity.insertAdjacentHTML(
        "afterbegin",
        '<svg class="current-weather"><use href="./img/symbol-defs.svg#icon-few-clouds"></use></svg>'
      );
      break;
    case "overcast clouds":
      refs.currentCity.insertAdjacentHTML(
        "afterbegin",
        '<svg class="current-weather"><use href="./img/symbol-defs.svg#icon-overcast-clouds"></use></svg>'
      );
      break;
    case "scattered clouds":
      refs.currentCity.insertAdjacentHTML(
        "afterbegin",
        '<svg class="current-weather"><use href="./img/symbol-defs.svg#icon-scattered-clouds"></use></svg>'
      );
      break;
    case "broken clouds":
      refs.currentCity.insertAdjacentHTML(
        "afterbegin",
        '<svg class="current-weather"><use href="./img/symbol-defs.svg#icon-broken-clouds"></use></svg>'
      );
      break;
    case "shower rain":
      refs.currentCity.insertAdjacentHTML(
        "afterbegin",
        '<svg class="current-weather"><use href="./img/symbol-defs.svg#icon-shower-rain"></use></svg>'
      );
      break;
    case "rain":
      refs.currentCity.insertAdjacentHTML(
        "afterbegin",
        '<svg class="current-weather"><use href="./img/symbol-defs.svg#icon-rain"></use></svg>'
      );
      break;
    case "thunderstorm":
      refs.currentCity.insertAdjacentHTML(
        "afterbegin",
        '<svg class="current-weather"><use href="./img/symbol-defs.svg#icon-thunderstorm"></use></svg>'
      );
      break;
    case "snow":
      refs.currentCity.insertAdjacentHTML(
        "afterbegin",
        '<svg class="current-weather"><use href="./img/symbol-defs.svg#icon-snow"></use></svg>'
      );
      break;
    case "mist":
      refs.currentCity.insertAdjacentHTML(
        "afterbegin",
        '<svg class="current-weather"><use href="./img/symbol-defs.svg#icon-mist"></use></svg>'
      );
      break;
  }
}

function setCurrentTemp(temperature) {
  refs.currentTemp.innerHTML = temperature;
  refs.celsius.classList.add("active");
  refs.fahrenheit.classList.remove("active");
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

// -----------------------------------Forecast Weather----------------------------
function getForecast(coords) {
  const forecastUrl = `${URL}2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=hourly,minutely,current&units=metric&appid=${API_KEY}`;
  axios.get(forecastUrl).then(({ data }) => displayForecastWeather({ data }));
  console.log(coords);
}

function displayForecastWeather({ data }) {
  const markup = data.daily
    .map((day, index) => {
      if (index < 5) { 
        return `<li>
                <h2> <img
          src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png"
          alt=""
          width="42"
        />${formatDay(day.dt)}</h2>
                <p><span>${Math.round(day.temp.max)}°</span> / ${Math.round(
          day.temp.min
        )}°</p>
            </li>`;
      }
      return""
    })
    .join("");
  console.log(data.daily);
  refs.ulForecast.innerHTML = markup;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  return days[day];
}
// _________________axios current location_________________________

function handlePosition(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  axios
    .get(
      `${URL}2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    )
    .then(({ data }) => {
      displayCurrWeather({ data });
    });
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

refs.buttonCurrent.addEventListener("click", getCurrentLocation);

// --------------------Change Temp--------------
const onTempCelsius = (e) => {
  e.preventDefault();
  setCurrentTemp(celsiusTemp);
};

const onTempFahrenheit = (e) => {
  e.preventDefault();
  refs.currentTemp.innerHTML = (celsiusTemp * 9) / 5 + 32;
  refs.celsius.classList.remove("active");
  refs.fahrenheit.classList.add("active");
};
refs.celsius.addEventListener("click", onTempCelsius);
refs.fahrenheit.addEventListener("click", onTempFahrenheit);

search("Kharkiv");

const WEATHER_API_KEY = "767cb8dd7684576b6e1bfd9dedd24332";
const WEATHER_API = "https://api.openweathermap.org/data/2.5/weather?";

const weather = document.querySelector(".js-weather .weather__text");
const icon = document.querySelector(".weather-state__icon");
const state_text = document.querySelector(".wather-state__text");

function paintWeather(weatherObj) {
  weather.innerHTML = `${Math.floor(weatherObj.temperature)}° @ ${
    weatherObj.name
  }`;
  const wi = document.createElement("i");
  wi.classList.add("wi", `wi-owm-${weatherObj.stateId}`);
  icon.appendChild(wi);
  state_text.innerHTML = weatherObj.state;
}

function getWeather(coords) {
  const expirationHour = new Date();
  expirationHour.setHours(expirationHour.getHours() + 1);
  const API_URL = `${WEATHER_API}lat=${coords.latitude}&lon=${coords.longitude}&appid=${WEATHER_API_KEY}&units=metric`;
  fetch(API_URL)
    .then((response) => response.json())
    .then((json) => {
      const weatherObj = {
        name: json.name,
        state: json.weather[0].main,
        stateId: json.weather[0].id,
        temperature: json.main.temp,
        exHour: expirationHour,
      };
      localStorage.setItem("weathers", JSON.stringify(weatherObj));
      paintWeather(weatherObj);
      console.log(json.weather[0].main);
    });
}

function getCoords(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coords = {
    latitude,
    longitude,
  };
  localStorage.setItem("coords", JSON.stringify(coords));
  getWeather(coords);
}

function getFailCoords() {
  console.log("location fail");
}

function init() {
  const currentCoords = localStorage.getItem("coords");
  const weatherObj = localStorage.getItem("weathers");
  if (currentCoords === null || weatherObj === null) {
    navigator.geolocation.getCurrentPosition(getCoords, getFailCoords);
  } else {
    const parsedweather = JSON.parse(weatherObj);
    const todayHour = new Date();
    const parsedhour = new Date(parsedweather.exHour);
    if (todayHour > parsedhour) {
      const parsedCoords = JSON.parse(currentCoords);
      getWeather(parsedCoords);
    } else {
      paintWeather(parsedweather);
    }
  }
}

init();

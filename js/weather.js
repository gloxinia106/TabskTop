const WEATHER_API_KEY = "767cb8dd7684576b6e1bfd9dedd24332";
const WEATHER_API = "https://api.openweathermap.org/data/2.5/weather?";

const weather = document.querySelector(".js-weather .weather__text");

function paintWeather(weatherObj) {
  weather.innerHTML = `${Math.floor(weatherObj.temperature)}° @ ${
    weatherObj.name
  }`;
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
        temperature: json.main.temp,
        exHour: expirationHour,
      };
      localStorage.setItem("weathers", JSON.stringify(weatherObj));
      paintWeather(weatherObj);
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
  if (currentCoords === null) {
    navigator.geolocation.getCurrentPosition(getCoords, getFailCoords);
  } else {
    const weatherObj = localStorage.getItem("weathers");
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

const API_KEY = "767cb8dd7684576b6e1bfd9dedd24332";
const WEATHER_API = "https://api.openweathermap.org/data/2.5/weather?";

const weather = document.querySelector(".js-weather .weather__text");

function getWeather(coords) {
  const API_URL = `${WEATHER_API}lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}&units=metric`;
  fetch(API_URL)
    .then((response) => response.json())
    .then((json) => {
      const name = json.name;
      const temperature = json.main.temp;
      weather.innerHTML = `${Math.floor(temperature)}° @ ${name}`;
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
    getWeather(JSON.parse(currentCoords));
  }
}

init();

const weather = document.querySelector(".js-weather");

function getCoords() {
  console.dir(location);
}

function init() {
  const currentCoords = localStorage.getItem("coords");
  if (currentCoords === null) {
    getCoords();
  } else {
  }
}

init();

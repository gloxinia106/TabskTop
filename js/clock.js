const clock = document.querySelector(".clock__text");

function getTime() {
  const time = new Date();
  const hour = time.getHours();
  const minutes = time.getMinutes();
  const now = `${hour < 10 ? `0${hour}` : hour}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`;
  clock.innerHTML = now;
  return;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
  return;
}

init();

const body = document.querySelector("body");
const UNSPLASH_API_KEY = "1xiB6J5b4UIT3DpKDGPBbJrMU_RJd2PVysDHqzB5Qeg";
const UNSPLASH_URL = `https://api.unsplash.com/photos/random?client_id=${UNSPLASH_API_KEY}&query=landscape`;

function paintBackground(bgImg) {
  body.style.backgroundImage = `url(${bgImg.url})`;
}

function savebackground(fullUrl) {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 1);
  const bgObj = {
    url: fullUrl,
    expiration: expirationDate,
  };
  localStorage.setItem("bg", JSON.stringify(bgObj));
  paintBackground(bgObj);
}

function getBackground() {
  fetch(UNSPLASH_URL)
    .then((response) => response.json())
    .then((json) => {
      const image = json;
      if (image.urls.full && image.urls) {
        const fullUrl = image.urls.full;
        savebackground(fullUrl);
      } else {
        getBackground();
      }
    });
}

function init() {
  const currentImg = localStorage.getItem("bg");
  if (currentImg === null) {
    getBackground();
  } else {
    // check today
    // paint img
    const parsedCurrentImg = JSON.parse(currentImg);
    paintBackground(parsedCurrentImg);
  }
}

init();

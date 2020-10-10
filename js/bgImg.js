const body = document.querySelector("body");
const UNSPLASH_API_KEY = "1xiB6J5b4UIT3DpKDGPBbJrMU_RJd2PVysDHqzB5Qeg";
const UNSPLASH_URL = `https://api.unsplash.com/photos/random?client_id=${UNSPLASH_API_KEY}&query=landscape&orientation=landscape`;

function paintBackground(bgImg) {
  body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4)), url(${bgImg.url})`;
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
      if (image.urls.regular && image.urls) {
        const fullUrl = image.urls.regular;
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
    const parsedCurrentImg = JSON.parse(currentImg);
    const today = new Date();
    const parsedDate = new Date(parsedCurrentImg.expiration);
    if (today > parsedDate) {
      localStorage.removeItem("bg");
      getBackground();
    } else {
      paintBackground(parsedCurrentImg);
    }
  }
}

init();


// unsplash API error
// style="background: linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4)), url(img/defaultBackground.jpg)"

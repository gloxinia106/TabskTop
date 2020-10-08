const searchBars = document.querySelector(".search-bars");

let controlNum = 1;

function makeSearchBars() {
  const form = document.createElement("form");
  form.className = "search-bar";
  const input = document.createElement("input");
  input.type = "text";
  const btn = document.createElement("button");
  btn.className = "search-btn";
  searchBars.appendChild(form);
  form.appendChild(input);
  form.appendChild(btn);
}

function removeSearchBars() {
  searchBars.removeChild(searchBars.lastChild);
}

function handleSearchBars(barNum) {
  if (controlNum < barNum) {
    for (; controlNum < barNum; controlNum++) {
      makeSearchBars();
    }
  } else {
    for (; barNum < controlNum; controlNum--) {
      removeSearchBars();
    }
  }
}

function init() {
  const barNum = localStorage.getItem("SearchNum");
  if (barNum !== null) {
    handleSearchBars(barNum);
  }
}

init();

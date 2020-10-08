const SearchNumber = document.querySelector(".option__searchbar-number");
const Searchbar = document.querySelector(".option__searchbar");

const engineObj = {
  value: ["google", "naver", "namuWiki"],
  text: ["Google", "Naver", "Namu Wiki"],
  number: 1,
};

function deleteOption() {
  Searchbar.removeChild(Searchbar.lastChild);
  Searchbar.removeChild(Searchbar.lastChild);
}

function makeOptions() {
  const countEngine = document.querySelectorAll(".option__column").length / 2;
  const columnT = document.createElement("div");
  columnT.className = "option__column";
  columnT.innerText = `Search bar${countEngine} engine`;
  const columnS = document.createElement("div");
  columnS.className = "option__column";
  const select = document.createElement("select");
  select.className = "option__searchbar-engine";
  select.name = "searchEngine";
  for (let start = 0; start < engineObj.value.length; start++) {
    const optValue = engineObj.value[start];
    const optText = engineObj.text[start];
    select.options[start] = new Option(optText, optValue);
  }
  Searchbar.appendChild(columnT);
  Searchbar.appendChild(columnS);
  columnS.appendChild(select);
}

function handleSearchNumber(event) {
  const currentNum = parseInt(event.target.value);
  let savedNum = engineObj.number;
  if (savedNum < currentNum) {
    for (; savedNum < currentNum; savedNum++) {
      makeOptions();
    }
    engineObj.number = savedNum;
  } else {
    for (; currentNum < savedNum; savedNum--) {
      deleteOption();
    }
    engineObj.number = savedNum;
  }
  localStorage.setItem("SearchNum", currentNum);
  console.log(savedNum);
}

function init() {
  const currentValue = localStorage.getItem("SearchNum");
  if (currentValue !== null) {
    SearchNumber.value = currentValue;
    for (let start = 1; start < currentValue; start++) {
      makeOptions();
    }
    engineObj.number = parseInt(currentValue);
  }
  SearchNumber.addEventListener("change", handleSearchNumber);
}

init();

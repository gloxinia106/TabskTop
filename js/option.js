const SearchNumber = document.querySelector(".option__searchbar-number");
const option = document.querySelector(".option__content");


const engineObj = {
  value: ["google", "naver","daum","bing","yahoo","duckduckgo","wikipedia", "namuWiki","github"],
  text: ["Google", "Naver","Daum","Bing","Yahoo","DuckDuckGo","Wikipedia", "Namu Wiki","GitHub"],
  number: 1,
};

function deleteOption() {
  option.removeChild(option.lastChild);
}

function makeOptions() {
  const countEngine = document.querySelectorAll(".option__column").length / 2;
  const optengs = document.createElement("div");
  optengs.className = "option__engine";
  const columnT = document.createElement("div");
  columnT.className = "option__column";
  columnT.innerText = `Search engine used in the search bar${countEngine}`;
  const columnS = document.createElement("div");
  columnS.className = "option__column";
  const select = document.createElement("select");
  select.className = "option__searchbar-select";
  select.name = "searchEngine";
  for (let start = 0; start < engineObj.value.length; start++) {
    const optValue = engineObj.value[start];
    const optText = engineObj.text[start];
    select.options[start] = new Option(optText, optValue);
  }
  option.appendChild(optengs);
  optengs.appendChild(columnT);
  optengs.appendChild(columnS);
  columnS.appendChild(select);
}

function handleSearchNumber(event) {
  const currentNum = parseInt(event.target.value);
  let objNum = engineObj.number;
  if (objNum < currentNum) {
    for (; objNum < currentNum; objNum++) {
      makeOptions();
    }
    engineObj.number = objNum;
  } else {
    for (; currentNum < objNum; objNum--) {
      deleteOption();
    }
    engineObj.number = objNum;
  }
  localStorage.setItem("SearchNum", currentNum);
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
const firstSelect = document.querySelector(".option__searchbar-select");
const selectAll = document.querySelectorAll(".option__searchbar-select");

let engineValue = ["google"];

function handleHtml() {
  let temporaryValue = [];
  const engines = document.querySelectorAll(".option__searchbar-select");
  engines.forEach(function (engine) {
    temporaryValue.push(engine.value);
    engine.addEventListener("change", handleHtml);
  });
  engineValue.splice(0, 1, temporaryValue);
  localStorage.setItem("engines", JSON.stringify(engineValue));
}

function init() {
  const localEngines = JSON.parse(localStorage.getItem("engines"));
  if (localEngines !== null) {
    const localArray = localEngines[0];
    let i = 0;
    const selects = document.querySelectorAll(".option__searchbar-select");
    selects.forEach(function (select) {
      select.value = localArray[i];
      i++;
    });

  }
}

SearchNumber.addEventListener("change", handleHtml);
firstSelect.addEventListener("change", function (event) {
  const first = event.target.value;
  engineValue.splice(0, 1, first);
  localStorage.setItem("engines", JSON.stringify(engineValue));
});
selectAll.forEach(function (select) {
  select.addEventListener("change", handleHtml);
});
init();

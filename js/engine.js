const engineObj = {
  google: {
    text: "Google",
    action: "https://www.google.com/search",
    method: "get",
    name: "q",
    homepage: "https://www.google.com",
    className: "search-google",
    valueName: "google"
  },
  naver: {
    text: "Naver",
    action: "https://search.naver.com/search.naver",
    method: "get",
    name: "query",
    homepage: "https://www.naver.com",
    className: "search-naver",
    valueName: "naver"
  },
  daum: {
    text: "Daum",
    action: "https://search.daum.net/search",
    method: "get",
    name: "q",
    homepage: "https://www.daum.net",
    className: "search-daum",
    valueName: "daum"
  },
  bing: {
    text: "Bing",
    action: "https://bing.com/search",
    method: "get",
    name: "q",
    homepage: "https://www.bing.com",
    className: "search-bing",
    valueName: "bing"
  },
  yahoo: {
    text: "Yahoo",
    action: "https://search.yahoo.com/search",
    method: "get",
    name: "p",
    homepage: "https://www.yahoo.com",
    className: "search-yahoo",
    valueName: "yahoo"
  },
  duckduckgo: {
    text: "DuckDuckGo",
    action: "https://duckduckgo.com/",
    method: "get",
    name: "q",
    homepage: "https://duckduckgo.com/",
    className: "search-duckduckgo",
    valueName: "duckduckgo"
  },
  wikipedia: {
    text: "Wikipedia",
    action: "https://www.wikipedia.org/w/index.php",
    method: "get",
    name: "search",
    homepage: "https://www.wikipedia.org/",
    className: "search-wikipedia",
    valueName: "wikipedia"
  },
  github: {
    text: "GitHub",
    action: "https://github.com/search",
    method: "get",
    name: "q",
    homepage: "https://github.com/",
    className: "search-github",
    valueName: "github"
  },
  namuWiki: {
    text: "Namu Wiki",
    action: "https://namu.wiki/Go",
    method: "get",
    name: "q",
    homepage: "https://namu.wiki/",
    className: "search-namu",
    valueName: "namuWiki"
  },
};

const searchForm = document.querySelectorAll(".search-bar");
const searchInput = document.querySelectorAll(".search-bar input");
const searchbtn = document.querySelectorAll(".search-bar button");


function makeEngine(valueArray){
  let elemetVal = 0;
  valueArray.forEach(value => {
    searchForm[elemetVal].action = engineObj[value].action;
    searchForm[elemetVal].method = engineObj[value].method;
    searchInput[elemetVal].name = engineObj[value].name;
    searchInput[elemetVal].className = engineObj[value].className;
    searchInput[elemetVal].classList.add(engineObj[value].valueName);
    searchInput[elemetVal].placeholder = `Search by ${engineObj[value].text}`;
    const i = document.createElement("i");
    i.classList.add("fas","fa-search");
    searchbtn[elemetVal].appendChild(i);
    elemetVal++;
  });
}

function init (){
  const engineValue = localStorage.getItem("engines");
  const firstSetting = ["google",];
  if (engineValue === null) {
    makeEngine(firstSetting);
  }else{
    const paresdValue = (JSON.parse(engineValue))[0];
    makeEngine(paresdValue);
  }
}

searchForm.forEach(function(form){
  form.addEventListener("submit", function(event){
    const inputValue = event.target.elements[0].value;
    const value = form[0].classList[1];
    if(inputValue === ""){
      form.action = engineObj[value].homepage;
      form[0].name = "";
    }
  })
})

init();
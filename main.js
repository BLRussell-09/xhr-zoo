console.log('yo');

function printToDom(domString, divId) {
  document.getElementById(divId).innerHTML += domString;
}

const buildDomString = (animalsArray) => {
  let domString = ''
  animalsArray.forEach ((animal) => 
  {
    domString += `<div class="animal">`
    domString += `<h1>${animal.name}</h1>`
    domString += `<h3>${animal.number}</h3>`
    console.log(animal.imageUrl)
    domString += `<img src="${animal.imageURL}"></img>`
    domString += `<div class="button">`
    domString += `<button>Escaped</button>`
    domString += `</div>`
    domString += `</div>`
  })
  printToDom(domString, "zoo")
};

function iFail() {
  console.log('I effed up.');
}

function loadMe() {
  const data = JSON.parse(this.responseText);
  buildDomString(data.animals);
}

function startApp() {
  let myRequest = new XMLHttpRequest();
  myRequest.addEventListener("load", loadMe);
  myRequest.addEventListener("error", iFail)
  myRequest.open("GET", "animals.json")
  myRequest.send();
}

startApp()


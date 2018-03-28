console.log('yo');

// Print to Dom and Dom String Builder

function printToDom(domString, divId) {
  document.getElementById(divId).innerHTML += domString;
}

const buildDomString = (animalsArray) => {
  let domString = ''
  animalsArray.forEach ((animal) => 
  {
    if(animal.isCarnivore){
      domString += `<div class="animal carnivore">`
    } else {
      domString += `<div class="animal vegetable">`
    }
    domString += `<h1>${animal.name}</h1>`
    domString += `<h3>${animal.number}</h3>`
    domString += `<img src="${animal.imageURL}"></img>`
    domString += `<div class="button-container">`
    domString += `<button class="escaped">Escaped</button>`
    domString += `</div>`
    domString += `</div>`
  })
  printToDom(domString, "zoo")
};

// Animals Escaped Button

const addEscapedEventListeners = () => {
  const escapedButtons = document.getElementsByClassName('escaped')
  for (idx = 0; idx < escapedButtons.length; idx++){
    escapedButtons[idx].addEventListener("click", animalEscaped)
  }
}

const animalEscaped = (e) => {
  const badAnimal = e.target.parentNode
  showCarnivores();
  showVegetables();
  showFoundButton(badAnimal)
};

// Animals Found Button 

const showFoundButton = (buttonContainer) => {
  buttonContainer.innerHTML = `<button id="found">Found</button>`
  initializeFoundButton()
};

const initializeFoundButton = () => {
  const foundButton = document.getElementById('found');
  foundButton.addEventListener("click", () => {
    const animals = document.getElementsByClassName("animal")
    for (idx=0; idx < animals.length; idx++) {
      animals[idx].children[3].innerHTML = `<button class="escaped">Escaped</button>`
      animals[idx].classList.remove('red')
      animals[idx].classList.remove('green')
    }
    addEscapedEventListeners();
  })
};

// Show Colors

const showCarnivores = () => {
  const carnivores = document.getElementsByClassName('carnivore')
  for (idx = 0; idx < carnivores.length; idx++){
    carnivores[idx].children[3].innerHTML = '';
    carnivores[idx].classList.add('red');
  }
};

const showVegetables = () => {
  const vegetables = document.getElementsByClassName('vegetable')
  for (idx = 0; idx < vegetables.length; idx++) {
    vegetables[idx].children[3].innerHTML = `<button>Eat Me</button>`;
    vegetables[idx].classList.add('green');
  }

}

// Xhr Request 

function iFail() {
  console.log('I effed up.');
}

function loadMe() {
  const data = JSON.parse(this.responseText);
  buildDomString(data.animals);
  addEscapedEventListeners()
}

function startApp() {
  let myRequest = new XMLHttpRequest();
  myRequest.addEventListener("load", loadMe);
  myRequest.addEventListener("error", iFail)
  myRequest.open("GET", "animals.json")
  myRequest.send();
}

startApp()



const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const scoreboard = document.querySelector('#scoreboard');
const overlay = document.querySelector('#overlay');
let missed=0;
const buttonStart = document.querySelector('.btn__reset');

const phrases =  ['Between a Rock and a Hard Place',
              'Curiosity Killed The Cat',
              'Barking Up The Wrong Tree',
              'Cut To The Chase',
              'Piece of Cake'];

/*-------------------------------------------------------------------------*/
function getRandomPhraseArray(arr){
  const random = Math.floor(Math.random()*arr.length);
  return arr[random].split('');
}
/*-------------------------------------------------------------------------*/
function createElement(elementName, type, context){
  const element = document.createElement(elementName);
  element[type] = context;
  return element;
}
/*-----------------------------------------------------*/
function appendToElement(parent, elementName, type, context){
  const element = createElement(elementName, type, context);
  parent.appendChild(element);
  return element;
}
/*-----------------------------------------------------*/
function checkIfLetter(element){
  return element.textContent !== ' ';
}
/*-----------------------------------------------------*/
function addPhraseToDisplay(arr){
  const ul = phrase.firstElementChild;
  for(let i=0; i<arr.length; i+=1){
    const li = appendToElement(ul, "li", "textContent", arr[i]);
    li.className = checkIfLetter(li)?"letter": "space";
  }
}
/*-------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------*/
function isFirstClick(buttonKey){
  return buttonKey.tagName == 'BUTTON' && buttonKey.className !=="chosen";
}
/*-------------------------------------------------------------------------*/
function setFirstClick(buttonKey){
  buttonKey.className = "chosen";
  buttonKey.setAttribute('disabled',true);
}
/*-------------------------------------------------------------------------*/
function checkIfGuessed(a, b){
  return a.textContent.toLowerCase()===b.textContent;
}
/*------------------------------------------*/
function addClass(element, className){
  element.className+= " " + className;
}
/*------------------------------------------*/
function checkLetter(buttonKey){
  const letters = document.querySelectorAll(".letter");
  let match = false;
  for(let i=0; i<letters.length; i+=1){
    if(checkIfGuessed(letters[i],buttonKey)){
      addClass(letters[i], "show");
      match = true;
    }
  }
  return match;
}
/*-------------------------------------------------------------------------*/
function hideScoreboard(){
  missed+=1;
  const ol = scoreboard.firstElementChild;
  let li = ol.children[missed-1];
  li.style.display = "none";
}
/*-------------------------------------------------------------------------*/
function checkWin(){
  const lengthShow = document.querySelectorAll('.show').length;
  const lengthletter = document.querySelectorAll(".letter").length;
  const title = document.querySelector(".title");
  if(lengthShow == lengthletter){
    title.textContent = `You Won!! with only ${missed} missed`;
    overlay.className = 'win';
  }else if(missed == 5){
    title.textContent = "You lost, better luck next time";
    overlay.className = 'lose';
  }else{
    return false;
  }
  return true;
}
/*-------------------------------------------------------------------------*/
function removePhrase(){
  phrase.removeChild(phrase.firstElementChild);
  phrase.appendChild(createElement("ul"));
}
/*----------------------------------*/
function removeChosen(){
  const chosen = document.querySelectorAll('.chosen');
  for(let i=0; i<chosen.length; i+=1){
    chosen[i].className = "";
    chosen[i].removeAttribute("disabled");
  }
}
/*----------------------------------*/
function resetTries(){
  const tries = document.querySelectorAll('.tries');
  for(let i=0; i<tries.length; i+=1){
    tries[i].style.display = "inline-block";
  }
}
/*----------------------------------*/
function resetGame(){
  removePhrase();
  missed = 0;
  removeChosen();
  resetTries();
  overlay.style.display = "flex";
}
/*-------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------*/
buttonStart.addEventListener('click', () => {
  overlay.style.display = 'none';
  const phraseArray = getRandomPhraseArray(phrases);
  addPhraseToDisplay(phraseArray);
});
/*-------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------*/
qwerty.addEventListener('click', (e) => {
  const buttonKey = e.target;
  if(isFirstClick(buttonKey)){
    setFirstClick(buttonKey);
    if(!checkLetter(buttonKey)){
      hideScoreboard();
    }
  }
  if(checkWin()){
    resetGame();
  }
});
/*-------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------*/

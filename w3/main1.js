// dom elements
let scrl = document.querySelector('section');
let numSec = document.querySelectorAll('section');
let mvLeft = document.querySelector('.container .left');
let mvRight = document.querySelector('.container .right');
let mvTop = document.querySelector('.container .top');
let mvBottom = document.querySelector('.container .bottom');

const scrlMx = scrl.clientHeight * (numSec.length - 1);

console.log(scrl.clientHeight);
console.log(window.innerHeight);
console.log(scrlMx);

mvLeft.addEventListener('click', movePrev);
mvRight.addEventListener('click', moveNext);
mvTop.addEventListener('click', moveHome);
mvBottom.addEventListener('click', moveEnd);

// functions
function moveHome() {
  window.scrollTo(0, 0);
  console.log(window.scrollY);
}

function moveEnd() {
  window.scrollTo(0, scrlMx);
  console.log(window.scrollY);
}

function moveNext() {
  if (window.scrollY < (scrlMx-2)) {
    window.scrollBy(0, scrl.clientHeight);
  }
  console.log(window.scrollY);
}

function movePrev() {
  window.scrollBy(0, -1*scrl.clientHeight);
  console.log(window.scrollY);
}
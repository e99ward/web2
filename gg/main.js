// dom elements
//let scrl = document.querySelector('section');
//let numSec = document.querySelectorAll('section');
let mvLeft = document.querySelector('.container .left');
let mvRight = document.querySelector('.container .right');
let mvUp = document.querySelector('.container .top');
let mvDown = document.querySelector('.container .bottom');

//const scrlMx = scrl.clientHeight * (numSec.length - 1);
//console.log(scrl.clientHeight);
console.log(window.innerHeight);
//console.log(scrlMx);
mvLeft.addEventListener('click', moveLeft);
mvRight.addEventListener('click', moveRight);
mvUp.addEventListener('click', moveUp);
mvDown.addEventListener('click', moveDown);

// functions
function moveUp() {
  window.scrollBy(0, -10);
  console.log(window.scrollY);
}

function moveDown() {
  window.scrollBy(0, 10);
  console.log(window.scrollY);
}

function moveRight() {
  window.scrollBy(50, 0);
  console.log(window.scrollY);
}

function moveLeft() {
  window.scrollBy(-50, 0);
  console.log(window.scrollY);
}

/* link */
let toggle = true;
let x = document.createElement("AUDIO");

function playSong(str) {
  let filename = "./media/" + str + ".mp3";

  if (toggle == true) {
    x.setAttribute("src", filename);
    x.play();
    toggle = false;
  } else {
    x.pause();
    toggle = true;
  }
}

function playVideo_old(str) {
  let video = document.querySelector('.youtube');
  video.style.display = "block";
  let filename = "//www.youtube.com/embed/" + str;
  const attr = document.createAttribute("src");
  attr.value = filename;
  document.getElementById('video').setAttributeNode(attr);
}

function playVideo(str) {
  let video = document.querySelector('.youtube');
  video.style.display = "block";
  let iframe = '<iframe id="video" width="420" height="315" src="//www.youtube.com/embed/';
  iframe += str;
  iframe += '" frameborder="1" allowfullscreen></iframe>';
  iframe += '<button onclick="closeVideo()">Close</button>';
  document.getElementById('player').innerHTML = iframe;
}

function closeVideo () {
  let video = document.querySelector('.youtube');
  video.style.display = "none";
  document.getElementById('video').removeAttribute("src");
}

function showThem(str) {
  let brief = document.querySelector('.brief');
  document.addEventListener('mousedown', (e) => {
    brief.style.left = `${e.pageX - 10}px`;
    brief.style.top = `${e.pageY + 10}px`;
  });
  document.getElementById(str).style.display = "block";
}

function hideThem(str) {
  document.getElementById(str).style.display = "none";
}
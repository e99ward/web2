let button1 = document.getElementById("left");
let button2 = document.getElementById("right");
const sliders = document.querySelector("div.item")

let maxScroll = sliders.clientWidth;
let perScroll = window.innerWidth;

perScroll = parseInt(perScroll * 0.8);
maxScroll = maxScroll/2 + 100;
let minScroll = perScroll - maxScroll + 250;
console.log(maxScroll);
sliders.style.left = 0;

button1.addEventListener("click", () => {
  let currentLeft = parseInt(sliders.style.left);
  currentLeft += perScroll;
  if (currentLeft > maxScroll) {
    currentLeft = maxScroll;
  }
  sliders.style.left = currentLeft + 'px';
  console.log(sliders.style.left);
})

button2.addEventListener("click", () => {
  let currentLeft = parseInt(sliders.style.left);
  currentLeft -= perScroll;
  if (currentLeft < minScroll) {
    currentLeft = minScroll;
  }
  sliders.style.left = currentLeft + 'px';
  console.log(sliders.style.left);
})

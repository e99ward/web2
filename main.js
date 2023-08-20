let horizontalBar = document.getElementById("horizontal-underline");
let horizontalMenus = document.querySelectorAll("nav a");

function horizontalIndicator(e) {
    horizontalBar.style.left = e.offsetLeft + "px";
    horizontalBar.style.width = e.offsetWidth + "px";
    horizontalBar.style.top = e.offsetTop + e.offsetHeight + "px";
}

horizontalMenus.forEach((menu) =>
    menu.addEventListener("mouseover", (e) => horizontalIndicator(e.currentTarget))
);

let x = document.getElementById("section1");
let y = document.getElementById("section2");
let z = document.getElementById("section3");
y.style.display = "none";
z.style.display = "none";

function SelSec1() {
    x.style.display = "block";
    y.style.display = "none";
    z.style.display = "none";
}

function SelSec2() {
    y.style.display = "block";
    z.style.display = "none";
    x.style.display = "none";
}

function SelSec3() {
    z.style.display = "block";
    x.style.display = "none";
    y.style.display = "none";
}

/* for Section 1 */
let airplane = document.querySelector("div.airplane");

window.addEventListener("scroll", () => {
    let value = scrollY;
    console.log(value);

    if (value > 1500) {
        airplane.style.animation = "plane 5s forwards";
    } else {
        airplane.style.animation = "plane-revert 3s";
    }
});

/* for Section 2
let code1 = document.querySelector("p.typing-l1");
let code2 = document.querySelector("p.typing-l2");

code1.style.animation = "typing 2s steps(31), step-end alternate";
code2.style.animation = "typing 2s 0.5s steps(18), blink 0.5s step-end infinite alternate";
*/
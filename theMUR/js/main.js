document.querySelector(".fullscreen button").addEventListener("click", function () {
    document.documentElement.requestFullscreen();
    document.querySelector(".fullscreen").classList.add("fullscreenOff");
});

document.querySelector("#good").addEventListener("touchmove", function () {
    console.log("good touched");
});

document.querySelector("#notGoodInterior").addEventListener("touchmove", function () {
    console.log("not good touched");
});

document.querySelector("body").addEventListener("touchmove", function (event) {
    if (event.target.id === "good" || event.target.id === "notGoodInterior") return;
    console.log("body touched");
    event.stopPropagation();
});

let canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

let tailleX = window.innerWidth;
let tailleY = window.innerHeight;


function tailleCanvas() {
    document.querySelector("canvas").width = tailleX;
    document.querySelector("canvas").height = tailleY;
}

// Set the starting position of the line
let startX = 0;
let startY = 0;

canvas.addEventListener("touchstart", function (event) {
    // Get the touch position
    let touch = event.touches[0];

    // Set the starting position of the line
    startX = touch.pageX;
    startY = touch.pageY;

    // Move the drawing cursor to the starting position
    ctx.moveTo(startX, startY);
});

canvas.addEventListener("touchmove", function (event) {
    // Get the touch position
    let touch = event.touches[0];
    //console.log(touch.pageX, touch.pageY)

    // Draw a line from the starting position to the current touch position
    ctx.lineTo(touch.pageX - canvas.offsetLeft, touch.pageY - canvas.offsetTop);

    // Set the line color and width
    ctx.strokeStyle = "green";
    ctx.lineWidth = 4;

    // Draw the line
    ctx.stroke();
});

window.addEventListener("resize", () => {
    tailleX = window.innerWidth;
    tailleY = window.innerHeight;
    tailleCanvas();
});

tailleCanvas();


/*
For fullscren
window.addEventListener("touchend",function(){
  document.documentElement.requestFullscreen();
});
 */
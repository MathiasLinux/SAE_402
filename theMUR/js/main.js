/******
 * This is the main JS file for the game the M.U.R
 */

/********
 * Function to create a fullscreen button
 */
document.querySelector(".fullscreen button").addEventListener("click", function () {
    document.documentElement.requestFullscreen();
    document.querySelector(".fullscreen").classList.add("fullscreenOff");
});

/********
 * Declaration of the canvas and the context of the canvas (2D) and the size of the canvas (full screen)
 */
let canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

let tailleX = window.innerWidth;
let tailleY = window.innerHeight;

/********
 * Function to set the size of the canvas
 */
function tailleCanvas() {
    document.querySelector("canvas").width = tailleX;
    document.querySelector("canvas").height = tailleY;
}

/********
 * Function to draw a line from the touch input on the canvas
 * Also check if the touch input is on the good part of the canvas
 */

// Set the starting position of the line
let startX = 0;
let startY = 0;

// Array to store the quality of the touch input
let touchPoints = [];
let allTouchPoints = [];

document.querySelector("body").addEventListener("touchmove", function (event) {
    // Set the touch input into variable
    let clientX = event.touches[0].clientX;
    let clientY = event.touches[0].clientY;
    // Check if the touch input is on the good part of the canvas
    if (document.elementFromPoint(clientX, clientY).classList.contains("borderLimit")) {
        // If the touch input is on the good part of the canvas, push "good" into the array
        touchPoints.push("good");
    } else {
        // If the touch input is not on the good part of the canvas, push "bad" into the array
        touchPoints.push("bad");
    }
    allTouchPoints.push([clientX, clientY]);

    /*****
     * Creation of the line from the touch input
     *****/

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

/********
 * Function to check if the touch input is on the good part of the canvas
 * If 80% of the touch input is on the good part of the canvas, return true
 * Else return false
 * @returns {boolean}
 */
function checkTouchPoints() {
    let good = 0;
    let bad = 0;
    for (let i = 0; i < touchPoints.length; i++) {
        if (touchPoints[i] === "good") {
            good++;
        } else {
            bad++;
        }
    }
    let distance = 0;
    for (let i = 0; i < allTouchPoints.length; i++) {
        distance += checkDistance(allTouchPoints[i]);
    }
    if (distance > 180000 && distance < 450000) {
        console.log("distance ok");
        console.log(distance);
    } else {
        console.log("distance pas ok");
        console.log(distance);
    }
    //if 9=0% of the touch points are good return true
    if (good > (touchPoints.length / 100) * 80) {
        return true;
    } else {
        return false;
    }
}

/******
 * Function to check the distance of the touch input from the starting position of the line to the current position of the touch input (pythagoras)
 * If the distance is between 100 and 1000, return true
 * Else return false
 * @returns {number}
 */

function checkDistance(touchPoints) {
    //calculate the distance
    let distance1 = Math.sqrt(Math.pow(startX - touchPoints[0], 2) + Math.pow(startY - touchPoints[1], 2));
    //console.log(distance1);
    return distance1;
}

/********
 * Function to start a new line from the touch input
 * Move the drawing cursor to the starting position
 */

document.querySelector("body").addEventListener("touchstart", function (event) {
    // Get the touch position
    let touch = event.touches[0];

    // Set the starting position of the line
    startX = touch.pageX;
    startY = touch.pageY;

    // Move the drawing cursor to the starting position
    ctx.moveTo(startX, startY);
});

/********
 * Function to resize automatically the canvas when the window is resized
 * Set the new size of the canvas
 * Call the function to set the size of the canvas
 */
window.addEventListener("resize", () => {
    tailleX = window.innerWidth;
    tailleY = window.innerHeight;
    tailleCanvas();
});

/********
 * Call the function to set the size of the canvas for the first time
 */
tailleCanvas();
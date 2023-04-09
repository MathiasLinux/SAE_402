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

/********
 * Arrays for the Europe Tower
 */
// Array to store the quality of the touch input
let touchPointsEurope = [];
// Array storing all the touch input to calculate the distance
let alltouchPointsEurope = [];

/********
 * Arrays for the Wheel of Mulhouse
 */
// Array to store the quality of the touch input
let touchPointsWheel = [];
// Array storing all the touch input to calculate the distance
let alltouchPointsWheel = [];

document.querySelector("body").addEventListener("touchmove", function (event) {
    // Set the touch input into variable
    let clientX = event.touches[0].clientX;
    let clientY = event.touches[0].clientY;
    // Check if the touch input is on the left side of the screen
    if (clientX < tailleX / 2) {
        if (document.elementFromPoint(clientX, clientY).classList.contains("borderLimit")) {
            // If the touch input is on the good part of the canvas, push "good" into the array
            touchPointsEurope.push("good");
        } else {
            // If the touch input is not on the good part of the canvas, push "bad" into the array
            touchPointsEurope.push("bad");
        }
    }
    // Check if the touch input is on the right side of the screen
    if (clientX > tailleX / 2) {
        if (document.elementFromPoint(clientX, clientY).classList.contains("cls-1")) {
            // If the touch input is on the good part of the canvas, push "good" into the array
            touchPointsWheel.push("good");
        } else {
            // If the touch input is not on the good part of the canvas, push "bad" into the array
            touchPointsWheel.push("bad");
        }
    }
    //if the touch input is on the left side of the screen add into the allTouchPointsEurope array
    if (clientX < tailleX / 2) {
        alltouchPointsEurope.push([clientX, clientY]);
    }
    //if the touch input is on the right side of the screen add into the allTouchPointsWheel array
    if (clientX > tailleX / 2) {
        alltouchPointsWheel.push([clientX, clientY]);
    }

    /*****
     * Creation of the line from the touch input
     *****/

        // Get the touch position
    let touch = event.touches[0];
    //console.log(touch.pageX, touch.pageY)

    // Draw a line from the starting position to the current touch position
    ctx.lineTo(touch.pageX, touch.pageY);
    // Set the line color and width
    ctx.strokeStyle = "green";
    ctx.lineWidth = 4;

    // Draw the line
    ctx.stroke();
});

/********
 * Function to check if the touch input is on the good part of the canvas for the Europe Tower
 * If 80% of the touch input is on the good part of the canvas, return true
 * Else return false
 * @returns {boolean}
 */
function checktouchPointsEurope() {
    let good = 0;
    let bad = 0;
    for (let i = 0; i < touchPointsEurope.length; i++) {
        if (touchPointsEurope[i] === "good") {
            good++;
        } else {
            bad++;
        }
    }
    let distance = 0;
    let validateDistance = false;
    for (let i = 0; i < alltouchPointsEurope.length; i++) {
        distance += checkDistance(alltouchPointsEurope[i]);
    }
    if (distance > 150000 && distance < 450000) {
        //console.log("distance ok");
        //console.log(distance);
        validateDistance = true;
    } else {
        //console.log("distance pas ok");
        //console.log(distance);
        validateDistance = false;
    }
    //if 80% of the touch points are good return true
    if ((good > (touchPointsEurope.length / 100) * 80) && validateDistance) {
        return true;
    } else {
        return false;
    }
}

/********
 * Function to check if the touch input is on the good part of the canvas for the Wheel of Mulhouse
 * If 80% of the touch input is on the good part of the canvas, return true
 * Else return false
 * @returns {boolean}
 */
function checktouchPointsWheel() {
    let good = 0;
    let bad = 0;
    for (let i = 0; i < touchPointsWheel.length; i++) {
        if (touchPointsWheel[i] === "good") {
            good++;
        } else {
            bad++;
        }
    }
    let distance = 0;
    let validateDistance = false;
    for (let i = 0; i < alltouchPointsWheel.length; i++) {
        distance += checkDistance(alltouchPointsWheel[i]);
    }
    if (distance > 250000 && distance < 650000) {
        //console.log("distance ok");
        //console.log(distance);
        validateDistance = true;
    } else {
        //console.log("distance pas ok");
        //console.log(distance);
        validateDistance = false;
    }
    //if 80% of the touch points are good return true
    if ((good > (touchPointsWheel.length / 100) * 80) && validateDistance) {
        return true;
    } else {
        return false;
    }
}

/******
 * Function to check the distance of the touch input from the starting position of the line to the current position of the touch input (pythagoras)
 * @returns {number}
 */

function checkDistance(touchPointsEurope) {
    //calculate the distance
    return Math.sqrt(Math.pow(startX - touchPointsEurope[0], 2) + Math.pow(startY - touchPointsEurope[1], 2));
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
 * Function to activate the verification of the touch input with the click on the button
 * If the function checktouchPointsEurope and checktouchPointsWheel return true, redirect to user to the next message of the game
 * Else reset the canvas and the arrays and display a message
 */
document.querySelector(".verify").addEventListener("click", function () {
    if (checktouchPointsEurope() && checktouchPointsWheel()) {
        document.cookie = "text=12; path=/";
        location.href = "/main/map.html";
    } else {
        //reset the canvas and the arrays and display a message
        //ctx.clearRect(0, 0, canvas.width, canvas.height);
        //remove the canvas
        canvas.remove();
        //create a new canvas
        canvas = document.createElement("canvas");
        //add the canvas to the body before .verify
        document.querySelector(".verify").before(canvas);
        canvas = document.querySelector("canvas");
        ctx = canvas.getContext("2d");
        //set the size of the canvas
        tailleCanvas();
        touchPointsEurope = [];
        touchPointsWheel = [];
        alltouchPointsEurope = [];
        alltouchPointsWheel = [];
        document.querySelector(".error").classList.toggle("errorDisplay");
    }
});

/********
 * Function to close the message when the user click on it
 * Toggle the class errorDisplay to hide the message
 */
document.querySelector(".error").addEventListener("click", function () {
    document.querySelector(".error").classList.toggle("errorDisplay");
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
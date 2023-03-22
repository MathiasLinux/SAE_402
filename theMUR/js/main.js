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

canvas.addEventListener("touchstart", function(event) {
    // Get the touch position
    let touch = event.touches[0];

    // Set the starting position of the line
    startX = touch.pageX - canvas.offsetLeft;
    startY = touch.pageY - canvas.offsetTop;

    // Move the drawing cursor to the starting position
    ctx.moveTo(startX, startY);
});

// Add a touch move event listener to the canvas

let touchPositions = [];

canvas.addEventListener("touchmove", function(event) {
    // Get the touch position
    let touch = event.touches[0];

    // Add the touch position to the array
    touchPositions.push({
        x: touch.pageX - canvas.offsetLeft,
        y: touch.pageY - canvas.offsetTop
    });

    // Draw a line from the starting position to the current touch position
    ctx.lineTo(touch.pageX - canvas.offsetLeft, touch.pageY - canvas.offsetTop);

    // Set the line color and width
    ctx.strokeStyle = "red";
    ctx.lineWidth = 4;

    // Draw the line
    ctx.stroke();
});

// Get the SVG element
let svg = document.querySelector('svg');

// Get the path element from the SVG
let path = svg.querySelector('path');

// Get the bounding box of the SVG
let bbox = svg.getBoundingClientRect();

// Get the total length of the path
let pathLength = path.getTotalLength();

// Iterate over the path and get the position of each point
let positions = [];
for (let i = 0; i < pathLength; i++) {
    // Get the point at the current length along the path
    let point = path.getPointAtLength(i);

    // Convert the point's coordinates to be relative to the SVG element
    let x = point.x + bbox.left;
    let y = point.y + bbox.top;

    // Add the position to the array
    positions.push({ x, y });
}

console.log(positions);

// The `positions` array now contains the position of all points along the path


function draw() {
    fetch("home.svg")
        .then(response => response.text())
        .then(svgText => {
            // Parse the SVG image using canvg
            canvg(canvas, svgText);

            // Draw the SVG onto the canvas
            ctx.drawImage(canvas, 0, 0);
        })
        .catch(error => {
            console.error("Error loading SVG:", error);
        });

    /*ctx.beginPath();
    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.moveTo(36.020000, 251.150000);
    ctx.bezierCurveTo(36.020000, 230.690000, 36.060000, 210.230000, 35.980000, 189.770000);
    ctx.bezierCurveTo(35.970000, 186.820000, 36.810000, 184.590000, 38.980000, 182.510000);
    ctx.bezierCurveTo(84.300000, 139.290000, 129.560000, 96.020000, 174.850000, 52.770000);
    ctx.bezierCurveTo(178.420000, 49.360000, 181.310000, 49.380000, 184.950000, 52.850000);
    ctx.bezierCurveTo(230.240000, 96.100000, 275.530000, 139.350000, 320.690000, 182.730000);
    ctx.bezierCurveTo(322.340000, 184.310000, 323.500000, 187.240000, 323.510000, 189.550000);
    ctx.bezierCurveTo(323.680000, 229.970000, 323.670000, 270.390000, 323.610000, 310.800000);
    ctx.bezierCurveTo(323.590000, 325.570000, 313.420000, 335.570000, 298.630000, 335.570000);
    ctx.lineTo(229.010000, 335.570000);
    ctx.bezierCurveTo(220.500000, 335.570000, 215.780000, 330.890000, 215.780000, 322.470000);
    ctx.lineTo(215.780000, 224.790000);
    ctx.bezierCurveTo(215.780000, 217.580000, 213.970000, 215.790000, 206.680000, 215.790000);
    ctx.lineTo(152.410000, 215.790000);
    ctx.bezierCurveTo(145.890000, 215.790000, 143.890000, 217.770000, 143.890000, 224.240000);
    ctx.lineTo(143.890000, 322.290000);
    ctx.bezierCurveTo(143.890000, 330.990000, 139.250000, 335.570000, 130.460000, 335.570000);
    ctx.bezierCurveTo(107.130000, 335.570000, 83.800000, 335.590000, 60.470000, 335.570000);
    ctx.bezierCurveTo(46.420000, 335.560000, 36.140000, 325.500000, 36.050000, 311.390000);
    ctx.bezierCurveTo(35.920000, 291.310000, 36.020000, 271.220000, 36.020000, 251.140000);
    ctx.lineTo(36.030000, 251.140000);
    ctx.closePath();
    ctx.fill();

// #path54
    ctx.beginPath();
    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.moveTo(239.750000, 47.890000);
    ctx.bezierCurveTo(239.750000, 39.750000, 239.740000, 32.570000, 239.750000, 25.390000);
    ctx.bezierCurveTo(239.770000, 16.930000, 244.500000, 12.200000, 252.920000, 12.190000);
    ctx.bezierCurveTo(263.770000, 12.180000, 274.650000, 12.610000, 285.470000, 12.050000);
    ctx.bezierCurveTo(293.610000, 11.630000, 299.990000, 17.110000, 299.840000, 26.560000);
    ctx.bezierCurveTo(299.430000, 51.630000, 299.740000, 76.700000, 299.640000, 101.770000);
    ctx.bezierCurveTo(299.630000, 104.380000, 300.430000, 106.130000, 302.290000, 107.900000);
    ctx.bezierCurveTo(319.930000, 124.650000, 337.520000, 141.440000, 355.050000, 158.310000);
    ctx.bezierCurveTo(362.590000, 165.570000, 360.350000, 176.790000, 350.900000, 179.450000);
    ctx.bezierCurveTo(346.000000, 180.830000, 341.960000, 179.190000, 338.340000, 175.710000);
    ctx.bezierCurveTo(317.100000, 155.330000, 295.780000, 135.020000, 274.500000, 114.690000);
    ctx.bezierCurveTo(245.010000, 86.510000, 215.520000, 58.330000, 186.030000, 30.160000);
    ctx.bezierCurveTo(180.930000, 25.290000, 178.820000, 25.270000, 173.800000, 30.070000);
    ctx.bezierCurveTo(123.200000, 78.390000, 72.600000, 126.730000, 22.010000, 175.080000);
    ctx.bezierCurveTo(19.340000, 177.630000, 16.600000, 179.800000, 12.650000, 179.900000);
    ctx.bezierCurveTo(7.510000, 180.030000, 3.660000, 177.880000, 1.380000, 173.370000);
    ctx.bezierCurveTo(-0.970000, 168.710000, -0.260000, 164.180000, 2.990000, 160.110000);
    ctx.bezierCurveTo(3.760000, 159.140000, 4.680000, 158.280000, 5.580000, 157.420000);
    ctx.bezierCurveTo(57.950000, 107.320000, 110.310000, 57.210000, 162.690000, 7.120000);
    ctx.bezierCurveTo(172.480000, -2.240000, 186.910000, -2.420000, 196.740000, 6.860000);
    ctx.bezierCurveTo(210.880000, 20.220000, 224.910000, 33.710000, 239.760000, 47.890000);
    ctx.closePath();
    ctx.fill();*/
}

//if the screen is touched or clicked on the canvas then draw a line
/*
canvas.addEventListener("touchmove", (e)=>{
    mouseDraw(e.touches[0].clientX, e.touches[0].clientY);
});

canvas.addEventListener("mousedown", (e)=>{
    mouseDraw(e.clientX, e.clientY);
});

function mouseDraw(mouseX, mouseY){
    ctx.beginPath();
    //create a ligne from the mouse position
    ctx.strokeStyle = "white";
    ctx.moveTo(mouseX, mouseY);
    ctx.lineTo(mouseX+1, mouseY+1);
    ctx.stroke();
}
*/

window.addEventListener("resize", ()=>{
    tailleX = window.innerWidth;
    tailleY = window.innerHeight;
    tailleCanvas();
});

tailleCanvas();
//draw();

for (let i = 0; i < positions.length; i++) {
    // Get the current position
    let position = positions[i];

    // Draw a circle at the current position
    ctx.beginPath();
    ctx.rect(position.x, position.y, 10, 10)
    ctx.fillStyle = 'rgb(255,211,0)';
    ctx.fill();
    console.log(position.x, position.y);
}

let width = window.innerWidth;
let height = window.innerHeight;
let blockWidth = 80;
let blockHeight = 20;
let dX = 10;
let dY = 10;
let deltaTimer = 16;

// first we need to create a stage
let stage = new Konva.Stage({
    container: 'container',   // id of container <div>
    width: width,
    height: height
});

// then create layer
let layer = new Konva.Layer();

// create our shape
let rect1 = new Konva.Rect({
    x: (width*5)/100,
    y: (height*90)/100,
    width: blockWidth,
    height: blockHeight,
    fill: 'green',
    stroke: 'black',
    strokeWidth: 1,
});

let rect2 = new Konva.Rect({
    x: (width*12)/100,
    y: (height*85)/100,
    width: blockWidth,
    height: blockHeight,
    fill: 'green',
    stroke: 'black',
    strokeWidth: 1,
});

let player = new Image();
player.onload = function () {
    let playerImg = new Konva.Image({
        x: (width*5)/100,
        y: ((height*90)/100)-player.width,
        image: player,
        width: 32,
        height: 32,
    });
    layer.add(playerImg);




    /*let jump = function () {
        playerImg.y(playerImg.y()-10);
        layer.draw();
    }
    let moveLeft = function () {
        playerImg.x(playerImg.x()-10);
        layer.draw();
    }
    let moveRight = function () {
        playerImg.x(playerImg.x()+10);
        layer.draw();
    }
    let moveUp = function () {
        playerImg.y(playerImg.y()-10);
        layer.draw();
    }
    let moveDown = function () {
        playerImg.y(playerImg.y()+10);
        layer.draw();
    }
    let move = function (e) {
        //use event.key with a switch statement to move the player
        switch (e.key) {
            case 'ArrowLeft':
                moveLeft();
                break;
            case 'ArrowRight':
                moveRight();
                break;
            case 'ArrowUp':
                moveUp();
                break;
            case 'ArrowDown':
                moveDown();
                break;
        }
    }
    document.addEventListener('keydown', move);*/
    /*let gravity = function () {
        playerImg.y(playerImg.y()+10);
        layer.draw();
    }
    setInterval(gravity, 1000);
    let jump = function () {
        playerImg.y(playerImg.y()-10);
        layer.draw();
    }*/

    //detect if the player is on a block and if so allow them to jump
   /* let detectBlock = function () {
        if (playerImg.y() == rect1.y()-playerImg.height()) {
            document.addEventListener('keydown', jump);
        }
    }
    setInterval(detectBlock, 1000);*/

};



    player.src = '/img/man.png';
// add the shape to the layer
layer.add(rect1, rect2);
//rect1.draggable('true');

// add the layer to the stage
stage.add(layer);

// draw the image
layer.draw();
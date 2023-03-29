let width = window.innerWidth;
let height = window.innerHeight;
let blockWidth = 80;
let blockHeight = 20;
let dX = 3;
let dY = 3;
let deltaTimer = 16;

let x = (width*5)/100;
let y = ((height*90)/100)-32;
let vX = 0;
let vY = 0;

let timer = -1;

let keys = [];  // Liste des touches actives

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
        x: x,
        y: y,
        image: player,
        width: 50,
        height: 26,
    });
    layer.add(playerImg);

    window.addEventListener('keydown', moveThePlayer);
    window.addEventListener('keyup', stopThePlayer);

    function moveThePlayer(e) {
        if (timer == -1) {
            timer = setInterval(update, deltaTimer);
            update();
        }
        let index = keys.indexOf(event.key);
        if (index > -1) {   // Touche déjà active, on ne fait rien
            return;
    }
        else {
            keys.push(event.key);
            switch (event.key) {
                case "ArrowRight":
                    vX += dX;
                    break;
                case "ArrowLeft":
                    vX -= dX;
                    break;
                case "ArrowUp":
                    vY -= dY;
                    break;
                case "ArrowDown":
                    vY += dY;
                    break;
            }
        }
    }

        function stopThePlayer(event){
            let index = keys.indexOf(event.key);
            if (index > -1) {
                keys.splice(index, 1);
        }
        if (keys.length == 0) {
            clearInterval(timer);
            timer = -1;
        }
            switch (event.key) {
                case "ArrowRight":
                    vX -= dX;
                    break;
                case "ArrowLeft":
                    vX += dX;
                    break;
                case "ArrowUp":
                    vY += dY;
                    break;
                case "ArrowDown":
                    vY -= dY;
                    break;
                case " ":
                    detect();
                    break;

            }
    }


    //Function to update the player position

    /*
    Idées pour faire fonctionner la gravité :
    utiliser les coordonnées de la plateforme pour détecter si le joueur est dessus pour cela on utilise le x et y du joueur et on compare avec le x et y de la plateforme sauf que le x de platforme ne correspond au x du joueur que à son spawn, il faut donc trouver un moyen d'avoir la longeur de la platforme.
    J'écris ça à 10h du soir donc je sais pas si c'est clair mais je vais essayer de faire ça demain.
     */

    function update() {
        x += vX;
        y += vY;
        playerImg.x(x);
        playerImg.y(y);
        //if the player not on a block, apply gravity
        //update();
    }
    function gravity() {
        //if the player is on a block, stop the gravity
        if (!(playerImg.y() == rect1.y()-playerImg.height() && playerImg.x() <= rect1.x()+rect1.width() && playerImg.x() >= rect1.x()-31)) {
            playerImg.y(playerImg.y()+100);
            y = y + 100;
            console.log('gravity');
            //move();
        }


        layer.draw();
        //gravity();
    }
    setInterval(gravity, 1000)

    //create an accurate jump function
    function jump() {
        playerImg.y(playerImg.y()-100);
        y = y - 100;
        layer.draw();
    }
    //detect if the player is on a block and if so allow them to jump
    function detect() {
        if (playerImg.y() == rect1.y()-playerImg.height() && playerImg.x() <= rect1.x()+rect1.width() && playerImg.x() >= rect1.x()-31) {
            jump();
        }
    }

    //if the player is at less than 100px from a block, move them to the block
    /*function move() {
        if (playerImg.y() < rect1.y()-100) {
            playerImg.y(rect1.y()-playerImg.height());
            x = x + 10;
            console.log('move first if')
        }
        if (playerImg.y() > rect1.y()+100 && !(playerImg.y() == rect1.y()-playerImg.height() && playerImg.x() <= rect1.x()+rect1.width() && playerImg.x() >= rect1.x()-31)) {
            playerImg.y(rect1.y()-playerImg.height());
            y=y - playerImg.height();
            console.log('move second if')
        }
        layer.draw();
    }*/


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
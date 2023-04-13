var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var logs = [];
var frog = new Image();
frog.src = "frog.png";
var carImage = new Image();
carImage.src = 'car.svg';
var x = 295;
var y = 320;
var width = 35;
var height = 35;
var angle = 0;
var cars = [];
var tileSize = 35;
var lane = Math.floor(Math.random() * 2);
var logDirection = 1;
var lives = 3;
var gameOver = false;
var victory = false;
var mulhouseLogo = new Image();
mulhouseLogo.src = "RoueMulhouse.png";
var mulhouseLogoWidth = 35;
var mulhouseLogoHeight = 35;
var mulhouseLogoX = 310;
var mulhouseLogoY = 0;
var victories = 0;

document.querySelector("#startButton").addEventListener("click", up);

function up(){
    document.querySelector("#startButton").style="display:none;"
    document.querySelector("#restart-btn").style="display:none;"
    document.querySelector(".diag").style="display:none;"

    
}
function drawBackground() {
    //Dessiner le fond 
    ctx.fillStyle = "green";
    ctx.fillRect(0, 200, 650, 35);
    ctx.fillRect(0, 0, 650, 50);
    ctx.fillRect(0, 310, 650, 40);
    //Fond route
    ctx.beginPath();
    ctx.moveTo(0, 270);
    ctx.lineTo(650, 270);
    ctx.strokeStyle = "white";
    ctx.setLineDash([5]);
    ctx.strokeWidth = 2;
    ctx.stroke();
    //Fond d'eau
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 50, 650, 150);
};

function drawFrog() {
    ctx.save();
    ctx.translate(x + width / 2, y + height / 2);
    ctx.rotate(angle);
    ctx.drawImage(frog, -width / 2, -height / 2, width, height);
    ctx.restore();
}

function drawLogs() {
    ctx.fillStyle = "brown";
    for (var i = 0; i < logs.length; i++) {
        var log = logs[i];
        var logY = log.y + 50; // ajouter la position de l'eau pour déterminer la position verticale réelle du rondin
        ctx.fillRect(log.x, logY, log.width, log.height);
    }
}

function drawCars() {
    for (var i = 0; i < cars.length; i++) {
        var car = cars[i];
        ctx.drawImage(carImage, car.x, car.y, car.width, car.height);
    }
}

function drawMulhouseLogo() {
    ctx.drawImage(mulhouseLogo, mulhouseLogoX, mulhouseLogoY, mulhouseLogoWidth, mulhouseLogoHeight);
}

document.addEventListener("keydown", function(event) {
    if (gameOver) {
        if (event.code === "KeyR") {
            resetGame();
        }
        return; // Empêche le mouvement si le jeu est terminé
    }


    if (event.code === "ArrowRight") {
        x += 40;
        angle = Math.PI / 2;
        if (x + width > canvas.width) {
            x = canvas.width - width;
        }
    }
    else if (event.code === "ArrowLeft") {
        x -= 40;
        angle = -Math.PI / 2;
        if (x < 0) {
            x = 0;
        }
    }
    else if (event.code === "ArrowUp") {
        y -= 40;
        angle = 0;
        if (y < 0) {
            y = 0;
        }
    }
    else if (event.code === "ArrowDown") {
        y += 40;
        angle = Math.PI;
        if (y + height > canvas.height) {
            y = canvas.height - height;
        }
    }
});

document.getElementById("restart-btn").addEventListener("click", function() {
    if (gameOver) {
        resetGame();
    }
});

var up = document.querySelector(".Up");
var left = document.querySelector(".Left");
var right = document.querySelector(".Right");
var down = document.querySelector(".Down");

up.addEventListener("touchstart", function (event) {
    if (gameOver) {
        return; // Empêche le mouvement si le jeu est terminé
    }

    y -= 40;
    angle = 0;
    if (y < 0) {
        y = 0;
    }
});

left.addEventListener("touchstart", function (event) {
    if (gameOver) {
        return; // Empêche le mouvement si le jeu est terminé
    }

    x -= 40;
    angle = -Math.PI / 2;
    if (x < 0) {
        x = 0;
    }
});

right.addEventListener("touchstart", function (event) {
    if (gameOver) {
        return; // Empêche le mouvement si le jeu est terminé
    }

    x += 40;
    angle = Math.PI / 2;
    if (x + width > canvas.width) {
        x = canvas.width - width;
    }
});

down.addEventListener("touchstart", function (event) {
    if (gameOver) {
        return; // Empêche le mouvement si le jeu est terminé
    }

    y += 40;
    angle = Math.PI;
    if (y + height > canvas.height) {
        y = canvas.height - height;
    }
});
// Fonction pour créer un rondin
function createLog(line, position) {
    var log = {
        width: 55, // Largeur du rondin
        height: 25, // Hauteur du rondin
        speed: 1, // Vitesse du rondin
        espace: 30, // Espacement entre les rondins à 30 pixels
    };
    // Détermine la direction du rondin (droite ou gauche) en fonction de la ligne
    var direction = line % 2 === 0 ? 1 : -1;
    // Position verticale du rondin
    var y_pos = line * log.espace + 20;
    // Position horizontale du rondin (en fonction de la direction, de la position et de l'espacement supplémentaire)
    log.x = (direction === 1 ? -log.width : canvas.width)  + position * Math.floor(Math.random()*(log.espace + log.width));
    // Attribue la position verticale du rondin
    log.y = y_pos;
    // Multiplie la vitesse du rondin par la direction pour que le rondin se déplace
    log.speed *= direction;
    // Ajoute le rondin à la liste des rondins
    logs.push(log);
}

// Crée les rondins pour chaque ligne
for (var line = 0; line < 4; line++) {
    // Fonction anonyme pour créer les rondins dans chaque ligne
    (function(line) {
        var numberOfLogs = 5; // 5 rondins par ligne
        // Crée les rondins en fonction du nombre de rondins par ligne et de leur position
        for (var position = 0; position < numberOfLogs; position++) {
            createLog(line, position);
        }
    })(line);
}
function updateLogs() {
    for (var i = 0; i < logs.length; i++) {
       var log = logs[i];
       log.x += log.speed;
       if (log.x + log.width < 0 && log.speed < 0) { // vérifie si le rondin est sorti de l'écran à gauche
           log.x = canvas.width; // le replace à droite
       } else if (log.x > canvas.width && log.speed > 0) { // vérifie si le rondin est sorti de l'écran à droite
           log.x = -log.width; // le replace à gauche
       }
   }
}

function createCar() {
    var lane = Math.floor(Math.random() * 2); // Choisit une voie aléatoire entre 0 et 2
    var car = {
        x: -50,
        y: canvas.height - (tileSize * 2) - (lane * tileSize),
        width: 50,
        height: 25,
        speed: 2 + Math.random() * 2, // Vitesse aléatoire entre 2 et 4
    };
    cars.push(car);
}



function updateCars() {
    for (var i = 0; i < cars.length; i++) {
        var car = cars[i];
        car.x += car.speed;
        if (car.x > canvas.width) {
            cars.splice(i, 1);
            i--;
        }
    }
} 
function checkCollision() {
      if (victory) {
        return; // Empêche la vérification des collisions si le jeu est gagné
    }
    var isOnLog = false;
    for (var i = 0; i < logs.length; i++) {
        var log = logs[i];
        var logY = log.y + 50;
        if (x + width > log.x && x < log.x + log.width &&
            y + height > logY && y < logY + log.height) {
            isOnLog = true;
            x += log.speed;
        }
    }

    for (var i = 0; i < cars.length; i++) {
        var car = cars[i];
        if (x + width > car.x && x < car.x + car.width &&
            y + height > car.y && y < car.y + car.height) {
            // Enlever une vie quand la grenouille entre en collision avec une voiture
            if (lives > 0) {
                lives--;
            }

            if (lives <= 0) {
                gameOver = true;
                return; // Arrête la vérification des collisions une fois le jeu terminé
            } else {
                x = 295;
                y = 320;
            }
        }
    }

    if (y >= 50 && y < 200 && !isOnLog) {
        if(lives>0){
            lives--;
        }
       
        if (lives <= 0) {

            gameOver = true;
            return; // Arrête la vérification des collisions une fois le jeu terminé
        } else {
            x = 295;
            y = 320;
        }
    }

    // Condition de victoire
    if (x + width > mulhouseLogoX && x < mulhouseLogoX + mulhouseLogoWidth &&
        y + height > mulhouseLogoY && y < mulhouseLogoY + mulhouseLogoHeight) {
        victory = true;
        document.getElementById("victoryMessage").style.display="block";
        document.querySelector("#victoryMessage").addEventListener("click",up2)
        return;
    }
}
function up2(){
    document.cookie = "text=7; path=/"; 
    location.href = "/main/map.html";
}
// Ajouter une fonction pour afficher le nombre de vies et le statut du jeu
function drawGameStatus() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Lives: " + lives, 10, 30);

    if (gameOver) {
        ctx.font = "40px Arial";
        ctx.fillStyle = "red";
        ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2);
        ctx.font = "20px Arial";
        ctx.fillText("Press R to restart", canvas.width / 2 - 70, canvas.height / 2 + 30);
    }

    if (victory) {
        ctx.font = "40px Arial";
        ctx.fillStyle = "green";
        ctx.fillText("Victory! " + victories + "/3", canvas.width / 2 - 95, canvas.height / 2);
    }
}


setInterval(createCar, 1500);
setInterval(createLog, 1000);

// Ajouter une fonction pour afficher le nombre de vies et le statut du jeu
function drawGameStatus() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Lives: " + lives, 10, 30);

    if (gameOver) {
        ctx.font = "40px Arial";
        ctx.fillStyle = "red";
        ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2);
        ctx.font = "20px Arial";
        ctx.fillText("Press R or click Restart button", canvas.width / 2 - 110, canvas.height / 2 + 30);
        document.getElementById("restart-btn").style.display = "inline-block"; // Afficher le bouton de redémarrage
    }

    if (victory) {
        ctx.font = "40px Arial";
        ctx.fillStyle = "green";
        ctx.fillText("Victory!", canvas.width / 2 - 75, canvas.height / 2);
    }
}

if (x + width > mulhouseLogoX && x < mulhouseLogoX + mulhouseLogoWidth &&
    y + height > mulhouseLogoY && y < mulhouseLogoY + mulhouseLogoHeight) {
    victories++;
    x = 295;
    y = 320;
    if (victories === 3) {
        victory = true;
    }
    // La roue de Mulhouse change de position
    mulhouseLogoX = Math.floor(Math.random() * (canvas.width - mulhouseLogoWidth));
    mulhouseLogoY = Math.floor(Math.random() * 50);
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawLogs();
    updateLogs();
    drawCars();
    updateCars();
    drawMulhouseLogo()
    drawFrog();
    checkCollision();
    drawGameStatus();
    requestAnimationFrame(draw);
}

draw();

function resetGame() {
    x = 295;
    y = 320;
    lives = 3;

    gameOver = false;
    victory = false;
    cars = [];
    logs = [];
    for (var line = 0; line < 4; line++) {
        (function(line) {
            var numberOfLogs = 5;
            for (var position = 0; position < numberOfLogs; position++) {
                createLog(line, position);
            }
        })(line);
    }

    document.getElementById("restart-btn").style.display = "none"; // Masquer le bouton de redémarrage
}
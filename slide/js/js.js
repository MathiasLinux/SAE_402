const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let gameStarted = false;
let drawMode = "horizontal";
const gearImage = new Image();
gearImage.src = 'Img/RoueMulhouse.png';
const lineImage = new Image();
lineImage.src = 'Img/Laine.png';
const startButton = document.getElementById("startButton");
gearImage.addEventListener('load', () => {
  // Le code pour commencer le jeu peut être placé ici, par exemple :
  startButton.addEventListener("click", () => {
    gameStarted = true;
    setTimeout(() => {
      lines.forEach((line) => line.generateGaps());
    }, 6000);
    document.getElementById("startButton").style="display:none";
    document.querySelector("p").style="display:none";
  });
  gameLoop();
});

//document.cookie = "text=14; path=/"; //14 C'est ce qu'il faut pour musicTemple
//location.href = "/main/map.html";


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function resetGame() {
  gameStarted = true;
  horizontalLines.length = 0;
  gear.x = canvas.width * 0.5;
  gear.y = 50;
  gear.onGround = false;
  lines.forEach((line) => line.generateGaps());
  document.querySelector('#gameOverMessage').style="display:none; transition: 0.5s";
}

let horizontalLine = null;

class Line {
  constructor(x, yOffset) {
    this.x = x;
    this.yOffset = yOffset;
    this.gaps = [];
  }

  update() {
    this.yOffset -= 0.25;
  
    // Faites monter progressivement les trous vers leur position finale
    this.gaps.forEach((gap) => {
      if (gap.y > gap.targetY) {
        gap.y -= 0.25;
      } else {
        gap.y = gap.targetY;
      }
    });
  
    // Si le premier trou sort de la vue, en créer un nouveau en bas
    if (this.gaps.length > 0 && this.gaps[0].y + this.yOffset < -20) {
      this.gaps.shift();
      const gapY = this.gaps[this.gaps.length - 1].y + Math.random() * 200 + 200;
      this.gaps.push({ y: gapY + canvas.height, targetY: gapY }); // Initialisez le nouveau trou en dehors du canvas
    }

    
  }
  
  
  

  draw() {
    let prevGapY = -canvas.height;
    ctx.strokeStyle = "pink";
    ctx.lineWidth = 2;

    for (const gap of this.gaps) {
      ctx.beginPath();
      ctx.moveTo(this.x, prevGapY + this.yOffset);
      ctx.lineTo(this.x, gap.y + this.yOffset - 70);
      ctx.stroke();
      prevGapY = gap.y;
    }

    ctx.beginPath();
    ctx.moveTo(this.x, prevGapY + this.yOffset);
    ctx.lineTo(this.x, canvas.height);
    ctx.stroke();
  }


  generateGaps() {
    this.gaps = [];
    let gapY = canvas.height + 300; // Initialisez les trous en dehors du canvas

    const gapInterval = this.getGapInterval();

    // Créez des trous tous les gapInterval px
    while (gapY < canvas.height * 2) {
      gapY += gapInterval;
      this.gaps.push({ y: gapY, targetY: gapY });
    }
  }

  getGapInterval() {
    let interval;

    if (lines.indexOf(this) === 0) {
      interval = 300;
    } else if (lines.indexOf(this) === 1) {
      interval = 500;
    } else if (lines.indexOf(this) === 2) {
      const randomChoice = Math.floor(Math.random() * 2);
      interval = randomChoice === 0 ? 300 : 500;
    }

    return interval;
  }
}

class HorizontalLine {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.speedY = 0.25; 
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 5;
    ctx.stroke();
  }

  update() {
    this.y1 -= this.speedY;
    this.y2 -= this.speedY;
  }
}


const horizontalLines = []

class Gear {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 20;
    this.speedY = 0.1;
    this.onGround = false;
  }
  
  update() {
    if (!this.onGround) {
      this.y += this.speedY;
      this.checkCollisionWithLines();
      this.checkCollisionWithHorizontalLines();
  //QUAN L"UTILISATEUR GAGNE
      if (this.y + this.radius >= basket.y - basket.radius && basket.isInside(this)) {
        console.log("Partie gagnée !");
        gameStarted = false;
        document.querySelector("#victoryMessage").style="display: block";
        document.cookie = "text=9; path=/"; 
        location.href = "/main/map.html";
      }
    } else {
      this.y -= 0.25;
    }
  
  }
  draw() {
    ctx.drawImage(gearImage, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
  }
  checkCollisionWithLines() {
    for (const line of lines) {
      for (const gap of line.gaps) {
        const lineTop = gap.y + line.yOffset - 70;
        const lineBottom = gap.y + line.yOffset;
        if (
          this.y + this.radius * 0.5 >= lineTop &&
          this.y - this.radius * 0.5 <= lineBottom &&
          this.x >= line.x - 2 &&
          this.x <= line.x + 2
        ) {
          console.log("Fin de partie");
          // 2. Modifiez la méthode `checkCollisionWithLines()` pour détecter si le joueur est tombé dans un trou et geler le jeu.
          gameStarted = false;
          showRestartButton();
        }
      }
    }
  }
  

  checkCollisionWithHorizontalLines() {
    let onHorizontalLine = false;

    for (const hLine of horizontalLines) {
      const lineLength = Math.hypot(hLine.x2 - hLine.x1, hLine.y2 - hLine.y1);
      const t = ((this.x - hLine.x1) * (hLine.x2 - hLine.x1) + (this.y - hLine.y1) * (hLine.y2 - hLine.y1)) / (lineLength * lineLength);

      if (t >= 0 && t <= 1) {
        const pointX = hLine.x1 + t * (hLine.x2 - hLine.x1);
        const pointY = hLine.y1 + t * (hLine.y2 - hLine.y1);

        const distToPoint = Math.hypot(this.x - pointX, this.y - pointY);

        if (distToPoint <= this.radius) {
          const moveAmount = (this.radius - distToPoint) * 0.5;

          this.x += (hLine.x2 - hLine.x1) * moveAmount;
          this.y += (hLine.y2 - hLine.y1) * moveAmount;

          onHorizontalLine = true;
          break;
        }
      }
    }

    if (!onHorizontalLine) {
      this.checkCollisionWithLines();
    }
  }
}

class Basket {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "green";
    ctx.fill();
  }

  isInside(ball) {
    const distance = Math.sqrt((ball.x - this.x) ** 2 + (ball.y - this.y) ** 2);
    return distance <= this.radius - ball.radius;
  }
}

function isOverlappingWithOtherGaps(x, y) {
  const overlapThreshold = 60; // Ajustez cette valeur pour déterminer la distance minimale entre les trous sur différentes lignes

  for (const line of lines) {
    for (const gap of line.gaps) {
      if (Math.abs(gap.y + line.yOffset - y) < overlapThreshold) {
        return true;
      }
    }
  }

  return false;
}

const gear = new Gear(canvas.width * 0.5, 50);

const lines = [
  new Line(canvas.width * 0.3, 0),
  new Line(canvas.width * 0.5, 0),
  new Line(canvas.width * 0.7, 0),
];

function update() {
  lines.forEach((line) => line.update());
  gear.update();
  horizontalLines.forEach((hLine) => hLine.update());
}

function draw() {
   ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dessinez d'abord les lignes
  lines.forEach((line) => line.draw());
  horizontalLines.forEach((hLine) => hLine.draw());

  // Ensuite, dessine le gear par-dessus les lignes
  gear.draw();
}

function isMobile() {
  return (
    typeof window.orientation !== "undefined" ||
    navigator.userAgent.indexOf("IEMobile") !== -1
  );
}
if (isMobile()) {
  gameLoop();
} else {
  alert("Ce jeu ne fonctionne que sur les téléphones mobiles.");
}

canvas.addEventListener("mousedown", (e) => {
  const x = e.clientX;
  const y = e.clientY;
  if (
    x >= gear.x - gear.radius &&
    x <= gear.x + gear.radius &&
    y >= gear.y - gear.radius &&
    y <= gear.y + gear.radius
  ) {
    gear.onGround = !gear.onGround;
  }
});

canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();
  const x = e.touches[0].clientX;
  const y = e.touches[0].clientY;
  if (
    x >= gear.x - gear.radius &&
    x <= gear.x + gear.radius &&
    y >= gear.y - gear.radius &&
    y <= gear.y + gear.radius
  ) {
    gear.onGround = !gear.onGround;
  }
});

function isInsideVerticalLines(x) {
  return (
    x >= lines[0].x &&
    x <= lines[2].x
  );
}

let isDrawing = false;
let startX, startY;

canvas.addEventListener("mousedown", (e) => {
  startX = e.clientX;
  startY = e.clientY;
  isDrawing = true;
});


canvas.addEventListener("mousemove", (e) => {
  if (isDrawing) {
    const endX = e.clientX;
    const endY = startY;

    if (isInsideVerticalLines(endX)) {
      const hLine = new HorizontalLine(startX, startY, endX, endY);
      horizontalLines.push(hLine);
      startX = endX;
      startY = endY;
    }
  }
});

function isBallOutOfBoundariesOrNearHole(ball) {
  const margin = 20; // Vous pouvez ajuster cette valeur en fonction de la taille des trous

  if (
    ball.x < 0 ||
    ball.x > canvas.width ||
    ball.y < 0 ||
    ball.y > canvas.height
  ) {
    return true;
  }

  for (const hole of holes) {
    const dx = Math.abs(ball.x - hole.x);
    const dy = Math.abs(ball.y - hole.y);
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < hole.radius + ball.radius + margin) {
      return true;
    }
  }

  return false;
}

canvas.addEventListener("mouseup", () => {
  isDrawing = false;
});

canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
  isDrawing = true;
});

// Modifiez le gestionnaire d'événements "touchmove" avec les changements fournis
canvas.addEventListener("touchmove", (e) => {
  e.preventDefault();
  if (isDrawing) {
    const endX = e.touches[0].clientX;
    const endY = startY;

    if (isInsideVerticalLines(endX)) {
      const hLine = new HorizontalLine(startX, startY, endX, endY);
      horizontalLines.push(hLine);
      startX = endX;
      startY = endY;
    }
  }
});

canvas.addEventListener("touchend", () => {
  isDrawing = false;
});

const basket = new Basket(canvas.width * 0.5, canvas.height - 50, 30);

function gameLoop() {
  if (gameStarted) {
    update();
    draw();
  }
  requestAnimationFrame(gameLoop);
}

gameLoop();

function createRestartButton() {
  const button = document.createElement("button");
  button.innerText = "Recommencer";

  button.style="font-size: 18pt;background: #FEAD4F;padding: 10px;border-radius: 10px;position: absolute; left: 54%;top: 50%;transform: translate(-50%,50%); display: none;"
  button.addEventListener("click", () => {
    button.style.display = "none";
    resetGame();
  });
  document.body.appendChild(button);
  return button;
}

function showRestartButton() {
  restartButton.style.display = "block";
  document.querySelector('#gameOverMessage').style="display: block";
}

const restartButton = createRestartButton();



window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  lines[0].x = canvas.width * 0.3;
  lines[1].x = canvas.width * 0.5;
  lines[2].x = canvas.width * 0.7;
});

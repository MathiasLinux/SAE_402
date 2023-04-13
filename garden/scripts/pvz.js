function resizeWindow(){
    w = window.innerWidth;
    h = window.innerHeight;
    document.querySelector("body").style.width=w+"px";
    document.querySelector("body").style.height=h+"px";
}

function fullScreen(){
    let elem = document.querySelector("body")
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
        }
    resizeWindow();
}

let plantes = {
    "pPlante" : {
        "nom" : "Small plant",
        "prix" : 5,
        "description" : "A small plant who shoots once every 7 seconds",
        "temps" : "7"
    },
    "mPlante" : {
        "nom" : "Average plant",
        "prix" : 15,
        "description" : "An average plant who shoots once every 4 seconds",
        "temps" : "4"
    },
    "gPlante" : {
        "nom" : "Big plant",
        "prix" : 50,
        "description" : "A big plant who shoots once every 2 seconds",
        "temps" : "2"
    }
}


let mobsSpawnTime = [1000, 8000, 16000, 20000, 24000 /*5*/, 34000, 36000, 38000, 39000, 40000 /*10*/, 52000, 54000, 56000, 58000, 60000, 62000, 64000, 68000, 72000, 75000 /*20*/, 85000, 85500, 86000, 86500, 87000, 90000, 92000, 93000, 98000, 100000 /*30*/,110000, 111000, 112000, 113000, 114000, 115000, 116000, 117000, 118000, 119000, 120000, 125000, 126000, 127000, 130000];

var moneyAff = document.querySelector('.money');
var money = 0;
var moneyInterval = 5000;
var intervalMoneyInterval = "";
var plantePrise = "";
var kills = 0;

var root = document.querySelector(':root');
var menuPlantes = document.querySelector('.menuPlantes');
var cases = document.querySelector('.immenseGrid');
var attaques = document.querySelector('.attaques');
var mobs = document.querySelector('.mobs');
var messagePopup = document.querySelector('.messagePopup');
var ecranDeFin = document.querySelector('.ecranDeFin');
var nbCases = 50;
var pv = 5;
var killMoney = 5;

document.querySelector('.lancerLeJeu').addEventListener('click', startTheGame);

root.style.setProperty("--vitesse", "22s");

function startTheGame(){

    document.querySelector('.accueil').style.display = 'none';
    addMoney(5);
    moneyPerTime();
    
    for(let i=0; i<mobsSpawnTime.length; i++){
        var posRando = Math.floor(Math.random() * (5 - 2) + 2);
    
        document.querySelector(`.mobs>div:nth-child(${posRando})`).innerHTML += `<div class='mob' id='mob${mobsSpawnTime[i]}' data-pos=${posRando-1}><img src='../img/zombie.png'></div>`;

    }
    
    for(let i=0; i<mobsSpawnTime.length; i++){
        setTimeout(function(){
            setTimeout(function(){
                if(mobsSpawnTime[i]==34000){
                    root.style.setProperty("--vitesse", "16s");
                } else if(mobsSpawnTime[i]==52000){
                    root.style.setProperty("--vitesse", "12s");
                } else if(mobsSpawnTime[i]==85000){
                    root.style.setProperty("--vitesse", "10s");
                } else if(mobsSpawnTime[i]==110000){
                    root.style.setProperty("--vitesse", "7s");
                    killMoney = 10;
                } else if(mobsSpawnTime[i]==130000){
                    victory();
                }
                document.querySelector(`#mob${mobsSpawnTime[i]}`).classList.add('mobD');
            }, 100)
                }, mobsSpawnTime[i])
}
}


function moneyPerTime(){
    intervalMoneyInterval = setInterval(function(){
        addMoney(1);
    }, moneyInterval)
}


for(i=0; i<nbCases; i++){
    cases.innerHTML+=`<div id='case${i}'>`;
}

document.querySelector('#case30').innerHTML = "<div class='bustHP'><div class='pv'>"+ pv +"</div>/"+ pv +"<img class='bust' src=../img/bust.png></div>";

Object.keys(plantes).forEach(e=>{
    menuPlantes.innerHTML += `
    <div data-prix='${plantes[e].prix}' id='${e}'>
        <p>${plantes[e].nom}</p>
        <p>${plantes[e].prix}</p>
        <p>${plantes[e].description}</p>
    </div>`;
})

document.querySelectorAll(".menuPlantes>div").forEach(e => {
    e.addEventListener('click', takePlant);
})

document.querySelectorAll(".immenseGrid>div").forEach(e => {
    e.addEventListener('click', placePlant);
})

function takePlant(){
    if(plantePrise == ""){
        if(money>=this.dataset.prix){
            addMoney(-this.dataset.prix);
            plantePrise = this.id;
            console.log(plantePrise);
            document.querySelectorAll('.immenseGrid>div').forEach(a=>{
                a.classList.add('choisisUnEndroit');
            })
            this.style.backgroundColor = "rgb(189, 255, 189)";
        } else {
            message("You don't have enough money for this plant !", "red");
        }
    } else {
        if(this.id==plantePrise){
            addMoney(+this.dataset.prix);
            plantePrise = "";
            document.querySelectorAll('.immenseGrid>div').forEach(a=>{
                a.classList.remove('choisisUnEndroit');
            })
            this.style.backgroundColor = "white";
        } else {
            message("You must place the plant you have on you first !", "red");
        }
    }
}

function placePlant(){
    if(plantePrise!=""){
        if(this.id.split('e')[1].split('').reverse()[0]<4&&this.id.split('e')[1].split('').reverse()[0]>0&&this.id.split('e')[1]>9){
            console.log(this.classList);
            if(this.dataset.ouais==undefined||this.dataset.ouais!=plantePrise){
                if(this.dataset.ouais!=undefined){
                    this.removeAttribute('class');
                    this.removeAttribute('data-plant');
                    this.innerHTML="";
                    document.querySelector(`#${this.id}atk`).remove();
                }
                
                this.dataset.ouais = plantePrise;
                this.dataset.plant = true;
                console.log(this);
                this.innerHTML = `<img class='coolosPlante' src='../img/${this.dataset.ouais}.png'>`;
                document.querySelectorAll('.immenseGrid>div').forEach(a=>{
                    a.classList.remove('choisisUnEndroit');
                })
                //changer par une image de plante quand images faites
                document.querySelector(`#${plantePrise}`).style.backgroundColor = "white";

                plantePrise = "";

                activePlante(this, plantes[this.dataset.ouais].temps);
            } else {
                message("There's already a plant here !", "red");
            }
        } else {
            message("You can't place it here !", "red");
        }
    } else {
        message("You must buy a plant first !", "red");
    }
}

function activePlante(plante, interval){
    console.log(plante, interval);
    var plantePos = plante.getBoundingClientRect();
    if(plante.id.split('e')[1].split('').length>1){
        var dataPos = plante.id.split('e')[1].split('')[0];
    } else {
        var dataPos = 0;
    }

    attaques.innerHTML+=`<div id='${plante.id}atk' class='atk' style='top:${plantePos.y+20}px; left: ${plantePos.x+50}px; display' data-pos='${dataPos}'></div>`;

    console.log(plante);
    eval(`o${plante.id} = setInterval(function () {
        document.querySelector('#${plante.id}atk').style.display='block';
        document.querySelector('#${plante.id}atk').classList.add('atkD');
        
        setTimeout(function(){
            document.querySelector('#${plante.id}atk').classList.remove('atkD');
        }, 900)
        checkAtk(plante, ${plante.id}atk);
    }, ${interval}000);`);
    console.log(plante.id.split('e')[1].split('')[0]);
}

function checkAtk(plante, attack){
    var mobTouch = document.querySelector(`.mob[data-pos='${attack.dataset.pos}']`);
    if((mobTouch!=null)&&(mobTouch.classList==`mob mobD`)){
        setTimeout(function(){
            addKill();
            mobTouch.remove();
            addMoney(killMoney);
        }, mobTouch.getBoundingClientRect().x-250)
    }
}

function addMoney(add){
    money = money + add;
    moneyAff.innerHTML = money;
}

function addKill(){
    kills++;
    if(kills==5){
        moneyInterval = 4000;
        clearInterval(intervalMoneyInterval);
        moneyPerTime();
    } else if(kills==10){
        moneyInterval = 3000;
        clearInterval(intervalMoneyInterval);
        moneyPerTime();
    } else if(kills==20){
        moneyInterval = 1500;
        clearInterval(intervalMoneyInterval);
        moneyPerTime();
    } else if(kills==30){
        moneyInterval = 750;
        clearInterval(intervalMoneyInterval);
        moneyPerTime();
    }
}

function takeDamage(){
    pv--;
    if(pv<=0) {
        document.querySelector('.pv').innerHTML = 0;
        gameOver();
    } else { 
        document.querySelector('.pv').innerHTML = pv;
    }
}

function gameOver(){
    document.querySelector('.ecranDeFin>p').innerHTML = 'The bust has been destroyed !';
    document.querySelector('.ecranDeFin>.retry').style.display = 'block';
    ecranDeFin.style.display = 'flex';
}

var c10 = document.querySelector('#case10');
var c20 = document.querySelector('#case20');
var c30 = document.querySelector('#case30');
var c40 = document.querySelector('#case40');

//e = les mobs ; plant = les plantes posées
setInterval(function(){
    
    document.querySelectorAll('.mob').forEach(e=>{
        if(overlaps(e, c10)||overlaps(e, c20)||overlaps(e, c30)||overlaps(e, c40)){
            e.remove();
            takeDamage();
        }
        
        document.querySelectorAll('div[data-plant=true]').forEach(plant=>{
                if(overlaps(e, plant)){
                    console.log(e, plant);
                    clearInterval(eval("o" + plant.id));
                    plant.removeAttribute('class');
                    plant.removeAttribute('data-plant');
                    plant.removeAttribute('data-ouais');
                    plant.innerHTML="";
                    document.querySelector(`#${plant.id}atk`).remove();
                }
            });
    })
}, 100)

function victory(){
    document.querySelector('.ecranDeFin>p').innerHTML = 'You have defeated all of the zombies !';
    document.querySelector('.ecranDeFin>.continue').style.display = 'block';
    ecranDeFin.style.display = 'flex';
}

function message(texte, color){
    messagePopup.innerText = texte;
    messagePopup.style.display = "flex";
    messagePopup.style.backgroundColor = color;
    setTimeout(() => {
        messagePopup.style.display = "none";
    }, 1500);
}

//fonction permettant de vérifier si 2 div a et b se touchent (retourne true ou false)
function overlaps(a, b) {
    const rect1 = a.getBoundingClientRect();
    const rect2 = b.getBoundingClientRect();
    const isInHoriztonalBounds =
      rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x;
    const isInVerticalBounds =
      rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
    const isOverlapping = isInHoriztonalBounds && isInVerticalBounds;
    return isOverlapping;
  }
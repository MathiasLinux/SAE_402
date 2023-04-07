// document.querySelector(".fullScreen").addEventListener("touchstart",fullScreen)

let w = window.innerWidth;
let h = window.innerHeight;

let music;

let widthNote;
let widthPartition;

let zoneG;
let zoneD;

// let musicDelay = [[0,1,2],[3,4,5],[6,7,8],[9,10,11]];
let musicDelay = [
                [11.2,11.6,14,14.5,16.9,17.3,21.3,22.7,23.2,25.6,26.1,28.5,29,32.8,36.2,37,37.7,38.2,38.6,44.4,57.5,58,60.4,60.9,63.3,63.8,67.6,71,72,72.5,73,73.5,79.2,80.7,81.2,83.6,84.1,86.6,87,90.9,92.3,92.8,95.2,95.7,98.2,98.6,102.7,104.1,104.7,109.1],
                [12.1,14.9,17.85,20.8,23.7,26.6,29.5,32.4,34.3,34.8,35.4,35.8,39,43.9,58.5,61.4,64.3,67.1,69.1,69.5,70.1,70.6,73.9,78.7,81.7,84.6,87.6,90.4,93.3,96.2,99.1,102.1,105.2,108.5],
                [19.8,20.1,21.7,31.4,31.7,33.2,42,43,43.3,44.9,66.1,66.4,68.1,76.8,77.8,78.1,79.7,89.3,89.6,91.4,101,101.3,103.2,107.4,107.7,109.75],
                [13.1,13.5,15.9,16.35,18.8,19.25,20.4,24.6,25.1,27.55,28.05,30.4,30.85,32,40.1,40.5,41.1,41.5,42.5,43.5,59.4,59.9,62.3,62.8,65.2,65.7,66.7,74.9,75.4,75.9,76.3,77.3,78.3,82.6,83.1,85.4,86,88.4,88.95,89.9,94.2,94.7,97.1,97.7,100.1,100.5,101.6,106.3,106.8,107.9]
            ]

let oneClick = [false,false,false,false];

let zones = document.querySelectorAll(".zone");
let notes;

let id = [1,1,1,1];

let note1 = "";
let note2 = "";
let note3 = "";
let note4 = "";

let score = 0;

function resizeWindow(){
    w = window.innerWidth;
    h = window.innerHeight;
    document.querySelector("main").style.width=w+"px";
    document.querySelector("main").style.height=h+"px";
    defDiametre();
}

function fullScreen(){
    let elem = document.querySelector("main")
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
        }
    resizeWindow();
}

function play() {
    let J = document.querySelector(".jouer")
    J.style.transition = "1s"
    J.style.transform = "translateY(-100%)";
    J.style.opacity = "0%";
    document.querySelectorAll(".note").forEach(n => {
        n.style.animationPlayState = "running";
    })
    music = new sound("audio/WWYAMC_final.mp3");
    // music = new sound("audio/WWYAMC_fast.mp3");
    document.querySelector("audio").remove();
    music.play();
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.setAttribute("onended","getScoreFinal()")
    // this.sound.id = "WWYAMC"
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}

function defDiametre(){
    let diametre = document.querySelector(".rythm").clientHeight;
    zones.forEach(z => {
        z.style.width = diametre - 8 + "px";
        z.style.height = diametre - 8 + "px";
    })
    notes.forEach(n => {
        n.style.width = diametre + "px";
        n.style.height = diametre + "px";
    })
    widthNote = document.querySelector(".note").offsetWidth;
    widthPartition = document.querySelector(".partition").offsetWidth;
    zoneG = parseInt(document.querySelector(".G>.rythm>.zone").getBoundingClientRect().x.toFixed());
    zoneD = parseInt(document.querySelector(".D>.rythm>.zone").getBoundingClientRect().x.toFixed());
    defNote();
}

function addNote(idRythm,idNote,delay){
    document.querySelector(".rythm#"+idRythm+">.partition").innerHTML+="<div class='note' id='"+idNote+"'></div>";
    document.querySelector(".note#"+idNote).style.animationDelay = delay+"s";
}

function createMusic(musicDelay){
    for(let i=0; i<=3; i++){
        for(let j=0; j<musicDelay[i].length; j++){
            switch (i) {
                case 0:
                    addNote("GH",("n"+(i+1)+"-"+(j+1)),musicDelay[i][j])
                    break;
                case 1:
                    addNote("GB",("n"+(i+1)+"-"+(j+1)),musicDelay[i][j])
                    break;
                case 2:
                    addNote("DH",("n"+(i+1)+"-"+(j+1)),musicDelay[i][j])
                    break;
                case 3:
                    addNote("DB",("n"+(i+1)+"-"+(j+1)),musicDelay[i][j])
                    break;
                default:
                    break;
            }
        }
    }
    notes = document.querySelectorAll(".note");
}

function defNote(){
    note1 = document.querySelector("#n1-"+id[0]);
    note2 = document.querySelector("#n2-"+id[1]);
    note3 = document.querySelector("#n3-"+id[2]);
    note4 = document.querySelector("#n4-"+id[3]);
}

function toucheZone(){
    switch (this.id) {
        case "GH":
            getCoord(note1,0);
            break;
        case "GB":
            getCoord(note2,1);
            break;
        case "DH":
            getCoord(note3,2);
            break;
        case "DB":
            getCoord(note4,3);
            break;
        default:
            break;
    }
}

function getCoord(note,oC){
    if(oneClick[oC]==false){
        oneClick[oC]=true;
        let partition = note.id.split("-")[0];
        let x = parseInt(note.getBoundingClientRect().x.toFixed())+widthNote/2;
        getScore(x,partition);
    }
}

function getScore(x,partition){
    let good = widthNote*12.5/100;
    let perfect = widthNote*25/100;
    if(partition == "n1" || partition == "n2"){
        if(x>=(zoneG + perfect) && x<=(zoneG + widthNote - perfect)){
            document.querySelector(".message").innerHTML="<h1>Perfect</h1>";
            score+=100;
        }
        else if(x>=(zoneG + good) && x<=(zoneG + widthNote -good)){
            document.querySelector(".message").innerHTML="<h2>Good</h2>";
            score+=50;
        }
        else
            document.querySelector(".message").innerHTML="<h3>Miss</h3>";
    }
    else{
        if(x>=(zoneD + perfect) && x<=(zoneD + widthNote - perfect)){
            document.querySelector(".message").innerHTML="<h1>Perfect</h1>";
            score+=100;
        }
        else if(x>=(zoneD + good) && x<=(zoneD + widthNote - good)){
            document.querySelector(".message").innerHTML="<h2>Good</h2>";
            score+=50;
        }
        else
            document.querySelector(".message").innerHTML="<h3>Miss</h3>";
    }

    document.querySelector(".score").innerText=score;
}

function getNote(){
    for(let i=0; i<=3; i++)
        oneClick[i]=false;
    let partition = this.id.split("-")[0];
    switch ((partition)) {
        case "n1":
            noteSuivante(0);
            break;
        case "n2":
            noteSuivante(1);
            break;
        case "n3":
            noteSuivante(2);
            break;
        case "n4":
            noteSuivante(3);
            break;
        default:
            break;
    }
}

function noteSuivante(n) {
    id[n]+=1;
    defNote();
}

function getScoreFinal() {
    // score = 10000;
    if(score>=10000){
        document.cookie = "text=14; path=/"; //14 C'est ce qu'il faut pour musicTemple
        location.href = "/main/map.html";
    }
    else{
        document.querySelector(".scoreFinal").style.display="grid";
    }
}

createMusic(musicDelay);

window.addEventListener("resize", resizeWindow)

document.querySelector(".jouer>button").addEventListener("touchstart",play)

zones.forEach(z => {
    z.addEventListener("touchstart",toucheZone)
})

notes.forEach(N => {
    N.addEventListener("animationend",getNote)
})

// document.querySelector("audio#WWYAMC").addEventListener("ended",getScoreFinal)
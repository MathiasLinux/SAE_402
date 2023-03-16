let w = window.innerWidth;
let h = window.innerHeight;

let musicDelay = [[0,1,2],[3,4,5],[6,7,8],[9,10,11]];

document.querySelector("main").style.width=w+"px";
document.querySelector("main").style.height=h+"px";

let oneClick = [false,false,false,false];

let zone = document.querySelectorAll(".zone");

let id = [1,1,1,1];

let note1 = "";
let note2 = "";
let note3 = "";
let note4 = "";

let score = 0;

function resizeWindow(){
    w = window.innerWidth;
    document.querySelector("main").style.width=w+"px";
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
    // console.log(note);
    if(oneClick[oC]==false){
        // console.log(oneClick[oC])
        oneClick[oC]=true;
        let partition = note.id.split("-")[0];
        getScore(note.offsetLeft,partition);
    }
}

function getScore(x,partition){
    console.log(x)
    // console.log(partition)
    let perfect = widthNote*12.5/100;
    let good = widthNote*25/100;
    if(partition == "n1" || partition == "n2"){
        if(x>(widthNote-perfect) && x<(widthNote+perfect)){
            document.querySelector(".message").innerHTML="<h1>Perfect</h1>";
            score+=100;
        }
        else if(x>(widthNote-good) && x<(widthNote+good)){
            document.querySelector(".message").innerHTML="<h2>Good</h2>";
            score+=50;
        }
        else
            document.querySelector(".message").innerHTML="<h3>Miss</h3>";
    }
    else{
        if(x>(widthPartition-widthNote*2-perfect) && x<(widthPartition-widthNote*2+perfect)){
            document.querySelector(".message").innerHTML="<h1>Perfect</h1>";
            score+=100;
        } 
        else if(x>(widthPartition-widthNote*2-good) && x<(widthPartition-widthNote*2+good)){
            document.querySelector(".message").innerHTML="<h2>Good</h3>";
            score+=50;
        }
        else
            document.querySelector(".message").innerHTML="<h3>Miss</h3>";
    }
    document.querySelector(".score").innerText=score;
}

function getNote(){
    let partition = this.id.split("-")[0]
    // console.log(partition)
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
    oneClick[n]=false;
    id[n]+=1;
    // console.log(id[n]);
    defNote();
}

window.addEventListener("resize", resizeWindow)

createMusic(musicDelay);

defNote();

let widthNote = document.querySelector(".note").offsetWidth;

let widthPartition = document.querySelector(".partition").offsetWidth;

zone.forEach(z =>{
    z.addEventListener("click",toucheZone)
})

// zone.forEach(z => {
//     z.addEventListener("touchstart",toucheZone)
// })

document.querySelectorAll(".note").forEach(N => {
    N.addEventListener("animationend",getNote)
})
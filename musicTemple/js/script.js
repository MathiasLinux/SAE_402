let w = window.innerWidth;
let h = window.innerHeight;

document.querySelector("main").style.width=w+"px";
document.querySelector("main").style.height=h+"px";

let widthNote = document.querySelector(".note").offsetWidth;

let widthPartition = document.querySelector(".partition").offsetWidth;

let oneClick = false;

let zone = document.querySelectorAll(".zone")

let id = [1,1,1,1]

let note1 = "";
let note2 = "";
let note3 = "";
let note4 = "";

let score = 0;

function resizeWindow(){
    w = window.innerWidth;
    document.querySelector("main").style.width=w+"px";
}

function defNote(){
    note1 = document.querySelector("#n1-"+id[0])
    note2 = document.querySelector("#n2-"+id[1])
    note3 = document.querySelector("#n3-"+id[2])
    note4 = document.querySelector("#n4-"+id[3])
}

function toucheZone(){
    if(oneClick==false){
        oneClick = true;
        switch (this.id) {
            case "GH":
                getCoord(note1);
                break;
            case "GB":
                getCoord(note2);
                break;
            case "DH":
                getCoord(note3);
                break;
            case "DB":
                getCoord(note4);
                break;
            default:
                break;
        }
    }
}

function getCoord(note){
    // console.log(note);
    let partition = note.id.split("-")[0]
    getScore(note.offsetLeft,partition);
}

function getScore(x,partition){
    console.log(x)
    // console.log(partition)
    if(partition == "n1" || partition == "n2"){
        if(x>(widthNote-20) && x<(widthNote+20)){
            document.querySelector(".message").innerHTML="<h1>Perfect</h1>";
            score+=100;
        }
        else if(x>(widthNote-40) && x<(widthNote+40)){
            document.querySelector(".message").innerHTML="<h2>Good</h2>";
            score+=50;
        }
        else
            document.querySelector(".message").innerHTML="<h3>Miss</h3>";
    }
    else{
        if(x>(widthPartition-widthNote*2-20) && x<(widthPartition-widthNote*2+20)){
            document.querySelector(".message").innerHTML="<h1>Perfect</h1>";
            score+=100;
        } 
        else if(x>(widthPartition-widthNote*2-40) && x<(widthPartition-widthNote*2+40)){
            document.querySelector(".message").innerHTML="<h2>Good</h3>";
            score+=50;
        } 
        else
        document.querySelector(".message").innerHTML="<h3>Miss</h3>";
    }
    showScore(score)
}

function showScore(score){
    document.querySelector(".score").innerText=score;
}

function getNote(){
    oneClick = false
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
    id[n]+=1;
    // console.log(id[n]);
    defNote();
}

window.addEventListener("resize", resizeWindow)

defNote();

zone.forEach(z =>{
    z.addEventListener("click",toucheZone)
})

// zone.forEach(z => {
//     z.addEventListener("touchstart",toucheZone)
// })

document.querySelectorAll(".note").forEach(N => {
    N.addEventListener("animationend",getNote)
})
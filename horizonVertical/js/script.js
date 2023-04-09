let w;
let h;
let vx;
let vy;
let j = document.querySelector(".joueur");
let jx = parseInt(j.getBoundingClientRect().x.toFixed());
let jy = parseInt(j.getBoundingClientRect().y.toFixed());
let jh = parseInt(j.getBoundingClientRect().height.toFixed());
let jw = parseInt(j.getBoundingClientRect().width.toFixed());

let Lsol = [
    [
        {w : 100, t : 30, l : 0}
    ],
    [
        {w : 40, t : 50, l : 0},
        {w : 55, t : 80, l : 45}
    ],
    [
        {w : 20, t : 25, l : 0},
        {w : 20, t : 40, l : 25}
    ]
]

let sol;
let solG = [];
let solD = [];
let soly = [];

let nv = 0;

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

function resizeWindow(){
    w = window.innerWidth;
    h = window.innerHeight;
    document.querySelector("main").style.width=w+"px";
    document.querySelector("main").style.height=h+"px";
    vx = w*0.0005;
    vy = 1;
    getSol();
}

function play() {
    let J = document.querySelector(".jouer")
    J.style.transition = "1s"
    J.style.transform = "translateY(-100%)";
    J.style.opacity = "0%";
}

function go(){
    if(jx>=(w - jw))
        return next_nv();
    if(jy>=h)
        return console.log("LOSE");
    if(getCollision()==false)
        jy+=vy;
    jx+=vx;
    j.style.transform = "translate("+jx+"px,"+jy+"px)"
    window.requestAnimationFrame(go)
}

function getSol(){
    Lsol[nv].forEach(Ls => {
        document.querySelector(".sols").innerHTML+="<div class='sol' style='width:"+Ls.w+"%; top:"+Ls.t+"%; left:"+Ls.l+"%;'></div>"
    })
    solG = [];
    solD = [];
    soly = [];
    sol = document.querySelectorAll(".sol");
    sol.forEach(s => {
        solG.push(parseInt(s.getBoundingClientRect().x.toFixed()));
        solD.push(parseInt(s.getBoundingClientRect().x.toFixed()) + parseInt(s.getBoundingClientRect().width.toFixed()));
        soly.push(parseInt(s.getBoundingClientRect().y.toFixed()) - jh);
    })
}

function getCollision(){
    let collision = false;
    for(let i=0; i<soly.length; i++)
        if(((jx + parseInt(j.getBoundingClientRect().width.toFixed()))>=solG[i] && jx<=solD[i]) && jy==soly[i])
            collision=true
    return collision;
}

function next_nv(){
    nv++;
    document.querySelector(".sols").innerHTML="";
    j.style.transform = "translate(0px,0px)";
    jx = parseInt(j.getBoundingClientRect().x.toFixed());
    jy = parseInt(j.getBoundingClientRect().y.toFixed());
    getSol();
}

window.addEventListener("resize", resizeWindow)

document.querySelector(".jouer>button").addEventListener("touchstart",play)

resizeWindow();

document.querySelector("button.go").addEventListener("touchstart",go)

// document.querySelector("button.nv_next").addEventListener("touchstart",next_nv)
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
        {w : 30, t : 30, l : 0},
        {w : 30, t : 90, l : 70},
        {w : 0, t : 60, l : 35}
    ],
    [
        {w : 20, t : 20, l : 0},
        {w : 0, t : 40, l : 25},
        {w : 0, t : 60, l : 45},
        {w : 20, t : 80, l : 80}
    ],
    [
        {w : 10, t : 20, l : 0},
        {w : 0, t : 40, l : 15},
        {w : 0, t : 60, l : 30},
        {w : 0, t : 70, l : 55},
        {w : 10, t : 80, l : 90}
    ],
    [
        {w : 20, t : 20, l : 0},
        {w : 0, t : 40, l : 20},
        {w : 0, t : 60, l : 20},
        {w : 20, t : 80, l : 80}
    ],
    [
        {w : 20, t : 20, l : 0},
        {w : 0, t : 40, l : 20},
        {w : 0, t : 60, l : 20},
        {w : 0, t : 80, l : 20},
        {w : 0, t : 40, l : 40},
        {w : 0, t : 60, l : 40},
        {w : 0, t : 80, l : 40},
        {w : 0, t : 40, l : 60},
        {w : 0, t : 60, l : 60},
        {w : 0, t : 80, l : 60},
        {w : 20, t : 80, l : 80}
    ]
]

let Psol = [
    [
        {id : 1, w : 10, taken : false},
        {id : 2, w : 20, taken : false},
        {id : 3, w : 30, taken : false}
    ],
    [
        {id : 1, w : 10, taken : false},
        {id : 2, w : 20, taken : false},
        {id : 3, w : 30, taken : false}
    ],
    [
        {id : 1, w : 10, taken : false},
        {id : 2, w : 20, taken : false},
        {id : 3, w : 30, taken : false}
    ],
    [
        {id : 1, w : 50, taken : false}
    ],
    [
        {id : 1, w : 20, taken : false},
        {id : 2, w : 20, taken : false},
        {id : 3, w : 20, taken : false}
    ]
]

let addSolV;
let idPsol;

let sol;
let solG = [];
let solD = [];
let soly = [];

let nv = 0;
let nvmax = 5;

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

function clean(){
    document.querySelector("button.go").classList.toggle("hidden");
    document.querySelectorAll(".addSol").forEach(aS =>(
        aS.classList.toggle("hidden")
    ));
    document.querySelector(".menuSol").classList.toggle("hidden");
}

function go(){
    if(jx>=(w - jw))
        return next_nv();
    if(jy>=h)
        return document.querySelector(".scoreFinal").style.display="grid";
    if(getCollision()==false)
        jy+=vy;
    jx+=vx;
    j.style.transform = "translate("+jx+"px,"+jy+"px)"
    window.requestAnimationFrame(go)
}

function getSol(){
    document.querySelector(".sols").innerHTML="";
    document.querySelector(".menuSol>.sols").innerHTML="";

    Lsol[nv].forEach(Ls => {
        if(Ls.w != 0)
            document.querySelector(".sols").innerHTML+="<div class='sol' style='width:"+Ls.w+"%; top:"+Ls.t+"%; left:"+Ls.l+"%;''></div>"
        else
            document.querySelector(".sols").innerHTML+="<div class='addSol' style='top:"+Ls.t+"%; left:"+Ls.l+"%;' id='"+Ls.l+"/"+Ls.t+"'><img src='img/plus.svg' alt='Add a platform image'></div>"
    })

    Psol[nv].forEach(Ps =>{
        if(Ps.taken==false)
            document.querySelector(".menuSol>.sols").innerHTML+="<div class='sol' style='width:"+Ps.w+"%;' id='"+Ps.id+"/"+Ps.w+"'></div>";
    })

    solG = [];
    solD = [];
    soly = [];
    sol = document.querySelectorAll("main>.sols>.sol");
    sol.forEach(s => {
        solG.push(parseInt(s.getBoundingClientRect().x.toFixed()));
        solD.push(parseInt(s.getBoundingClientRect().x.toFixed()) + parseInt(s.getBoundingClientRect().width.toFixed()));
        soly.push(parseInt(s.getBoundingClientRect().y.toFixed()) - jh);
    })

    document.querySelectorAll(".addSol").forEach(aS => {
        aS.addEventListener("touchstart",openMenu)
    })

    document.querySelectorAll(".menuSol>.sols>.sol").forEach(mSSS => {
        mSSS.addEventListener("touchstart",addSol)
    })
}

function getCollision(){
    let collision = false;
    for(let i=0; i<soly.length; i++)
        if(((jx + jw)>=solG[i] && jx<=solD[i]) && jy==soly[i])
            collision=true
    return collision;
}

function next_nv(){
    nv++;
    if(nv==nvmax){
        document.cookie = "text=17; path=/"; //17 C'est ce qu'il faut pour horizonVertical
        location.href = "/main/map.html";
    }
    document.querySelector(".sols").innerHTML="";
    j.style.transform = "translate(0px,0px)";
    jx = parseInt(j.getBoundingClientRect().x.toFixed());
    jy = parseInt(j.getBoundingClientRect().y.toFixed());
    clean();
    getSol();
}

function openMenu(){
    addSolV = this.id;
    document.querySelector(".menuSol").classList.add("open");
}

function closeMenu(){
    document.querySelector(".menuSol").classList.remove("open");
}

function addSol(){
    addSolV = addSolV.split("/");
    idPsol = this.id.split("/");
    Lsol[nv].forEach(Ls =>{
        if(Ls.l==addSolV[0] && Ls.t==addSolV[1])
            Ls.w = idPsol[1];
    })

    Psol[nv].forEach(Ps => {
        if(Ps.id==idPsol[0])
            Ps.taken = true;
    })

    closeMenu();
    getSol();
}

window.addEventListener("resize", resizeWindow)

document.querySelector(".jouer>button").addEventListener("touchstart",play)

resizeWindow();

document.querySelector("button.go").addEventListener("touchstart",clean)
document.querySelector("button.go").addEventListener("touchstart",go)

document.querySelectorAll(".addSol").forEach(aS => {
    aS.addEventListener("touchstart",openMenu)
})

document.querySelector(".menuSol>.closeMenu>img").addEventListener("touchstart",closeMenu)

document.querySelectorAll(".menuSol>.sols>.sol").forEach(mSSS => {
    mSSS.addEventListener("touchstart",addSol)
})
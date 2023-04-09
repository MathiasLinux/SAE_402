let w;
let h;

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
}
let text = ["Fils","de","ui-ui"]
let t = 0;

document.querySelector(".dialogue").addEventListener("click",nextText)

function nextText(){
    this.innerText=text[t];
    t++;
}
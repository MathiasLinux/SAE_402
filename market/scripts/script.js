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

let recettes = {
    1 : {
        "nom" : "Bibeleskæs (1)",
        "recetteAff" : "Vegetables, meat, potatoes",
        "img" : "RECETTE1.png",
        "rec":"VEGETABLES MEAT POTATO ",
        "points":300
    },
    2 : {
        "nom" : "Choucroute (2)",
        "recetteAff" : "Vegetables, potatoes, meat",
        "img" : "RECETTE2.png",
        "rec":"VEGETABLES POTATO MEAT ",
        "points":300
    },
    3 : {
        "nom" : "Baeckeoffe (3)",
        "recetteAff" : "Meat, vegetables, potatoes",
        "img" : "RECETTE3.png",
        "rec":"MEAT VEGETABLES POTATO ",
        "points":300
    },
    4 : {
        "nom" : "Fleischschnacka (4)",
        "recetteAff" : "Meat, vegetables",
        "img" : "RECETTE4.png",
        "rec":"MEAT VEGETABLES ",
        "points":200
    }
}



document.querySelectorAll('.zoneDeJeu>div').forEach(e =>{
    e.addEventListener('click', ingredient);
})

document.querySelector('.zoneDeJeu').addEventListener('click', mouvement);

document.querySelector('.lancerLeJeu').addEventListener('click', ecranDeDepart);

var time = 200;
var messagePopup = document.querySelector('.message');
var personnage = document.querySelector('.personnage');
var ingPris = document.querySelector('.ingPris');
var cuisine = document.querySelector('.cuisine>.sprite');
var cuisineText = document.querySelector('.cuisine>div');
var livrer = document.querySelector('.demandes');
var reponse = "";
var contact = "";
var timeout = "";
var demande = "";

var pointsTemps;
var pointsTotaux = 0;
var pointsPossibles = 0;
var pointsVictoire = 2000; 
var resultat = false;

var menuR = document.querySelector('.menuRecettes');

ancienX = 300;
ancienY = 200;

document.querySelector('.timer').innerHTML = time;

//fonction qui fait disparaitre l'écran de départ et qui lance le jeu
function ecranDeDepart(){
    document.querySelector('.ecranDeDepart').style.display = "none";
    timer();
    client();
}

//fonction qui lance et gère le timer
function timer(){
    i = setInterval(() => {
        time--;
        document.querySelector('.timer').innerHTML = time;
        if(time==0){
            finDuJeu();
        }
    }, 1000);
}

document.querySelector('.boutonMenuR').addEventListener('click', menuRecette);

//ferme ou ouvre le menu des recettes
function menuRecette(){
    menuR.classList.toggle('menuRecettesAbs');
    menuR.classList.toggle('menuRecettesApp');
}

//boucle qui fait apparaitre la liste des recettes dans le menu
for(let i=1; i<=Object.keys(recettes).length;i++){
    document.querySelector('.listeRecettes>ul').innerHTML+=`<li> ${recettes[i].nom} : ${recettes[i].recetteAff} </li>`;
}

//fait apparaitre l'écran de fin du jeu
function finDuJeu(){
    clearInterval(i);
    menuR.classList.add('menuRecettesAbs');
    menuR.classList.toggle('menuRecettesApp');
    document.querySelector('.ecranDeFin').style.display = "flex";
    document.querySelector('.pointsFinaux').innerHTML = pointsTotaux + " points";
    if(pointsTotaux>=pointsVictoire){
        document.querySelector('.phrasesFin').innerHTML = "You have more than " + pointsVictoire + " points, you have won !";
        document.querySelector('.continue').style.display = 'block';
        resultat = true;
    } else {
        document.querySelector('.phrasesFin').innerHTML = "You have less than " + pointsVictoire + " points.";
        document.querySelector('.retry').style.display = 'block';
        resultat = false;
    }

    console.log(resultat);
}

document.querySelector('.continue').addEventListener('click', next);

function next(){
    document.cookie = "text=2; path=/"; //4 -> après marché
    location.href = "/main/map.html";
}

//permet de récuperer l'élément sur lequel on a cliquer
function ingredient(){
    contact = this;
}

//crée une demande de client
function client(){
    var i = Math.floor(Math.random() * Object.keys(recettes).length)+1;
    demande = recettes[i];
    console.log(demande);
    reponse = demande.rec;
    document.querySelector('.jeVeux>img').src = "img/" + demande.img;
    pointsPossibles = demande.points + 20;
    pointsTemps = setInterval(() => {
        if(pointsPossibles>demande.points){
            pointsPossibles--; 
        }
    }, 2000);
}

//fonction permettant au .personnage de se déplacer en direction de l'endroit cliqué
function mouvement(){
    if(timeout!=""){
        clearTimeout(timeout);
    }
    sourisX = window.event.clientX;
    sourisY = window.event.clientY;
    temps = ((Math.abs(sourisX-ancienX))+(Math.abs(sourisY-ancienY)))/400;


    if(contact!=""){
        timeout = setTimeout(() => {
            prendre(contact);
        }, temps*1000);
    }

    document.documentElement.style.setProperty('--vitesse', (temps + "s"));
    
    personnage.style.top = sourisY + 'px';
    personnage.style.left = sourisX + 'px';

    ancienX = sourisX;
    ancienY = sourisY;
}

//fonction qui vérifie si le personnage entre en contact avec un élément
function prendre(ing){
    if((overlaps(personnage, ing))){
        if(contact.dataset.type=="ingredient"){
            personnage.id = ing.classList[0] + (personnage.dataset.ustensile??"");
            ingPris.src= "img/" + ing.classList + ".png";
        } else if(contact.dataset.type=="demande"){
            if(cuisine.id==reponse){
                message("Good job !", "green");
                cuisine.removeAttribute("id");
                cuisineText.innerText = "";
                pointsTotaux+=pointsPossibles;
                document.querySelector('.points>span').innerText = pointsTotaux;
                clearInterval(pointsTemps);
                client();
            } else{
                message("Not the right recipe !", "red");
                pointsTotaux=pointsTotaux-10;
                document.querySelector('.points>span').innerText = pointsTotaux;
            }
        } else if(contact.dataset.type=="poubelle"&&(personnage.id!='' || cuisine.id!='')){
            console.log('deleted - cuisine:', cuisine.id, '- personnage:', personnage.id);
            cuisineText.innerText = "";
            cuisine.removeAttribute("id");
            personnage.removeAttribute("id");
            ingPris.src = "img/NOTHING.png";
            message("Ingredients thrown away", "green");
        } else if(contact.dataset.type=="cuisine"){
            console.log(personnage.id);
            if(personnage.id==""){
                message("You are not holding any ingredient !", "red");
            } else if(cuisine.id.split(' ').length==4){
                message("There are already three ingredients !", "red");
            } else {
                cuisine.id += personnage.id + " ";
                cuisineText.innerHTML += "<br>" + personnage.id;
                personnage.removeAttribute("id");
                ingPris.src = "img/NOTHING.png";
                console.log(cuisine.id.split(' ').length);
            }
        }
    }
    contact = "";
}

//fonction permettant d'afficher un message au centre de l'écran via le "texte"
function message(texte, color){
    messagePopup.innerText = texte;
    messagePopup.style.display = "flex";
    messagePopup.style.backgroundColor = color;
    setTimeout(() => {
        messagePopup.style.display = "none";
    }, 1500);
}

//fonction permettant de vérifier si 2 div se touchent (retourne true ou false)
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
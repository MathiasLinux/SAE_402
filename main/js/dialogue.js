let t = 0;

let numberText = 0;

document.querySelector(".historyButton").addEventListener("click", (e) => {
    e.preventDefault();
    document.cookie = "numberText=" + numberText + "; path=/";
    location.href = "/main/history.html";
});

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// if cookie contain the text variable , use it for numberText
// else use 0
console.log(getCookie("text"));
if (getCookie("text") !== "" && getCookie("text") !== null) {
    numberText = parseInt(getCookie("text"));
}

document.querySelector(".dialogue").addEventListener("touchstart", nextText)

function nextText(event) {
    console.log("touch");
    let textElem = document.querySelector(".text");
    //if the click is on the right side of the screen go to the next text
    if (event.touches[0].clientX > window.innerWidth / 2) {
        console.log("right");
        if (textElem.innerHTML !== "Click Here") {
            t++;
        }
        console.log(t);
        console.log(text[numberText]);
        if (t < text[numberText].length) {
            document.querySelector(".person").innerHTML = text[numberText][t].person;
            document.querySelector(".text").innerHTML = text[numberText][t].text;
        }
    } else {
        //if the click is on the left side of the screen go to the previous text
        console.log("left");
        console.log(t);
        if (t > 0) {
            t--;
            document.querySelector(".person").innerHTML = text[numberText][t].person;
            document.querySelector(".text").innerHTML = text[numberText][t].text;
        }
    }
    if (text[numberText][t].change === true) {
        document.querySelector(".dialogue").style.display = "none";
        console.log(text[numberText][t].x, text[numberText][t].y);
        let x = text[numberText][t].x;
        let y = text[numberText][t].y;
        let iconName = text[numberText][t].icon_name;
        let iconPath = ""
        for (let i = 0; i < iconList.length; i++) {
            if (iconList[i].name === iconName) {
                console.log(iconList[i]);
                iconPath = iconList[i].url;
            }
        }
        const spotIcon = L.icon({
            iconUrl: iconPath,
            iconSize: [50, 50],
            iconAnchor: [25, 50],
            popupAnchor: [0, -50]
        });
        const icon = L.marker([x, y], {icon: spotIcon}).addTo(map)
        map.setView([x, y], 16);
        geo.watchPosition(() => {
            detectUserLocationInRange(x, y)
            console.log(inrange);
            if (t > 0) {
                if (text[numberText][t].change === true && inrange === true) {
                    console.log("change");
                    t = -1;
                    numberText++;
                    document.querySelector(".dialogue").style.display = "block";

                }
            }
        })

    }
    if (text[numberText][t].launchGame === true) {
        let gameName = text[numberText][t].game;
        //search into the game object the game that has the same name as the gameName variable and launch it
        for (let i = 0; i < game.length; i++) {
            if (game[i].name === gameName) {
                console.log(game[i]);
                window.location.replace(game[i].url);
            }
        }
    }
}
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
if (getCookie("text") !== "" && getCookie("text") !== null && getCookie("numberText") !== "null" && getCookie("numberText") !== null) {
    if (parseInt(getCookie("numberText")) > parseInt(getCookie("text"))) {
        numberText = parseInt(getCookie("numberText"));
    }
}
//if cookie text doesn't exist, if cookie numberText exist, use it for numberText
if (getCookie("text") === "" || getCookie("text") === null) {
    if (getCookie("numberText") !== "null" && getCookie("numberText") !== null) {
        numberText = parseInt(getCookie("numberText"));
    }
}


if (numberText >= 5 && numberText < 9) {
    document.querySelector(".topLayerLeft div").innerHTML = "1/4";
} else if (numberText >= 9 && numberText < 13) {
    document.querySelector(".topLayerLeft div").innerHTML = "2/4";
} else if (numberText >= 13 && numberText < 17) {
    document.querySelector(".topLayerLeft div").innerHTML = "3/4";
} else if (numberText >= 17) {
    document.querySelector(".topLayerLeft div").innerHTML = "4/4";
}

let alwaysInRange = false

if (getCookie("alwaysInRange") !== "" && getCookie("alwaysInRange") !== null && getCookie("alwaysInRange") === "true") {
    alwaysInRange = true;
}


document.querySelector(".dialogue").addEventListener("touchstart", nextText)

function nextText(event) {
    console.log("touch");
    let textElem = document.querySelector(".text");
    //Verify that the text is not a multiple choice
    console.log("t : " + t);
    console.log("numberText : " + numberText);
    if (t < 0 || text[numberText][t].multipleChoice === false || text[numberText][t].multipleChoice === undefined || text[numberText][t].multipleChoice === null) {
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
        if (t > 0) {
            if (text[numberText][t].change === true && alwaysInRange === true) {
                console.log("change");
                console.log(t);
                t = -1;
                console.log(t);
                numberText++;
                document.querySelector(".dialogue").style.display = "block";

            }
        }
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
    if (text[numberText][t].multipleChoice === true) {
        document.querySelector(".person").innerHTML = text[numberText][t].person;
        let textDiv = document.querySelector(".text")
        textDiv.innerHTML = text[numberText][t].text;
        let div = document.createElement("div");
        div.classList.add("multipleChoice");
        for (let i = 0; i < text[numberText][t].choices.length; i++) {
            let div2 = document.createElement("div");
            div2.classList.add("choice");
            let label = document.createElement("label");
            let input = document.createElement("input");
            input.type = "radio";
            input.name = "choice";
            input.classList.add("inputChoice");
            input.value = text[numberText][t].choices[i].value;
            console.log(text[numberText][t].correctAnswer + "correct answer");
            console.log(i + 1 + "i");
            if ((i + 1) === text[numberText][t].correctAnswer) {
                console.log("correct answer found");
                div2.addEventListener("change", () => {
                    console.log("correct answer clicked");
                    t = 0;
                    numberText++;
                    document.querySelector(".person").innerHTML = text[numberText][t].person;
                    document.querySelector(".text").innerHTML = text[numberText][t].text;
                });
            }
            label.appendChild(input);
            div2.appendChild(label);
            div.appendChild(div2);
            label.innerHTML += text[numberText][t].choices[i].text;
        }
        textDiv.appendChild(div);
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
console.log("history.js loaded");

console.log(text)

let titles = [
    {
        "title": "The Beginning",
        "number": 0
    },
    {
        "title": "The Cover Market",
        "number": 1
    },
    {
        "title": "After the Market",
        "number": 2
    },
    {
        "title": "The Garden of Scents",
        "number": 3
    },
    {
        "title": "After the Garden of Scents",
        "number": 4
    },
    {
        "title": "Place de la paix",
        "number": 5
    },
    {
        "title": "After Place de la paix",
        "number": 6
    },
    {
        "title": "The former Town Hall",
        "number": 7
    },
    {
        "title": "After the former Town Hall",
        "number": 8
    },
    {
        "title": "The Bollwerk Tower",
        "number": 9
    },
    {
        "title": "After the Bollwerk Tower",
        "number": 10
    },
    {
        "title": "The M.U.R",
        "number": 11
    },
    {
        "title": "After the M.U.R",
        "number": 12
    },
    {
        "title": "The Temple Saint-Étienne",
        "number": 13
    },
    {
        "title": "After the Temple Saint-Étienne",
        "number": 14
    }
]

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

console.log(getCookie("numberText"));

let numberText = parseInt(getCookie("numberText"));

let div = document.createElement("div");
div.classList.add("text");
div.classList.add("title");
div.classList.add("firstTitle");
div.innerHTML = titles[0].title;
document.querySelector(".history").appendChild(div);

for (let i = 0; i <= numberText; i++) {
    for (let j = 0; j < text[i].length; j++) {
        let div = document.createElement("div");
        div.classList.add("text");
        //if the text is empty replace it with a title
        if (text[i][j].text === "" && i !== numberText) {
            div.classList.add("title");
            div.innerHTML = titles[i + 1].title;
            document.querySelector(".history").appendChild(div);
            continue;
        } else if (text[i][j].text === "" && i === numberText) {
            continue;
        } else {
            div.innerHTML = text[i][j].text;
        }
        document.querySelector(".history").appendChild(div);
    }
}
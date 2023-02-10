let url = "https://restcountries.com/v3.1/all";
const APIKEY = "63d372573bc6b255ed0c4352";
let users = [];

fetch(url)
    .then(response => response.json())
    .then(function(data){
        for (let a = 0; a < data.length; a++){
            let newLi = document.createElement("li");
            newLi.innerHTML = `<img src = "` + data[a]["flags"]["png"] + `" style = "width: 50px; height:25px"> ` + data[a]["name"]["common"]
            document.querySelector(".menu").append(newLi)
        }
        const dropdowns = document.querySelectorAll(".dropdown");

        for (let a = 0; a < dropdowns.length; a++){
            const select = dropdowns.item(a).querySelector(".select");
            const menu = dropdowns.item(a).querySelector(".menu");
            const options = dropdowns.item(a).querySelectorAll(".menu li");
            const selected = dropdowns.item(a).querySelector(".selected");

            select.addEventListener('click', () => {
                if (select.classList.contains("select-clicked")){
                    select.classList.remove("select-clicked");
                }
                else{
                    select.classList.add("select-clicked");
                }
                if (menu.classList.contains("menu-open")){
                    menu.classList.remove("menu-open");
                }
                else{
                    menu.classList.add("menu-open");
                }
            });

            for (let b = 0; b < options.length; b++){
                options.item(b).addEventListener('click', () => {
                    selected.innerHTML = options.item(b).innerHTML;
                    if (selected.innerHTML == "Global"){
                        document.querySelector(".flex-container table tbody").remove();
                        let newE = document.createElement("tbody");
                        newE.classList.add("userRow");
                        document.querySelector(".flex-container table"),append(newE);
                        for(let i = 0; i<users.length;i++){
                            if(localStorage.getItem("Username" + i)!=null && i<10){
                                //Creates rows for data
                                let newRow = document.createElement("tr");
                                newRow.setAttribute("id","row" + i);
                                document.querySelector(".userRow").append(newRow);
                                //Displays ranks from 1-10
                                let newElement = document.createElement("td"); 
                                newElement.innerHTML = i + 1;
                                newElement.classList.add("rank")
                                document.querySelector("#row"+ i).append(newElement);
                                //Displays data 
                                newElement = document.createElement("td");
                                newElement.innerHTML = `<img src="`+ localStorage.getItem("Countryflag" + i).split('"')[1] + `" style = "width: 50px; height:25px"> ` + localStorage.getItem("Username" + i).split('"')[1];
                                newElement.classList.add("name")
                                document.querySelector("#row"+ i).append(newElement);
                                newElement = document.createElement("td");
                                newElement.innerHTML= localStorage.getItem("Score" + i);
                                newElement.classList.add("score")
                                document.querySelector("#row"+ i).append(newElement);
                            }
                        }
                    }
                    else{
                        let filter = selected.innerHTML.split(">")[1];
                        let selectedCountry;
                        for (let c = 1; c < filter.length; c++){
                            selectedCountry += filter[c];
                        }
                        let displayedUsers = [];
                        let c = 0;
                        while (localStorage.getItem("Username" + c) != null){
                            if (localStorage.getItem("Country" + c) == selectedCountry && displayedUsers.length < 10){
                                let displayUser = {
                                    "username": localStorage.getItem("Username" + c).split('"')[1],
                                    "flag": localStorage.getItem("Countryflag" + c).split('"')[1],
                                    "score": parseInt(localStorage.getItem("Score" + c))
                                }
                                displayedUsers.push(displayUser);
                            }
                            c++;
                        }
                        document.querySelector(".flex-container table").remove();
                        let newElement = document.createElement("table");
                        document.querySelector(".flex-container").append(newElement);
                        newElement = document.createElement("thead");
                        newElement.innerHTML = `
                            <tr class="header">
                                <th class="rank">Rank</th>
                                <th class="name">Name</th>
                                <th class="score">Score</th>
                            </tr>
                        `
                        document.querySelector(".flex-container table").append(newElement);
                        newElement = document.createElement("tbody");
                        newElement.classList.add("userRow");
                        document.querySelector(".flex-container table").append(newElement);
                        for (let i = 1; i <= 10; i++){
                            newElement = document.createElement("tr");
                            newElement.setAttribute("id", "row" + i);
                            document.querySelector(".userRow").append(newElement);
                            newElement = document.createElement("td");
                            newElement.classList.add("rank");
                            newElement.innerHTML = i;
                            document.querySelector("#row" + i).append(newElement);
                            newElement = document.createElement("td");
                            newElement.classList.add("name");
                            newElement.innerHTML = `<img src="` + displayedUsers[i - 1].flag + `" style="width: 50px; height:25px"> ` + displayedUsers[i - 1].username;
                            document.querySelector("#row" + i).append(newElement);
                            newElement = document.createElement("td");
                            newElement.classList.add("score");
                            newElement.innerHTML = displayedUsers[i - 1].score;
                            document.querySelector("#row" + i).append(newElement);
                        }
                    }

                    select.classList.remove("select-clicked");
                    menu.classList.remove("menu-open");

                    for (let c = 0; c < options.length; c++){
                        options.item(c).classList.remove("active");
                    }

                    options.item(b).classList.add("active");
                });
            }
        }

    });

function mainMenu(){
    window.location = "mainMenu.html";
}

// [STEP 5]: Create AJAX settings
let settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://idassignment2-0ba8.restdb.io/rest/player",
    "method": "GET",
    "headers": {
        "content-type": "application/json",
        "x-apikey": APIKEY,
        "cache-control": "no-cache"
    }
};

// [STEP 6]: Send the AJAX request over to restdb
$.ajax(settings).done(function (response){
    for (let i = 0; i < response.length; i++){
        let user = {
            "username": response[i].username,
            "country": response[i].country,
        };
        users[i] = user;
    };
    for(let i = 0; i<users.length;i++){
        if(localStorage.getItem("Username" + i)!=null && i<10){
            //Creates rows for data
            let newRow = document.createElement("tr");
            newRow.setAttribute("id","row" + i);
            document.querySelector(".userRow").append(newRow);
            //Displays ranks from 1-10
            let newElement = document.createElement("td"); 
            newElement.innerHTML = i + 1;
            newElement.classList.add("rank")
            document.querySelector("#row"+ i).append(newElement);
            //Displays data 
            newElement = document.createElement("td");
            newElement.innerHTML = `<img src="`+ localStorage.getItem("Countryflag" + i).split('"')[1] + `" style = "width: 50px; height:25px"> ` + localStorage.getItem("Username" + i).split('"')[1];
            newElement.classList.add("name")
            document.querySelector("#row"+ i).append(newElement);
            newElement = document.createElement("td");
            newElement.innerHTML= localStorage.getItem("Score" + i);
            newElement.classList.add("score")
            document.querySelector("#row"+ i).append(newElement);
        }
    }
});

var audio = new Audio("audio/10. Boundless Slumber.wav");
audio.volume = 0.4;
audio.loop = true;

if (localStorage.getItem("bgmTime") != null){
    audio.currentTime = parseInt(localStorage.getItem("bgmTime")) + 1;
}

audio.play();


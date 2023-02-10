let url = "https://restcountries.com/v3.1/all";

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
                console.log("test")
            });

            for (let b = 0; b < options.length; b++){
                options.item(b).addEventListener('click', () => {
                    selected.innerHTML = options.item(b).innerHTML;
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

// const APIKEY = "63d372573bc6b255ed0c4352";
// let users = [];
// let scores = [];
// let scoreInDescOrder = [];

// // [STEP 5]: Create AJAX settings
// let settings = {
//     "async": true,
//     "crossDomain": true,
//     "url": "https://idassignment2-0ba8.restdb.io/rest/player",
//     "method": "GET",
//     "headers": {
//         "content-type": "application/json",
//         "x-apikey": APIKEY,
//         "cache-control": "no-cache"
//     }
// };

// // [STEP 6]: Send the AJAX request over to restdb
// $.ajax(settings).done(function (response){
//     for (let i = 0; i < response.length; i++){
//         let user = {
//             "username": response[i].username,
//             "country": response[i].country,
//         };
//         users[i] = user;
//     };
//     for(let i = 0; i<users.length;i++){
//         if(localStorage.getItem("Username" + i)!=null && i<10){
//             //Creates rows for data
//             let newRow = document.createElement("tr");
//             newRow.setAttribute("id","row" + i);
//             document.querySelector(".userRow").append(newRow);
//             //Displays ranks from 1-10
//             let newElement = document.createElement("td"); 
//             newElement.innerHTML = i + 1;
//             newElement.classList.add("rank")
//             document.querySelector("#row"+ i).append(newElement);
//             //Displays data 
//             newElement = document.createElement("td");
//             newElement.innerHTML = `<img src="`+ localStorage.getItem("Countryflag" + i).split('"')[1] + `" style = "width: 50px; height:25px"> ` + localStorage.getItem("Username" + i).split('"')[1];
//             newElement.classList.add("name")
//             document.querySelector("#row"+ i).append(newElement);
//             newElement = document.createElement("td");
//             newElement.innerHTML= localStorage.getItem("Score" + i);
//             newElement.classList.add("score")
//             document.querySelector("#row"+ i).append(newElement);
//         }
//     }
// });
var audio = new Audio("audio/10. Boundless Slumber.wav");
audio.volume = 0.4;
audio.loop = true;

if (localStorage.getItem("bgmTime") != null){
    audio.currentTime = parseInt(localStorage.getItem("bgmTime")) + 1;
}

audio.play();


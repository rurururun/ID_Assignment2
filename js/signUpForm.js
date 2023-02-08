if (localStorage.getItem("bgmTime") != null){
    var audio = new Audio("audio/10. Boundless Slumber.wav");
    audio.volume = 0.4;
    audio.currentTime = parseInt(localStorage.getItem("bgmTime")) + 1;
    audio.play();
    audio.loop = true;
    console.log(audio.currentTime);
}

function hover(){
    var hoversfx = new Audio("audio/Button Hover.mp3");
    hoversfx.play();
}

// [STEP 0]: Make sure our document is all good
$(document).ready(function () {
    let url = "https://restcountries.com/v3.1/all";
    let countryList = [];

    fetch(url)
        .then(response => response.json())
        .then(function(data){
            for (let a = 0; a < data.length; a++){
                let country = {
                    "name": data[a]["name"]["common"],
                    "flag": data[a]["flags"]["png"]
                }
                countryList.push(country);
            }
        });

    // const dropdowns = document.querySelectorAll(".dropdown");

    // for (let a = 0; a < dropdowns.length; a++){
    //     const select = dropdowns.item(a).querySelector(".select");
    //     const caret = dropdowns.item(a).querySelector(".caret");
    //     const menu = dropdowns.item(a).querySelector(".menu");
    //     const options = dropdowns.item(a).querySelectorAll(".menu li");
    //     const selected = dropdowns.item(a).querySelector(".selected");

    //     select.addEventListener('click', () => {
    //         if (select.classList.contains("select-clicked")){
    //             select.classList.remove("select-clicked");
    //         }
    //         else{
    //             select.classList.add("select-clicked");
    //         }
    //         if (caret.classList.contains("caret-rotate")){
    //             caret.classList.remove("caret-rotate");
    //         }
    //         else{
    //             caret.classList.add("caret-rotate");
    //         }
    //         if (menu.classList.contains("menu-open")){
    //             menu.classList.remove("menu-open");
    //         }
    //         else{
    //             menu.classList.add("menu-open");
    //         }
    //     });

    //     for (let b = 0; b < options.length; b++){
    //         options.item(b).addEventListener('click', () => {
    //             selected.innerHTML = options.item(b).innerHTML;
    //             select.classList.remove("select-clicked");
    //             caret.classList.remove("caret-rotate");
    //             menu.classList.remove("menu-open");

    //             for (let c = 0; c < options.length; c++){
    //                 options.item(c).classList.remove("active");
    //             }

    //             options.item(b).classList.add("active");
    //         });
    //     }
    // }

    document.querySelector("#country").addEventListener('keyup', e => {
        let same = false;
        let displayedCountries = [];

        let prevItems = document.querySelectorAll(".dropdown li");

        for (let a = 0; a < prevItems.length; a++){
            prevItems.item(a).remove();
        }

        document.querySelector(".dropdown").style.display = "none";
        document.querySelector(".dropdown").style.opacity = "0";

        let input = $("#country").val();
        for (let a = 0; a < countryList.length; a++){
            for(let b = 0; b < input.length; b++){
                if (countryList[a].name.length < input.length || input.length > countryList[a].name.length){
                    same = false;
                    break;
                }
                else{
                    if (countryList[a].name[b].toLowerCase() == input[b].toLowerCase()){
                        same = true;
                    }
                    else{
                        same = false;
                        break;
                    }
                }
            }

            if (same){
                displayedCountries.push(countryList[a]);
            }
        }

        if (displayedCountries.length != 0){
            document.querySelector(".dropdown").style.display = "block";
            document.querySelector(".dropdown").style.opacity = "1";
        }

        for (let a = 0; a < displayedCountries.length; a++){
            let newElement = document.createElement("li");
            newElement.innerHTML = displayedCountries[a].name;
            newElement.addEventListener('click', () => {
                $("#country").val(newElement.innerHTML);
                document.querySelector(".dropdown").style.display = "none";
                document.querySelector(".dropdown").style.opacity = "0";
            })
            document.querySelector(".dropdown").append(newElement);
        }
    })

    const APIKEY = "63d372573bc6b255ed0c4352";
    let users = [];
    getUsers();

    // [STEP 1]: Create our submit form listener
    $("#submit").click(function(e){
        // prevent default action of the button
        e.preventDefault();
        
        // [STEP 2]: Retrieve form data
        let username = $("#username").val();
        let password = $("#password").val();
        let country = $("#country").val();
        let countryFlag = "";

        // [STEP 3]: Data validation
        let usernameStatus = false;
        let passwordStatus = false;
        let countryStatus = false;
        if (username == ""){
            if (document.querySelector("#name p") == null){
                let newdiv = document.createElement("p");
                newdiv.innerHTML = `
                    Please enter a name
                `;
                newdiv.style.color = "red";
                document.querySelector("#name").append(newdiv);
            }
        }
        else{
            if (document.querySelector("#name p") != null){
                document.querySelector("#name p").remove();
            }
            usernameStatus = true;
        }
        if (password == ""){
            if (document.querySelector("#pass p") == null){
                let newdiv = document.createElement("p");
                newdiv.innerHTML = `
                    Please enter a password
                `;
                newdiv.style.color = "red";
                document.querySelector("#pass").append(newdiv);
            }
        }
        else{
            if (document.querySelector("#pass p") != null){
                document.querySelector("#pass p").remove();
            }
            passwordStatus = true;
        }
        if (country == ""){
            if (document.querySelector("#ctry p") == null){
                let newdiv = document.createElement("p");
                newdiv.innerHTML = `
                    Please enter a country
                `;
                newdiv.style.color = "red";
                document.querySelector("#ctry").append(newdiv);
            }
        }
        else{
            if (document.querySelector("#ctry p") != null){
                document.querySelector("#ctry p").remove();
            }
            countryStatus = true;
        }
        for (let i = 0; i < users.length; i++){
            if (users[i].username == username){
                usernameStatus = false;
                if (document.querySelector("#name p") != null){
                    document.querySelector("#name p").remove();
                    let newdiv = document.createElement("p");
                    newdiv.innerHTML = `
                        Username already exists
                    `;
                    newdiv.style.color = "red";
                    document.querySelector("#name").append(newdiv);
                }
                else{
                    let newdiv = document.createElement("p");
                    newdiv.innerHTML = `
                        Username already exists
                    `;
                    newdiv.style.color = "red";
                    document.querySelector("#name").append(newdiv);
                }
            }
        }

        for (let a = 0; a < countryList.length; a++){
            if (country == countryList[a].name){
                countryStatus = true;
                countryFlag = countryList[a].flag;
                break;
            }
            else{
                countryStatus = false;
            }
        }

        if (!countryStatus){
            if (document.querySelector("#ctry p") != null){
                document.querySelector("#ctry p").remove();
                let newdiv = document.createElement("p");
                newdiv.innerHTML = `
                    Please enter a valid country
                `;
                newdiv.style.color = "red";
                document.querySelector("#ctry").append(newdiv);
            }
            else{
                let newdiv = document.createElement("p");
                newdiv.innerHTML = `
                    Please enter a valid country
                `;
                newdiv.style.color = "red";
                document.querySelector("#ctry").append(newdiv);
            }
        }

        if (usernameStatus == true && passwordStatus == true && countryStatus == true){
            // [STEP 4]: get form values when user clicks on submit
            // Adapted from restdb api
            let jsondata = {
                "username": username,
                "password": password,
                "country": country,
                "countryflag": countryFlag
            };

            // [STEP 5]: Create AJAX settings
            let settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://idassignment2-0ba8.restdb.io/rest/player",
                "method": "POST",
                "headers": {
                    "content-type": "application/json",
                    "x-apikey": APIKEY,
                    "cache-control": "no-cache"
                },
                "processData": false,
                "data": JSON.stringify(jsondata)
            };

            // [STEP 6]: Send the AJAX request over to restdb
            $.ajax(settings).done(function (){
                localStorage.setItem("bgmTime", JSON.stringify(audio.currentTime));
                // encodedUsername = encodeURIComponent(username);
                // encodedPassword = encodeURIComponent(password);
                // document.cookie = "username=" + encodedUsername + ";";
                // document.cookie = "password=" + encodedPassword + ";";
                localStorage.setItem("username", JSON.stringify(username));
                localStorage.setItem("password", JSON.stringify(password));
                window.location = "loadingScreen.html";
            });
        };
    });

    // [STEP 7]: Create a function to get all the users in the database
    function getUsers(){
        // [STEP 8]: Create AJAX settings
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

        // [STEP 9]: Send the AJAX request over to restdb
        $.ajax(settings).done(function (response){
            for (let i = 0; i < response.length; i++){
                let user = {
                    "username": response[i].username,
                    "password": response[i].password,
                    "country": response[i].country,
                    "countryflag": response[i].countryflag
                };
                users[i] = user;
            };
        });
    }
});
// [STEP 0]: Make sure our document is all good
$(document).ready(function () {
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

        if (usernameStatus == true && passwordStatus == true && countryStatus == true){
            // [STEP 4]: get form values when user clicks on submit
            // Adapted from restdb api
            let jsondata = {
                "username": username,
                "password": password,
                "country": country
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
                    "country": response[i].country
                };
                users[i] = user;
            };
        });
    }
});
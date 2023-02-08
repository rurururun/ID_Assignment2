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

        // [STEP 3]: Data validation
        let usernameStatus = false;
        let passwordStatus = false;
        for (let i = 0; i < users.length; i++){
            if (users[i].username == username){
                usernameStatus = true;
                if (users[i].password == password){
                    passwordStatus = true;
                    break;
                }
            };
        };
        if (usernameStatus == false){
            if (document.querySelector("#name p") == null){
                let newdiv = document.createElement("p");
                newdiv.innerHTML = `
                    Invalid username
                `;
                newdiv.style.color = "red";
                document.querySelector("#name").append(newdiv);
            };
        }
        else{
            if (document.querySelector("#name p") != null){
                document.querySelector("#name p").remove();
            }
        }
        if (passwordStatus == false){
            if (document.querySelector("#pass p") == null){
                let newdiv = document.createElement("p");
                newdiv.innerHTML = `
                    Invalid password
                `
                newdiv.style.color = "red";
                document.querySelector("#pass").append(newdiv);
            }
        }
        else{
            if (document.querySelector("#pass p") != null){
                document.querySelector("#pass p").remove();
            }
        }

        if (usernameStatus == true && passwordStatus == true){
            console.log("test");
            localStorage.setItem("username", JSON.stringify(username));
            localStorage.setItem("password", JSON.stringify(password));
            window.location = "loadingScreen.html";
        };
    });

    // [STEP 4]: Create a function to get all the users in the database
    function getUsers(){
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
                    "password": response[i].password,
                    "country": response[i].country
                };
                users[i] = user;
            };
        });
    }
});

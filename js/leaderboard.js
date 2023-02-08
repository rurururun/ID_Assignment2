const APIKEY = "63d372573bc6b255ed0c4352";
let users = [];
let scores = [];
let scoreInDescOrder = [];

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
        if(localStorage.getItem("Username" + i)!=null){
            //Creates rows for data
            let newRow = document.createElement("tr");
            newRow.classList.add("userData" + i);
            document.querySelector(".userRow").append(newRow);
            //Displays ranks from 1-10
            let newElement = document.createElement("td"); 
            newElement.innerHTML = i + 1;
            document.querySelector(".userData"+ i).append(newElement);
            //Displays data 
            newElement = document.createElement("td");
            newElement.innerHTML = localStorage.getItem("Username" + i).split('"')[1];
            document.querySelector(".userData"+ i).append(newElement);
            newElement = document.createElement("td");
            newElement.innerHTML= localStorage.getItem("Country" + i).split('"')[1];
            document.querySelector(".userData"+i).append(newElement);
            newElement = document.createElement("td");
            newElement.innerHTML= localStorage.getItem("Score" + i);
            document.querySelector(".userData"+i).append(newElement);
        }
    }
});
var audio = new Audio("audio/10. Boundless Slumber.wav");
audio.volume = 0.4;
audio.loop = true;

if (localStorage.getItem("bgmTime") != null){
    audio.currentTime = parseInt(localStorage.getItem("bgmTime")) + 1;
}

audio.play();

const APIKEY = "63d372573bc6b255ed0c4352";
let users = [];
let scores = [];
let scoreInDescOrder = [];

function myFunction(){
    for(let i = 0; i<scores.length; i++){
        let highestNum = {
            "username": "",
            "score": 0
        };
        for(let b = 0; b<scores.length;b++){
            if(scoreInDescOrder.length>0){
                if(scores[b].score>highestNum.score && scoreInDescOrder[scoreInDescOrder.length - 1].score> scores[b].score){
                    highestNum.username =scores[b].username
                    highestNum.score = scores[b].score
                }
            }
            else{
                if(scores[b].score>highestNum.score){
                    highestNum.username =scores[b].username
                    highestNum.score = scores[b].score
                }
            }
        }
        if(highestNum.username != ""){
            scoreInDescOrder.push(highestNum);
        }
    }
    for(let i = 0; i < scoreInDescOrder.length; i++){
        let keptData = [];
        for(let a = 0; a<=i; a++){
            keptData.push(scoreInDescOrder[a])
        }
        for(let x = i + 1; x < scoreInDescOrder.length; x++){
            if(scoreInDescOrder[i].username != scoreInDescOrder[x].username){
                keptData.push(scoreInDescOrder[x])
            }
        }
        scoreInDescOrder = keptData;
    }
    for (let i = 0; i<scoreInDescOrder.length; i++){
        let UsernameKey = "Username" + i;
        let CountryKey = "Country" + i;
        let ScoreKey = "Score" + i;
        for(let x = 0; x<users.length; x++){
            if(scoreInDescOrder[i].username == users[x].username){
                localStorage.setItem(UsernameKey, JSON.stringify(scoreInDescOrder[i].username))
                localStorage.setItem(CountryKey,JSON.stringify(users[x].country))
                localStorage.setItem(ScoreKey, JSON.stringify(scoreInDescOrder[i].score))
            }
            console.log("test")
        }
    }
    for(let i = 0; i<scoreInDescOrder.length;i++){
        console.log(localStorage.getItem("Username" + i))
    }
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
    settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://idassignment2-0ba8.restdb.io/rest/endless-mode",
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "x-apikey": APIKEY,
            "cache-control": "no-cache"
        },
    }
    $.ajax(settings).done(function (response){
        for (let i = 0; i < response.length; i++){
            let score = {
                "username": response[i].username,
                "score": response[i].score
            };
            scores[i] = score;
        };
        
    
        myFunction()
    });
});






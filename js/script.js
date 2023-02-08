var audio = new Audio("audio/10. Boundless Slumber.wav");
audio.volume = 0.4;
audio.loop = true;

$(document).ready(function(){
    audio.play();
})

if (localStorage.getItem("username") != null && localStorage.getItem("password") != null){
    window.location = "mainMenu.html";
}

function signUp(){
    localStorage.setItem("bgmTime", JSON.stringify(audio.currentTime));
    window.location = "signUp.html";
}

function login(){
    localStorage.setItem("bgmTime", JSON.stringify(audio.currentTime));
    window.location = "login.html";
}

function hover(){
    var hoversfx = new Audio("audio/Button Hover.mp3");
    hoversfx.play();
}
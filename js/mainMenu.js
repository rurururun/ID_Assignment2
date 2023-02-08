if (localStorage.getItem("bgmTime") != null){
    var audio = new Audio("audio/10. Boundless Slumber.wav");
    audio.volume = 0.4;
    audio.currentTime = parseInt(localStorage.getItem("bgmTime")) + 1;
    audio.loop = true;
    audio.play();
}

function play(){
    window.location = "snakeAndHunter.html";
}

function leaderBoard(){
    window.location = "leaderBoard.html";
}

function logOut(){
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    window.location = "index.html";
}

function hover(){
    var hoversfx = new Audio("audio/Button Hover.mp3");
    hoversfx.play();
}
function play(){
    window.location = "modeMenu.html";
}

function leaderBoard(){
    window.location = "leaderBoard.html";
}

function logOut(){
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    window.location = "index.html";
}
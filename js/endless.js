import { updateSnake, drawSnake, snakeIntersection } from "./snake.js";
import { updateFood, drawFood, score } from "./food.js";

let username = localStorage.getItem("username").split('"')[1];
const APIKEY = "63d372573bc6b255ed0c4352";
let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById('board');
let speed = 4;

// Constant Loop (Real-Time)
function main(currentTime){
    // check if game is over
    if (gameOver){
        // make a object to store the data to be inserted into the database
        // adapted from restdb api
        let jsondata = {
            "username": username,
            "score": score
        };

        // create AJAX settings
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://idassignment2-0ba8.restdb.io/rest/endless-mode",
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "x-apikey": APIKEY,
                "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify(jsondata)
        };

        // send AJAX request over to restdb
        $.ajax(settings).done(function (){
            // prompt the player the score they got and ask whether they want to play again or stop playing
            if (confirm(
                'You have died. Your score was ' + score +
                '. Press ok if you want to play again or press cancel if you want to stop.'
            )){
                window.location = "endless.html";
            }
            else{
                window.location = "modeMenu.html";
            }
        })
        return;
    }

    window.requestAnimationFrame(main);

    // limits the refresh rate of the game, higher speed means higher refresh rate
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / speed){
        return;
    }

    lastRenderTime = currentTime;
    updateGame();
    drawGame();
}
// starts the loop
window.requestAnimationFrame(main);

function updateGame(){
    updateSnake();
    updateFood();
    checkDeath();
}

function drawGame(){
    gameBoard.innerHTML = '';
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

function checkDeath(){
    gameOver = snakeIntersection();
}
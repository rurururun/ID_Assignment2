import { updateSnake, drawSnake, snakeIntersection, onSnake } from "./snake.js";
import { updateFood, drawFood, score } from "./food.js";
import { updateHunter, drawHunter, getHunter, hunterSpeed } from "./hunter.js";
import { getInputDirection } from "./input.js";

let username = localStorage.getItem("username").split('"')[1];
const APIKEY = "63d372573bc6b255ed0c4352";
let lastRenderTime1 = 0;
let lastRenderTime2 = 0;
let gameOver = false;
const gameBoard = document.getElementById('board');
let speed = 4;
let inputDirection = getInputDirection();

// Constant Loop (Real-Time)
function main(currentTime){
    inputDirection = getInputDirection();
    // check if the player has moved, once the player moves then the game will start
    if (inputDirection.x != 0 || inputDirection.y != 0){
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

        const secondsSinceLastRender = (currentTime - lastRenderTime1) / 1000;
        if (secondsSinceLastRender < 1 / speed){
            return;
        }

        lastRenderTime1 = currentTime;
        updateGame();
        drawGame();
    }
    else{
        window.requestAnimationFrame(main);
        drawGame();
    }
}

function hunter(currentTime){
    window.requestAnimationFrame(hunter);
    inputDirection = getInputDirection();
    if (inputDirection.x != 0 || inputDirection.y != 0){
        const secondsSinceLastRender = (currentTime - lastRenderTime2) / 1000;
        if (secondsSinceLastRender < 1 / hunterSpeed){
            return;
        }
    
        lastRenderTime2 = currentTime;
        updateHunter();
    }
}

// starts the loop
window.requestAnimationFrame(main);
window.requestAnimationFrame(hunter);

function updateGame(){
    updateSnake();
    updateFood();
    checkDeath();
}

function drawGame(){
    gameBoard.innerHTML = '';
    drawSnake(gameBoard);
    drawFood(gameBoard);
    drawHunter(gameBoard);
}

function checkDeath(){
    gameOver = snakeIntersection() || onSnake(getHunter());
}
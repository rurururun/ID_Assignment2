import { updateSnake, drawSnake, snakeIntersection, onSnake, getSnakeLength } from "./snake.js";
import { updateFood, drawFood, score, food } from "./food.js";
import { updateHunter, drawHunter, getHunter, hunterSpeed, changeHunterSpeed } from "./hunter.js";
import { getInputDirection } from "./input.js";
import { updateBanana, drawBanana, generateBanana, useBanana, updateBananaStatus, getBananaStatus } from "./banana.js";
import { updateOrange, drawOrange, generateOrange, useOrange, updateOrangeStatus,getOrangeStatus } from "./orange.js";
import { gamePaused } from "./options.js";

// let username = localStorage.getItem("username").split('"')[1];
let username = "Guo Heng";
const APIKEY = "63d372573bc6b255ed0c4352";
let lastRenderTime1 = 0;
let lastRenderTime2 = 0;
let lastRenderTime3 = 0;
let lastRenderTime4 = 0;
let lastRenderTime5 = 0;
let gameOver = false;
const gameBoard = document.getElementById('board');
let snakeSpeed = 10;
let inputDirection = getInputDirection();
let bananaCount = 0;
let orangeCount = 0;
let randomPowerUp = 0;
let powerUpStatus = true;
let bananaUsed = false;
let orangeUsed = false;
let snakeSpeedIncrement = 0;
let hunterSpeedDecrement = 0;

var audio = new Audio("audio/Joshua McLean - Mountain Trials.mp3");
audio.volume = 0.15;
audio.loop = true;
audio.play();

// Constant Loop (Real-Time) for snake
function main(currentTime){
    if (gamePaused){
        audio.pause();
    }
    else{
        audio.play();
    }
    inputDirection = getInputDirection();
    // check if the player has moved, once the player moves then the game will start
    if ((inputDirection.x != 0 || inputDirection.y != 0) && !gamePaused){
        // check if game is over
        if (gameOver){
            // make a object to store the data to be inserted into the database
            // adapted from restdb api
            let jsondata = {
                "username": username,
                "score": score + (bananaCount * 10) + (orangeCount * 10)
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
                    'You have died. Your score was ' + (score + (bananaCount * 10) + (orangeCount * 10)) +
                    '. Press ok if you want to play again or press cancel if you want to stop.'
                )){
                    window.location = "snakeAndHunter.html";
                }
                else{
                    window.history.back();
                }
            })
            return;
        }

        window.requestAnimationFrame(main);

        const secondsSinceLastRender = (currentTime - lastRenderTime1) / 1000;
        if (secondsSinceLastRender < 1 / snakeSpeed){
            return;
        }

        lastRenderTime1 = currentTime;
        updateGame();
        drawGame();
        document.querySelector('#score').innerHTML = `Score: ` + score;
        document.querySelector('#length').innerHTML = `Snake Length: ` + getSnakeLength();
        document.querySelector('#banana').innerHTML = `Banana: ` + bananaCount + `<br/>(Press Q to use)`;
        document.querySelector('#orange').innerHTML = `Orange: ` + orangeCount + `<br/>(Press E to use)`;
    }
    else{
        window.requestAnimationFrame(main);
        drawGame();
        lastRenderTime1 = currentTime;
    }
}

// Constant Loop (Real-Time) for hunter
function hunter(currentTime){
    window.requestAnimationFrame(hunter);
    inputDirection = getInputDirection();
    if ((inputDirection.x != 0 || inputDirection.y != 0) && !gamePaused){
        const secondsSinceLastRender = (currentTime - lastRenderTime2) / 1000;
        if (secondsSinceLastRender < 1 / hunterSpeed){
            return;
        }
    
        lastRenderTime2 = currentTime;
        updateHunter();
    }
    else{
        lastRenderTime2 = currentTime;
    }
}

let s1 = 0;
let s2 = 0;
let s3 = 0;
let gameWasPaused = false;

// Constant Loop (Real-Time) for power ups 
function powerUps(currentTime){
    window.requestAnimationFrame(powerUps);
    inputDirection = getInputDirection();
    if ((inputDirection.x != 0 || inputDirection.y != 0) && powerUpStatus && !gamePaused){
        const secondsSinceLastRender = (currentTime - lastRenderTime3) / 1000;
        if (gameWasPaused){
            if (secondsSinceLastRender < 20 - s1){
                return;
            }
            gameWasPaused = false;
        }
        else{
            s1 = secondsSinceLastRender;
            if (secondsSinceLastRender < 20){
                return;
            }
        }

        lastRenderTime3 = currentTime;
        if (powerUpStatus){
            randomPowerUp = Math.floor(Math.random() * 2) + 1;
            powerUpStatus = false;
            if (randomPowerUp == 1){
                generateBanana(food);
            }
            else if (randomPowerUp == 2){
                generateOrange(food);
            }
        }
    }
    else if (gamePaused){
        gameWasPaused = true;
        lastRenderTime3 = currentTime;
    }
    else{
        lastRenderTime3 = currentTime;
    }
}

function usingBanana(currentTime){
    window.requestAnimationFrame(usingBanana);
    if (bananaUsed && !gamePaused){
        const secondsSinceLastRender = (currentTime - lastRenderTime4) / 1000;
        if (gameWasPaused){
            if (secondsSinceLastRender < 5 - s2){
                return;
            }
            gameWasPaused = false;
        }
        else{
            s2 = secondsSinceLastRender;
            if (secondsSinceLastRender < 5){
                return;
            }
        }

        lastRenderTime4 = currentTime;
        bananaUsed = false;
        snakeSpeed -= snakeSpeedIncrement;
        updateBananaStatus();
    }
    else if (gamePaused){
        gameWasPaused = true;
        lastRenderTime4 = currentTime;
    }
    else{
        lastRenderTime4 = currentTime;
    }
}

function usingOrange(currentTime){
    window.requestAnimationFrame(usingOrange);
    if (orangeUsed && !gamePaused){
        const secondsSinceLastRender = (currentTime - lastRenderTime5) / 1000;
        if (gameWasPaused){
            if (secondsSinceLastRender < 5 - s3){
                return;
            }
            gameWasPaused = false;
        }
        else{
            s3 = secondsSinceLastRender;
            if (secondsSinceLastRender < 5){
                return;
            }
        }

        lastRenderTime5 = currentTime;
        orangeUsed = false;
        changeHunterSpeed(hunterSpeed + hunterSpeedDecrement);
        updateOrangeStatus();
    }
    else if (gamePaused){
        gameWasPaused = true;
        lastRenderTime5 = currentTime;
    }
    else{
        lastRenderTime5 = currentTime;
    }
}

// starts the loop
window.requestAnimationFrame(main);
window.requestAnimationFrame(hunter);
window.requestAnimationFrame(powerUps);
window.requestAnimationFrame(usingBanana);
window.requestAnimationFrame(usingOrange);

function updateGame(){
    updateSnake();
    updateFood();
    if (updateBanana()){
        bananaCount += 1;
        powerUpStatus = true;
    }
    if (updateOrange()){
        orangeCount += 1;
        powerUpStatus = true;
    }
    useBanana(bananaCount);
    if (getBananaStatus() && !bananaUsed){
        bananaCount -= 1;
        snakeSpeedIncrement = snakeSpeed * 0.5;
        snakeSpeed += snakeSpeedIncrement;
        bananaUsed = true;
    }
    useOrange(orangeCount);
    if (getOrangeStatus() && !orangeUsed){
        orangeCount -= 1;
        hunterSpeedDecrement = hunterSpeed * 0.5;
        changeHunterSpeed(hunterSpeed - hunterSpeedDecrement);
        orangeUsed = true;
    }
    checkDeath();
}

function drawGame(){
    gameBoard.innerHTML = '';
    drawCheckered();
    drawPath();
    drawSnake(gameBoard);
    drawFood(gameBoard);
    drawHunter(gameBoard);
    if (randomPowerUp == 1){
        drawBanana(gameBoard);
    }
    else if (randomPowerUp == 2){
        drawOrange(gameBoard);
    }
}

function checkDeath(){
    gameOver = snakeIntersection() || onSnake(getHunter());
}

function drawPath(){
    for (let i = 1; i <= 31; i++){
        if (i == 16){
            let newDiv = document.createElement("div");
            newDiv.style.gridRowStart = i;
            newDiv.style.gridColumnStart = 16;
            newDiv.classList.add('path-center');
            gameBoard.appendChild(newDiv);
        }
        else{
            let newDiv = document.createElement("div");
            newDiv.style.gridRowStart = i;
            newDiv.style.gridColumnStart = 16;
            newDiv.classList.add('path-vertical');
            gameBoard.appendChild(newDiv);
        }
    }
    for (let i = 1; i <= 31; i++){
        if (i != 16){
            let newDiv = document.createElement("div");
            newDiv.style.gridRowStart = 16;
            newDiv.style.gridColumnStart = i;
            newDiv.classList.add('path-horizontal');
            gameBoard.appendChild(newDiv);
        }
    }
}

function drawCheckered(){
    for (let a = 1; a <= 31; a++){
        if (a % 2 != 0){
            for (let b = 1; b <= 31; b++){
                if (b % 2 == 0){
                    let newDiv = document.createElement("div");
                    newDiv.style.gridRowStart = a;
                    newDiv.style.gridColumnStart = b;
                    newDiv.classList.add('checkered');
                    gameBoard.appendChild(newDiv);
                }
            }
        }
        else{
            for (let b = 1; b <= 31; b++){
                if (b % 2 != 0){
                    let newDiv = document.createElement("div");
                    newDiv.style.gridRowStart = a;
                    newDiv.style.gridColumnStart = b;
                    newDiv.classList.add('checkered');
                    gameBoard.appendChild(newDiv);
                }
            }
        }
    }
}
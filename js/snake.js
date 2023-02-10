import { outsideGrid } from "./grid.js";
import { getInputDirection } from "./input.js";
import { bananaUsed } from "./banana.js";

const snake = [
    { x: 16, y: 16 }
]
let newSegments = 0;
let beforeTurningDirection = []
let afterTurningDirection = []
let turningpoint = []
let lastInputDirection = "";

export function updateSnake() {
    // call addSegments() method to add new segments to the snake if there is any to add
    addSegments();

    // get the input direction from the user and store it
    const inputDirection = getInputDirection();

    if (inputDirection.x != 0 || inputDirection.y != 0){
        let direction = "";
        if (inputDirection.y == -1){
            direction = "up";
        }
        else if (inputDirection.y == 1){
            direction = "down";
        }
        else if (inputDirection.x == -1){
            direction = "left";
        }
        else if (inputDirection.x == 1){
            direction = "right";
        }

        if (snake.length > 2){
            if (lastInputDirection != direction){
                beforeTurningDirection.push(lastInputDirection); //before turn direction
                afterTurningDirection.push(direction); //after turn direction
                let tp = {
                    x: snake[0].x,
                    y: snake[0].y
                }
                turningpoint.push(tp); //turning point
            }
        }

        lastInputDirection = direction;
    }

    // run a loop for the rest of the snake body to catch up with the snake head (shifts from tail to head)
    for (let i = snake.length - 1; i > 0; i--){
        snake[i] = {
            x: snake[i - 1].x,
            y: snake[i - 1].y
        };
    }

    // move the snake head in the direction from player's input
    snake[0].x += inputDirection.x;
    snake[0].y += inputDirection.y;

    // check if the snake is outside of the board
    if (outsideGrid(snake[0])){
        // make the snake come back around on the other side
        if (snake[0].x < 1){
            snake[0].x = 31;
        }
        else if (snake[0].x > 31){
            snake[0].x = 1;
        }
        else if (snake[0].y < 1){
            snake[0].y = 31;
        }
        else{
            snake[0].y = 1;
        }
    }
}

export function drawSnake(gameBoard){
    let inputDirection = getInputDirection();

    for (let i = snake.length - 1; i >= 0; i--){
        if (i == 0){
            // make a div for each snake body
            const snakeHead = document.createElement("div");

            // assign x and y position to each snake body
            snakeHead.style.gridRowStart = snake[i].y;
            snakeHead.style.gridColumnStart = snake[i].x;

            if (bananaUsed){
                snakeHead.classList.add("snake-head-boost");
            }
            else{
                snakeHead.classList.add("snake-head");
            }
            if (snake.length == 1){
                snakeHead.style.borderTopRightRadius = "20px";
                snakeHead.style.borderTopLeftRadius = "20px";
                snakeHead.style.borderBottomLeftRadius = "20px";
                snakeHead.style.borderBottomRightRadius = "20px";
            }
            else{
                if (inputDirection.y == -1){
                    snakeHead.style.borderTopLeftRadius = "20px";
                    snakeHead.style.borderTopRightRadius = "20px";
                }
                else if (inputDirection.y == 1){
                    snakeHead.style.borderBottomLeftRadius = "20px";
                    snakeHead.style.borderBottomRightRadius = "20px";
                }
                else if (inputDirection.x == -1){
                    snakeHead.style.borderTopLeftRadius = "20px";
                    snakeHead.style.borderBottomLeftRadius = "20px";
                }
                else if (inputDirection.x == 1){
                    snakeHead.style.borderTopRightRadius = "20px";
                    snakeHead.style.borderBottomRightRadius = "20px";
                }
            }

            // append each snake body into the game board for it to be shown
            gameBoard.appendChild(snakeHead);
        }
        else if (i == snake.length - 1){
            // make a div for each snake body
            const snakeTail = document.createElement("div");

            // assign x and y position to each snake body
            snakeTail.style.gridRowStart = snake[i].y;
            snakeTail.style.gridColumnStart = snake[i].x;

            if (bananaUsed){
                if (i % 2 != 0){
                    snakeTail.classList.add("snake-stripe-boost");
                }
                else{
                    snakeTail.classList.add("snake-boost");
                }
            }
            else{
                if (i % 2 != 0){
                    snakeTail.classList.add("snake-stripe");
                }
                else{
                    snakeTail.classList.add("snake");
                }
            }

            if (snake.length > 2){
                if (turningpoint.length != 0){
                    if (snake[i].x == turningpoint[0].x && snake[i].y == turningpoint[0].y){
                        if (afterTurningDirection[0] == "up"){
                            snakeTail.style.borderBottomLeftRadius = "20px";
                            snakeTail.style.borderBottomRightRadius = "20px";
                        }
                        else if (afterTurningDirection[0] == "down"){
                            snakeTail.style.borderTopLeftRadius = "20px";
                            snakeTail.style.borderTopRightRadius = "20px";
                        }
                        else if (afterTurningDirection[0] == "left"){
                            snakeTail.style.borderBottomRightRadius = "20px";
                            snakeTail.style.borderTopRightRadius = "20px";
                        }
                        else if (afterTurningDirection[0] == "right"){
                            snakeTail.style.borderBottomLeftRadius = "20px";
                            snakeTail.style.borderTopLeftRadius = "20px";
                        }
        
                        let temp1 = [];
                        let temp2 = [];
                        let temp3 = [];
        
                        for (let a = 1; a < afterTurningDirection.length; a++){
                            temp1.push(beforeTurningDirection[a]);
                            temp2.push(afterTurningDirection[a]);
                            temp3.push(turningpoint[a]);
                        }
        
                        beforeTurningDirection = [];
                        afterTurningDirection = [];
                        turningpoint = [];
        
                        for (let a = 0; a < temp1.length; a++){
                            beforeTurningDirection.push(temp1[a]);
                            afterTurningDirection.push(temp2[a]);
                            turningpoint.push(temp3[a]);
                        }
                    }
                    else{
                        if (beforeTurningDirection[0] == "up"){
                            snakeTail.style.borderBottomLeftRadius = "20px";
                            snakeTail.style.borderBottomRightRadius = "20px";
                        }
                        else if (beforeTurningDirection[0] == "down"){
                            snakeTail.style.borderTopLeftRadius = "20px";
                            snakeTail.style.borderTopRightRadius = "20px";
                        }
                        else if (beforeTurningDirection[0] == "left"){
                            snakeTail.style.borderBottomRightRadius = "20px";
                            snakeTail.style.borderTopRightRadius = "20px";
                        }
                        else if (beforeTurningDirection[0] == "right"){
                            snakeTail.style.borderBottomLeftRadius = "20px";
                            snakeTail.style.borderTopLeftRadius = "20px";
                        }
                    }
                }
                else{
                    if (inputDirection.y == -1){
                        snakeTail.style.borderBottomLeftRadius = "20px";
                        snakeTail.style.borderBottomRightRadius = "20px";
                    }
                    else if (inputDirection.y == 1){
                        snakeTail.style.borderTopLeftRadius = "20px";
                        snakeTail.style.borderTopRightRadius = "20px";
                    }
                    else if (inputDirection.x == -1){
                        snakeTail.style.borderTopRightRadius = "20px";
                        snakeTail.style.borderBottomRightRadius = "20px";
                    }
                    else if (inputDirection.x == 1){
                        snakeTail.style.borderBottomLeftRadius = "20px";
                        snakeTail.style.borderTopLeftRadius = "20px";
                    }
                }
            }
            else{
                if (inputDirection.y == -1){
                    snakeTail.style.borderBottomLeftRadius = "20px";
                    snakeTail.style.borderBottomRightRadius = "20px";
                }
                else if (inputDirection.y == 1){
                    snakeTail.style.borderTopLeftRadius = "20px";
                    snakeTail.style.borderTopRightRadius = "20px";
                }
                else if (inputDirection.x == -1){
                    snakeTail.style.borderTopRightRadius = "20px";
                    snakeTail.style.borderBottomRightRadius = "20px";
                }
                else if (inputDirection.x == 1){
                    snakeTail.style.borderBottomLeftRadius = "20px";
                    snakeTail.style.borderTopLeftRadius = "20px";
                }
            }

            // append each snake body into the game board for it to be shown
            gameBoard.appendChild(snakeTail);
        }
        else{
            // make a div for each snake body
            const snakeBody = document.createElement("div");

            // assign x and y position to each snake body
            snakeBody.style.gridRowStart = snake[i].y;
            snakeBody.style.gridColumnStart = snake[i].x;

            if (bananaUsed){
                if (i % 2 != 0){
                    snakeBody.classList.add("snake-stripe-boost");
                }
                else{
                    snakeBody.classList.add("snake-boost");
                }
            }
            else{
                if (i % 2 != 0){
                    snakeBody.classList.add("snake-stripe");
                }
                else{
                    snakeBody.classList.add("snake");
                }
            }

            for (let a = 0; a < turningpoint.length; a++){
                if (beforeTurningDirection[a] == "up"){
                    if (afterTurningDirection[a] == "left"){
                        if (snake[i].x == turningpoint[a].x && snake[i].y == turningpoint[a].y){ // on turning point
                            snakeBody.style.borderTopRightRadius = "20px";
                            break;
                        }
                    }
                    else if (afterTurningDirection[a] == "right"){
                        if (snake[i].x == turningpoint[a].x && snake[i].y == turningpoint[a].y){
                            snakeBody.style.borderTopLeftRadius = "20px";
                            break;
                        }
                    }
                }
                else if (beforeTurningDirection[a] == "down"){
                    if (afterTurningDirection[a] == "left"){
                        if (snake[i].x == turningpoint[a].x && snake[i].y == turningpoint[a].y){
                            snakeBody.style.borderBottomRightRadius = "20px";
                            break;
                        }
                    }
                    else if (afterTurningDirection[a] == "right"){
                        if (snake[i].x == turningpoint[a].x && snake[i].y == turningpoint[a].y){
                            snakeBody.style.borderBottomLeftRadius = "20px";
                            break;
                        }
                    }
                }
                else if (beforeTurningDirection[a] == "left"){
                    if (afterTurningDirection[a] == "up"){
                        if (snake[i].x == turningpoint[a].x && snake[i].y == turningpoint[a].y){
                            snakeBody.style.borderBottomLeftRadius = "20px";
                            break;
                        }
                    }
                    else if (afterTurningDirection[a] == "down"){
                        if (snake[i].x == turningpoint[a].x && snake[i].y == turningpoint[a].y){
                            snakeBody.style.borderTopLeftRadius = "20px";
                            break;
                        }
                    }
                }
                else if (beforeTurningDirection[a] == "right"){
                    if (afterTurningDirection[a] == "up"){
                        if (snake[i].x == turningpoint[a].x && snake[i].y == turningpoint[a].y){
                            snakeBody.style.borderBottomRightRadius = "20px";
                            break;
                        }
                    }
                    else if (afterTurningDirection[a] == "down"){
                        if (snake[i].x == turningpoint[a].x && snake[i].y == turningpoint[a].y){
                            snakeBody.style.borderTopRightRadius = "20px";
                            break;
                        }
                    }
                }
            }

            // append each snake body into the game board for it to be shown
            gameBoard.appendChild(snakeBody);
        }
    }
}

export function expandSnake(amount){
    // update the number of segments to add
    newSegments += amount;
}

export function onSnake(position){
    // check if food is spawned on snake and returns true or false based on outcome
    let condition = false;
    for (let i = 0; i < snake.length; i++){
        if (position.x == snake[i].x && position.y == snake[i].y){
            condition = true;
        }
    }
    return condition;
}

export function onFood(position){
    // checks whether the snake head is on the food and returns the outcome
    return position.x == snake[0].x && position.y == snake[0].y;
}

export function getSnakeHead(){
    // returns position of snake head
    return snake[0];
}

export function snakeIntersection(){
    // check if snake has collided with itself and returns true or false based on the outcome
    let condition = false;
    for (let i = 1; i < snake.length; i++){
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            condition = true;
        }
    }
    return condition;
}

function addSegments(){
    // run a loop to add snake body to the snake
    for (let i = 0; i < newSegments; i++){
        // get the direction input from the player
        const inputDirection = getInputDirection();

        // make a new snake body
        let body = {
            x: 0,
            y: 0
        };

        // check which direction the snake is moving in
        // then set the position of the new snake body to be right behind the snake tail
        if (inputDirection.x < 0){ // moving left
            body.x = snake[snake.length - 1].x + 1;
            body.y = snake[snake.length - 1].y;
        }
        else if (inputDirection.x > 0){
            body.x = snake[snake.length - 1].x - 1;
            body.y = snake[snake.length - 1].y;
        }
        else if (inputDirection.y < 0){
            body.x = snake[snake.length - 1].x;
            body.y = snake[snake.length - 1].y + 1;
        }
        else if (inputDirection.y > 0){
            body.x = snake[snake.length - 1].x;
            body.y = snake[snake.length - 1].y - 1;
        }

        // then add the new snake body into the snake array
        snake.push({
            x: body.x,
            y: body.y
        });
    }

    // reset the number of snake body to be added
    newSegments = 0;
}

export function getSnakeLength(){
    return snake.length;
}


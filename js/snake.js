import { outsideGrid } from "./grid.js";
import { getInputDirection } from "./input.js";

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

            if (inputDirection.y == -1){
                snakeHead.style.backgroundColor = "purple";
                snakeHead.style.borderLeft = ".25vmin solid black";
                snakeHead.style.borderRight = ".25vmin solid black";
                snakeHead.style.borderTop = ".25vmin solid black";
                snakeHead.style.borderTopLeftRadius = "20px";
                snakeHead.style.borderTopRightRadius = "20px";
            }
            else if (inputDirection.y == 1){
                snakeHead.style.backgroundColor = "purple";
                snakeHead.style.borderLeft = ".25vmin solid black";
                snakeHead.style.borderRight = ".25vmin solid black";
                snakeHead.style.borderBottom = ".25vmin solid black";
                snakeHead.style.borderBottomLeftRadius = "20px";
                snakeHead.style.borderBottomRightRadius = "20px";
            }
            else if (inputDirection.x == -1){
                snakeHead.style.backgroundColor = "purple";
                snakeHead.style.borderLeft = ".25vmin solid black";
                snakeHead.style.borderBottom = ".25vmin solid black";
                snakeHead.style.borderTop = ".25vmin solid black";
                snakeHead.style.borderTopLeftRadius = "20px";
                snakeHead.style.borderBottomLeftRadius = "20px";
            }
            else if (inputDirection.x == 1){
                snakeHead.style.backgroundColor = "purple";
                snakeHead.style.borderBottom = ".25vmin solid black";
                snakeHead.style.borderRight = ".25vmin solid black";
                snakeHead.style.borderTop = ".25vmin solid black";
                snakeHead.style.borderTopRightRadius = "20px";
                snakeHead.style.borderBottomRightRadius = "20px";
            }
            else{
                snakeHead.style.backgroundColor = "purple";
                snakeHead.style.border = ".25vmin solid black";
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

            if (snake.length > 2){
                if (turningpoint.length != 0){
                    if (snake[i].x == turningpoint[0].x && snake[i].y == turningpoint[0].y){
                        if (afterTurningDirection[0] == "up"){
                            snakeTail.style.backgroundColor = "purple";
                            snakeTail.style.borderBottom = ".25vmin solid black";
                            snakeTail.style.borderLeft = ".25vmin solid black";
                            snakeTail.style.borderRight = ".25vmin solid black";
                            snakeTail.style.borderBottomLeftRadius = "20px";
                            snakeTail.style.borderBottomRightRadius = "20px";
                        }
                        else if (afterTurningDirection[0] == "down"){
                            snakeTail.style.backgroundColor = "purple";
                            snakeTail.style.borderTop = ".25vmin solid black";
                            snakeTail.style.borderLeft = ".25vmin solid black";
                            snakeTail.style.borderRight = ".25vmin solid black";
                            snakeTail.style.borderTopLeftRadius = "20px";
                            snakeTail.style.borderTopRightRadius = "20px";
                        }
                        else if (afterTurningDirection[0] == "left"){
                            snakeTail.style.backgroundColor = "purple";
                            snakeTail.style.borderBottom = ".25vmin solid black";
                            snakeTail.style.borderRight = ".25vmin solid black";
                            snakeTail.style.borderTop = ".25vmin solid black";
                            snakeTail.style.borderBottomRightRadius = "20px";
                            snakeTail.style.borderTopRightRadius = "20px";
                        }
                        else if (afterTurningDirection[0] == "right"){
                            snakeTail.style.backgroundColor = "purple";
                            snakeTail.style.borderBottom = ".25vmin solid black";
                            snakeTail.style.borderLeft = ".25vmin solid black";
                            snakeTail.style.borderTop = ".25vmin solid black";
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
                            snakeTail.style.backgroundColor = "purple";
                            snakeTail.style.borderBottom = ".25vmin solid black";
                            snakeTail.style.borderLeft = ".25vmin solid black";
                            snakeTail.style.borderRight = ".25vmin solid black";
                            snakeTail.style.borderBottomLeftRadius = "20px";
                            snakeTail.style.borderBottomRightRadius = "20px";
                        }
                        else if (beforeTurningDirection[0] == "down"){
                            snakeTail.style.backgroundColor = "purple";
                            snakeTail.style.borderTop = ".25vmin solid black";
                            snakeTail.style.borderLeft = ".25vmin solid black";
                            snakeTail.style.borderRight = ".25vmin solid black";
                            snakeTail.style.borderTopLeftRadius = "20px";
                            snakeTail.style.borderTopRightRadius = "20px";
                        }
                        else if (beforeTurningDirection[0] == "left"){
                            snakeTail.style.backgroundColor = "purple";
                            snakeTail.style.borderBottom = ".25vmin solid black";
                            snakeTail.style.borderRight = ".25vmin solid black";
                            snakeTail.style.borderTop = ".25vmin solid black";
                            snakeTail.style.borderBottomRightRadius = "20px";
                            snakeTail.style.borderTopRightRadius = "20px";
                        }
                        else if (beforeTurningDirection[0] == "right"){
                            snakeTail.style.backgroundColor = "purple";
                            snakeTail.style.borderBottom = ".25vmin solid black";
                            snakeTail.style.borderLeft = ".25vmin solid black";
                            snakeTail.style.borderTop = ".25vmin solid black";
                            snakeTail.style.borderBottomLeftRadius = "20px";
                            snakeTail.style.borderTopLeftRadius = "20px";
                        }
                    }
                }
                else{
                    if (inputDirection.y == -1){
                        snakeTail.style.backgroundColor = "purple";
                        snakeTail.style.borderLeft = ".25vmin solid black";
                        snakeTail.style.borderRight = ".25vmin solid black";
                        snakeTail.style.borderBottom = ".25vmin solid black";
                        snakeTail.style.borderBottomLeftRadius = "20px";
                        snakeTail.style.borderBottomRightRadius = "20px";
                    }
                    else if (inputDirection.y == 1){
                        snakeTail.style.backgroundColor = "purple";
                        snakeTail.style.borderLeft = ".25vmin solid black";
                        snakeTail.style.borderRight = ".25vmin solid black";
                        snakeTail.style.borderTop = ".25vmin solid black";
                        snakeTail.style.borderTopLeftRadius = "20px";
                        snakeTail.style.borderTopRightRadius = "20px";
                    }
                    else if (inputDirection.x == -1){
                        snakeTail.style.backgroundColor = "purple";
                        snakeTail.style.borderTop = ".25vmin solid black";
                        snakeTail.style.borderRight = ".25vmin solid black";
                        snakeTail.style.borderBottom = ".25vmin solid black";
                        snakeTail.style.borderTopRightRadius = "20px";
                        snakeTail.style.borderBottomRightRadius = "20px";
                    }
                    else if (inputDirection.x == 1){
                        snakeTail.style.backgroundColor = "purple";
                        snakeTail.style.borderLeft = ".25vmin solid black";
                        snakeTail.style.borderTop = ".25vmin solid black";
                        snakeTail.style.borderBottom = ".25vmin solid black";
                        snakeTail.style.borderBottomLeftRadius = "20px";
                        snakeTail.style.borderTopLeftRadius = "20px";
                    }
                }
            }
            else{
                if (inputDirection.y == -1){
                    snakeTail.style.backgroundColor = "purple";
                    snakeTail.style.borderLeft = ".25vmin solid black";
                    snakeTail.style.borderRight = ".25vmin solid black";
                    snakeTail.style.borderBottom = ".25vmin solid black";
                    snakeTail.style.borderBottomLeftRadius = "20px";
                    snakeTail.style.borderBottomRightRadius = "20px";
                }
                else if (inputDirection.y == 1){
                    snakeTail.style.backgroundColor = "purple";
                    snakeTail.style.borderLeft = ".25vmin solid black";
                    snakeTail.style.borderRight = ".25vmin solid black";
                    snakeTail.style.borderTop = ".25vmin solid black";
                    snakeTail.style.borderTopLeftRadius = "20px";
                    snakeTail.style.borderTopRightRadius = "20px";
                }
                else if (inputDirection.x == -1){
                    snakeTail.style.backgroundColor = "purple";
                    snakeTail.style.borderTop = ".25vmin solid black";
                    snakeTail.style.borderRight = ".25vmin solid black";
                    snakeTail.style.borderBottom = ".25vmin solid black";
                    snakeTail.style.borderTopRightRadius = "20px";
                    snakeTail.style.borderBottomRightRadius = "20px";
                }
                else if (inputDirection.x == 1){
                    snakeTail.style.backgroundColor = "purple";
                    snakeTail.style.borderLeft = ".25vmin solid black";
                    snakeTail.style.borderTop = ".25vmin solid black";
                    snakeTail.style.borderBottom = ".25vmin solid black";
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

            for (let a = 0; a < turningpoint.length; a++){
                if (beforeTurningDirection[a] == "up"){
                    if (afterTurningDirection[a] == "left"){
                        if (snake[i].y > turningpoint[a].y){ // before turning point
                            snakeBody.style.backgroundColor = "purple";
                            snakeBody.style.borderLeft = ".25vmin solid black";
                            snakeBody.style.borderRight = ".25vmin solid black";
                            break;
                        }
                        else if (snake[i].x == turningpoint[a].x && snake[i].y == turningpoint[a].y){ // on turning point
                            snakeBody.style.backgroundColor = "purple";
                            snakeBody.style.borderTop = ".25vmin solid black";
                            snakeBody.style.borderRight = ".25vmin solid black";
                            snakeBody.style.borderTopRightRadius = "20px";
                            break;
                        }
                        else if (a == turningpoint.length - 1){ // after turning point
                            if (snake[i].x < turningpoint[a].x){
                                snakeBody.style.backgroundColor = "purple";
                                snakeBody.style.borderTop = ".25vmin solid black";
                                snakeBody.style.borderBottom = ".25vmin solid black";
                            }
                        }
                    }
                    else if (afterTurningDirection[a] == "right"){
                        if (snake[i].y > turningpoint[a].y){
                            snakeBody.style.backgroundColor = "purple";
                            snakeBody.style.borderLeft = ".25vmin solid black";
                            snakeBody.style.borderRight = ".25vmin solid black";
                            break;
                        }
                        else if (snake[i].x == turningpoint[a].x && snake[i].y == turningpoint[a].y){
                            snakeBody.style.backgroundColor = "purple";
                            snakeBody.style.borderTop = ".25vmin solid black";
                            snakeBody.style.borderLeft = ".25vmin solid black";
                            snakeBody.style.borderTopLeftRadius = "20px";
                            break;
                        }
                        else if (a == turningpoint.length - 1){
                            if (snake[i].x > turningpoint[a].x){
                                snakeBody.style.backgroundColor = "purple";
                                snakeBody.style.borderTop = ".25vmin solid black";
                                snakeBody.style.borderBottom = ".25vmin solid black";
                            }
                        }
                    }
                }
                else if (beforeTurningDirection[a] == "down"){
                    if (afterTurningDirection[a] == "left"){
                        if (snake[i].y < turningpoint[a].y){
                            snakeBody.style.backgroundColor = "purple";
                            snakeBody.style.borderLeft = ".25vmin solid black";
                            snakeBody.style.borderRight = ".25vmin solid black";
                            break;
                        }
                        else if (snake[i].x == turningpoint[a].x && snake[i].y == turningpoint[a].y){
                            snakeBody.style.backgroundColor = "purple";
                            snakeBody.style.borderBottom = ".25vmin solid black";
                            snakeBody.style.borderRight = ".25vmin solid black";
                            snakeBody.style.borderBottomRightRadius = "20px";
                            break;
                        }
                        else if (a == turningpoint.length - 1){
                            if (snake[i].x < turningpoint[a].x){
                                snakeBody.style.backgroundColor = "purple";
                                snakeBody.style.borderTop = ".25vmin solid black";
                                snakeBody.style.borderBottom = ".25vmin solid black";
                            }
                        }
                    }
                    else if (afterTurningDirection[a] == "right"){
                        if (snake[i].y < turningpoint[a].y){
                            snakeBody.style.backgroundColor = "purple";
                            snakeBody.style.borderLeft = ".25vmin solid black";
                            snakeBody.style.borderRight = ".25vmin solid black";
                            break;
                        }
                        else if (snake[i].x == turningpoint[a].x && snake[i].y == turningpoint[a].y){
                            snakeBody.style.backgroundColor = "purple";
                            snakeBody.style.borderBottom = ".25vmin solid black";
                            snakeBody.style.borderLeft = ".25vmin solid black";
                            snakeBody.style.borderBottomLeftRadius = "20px";
                            break;
                        }
                        else if (a == turningpoint.length - 1){
                            if (snake[i].x > turningpoint[a].x){
                                snakeBody.style.backgroundColor = "purple";
                                snakeBody.style.borderTop = ".25vmin solid black";
                                snakeBody.style.borderBottom = ".25vmin solid black";
                            }
                        }
                    }
                }
                else if (beforeTurningDirection[a] == "left"){
                    if (afterTurningDirection[a] == "up"){
                        if (snake[i].x > turningpoint[a].x){
                            snakeBody.style.backgroundColor = "purple";
                            snakeBody.style.borderTop = ".25vmin solid black";
                            snakeBody.style.borderBottom = ".25vmin solid black";
                            break;
                        }
                        else if (snake[i].x == turningpoint[a].x && snake[i].y == turningpoint[a].y){
                            snakeBody.style.backgroundColor = "purple";
                            snakeBody.style.borderLeft = ".25vmin solid black";
                            snakeBody.style.borderBottom = ".25vmin solid black";
                            snakeBody.style.borderBottomLeftRadius = "20px";
                            break;
                        }
                        else if (a == turningpoint.length - 1){
                            if (snake[i].y < turningpoint[a].y){
                                snakeBody.style.backgroundColor = "purple";
                                snakeBody.style.borderLeft = ".25vmin solid black";
                                snakeBody.style.borderRight = ".25vmin solid black";
                            }
                        }
                    }
                    else if (afterTurningDirection[a] == "down"){
                        if (snake[i].x > turningpoint[a].x){
                            snakeBody.style.backgroundColor = "purple";
                            snakeBody.style.borderTop = ".25vmin solid black";
                            snakeBody.style.borderBottom = ".25vmin solid black";
                            break;
                        }
                        else if (snake[i].x == turningpoint[a].x && snake[i].y == turningpoint[a].y){
                            snakeBody.style.backgroundColor = "purple";
                            snakeBody.style.borderLeft = ".25vmin solid black";
                            snakeBody.style.borderTop = ".25vmin solid black";
                            snakeBody.style.borderTopLeftRadius = "20px";
                            break;
                        }
                        else if (a == turningpoint.length - 1){
                            if (snake[i].y > turningpoint[a].y){
                                snakeBody.style.backgroundColor = "purple";
                                snakeBody.style.borderLeft = ".25vmin solid black";
                                snakeBody.style.borderRight = ".25vmin solid black";
                            }
                        }
                    }
                }
                else if (beforeTurningDirection[a] == "right"){
                    if (afterTurningDirection[a] == "up"){
                        if (snake[i].x < turningpoint[a].x){
                            snakeBody.style.backgroundColor = "purple";
                            snakeBody.style.borderTop = ".25vmin solid black";
                            snakeBody.style.borderBottom = ".25vmin solid black";
                            break;
                        }
                        else if (snake[i].x == turningpoint[a].x && snake[i].y == turningpoint[a].y){
                            snakeBody.style.backgroundColor = "purple";
                            snakeBody.style.borderRight = ".25vmin solid black";
                            snakeBody.style.borderBottom = ".25vmin solid black";
                            snakeBody.style.borderBottomRightRadius = "20px";
                            break;
                        }
                        else if (a == turningpoint.length - 1){
                            if (snake[i].y < turningpoint[a].y){
                                snakeBody.style.backgroundColor = "purple";
                                snakeBody.style.borderLeft = ".25vmin solid black";
                                snakeBody.style.borderRight = ".25vmin solid black";
                            }
                        }
                    }
                    else if (afterTurningDirection[a] == "down"){
                        if (snake[i].x < turningpoint[a].x){
                            snakeBody.style.backgroundColor = "purple";
                            snakeBody.style.borderTop = ".25vmin solid black";
                            snakeBody.style.borderBottom = ".25vmin solid black";
                            break;
                        }
                        else if (snake[i].x == turningpoint[a].x && snake[i].y == turningpoint[a].y){
                            snakeBody.style.backgroundColor = "purple";
                            snakeBody.style.borderRight = ".25vmin solid black";
                            snakeBody.style.borderTop = ".25vmin solid black";
                            snakeBody.style.borderTopRightRadius = "20px";
                            break;
                        }
                        else if (a == turningpoint.length - 1){
                            if (snake[i].y > turningpoint[a].y){
                                snakeBody.style.backgroundColor = "purple";
                                snakeBody.style.borderLeft = ".25vmin solid black";
                                snakeBody.style.borderRight = ".25vmin solid black";
                            }
                        }
                    }
                }
            }

            if (turningpoint.length == 0){
                if (inputDirection.y == -1 || inputDirection.y == 1){
                    snakeBody.style.backgroundColor = "purple";
                    snakeBody.style.borderLeft = ".25vmin solid black";
                    snakeBody.style.borderRight = ".25vmin solid black";
                }
                else if (inputDirection.x == -1 || inputDirection.x == 1){
                    snakeBody.style.backgroundColor = "purple";
                    snakeBody.style.borderTop = ".25vmin solid black";
                    snakeBody.style.borderBottom = ".25vmin solid black";
                }
            }

            // append each snake body into the game board for it to be shown
            gameBoard.appendChild(snakeBody);
        }
    }

    // if (restOfSnakeNotCaughtUp.length == 0){
    //     lastInputDirection = inputDirection;
    // }
    // else{
    //     restOfSnakeNotCaughtUp = [];
    // }
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


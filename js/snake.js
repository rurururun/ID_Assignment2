import { outsideGrid } from "./grid.js";
import { getInputDirection } from "./input.js";

const snake = [
    { x: 11, y: 11 }
]
let newSegments = 0;

export function updateSnake() {
    // call addSegments() method to add new segments to the snake if there is any to add
    addSegments();

    // get the input direction from the user and store it
    const inputDirection = getInputDirection();

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
            snake[0].x = 21;
        }
        else if (snake[0].x > 21){
            snake[0].x = 1;
        }
        else if (snake[0].y < 1){
            snake[0].y = 21;
        }
        else{
            snake[0].y = 1;
        }
    }
}

export function drawSnake(gameBoard){
    // run a loop to look through the array created above
    for (let i = 0; i < snake.length; i++){
        // make a div for each snake body
        const snakeBody = document.createElement("div");

        // assign x and y position to each snake body
        snakeBody.style.gridRowStart = snake[i].y;
        snakeBody.style.gridColumnStart = snake[i].x;

        // assign a class to each snake body for css
        snakeBody.classList.add('snake');

        // append each snake body into the game board for it to be shown
        gameBoard.appendChild(snakeBody);
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


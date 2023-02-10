import { onFood, onSnake, expandSnake } from "./snake.js";
import { randomGridPosition } from "./grid.js";
import { hunterSpeed, changeHunterSpeed } from "./hunter.js";

export let food = getRandomFoodPosition();

const eat = 1;
export let score = 0;

export function updateFood(){
    // check if the snake has collided with the food
    if (onFood(food)){
        var audio = new Audio("audio/Bite Sound Effect.mp3");
        audio.play();

        // increase the value of the newSegments variable in snake.js
        expandSnake(eat);

        // generate another food
        food = getRandomFoodPosition();

        // increase score by 1
        score += 1;

        if (score % 10 == 0){
            changeHunterSpeed(hunterSpeed + (hunterSpeed * 0.1));
        }
    }
}

export function drawFood(gameBoard){
    // make a div for the food
    const foodElement = document.createElement("div");

    // assign x and y position to the food
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;

    // assign a class to the food for css
    foodElement.classList.add('food');

    foodElement.style.borderTopRightRadius = "20px";
    foodElement.style.borderTopLeftRadius = "20px";
    foodElement.style.borderBottomRightRadius = "20px";
    foodElement.style.borderBottomLeftRadius = "20px";

    // append the food into the game board for it to be shown
    gameBoard.appendChild(foodElement);
}

function getRandomFoodPosition(){
    let newFoodPosition = null;
    while (newFoodPosition == null || onSnake(newFoodPosition)){
        newFoodPosition = randomGridPosition();
    }
    return newFoodPosition;
}
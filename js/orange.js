import { onFood, onSnake } from "./snake.js";
import { randomGridPosition } from "./grid.js";

let orange = null;
let orangeUsed = false;

export function updateOrange(){
    if (orange != null){
        if (onFood(orange)){
            orange = null;
            return true;
        }
    }
    return false;
}

export function drawOrange(gameBoard){
    if (orange != null){
        const orangeElement = document.createElement("div");
        orangeElement.style.gridRowStart = orange.y;
        orangeElement.style.gridColumnStart = orange.x;
        orangeElement.classList.add('orange');
        gameBoard.appendChild(orangeElement);
    }
}

export function generateOrange(position){
    orange = generateRandomOrangePosition(position);
}

function generateRandomOrangePosition(position){
    let newOrangePosition = null;
    while (newOrangePosition == null || onSnake(newOrangePosition) || newOrangePosition == position){
        newOrangePosition = randomGridPosition();
    }
    return newOrangePosition;
}

export function useOrange(amount){
    window.addEventListener('keyup', e => {
        switch(e.key){
            case "e":
                if (amount > 0 && !orangeUsed){
                    orangeUsed = true;
                    break;
                }
        }
    });
}

export function getOrangeStatus(){
    return orangeUsed;
}

export function updateOrangeStatus(){
    orangeUsed = false;
}
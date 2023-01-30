import { onFood, onSnake } from "./snake.js";
import { randomGridPosition } from "./grid.js";

let banana = null;
let bananaUsed = false;

export function updateBanana(){
    if (banana != null){
        if (onFood(banana)){
            banana = null;
            return true;
        }
    }
    return false;
}

export function drawBanana(gameBoard){
    if (banana != null){
        const bananaElement = document.createElement("div");
        bananaElement.style.gridRowStart = banana.y;
        bananaElement.style.gridColumnStart = banana.x;
        bananaElement.classList.add('banana');
        gameBoard.appendChild(bananaElement);
    }
}

export function generateBanana(position){
    banana = generateRandomBananaPosition(position);
}

function generateRandomBananaPosition(position){
    let newBananaPosition = null;
    while (newBananaPosition == null || onSnake(newBananaPosition) || newBananaPosition == position){
        newBananaPosition = randomGridPosition();
    }
    return newBananaPosition;
}

export function useBanana(amount){
    window.addEventListener('keyup', e => {
        switch(e.key){
            case "q":
                if (amount > 0 && !bananaUsed){
                    bananaUsed = true;
                    break;
                }
        }
    });
}

export function getBananaStatus(){
    return bananaUsed;
}

export function updateBananaStatus(){
    bananaUsed = false;
}
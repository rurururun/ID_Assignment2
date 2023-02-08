import { getInputDirection } from "./input.js";

export let gamePaused = false;

let inputDirection;

window.addEventListener('keyup', e => {
    switch (e.key){
        case 'p':
            inputDirection = getInputDirection();
            if (gamePaused && (inputDirection.x != 0 || inputDirection.y != 0)){
                gamePaused = false;
                break;
            }
            if (!gamePaused && (inputDirection.x != 0 || inputDirection.y != 0)){
                gamePaused = true;
                break;
            }
            break;
        case 'Escape':
            window.location = "mainMenu.html";
            break;
    }
})
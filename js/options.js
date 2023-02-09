import { getInputDirection } from "./input.js";

export let gamePaused = false;
let gameMenuOpened = false;

let inputDirection;

$("#gameMenu").hide();

$("#legend").click(function(){
    if (!gameMenuOpened){
        gamePaused = true;
        gameMenuOpened = true;
        $("#gameMenu").show();
    }
})

window.addEventListener('keyup', e => {
    switch (e.key){
        case 'p':
            if (gameMenuOpened){
                break;
            }
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
            if (gameMenuOpened){
                gamePaused = false;
                gameMenuOpened = false;
                $("#gameMenu").hide();
                break;
            }
            window.location = "mainMenu.html";
            break;
    }
})

export function changeGameState(newState){
    gamePaused = newState;
}
import { orangeUsed } from "./orange.js";

let hunter = {
    x: 16,
    y: 1
}

let direction = null;

let checkPoints = [
    { x: 16, y: 1, path: "down" }, // up
    { x: 16, y: 16, path: "" }, // center
    { x: 1, y: 16, path: "right" }, // left
    { x: 16, y: 31, path: "up" },  // down
    { x: 31, y: 16, path: "left" } // right
]

export let hunterSpeed = 5;

export function updateHunter(){
    // check if the hunter has reached the designated points on the board
    // if it has reached the designated points on the board, it will switch to a different path
    for (let i = 0; i < checkPoints.length; i++){
        if (hunter.x == checkPoints[i].x && hunter.y == checkPoints[i].y){
            if (checkPoints[i].path == ""){
                switch (direction){
                    case "up":
                        direction = "right";
                        break;
                    case "down":
                        direction = "left";
                        break;
                    case "left":
                        direction = "up";
                        break;
                    case "right":
                        direction = "down";
                        break;
                }
            }
            else{
                direction = checkPoints[i].path;
            }
        }
    }

    // moving hunter along the designated path
    switch (direction){
        case "up":
            hunter.y -= 1;
            break;
        case "down":
            hunter.y += 1;
            break;
        case "left":
            hunter.x -= 1;
            break;
        case "right":
            hunter.x += 1;
            break;
    }
}

export function drawHunter(gameBoard){
    if (orangeUsed){
        // make a div for the hunter
        const hunterBody = document.createElement("div");

        // assign x and y position to the hunter
        hunterBody.style.gridRowStart = hunter.y;
        hunterBody.style.gridColumnStart = hunter.x;

        // assign a class to the hunter for css
        hunterBody.classList.add('hunter-debuff');

        hunterBody.style.borderTopRightRadius = "20px";
        hunterBody.style.borderTopLeftRadius = "20px";
        hunterBody.style.borderBottomLeftRadius = "20px";
        hunterBody.style.borderBottomRightRadius = "20px";

        // append the hunter into the game board for it to be shown
        gameBoard.appendChild(hunterBody);
    }
    else{
        // make a div for the hunter
        const hunterBody = document.createElement("div");

        // assign x and y position to the hunter
        hunterBody.style.gridRowStart = hunter.y;
        hunterBody.style.gridColumnStart = hunter.x;

        // assign a class to the hunter for css
        hunterBody.classList.add('hunter');

        hunterBody.style.borderTopRightRadius = "20px";
        hunterBody.style.borderTopLeftRadius = "20px";
        hunterBody.style.borderBottomLeftRadius = "20px";
        hunterBody.style.borderBottomRightRadius = "20px";

        // append the hunter into the game board for it to be shown
        gameBoard.appendChild(hunterBody);
    }
}

export function getHunter(){
    return hunter;
}

export function changeHunterSpeed(newSpeed){
    hunterSpeed = newSpeed;
}
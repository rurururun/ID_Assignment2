let inputDirection = {
    x: 0,
    y: 0
}

let lastInputDirection = {
    x: 0,
    y: 0
}

// add a event listener to check for inputs from player of snake's direction to move
window.addEventListener('keydown', e => {
    switch (e.key){
        case 'ArrowUp':
            if (lastInputDirection.y != 0){
                break;
            }
            inputDirection = {
                x: 0,
                y: -1
            }
            break;
        case 'ArrowDown':
            if (lastInputDirection.y != 0){
                break;
            }
            inputDirection = {
                x: 0,
                y: 1
            }
            break;
        case 'ArrowLeft':
            if (lastInputDirection.x != 0){
                break;
            }
            inputDirection = {
                x: -1,
                y: 0
            }
            break;
        case 'ArrowRight':
            if (lastInputDirection.x != 0){
                break;
            }
            inputDirection = {
                x: 1,
                y: 0
            }
            break;
    }
})

// returns the input from the player of the snake's direction
export function getInputDirection(){
    lastInputDirection = inputDirection;
    return inputDirection;
}
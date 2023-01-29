const gridSize = 21;

// generate a random coordinate on the board and returns it
export function randomGridPosition(){
    return {
        x: Math.floor(Math.random() * gridSize) + 1,
        y: Math.floor(Math.random() * gridSize) + 1
    }
}

// check if the position given is outside of the board
export function outsideGrid(position){
    return (
        position.x < 1 || position.x > gridSize ||
        position.y < 1 || position.y > gridSize
    )
}
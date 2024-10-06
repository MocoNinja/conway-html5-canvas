
import { randomIntFromInterval } from "./utils.js";
import { canvasWidth, canvasHeight, fillRect, canvas } from "./canvas.js";

// TODO: que funcione para que no sean cuadradas
const side = 25;
const tiles = side * side;

//const initialAlive = Math.round(tiles * 0.15);
const initialAlive = 7;

const aliveCellColor = "rgb(255, 255, 255)";
const deadCellColor = "rgb(0, 0, 0)";

let tileSize;

let currentGeneration;
let newGeneration;

export function configureBoard(indexes) {
    currentGeneration = new Array(tiles)
    .fill(false);
    tileSize = Math.floor(canvasWidth / side);
    tileSize = Math.floor(canvasHeight / side);

    const badConfig = tileSize < 1 && tileSize < 1;
    if (badConfig) {
        window.alert("Casillas inferiores a 1 px...");
        window.close();
    }
    console.log(`Configurado tablero de ${side}x${side}`);
    console.log(`Dimensiones del canvas: ${canvas.width, canvas.height}`);
    console.log(`Dimensiones de las tiles: ${tileSize}x${tileSize}`);
    Array.from(indexes).forEach(index => currentGeneration[index] = true);

}

export function updateBoard() {
    newGeneration = [...currentGeneration];
    for (let i = 0; i < tiles; i++) {
        const neighbours = getAliveNeighbours(i);
        newGeneration[i] = shouldLive(i, neighbours);
    }
    currentGeneration = newGeneration;
}

export function renderBoard() {
    for (let i = 0; i < tiles; i++) {
        const cell = currentGeneration[i];
        const color = cell ? aliveCellColor : deadCellColor;
        const x = i % side;
        const y = Math.floor(i / side);
        fillRect(x, y, tileSize, tileSize, color);
    }
}


function getAliveNeighbours(index) {
    let alive = 0;
    const indexesToCheck = [];

    // SHAME
    if (doesIndexHaveNeighbourLeft(index)) {
        indexesToCheck.push(index - 1)
    }

    if (doesIndexHaveNeighbourRight(index)) {
       indexesToCheck.push(index + 1)
    }

    if (doesIndexHaveNeighbourTop(index)) {
       indexesToCheck.push(index - side)
    }

    if (doesIndexHaveNeighbourBottom(index)) {
       indexesToCheck.push(index + side)
    }

   if (doesIndexHaveNeighbourTopLeft(index)) {
        indexesToCheck.push(index - side - 1)
   }

   if (doesIndexHaveNeighbourTopRight(index)) {
        indexesToCheck.push(index - side + 1)
   }

   if (doesIndexHaveNeighbourBottomLeft(index)) {
        indexesToCheck.push(index + side - 1)
   }

   if (doesIndexHaveNeighbourBottomRight(index)) {
       indexesToCheck.push(index + side + 1)
   }

    for (let i = 0; i < indexesToCheck.length; i++) {
        if (currentGeneration[indexesToCheck[i]]) {
            alive++;
        }
    }
    return alive;

}

// Begin Estaria mejor hacerlo de forma que no de verguenza ajena

function doesIndexHaveNeighbourLeft(index) {
    const left = index - 1;
    const modIndex = index % side;
    const isIndexNotFirstInRow = modIndex !== 0;
    return left >= 0 && isIndexNotFirstInRow;
}

function doesIndexHaveNeighbourRight(index) {
    if (index === 0) return true;
    if ((index + 1) % side === 0) return false;
    return index + 1 < tiles;
}

function doesIndexHaveNeighbourTop(index) {
    const indexTop = index - side;
    return indexTop >= 0;
}

function doesIndexHaveNeighbourBottom(index) {
    const indexTop = index + side;
    return indexTop < tiles;
}

function doesIndexHaveNeighbourTopLeft(index) {
    return doesIndexHaveNeighbourTop(index) && doesIndexHaveNeighbourLeft(index - side);
}

function doesIndexHaveNeighbourTopRight(index) {
    return doesIndexHaveNeighbourTop(index) && doesIndexHaveNeighbourRight(index - side);
}
function doesIndexHaveNeighbourBottomLeft(index) {
    return doesIndexHaveNeighbourBottom(index) && doesIndexHaveNeighbourLeft(index + side);
}

function doesIndexHaveNeighbourBottomRight(index) {
    return doesIndexHaveNeighbourBottom(index) && doesIndexHaveNeighbourRight(index + side);
}

// End Estaria mejor hacerlo de forma que no de verguenza ajena


// Estaria bien ser inteligente y darle una vuelta a mi idea inicial para hacerlo guay o demostrar que tengo ideas de mierda
function getAliveNeighboursNoEsCiertoPuta(index) {
    console.log(`Checking alive for ${index}`)
    // fuerza brutaaaa
    let alive = 0;
    const indexes = [
        // LEFT
        index - 1,
        // RIGHT
        index + 1,
        // TOP
        index - side,
        // TOP LEFT
        index - side - 1,
        // TOP RIGHT
        index - side + 1,
        // BOTTOM
        index + side,
        // BOTTOM LEFT
        index + side - 1,
        // BOTTOM RIGHT
        index + side + 1
    ]

    const indexesToCheck = indexes
    .filter(number => number >= 0 && number <= side - 1);

    for (let i = 0; i < indexesToCheck; i++) {
        if (currentGeneration[indexesToCheck[i]]) {
            alive++;
        }
    }
    console.log(alive);
    return alive;

}

// las normas de conway as is
function shouldLive(index, neighbours) {
    if (currentGeneration[index]) {
        return neighbours === 3 || neighbours === 2;
    }
    return neighbours === 3;
}

function putAliveCellsAtRandomAtSomeBoard(board) {
    for (let i = 0; i < initialAlive; i++) {
        let x = randomIntFromInterval(0, tiles - 1);
        while (!board[x]) {
            x = randomIntFromInterval(0, tiles - 1);
            board[x] = true;
        }
    }
}

export function canvasClickToIndex(event) {
        const rect = canvas.getBoundingClientRect();

        // Calculate the mouse click coordinates
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const normalX = side / Math.round(x);
        const normalY = side / Math.round(y) ;
        console.log(`Clicked coordinates: (${x}, ${y})`);
        console.log(`Mapped coordinates: (${normalX}, ${normalY})`);
}
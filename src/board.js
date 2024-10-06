
import {canvasWidth, boardTileSide, tiles} from "./config.js";
import {fillRect, getCanvas} from "./canvas.js";


const aliveCellColor = "rgb(255, 255, 255)";
const deadCellColor = "rgb(0, 0, 0)";

let tileSize;

let currentGeneration;
let newGeneration;

export function configureBoard(indexes) {
    currentGeneration = new Array(tiles).fill(false);
    tileSize = Math.floor( canvasWidth/ boardTileSide);

    const badConfig = tileSize < 1;
    if (badConfig) {
        window.alert("Casillas inferiores a 1 px...");
        window.close();
    }
    console.log(`Configurado tablero de ${boardTileSide}x${boardTileSide}`);
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
        const x = i % boardTileSide;
        const y = Math.floor(i / boardTileSide);
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
       indexesToCheck.push(index - boardTileSide)
    }

    if (doesIndexHaveNeighbourBottom(index)) {
       indexesToCheck.push(index + boardTileSide)
    }

   if (doesIndexHaveNeighbourTopLeft(index)) {
        indexesToCheck.push(index - boardTileSide - 1)
   }

   if (doesIndexHaveNeighbourTopRight(index)) {
        indexesToCheck.push(index - boardTileSide + 1)
   }

   if (doesIndexHaveNeighbourBottomLeft(index)) {
        indexesToCheck.push(index + boardTileSide - 1)
   }

   if (doesIndexHaveNeighbourBottomRight(index)) {
       indexesToCheck.push(index + boardTileSide + 1)
   }

    for (const element of indexesToCheck) {
        if (currentGeneration[element]) {
            alive++;
        }
    }
    return alive;

}

// Begin Estaria mejor hacerlo de forma que no de verguenza ajena

function doesIndexHaveNeighbourLeft(index) {
    const left = index - 1;
    const modIndex = index % boardTileSide;
    const isIndexNotFirstInRow = modIndex !== 0;
    return left >= 0 && isIndexNotFirstInRow;
}

function doesIndexHaveNeighbourRight(index) {
    if (index === 0) return true;
    if ((index + 1) % boardTileSide === 0) return false;
    return index + 1 < tiles;
}

function doesIndexHaveNeighbourTop(index) {
    const indexTop = index - boardTileSide;
    return indexTop >= 0;
}

function doesIndexHaveNeighbourBottom(index) {
    const indexTop = index + boardTileSide;
    return indexTop < tiles;
}

function doesIndexHaveNeighbourTopLeft(index) {
    return doesIndexHaveNeighbourTop(index) && doesIndexHaveNeighbourLeft(index - boardTileSide);
}

function doesIndexHaveNeighbourTopRight(index) {
    return doesIndexHaveNeighbourTop(index) && doesIndexHaveNeighbourRight(index - boardTileSide);
}
function doesIndexHaveNeighbourBottomLeft(index) {
    return doesIndexHaveNeighbourBottom(index) && doesIndexHaveNeighbourLeft(index + boardTileSide);
}

function doesIndexHaveNeighbourBottomRight(index) {
    return doesIndexHaveNeighbourBottom(index) && doesIndexHaveNeighbourRight(index + boardTileSide);
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
        index - boardTileSide,
        // TOP LEFT
        index - boardTileSide - 1,
        // TOP RIGHT
        index - boardTileSide + 1,
        // BOTTOM
        index + boardTileSide,
        // BOTTOM LEFT
        index + boardTileSide - 1,
        // BOTTOM RIGHT
        index + boardTileSide + 1
    ]

    const indexesToCheck = indexes
    .filter(number => number >= 0 && number <= boardTileSide - 1);

    for (let i = 0; i < indexesToCheck; i++) {
        if (currentGeneration[indexesToCheck[i]]) {
            alive++;
        }
    }
    console.log(alive);
    return alive;

}

export function toggleCell(index) {
    currentGeneration[index] = !currentGeneration[index];
}

// las normas de conway as is
function shouldLive(index, neighbours) {
    if (currentGeneration[index]) {
        return neighbours === 3 || neighbours === 2;
    }
    return neighbours === 3;
}

export function getCellIndexFromClick(event) {
        const rect = getCanvas().getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const normalX = Math.floor(x / tileSize);
        const normalY = Math.floor(y / tileSize);

        return normalY * boardTileSide + normalX;
}
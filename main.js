import { configureCanvas, canvas } from "./canvas.js";
import { configureBoard, updateBoard, renderBoard, canvasClickToIndex } from "./board.js";


const FPS = 10;
const msPerTick = 1000 / FPS;


function main() {
    configureCanvas();
    //configureBoard([210, 211,212, 235, 236, 237, 260, 261, 262]);
    configureBoard([210, 211,222, 233,234,234, 236, 237, 260, 261, 262]);
    configureListeners();
    gameLoop();


}

function configureListeners() {
    document.getElementById("tickButton")
    .addEventListener('click', tick);
    canvas.addEventListener('click', canvasClickToIndex);
}


function gameLoop() {
    tick();
    setTimeout(gameLoop, msPerTick);
}

function tick() {
    renderBoard();
    updateBoard();
}

window.addEventListener('load', main);

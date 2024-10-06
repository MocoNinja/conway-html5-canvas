import { configureCanvas, getCanvas } from "./canvas.js";
import {configureBoard, updateBoard, renderBoard, getCellIndexFromClick, toggleCell} from "./board.js";

const FPS = 155;
const msPerTick = 1000 / FPS;
let mainThreadIntervalId;


function main() {
    configureCanvas();
    configureBoard([210, 211,212, 235, 236, 237, 260, 261, 262]);
    //configureBoard([111,112,113,114,115]);
    renderBoard()
    configureListeners();


}

function configureListeners() {
    document.getElementById("startButton").addEventListener('click', startSimulation);
    document.getElementById("stopButton").addEventListener('click', stopSimulation);
    document.getElementById("tickButton").addEventListener('click', tick);
    document.getElementById("canvas").addEventListener("click", click);
}


function gameLoop() {
    tick();
    setTimeout(gameLoop, msPerTick);
}

function tick() {
    renderBoard();
    updateBoard();
}

function click(event) {
    toggleCell(getCellIndexFromClick(event));
    renderBoard();
}

function startSimulation() {
    if (!mainThreadIntervalId) {
        mainThreadIntervalId = setInterval(tick, msPerTick);
    }
}

function stopSimulation() {
    if (mainThreadIntervalId) {
        clearInterval(mainThreadIntervalId);
        mainThreadIntervalId = undefined;
    }
}

window.addEventListener('load', main);

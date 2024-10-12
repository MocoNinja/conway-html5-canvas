import { configureCanvas } from "./canvas.js";
import {configureBoard, updateBoard, renderBoard, getCellIndexFromClick, toggleCell} from "./board.js";
import { DEFAULT_FPS } from "./config.js";

let FPS = DEFAULT_FPS;
let msPerTick = 1000 / FPS;
let mainThreadIntervalId;


function main() {
    configureCanvas();
    configureBoard([210, 211,212, 235, 236, 237, 260, 261, 262]);
    //configureBoard([111,112,113,114,115]);
    renderBoard()
    configureListeners();
    document.getElementById("fpsDisplay").innerText = `FPS: ${FPS}`;
}

function configureListeners() {
    document.getElementById("startButton").addEventListener('click', startSimulation);
    document.getElementById("stopButton").addEventListener('click', stopSimulation);
    document.getElementById("tickButton").addEventListener('click', tick);
    document.getElementById("canvas").addEventListener("click", click);
    document.getElementById("fpsInput").addEventListener("change", changeFPS);
}

function changeFPS(event) {
    FPS = event.target.value;
    msPerTick = 1000 / FPS;
    if (mainThreadIntervalId) {
        stopSimulation();
        startSimulation();
    }
    document.getElementById("fpsDisplay").innerText = `FPS: ${FPS}`;
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

import {canvasHeight, canvasWidth} from "./config.js";

let ctx;
let canvas;

const borderColor = "rgb(255, 255, 255)";

export function configureCanvas() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx.strokeStyle = borderColor;
}

export function fillRect(x, y, tileWidth, tileHeight, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.rect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
    ctx.fill();
    ctx.stroke();
}

export function getCanvas() {
    return canvas;
}


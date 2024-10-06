export const canvasWidth = 800;
export const canvasHeight = 800;

let ctx;
export let canvas;

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

export function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
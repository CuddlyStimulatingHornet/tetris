const pixelCountX = 10;
const pixelCountY = 20;

const $canvas = document.getElementById("canvas");
const $canvasWrapper = document.getElementById("canvas-wrapper");
const canvasWidth = $canvasWrapper.clientWidth;
const canvasHeight = $canvasWrapper.clientHeight;
$canvas.width = canvasWidth;
$canvas.height = canvasHeight;

const ctx = $canvas.getContext("2d");

const unitSize = canvasWidth / pixelCountX;

const clear = () => {
  ctx.clearRect(0, 0, $canvas.width, $canvas.height);
};

const drawRect = (x, y, w, h, color = "red") => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
};

const drawUnit = ({ x, y }, color = "red") => {
  drawRect(
    x * unitSize + 1,
    y * unitSize + 1,
    unitSize - 2,
    unitSize - 2,
    color
  );
};

const field = [];

const shapes = [[], [], [], []];

const figureL = {
  shape: [
    [0, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 1, 1],
    [0, 0, 0, 0],
  ],
  color: "blue",
};

const figureRotate = (figure) => {
  figure.shape = figure.shape.map((row, y) =>
    row.map((cell, x) => figure.shape[row.length - 1 - x][y])
  );
};

const drawFigure = (coords, figure) => {
  for (let y = 0; y < figure.shape.length; y++) {
    for (let x = 0; x < figure.shape[y].length; x++) {
      if (figure.shape[y][x]) {
        drawUnit({ x: coords.x + x, y: coords.y + y }, figure.color);
      }
    }
  }
};

let currentFigure = structuredClone(figureL);

setInterval(() => {
  figureRotate(currentFigure);
  clear();
  drawFigure({ x: 3, y: 0 }, currentFigure);
}, 1000);

// drawFigure({ x: 3, y: 3 }, rotatedFigureL);

let startPosX = 3;
let startPosY = 0;

const figureFall = () => {
  setInterval(() => {
    clear();
    drawFigure({ x: startPosX, y: ++startPosY }, figureL);
  }, 1000);
};

// figureFall();

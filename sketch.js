var dimensions = 8;
var squareWidth = 80;
var canvasSize = dimensions * squareWidth;
var fontSize = 60;
var board;
var font;

var offsetX, offsetY;

function preload() {
  font = loadFont("MERIFONT.TTF");
}

function setup() {
  createCanvas(canvasSize, canvasSize);
  textFont(font);
  textSize(fontSize);
  textAlign(CENTER, CENTER);
  board = new Board();
  board.updateMovesets();
}

function draw() {
  drawGrid();
  board.updateAndShow(mouseX, mouseY);
}

function mousePressed() {
  board.pressed(mouseX, mouseY);
  board.updateMovesets();
}

function mouseReleased() {
  board.released();
  board.updateMovesets();
}

function drawGrid() {
  for (var i = 0; i < dimensions; i++) {
    for (var j = 0; j < dimensions; j++) {
      var x = squareWidth * i;
      var y = squareWidth * j;
      if ((i + j) % 2 == 0) {
        fill("white");
      } else {
        fill("black");
      }
      strokeWeight(0.5);
      square(x, y, squareWidth);
    }
  }
}

// TODO
// checkmate
// stalemate

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
  textAlign(CENTER, CENTER);
  board = new Board();
  board.updateMovesets();
}

function draw() {
  drawGrid();
  textSize(fontSize);
  textFont(font);
  board.updateAndShow(mouseX, mouseY);
  textSize(fontSize * 0.75);
  textFont("Helvetica");
  if (board.checkmate) {
    let loser =
      board.currentTurn[0].toUpperCase() + board.currentTurn.substring(1);
    text(loser + " has been checkmated!", squareWidth * 4, squareWidth * 4);
  } else if (board.stalemate) {
    text("The game is a draw", squareWidth * 4, squareWidth * 4);
  }
}

function mousePressed() {
  if (board.checkmate) return;
  board.pressed(mouseX, mouseY);
  board.updateMovesets();
}

function mouseReleased() {
  if (board.checkmate) return;
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
      stroke("black");
      square(x, y, squareWidth);
    }
  }
}

// TODO
// checkmate
// stalemate

var dimensions = 8;
var squareWidth;
var canvasSize;
var fontSize;
var board;
var font;
var canvas;

var offsetX, offsetY;

function preload() {
  font = loadFont("MERIFONT.TTF");
}

function setup() {
  canvas = createCanvas(windowWidth * 0.5, windowHeight * 0.9);
  canvas.position(windowWidth * 0.15, windowHeight * 0.1);

  squareWidth = Math.min(width / 10, height / 10);
  fontSize = squareWidth * 0.9;

  textAlign(CENTER, CENTER);

  board = new Board();
  board.updateMovesets();
}

function draw() {
  background("#edffee");
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
  if (board.checkmate || board.stalemate) return;
  board.pressed(mouseX, mouseY);
  board.updateMovesets();
}

function mouseReleased() {
  if (board.checkmate || board.stalemate) return;
  board.released();
  board.updateMovesets();
}

function drawGrid() {
  for (var i = 0; i < dimensions; i++) {
    for (var j = 0; j < dimensions; j++) {
      var x = squareWidth * i;
      var y = squareWidth * j;
      if ((i + j) % 2 == 0) {
        fill("#f0f0f0");
      } else {
        fill("#316540");
      }
      strokeWeight(0.5);
      stroke("black");
      square(x, y, squareWidth);
    }
  }
}

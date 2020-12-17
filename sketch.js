var dimensions = 8;
var squareWidth = 200;
var canvasSize = dimensions * squareWidth;
var fontSize = 150;
var board;
var font;
var offset;

var offsetX, offsetY;

function preload() {
  font = loadFont("MERIFONT.TTF");
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  var x = windowWidth - width;
  var y = windowHeight - height;
  canvas.position(x, y);

  textAlign(CENTER, CENTER);

  board = new Board();
  board.updateMovesets();

  offset = windowWidth / 2 - 4 * squareWidth;
}

function draw() {
  background("#312E2B");
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
        fill("#e0e0e0");
      } else {
        fill("#316540");
      }
      strokeWeight(0.5);
      stroke("black");
      square(x + offset, y, squareWidth);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

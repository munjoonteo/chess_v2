class Piece {
  constructor(x, y, board, colour) {
    // Raw coordinates
    this.x = x;
    this.y = y;

    // Grid/cartesian coordinates
    this.xGrid = floor(x / squareWidth);
    this.yGrid = floor(y / squareWidth);

    // Original positions (raw coordinates)
    this.originalX = x;
    this.originalY = y;

    // List of possible moves in coordinate form
    this.moveset = [];

    this.board = board;
    this.colour = colour;
    this.dragging = false;

    this.hasMoved = false;
    this.movedTwo = false;
    this.captured = false;
  }

  show() {
    strokeWeight(3);
    if (this.colour === "white") {
      fill("white");
      stroke("black");
    } else {
      fill("black");
      stroke("white");
    }
    text(this.name, this.x, this.y);
  }

  update(mx, my) {
    if (this.dragging) {
      this.x = mx + this.offsetX;
      this.y = my + this.offsetY;
    }
  }

  pressed(mx, my) {
    if (dist(mx, my, this.x, this.y) < squareWidth / 2) {
      this.dragging = true;
      this.offsetX = this.x - mx;
      this.offsetY = this.y - my;
    }
  }

  released() {
    this.dragging = false;
    let finalX = floor(this.x / squareWidth) * squareWidth + squareWidth / 2;
    let finalY = floor(this.y / squareWidth) * squareWidth + squareWidth / 2;

    if (
      this.name === "K" &&
      Math.abs(floor(finalX / squareWidth) - this.xGrid) == 2
    ) {
      this.castle(finalX, finalY);
    } else if (this.legalMove(finalX, finalY)) {
      this.movePiece(finalX, finalY);
    } else {
      this.x = this.originalX;
      this.y = this.originalY;
    }
  }

  movePiece(finalX, finalY) {
    let finalXGrid = floor(finalX / squareWidth);
    let finalYGrid = floor(finalY / squareWidth);

    // Update board state - set new position to be captured and old position to be empty square
    this.board.boardState[finalYGrid][finalXGrid].captured = true;
    this.board.boardState[this.yGrid][this.xGrid] = new Piece(0, 0, null, "");

    // Check for pawns moving two squares
    if (
      this.name === "p" &&
      Math.abs(floor(finalY / squareWidth) - this.yGrid) == 2
    ) {
      this.movedTwo = true;
    }

    // Update piece data
    this.x = finalX;
    this.y = finalY;
    this.xGrid = finalXGrid;
    this.yGrid = finalYGrid;
    this.originalX = this.x;
    this.originalY = this.y;
    this.hasMoved = true;

    // See if anyone is in check
    this.updateMoveset();
    this.setCheck();

    // Update king positions
    this.board.updateKings();

    // Update board state - set new position to be current piece
    this.board.boardState[this.yGrid][this.xGrid] = this;

    // Process pieces which were captured
    this.board.capture();

    // Change turn
    this.board.nextTurn();
  }

  legalMove(finalX, finalY) {
    if (this.colour != this.board.currentTurn) return false;

    let gridX = floor(finalX / squareWidth);
    let gridY = floor(finalY / squareWidth);
    for (let allowedMove of this.moveset) {
      if (gridX != allowedMove[0] || gridY != allowedMove[1]) continue;
      return true;
    }
    return false;
  }

  withinBounds(position) {
    let x = position[0];
    let y = position[1];
    if (x < 0 || x > 7 || y < 0 || y > 7) {
      return false;
    }
    return true;
  }

  setCheck() {
    for (let move of this.moveset) {
      if (
        move[0] == this.board.whiteKingX &&
        move[1] == this.board.whiteKingY
      ) {
        this.board.whiteInCheck = true;
      } else if (
        move[0] == this.board.blackKingX &&
        move[1] == this.board.blackKingY
      ) {
        this.board.blackInCheck = true;
      }
    }
  }
}

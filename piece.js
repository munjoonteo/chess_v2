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

    if (this.legalMove(finalX, finalY)) {
      this.movePiece(finalX, finalY);
    } else {
      this.x = this.originalX;
      this.y = this.originalY;
    }
  }

  movePiece(finalX, finalY) {
    // Update board state - set old position to be empty square
    this.board.boardState[this.yGrid][this.xGrid] = {
      piece: "",
      colour: "",
    };

    // Update piece data
    this.x = finalX;
    this.y = finalY;
    this.xGrid = floor(this.x / squareWidth);
    this.yGrid = floor(this.y / squareWidth);
    this.originalX = this.x;
    this.originalY = this.y;

    // Update board state - set new position to be current piece
    this.board.boardState[this.yGrid][this.xGrid] = {
      piece: this.name,
      colour: this.colour,
    };

    // Process pieces which were captured
    this.board.capture();

    // Change turn
    if (this.board.currentTurn === "white") {
      this.board.currentTurn = "black";
    } else {
      this.board.currentTurn = "white";
    }
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
}

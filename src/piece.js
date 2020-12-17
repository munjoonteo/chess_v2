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

    // For castling and pawns
    this.hasMoved = false;

    // For pawns
    this.movedTwo = false;

    this.captured = false;
  }

  show() {
    if (this.colour === "white") {
      strokeWeight(7);
      fill("white");
    } else {
      strokeWeight(1);
      fill("black");
    }
    text(this.code, this.x + offset, this.y);
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

    if (finalX == this.x && finalY == this.y) {
      // Has not moved
      return;
    } else if (this.didCastle(finalX)) {
      this.castle(finalX, finalY);
    } else if (this.legalMove(finalX, finalY)) {
      this.movePiece(finalX, finalY);
    } else {
      // Illegal move
      this.x = this.originalX;
      this.y = this.originalY;
    }
  }

  movePiece(finalX, finalY) {
    let finalXGrid = floor(finalX / squareWidth);
    let finalYGrid = floor(finalY / squareWidth);

    // En passant - piece is pawn, did a capture and did not directly capture a piece
    // Otherwise, set the other piece on the square to be captured - will remove from pieces array later
    if (this.name === "p" && this.didEnPassant(finalXGrid, finalYGrid)) {
      if (this.colour === "white") {
        this.board.boardState[finalYGrid + 1][finalXGrid].captured = true;
      } else {
        this.board.boardState[finalYGrid - 1][finalXGrid].captured = true;
      }
    } else {
      this.board.boardState[finalYGrid][finalXGrid].captured = true;
    }

    // Set old position to be an empty square
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

    if (this.name === "K" && this.colour === "white") {
      this.board.whiteKingX = this.xGrid;
      this.board.whiteKingY = this.yGrid;
    } else if (this.name === "K" && this.colour === "black") {
      this.board.blackKingX = this.xGrid;
      this.board.blackKingY = this.yGrid;
    }

    // Set new position to be current piece
    this.board.boardState[this.yGrid][this.xGrid] = this;

    // Change turn
    this.board.nextTurn();
  }

  legalMove(finalX, finalY) {
    // Wrong colour
    if (this.colour != this.board.currentTurn) return false;

    let gridX = floor(finalX / squareWidth);
    let gridY = floor(finalY / squareWidth);

    // Either not in check and moved a piece so that it's check
    // Or in check and still in check after move
    if (this.board.stillInCheck(this, finalX, finalY)) return false;

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

  didCastle(finalX) {
    return (
      this.name === "K" &&
      Math.abs(floor(finalX / squareWidth) - this.xGrid) == 2
    );
  }

  didEnPassant(finalXGrid, finalYGrid) {
    return (
      this.name === "p" &&
      finalXGrid != this.xGrid &&
      this.board.boardState[finalYGrid][finalXGrid].colour === ""
    );
  }
}

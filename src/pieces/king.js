class King extends Piece {
  constructor(x, y, board, colour) {
    super(x, y, board, colour);
    this.name = "\uf06c";
  }

  updateMoveset() {
    let moveset = [];
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        let move = [this.xGrid + i, this.yGrid + j];

        let opponent;
        if (this.colour === "white") {
          opponent = this.board.black;
        } else {
          opponent = this.board.white;
        }

        if (
          this.withinBounds(move) &&
          board.boardState[move[1]][move[0]].colour != this.colour &&
          !this.moveIntoCheck(move[0], move[1], opponent)
        ) {
          moveset.push(move);
        }
      }
    }

    this.moveset = moveset;
  }

  castle(finalX, finalY) {
    if (this.hasMoved) {
      this.x = this.originalX;
      this.y = this.originalY;
      return;
    }

    let curr, opponent;
    if (this.colour === "white") {
      curr = this.board.white;
      opponent = this.board.black;
    } else {
      curr = this.board.black;
      opponent = this.board.white;
    }

    let success = false;
    for (let piece of curr) {
      if (piece.name === "R" && piece.yGrid == this.yGrid && !piece.hasMoved) {
        if (finalX < piece.x) {
          // Right castle
          let isEmpty = true;
          for (let i = this.xGrid + 1; i < dimensions - 1; i++) {
            if (
              this.board.boardState[this.yGrid][i].colour !== "" ||
              this.moveIntoCheck(i, this.yGrid, opponent)
            ) {
              isEmpty = false;
            }
          }

          if (!isEmpty) continue;

          this.movePiece(finalX, finalY);

          if (this.colour === "white") {
            piece.movePiece(piece.x - 2 * squareWidth, piece.y);
          } else {
            piece.movePiece(piece.x + 3 * squareWidth, piece.y);
          }

          success = true;
        } else {
          // Left castle
          let isEmpty = true;
          for (let i = this.xGrid - 1; i > 1; i--) {
            if (
              this.board.boardState[this.yGrid][i].colour !== "" ||
              this.moveIntoCheck(i, this.yGrid, opponent)
            ) {
              isEmpty = false;
            }
          }

          if (!isEmpty) continue;

          this.movePiece(finalX, finalY);

          if (this.colour === "white") {
            piece.movePiece(piece.x + 3 * squareWidth, piece.y);
          } else {
            piece.movePiece(piece.x - 2 * squareWidth, piece.y);
          }

          success = true;
        }
      }
    }

    if (!success) {
      this.x = this.originalX;
      this.y = this.originalY;
    }
  }

  moveIntoCheck(xGrid, yGrid, opponent) {
    for (let piece of opponent) {
      for (let move of piece.moveset) {
        if (xGrid == move[0] && yGrid == move[1]) {
          return true;
        }
      }
    }
  }
}

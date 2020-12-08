class King extends Piece {
  constructor(x, y, board, colour) {
    super(x, y, board, colour);
    this.code = "\uf06c";
    this.name = "K";
  }

  updateMoveset() {
    let moveset = [];
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        let move = [this.xGrid + i, this.yGrid + j];

        if (
          this.withinBounds(move) &&
          board.boardState[move[1]][move[0]].colour != this.colour &&
          !this.board.moveIntoCheck(move[0], move[1])
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

    let right;
    if (finalX > this.originalX) {
      right = true;
    } else {
      right = false;
    }

    let curr;
    if (this.colour === "white") {
      curr = this.board.white;
    } else {
      curr = this.board.black;
    }

    let success = false;
    for (let piece of curr) {
      if (piece.name === "R" && piece.yGrid == this.yGrid && !piece.hasMoved) {
        if (finalX < piece.x && right) {
          // Right castle
          let isEmpty = true;
          for (let i = this.xGrid + 1; i < dimensions - 1; i++) {
            if (
              this.board.boardState[this.yGrid][i].colour !== "" ||
              this.board.moveIntoCheck(i, this.yGrid)
            ) {
              isEmpty = false;
            }
          }

          if (!isEmpty) continue;

          this.movePiece(finalX, finalY);
          piece.movePiece(piece.x - 2 * squareWidth, piece.y);

          success = true;
          break;
        } else if (finalX > piece.x && !right) {
          // Left castle
          let isEmpty = true;
          for (let i = this.xGrid - 1; i > 1; i--) {
            if (
              this.board.boardState[this.yGrid][i].colour !== "" ||
              this.board.moveIntoCheck(i, this.yGrid)
            ) {
              isEmpty = false;
            }
          }

          if (!isEmpty) continue;

          this.movePiece(finalX, finalY);
          piece.movePiece(piece.x + 3 * squareWidth, piece.y);

          success = true;
          break;
        }
      }
    }

    if (!success) {
      this.x = this.originalX;
      this.y = this.originalY;
    } else {
      this.board.nextTurn();
    }
  }
}

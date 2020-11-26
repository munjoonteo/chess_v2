class King extends Piece {
  constructor(x, y, board, colour) {
    super(x, y, board, colour);
    this.name = "K";
  }

  updateMoveset() {
    let moveset = [];
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        let move = [this.xGrid + i, this.yGrid + j];
        if (
          this.withinBounds(move) &&
          board.boardState[move[1]][move[0]].colour != this.colour
        ) {
          moveset.push(move);
        }
      }
    }

    this.moveset = moveset;
  }

  castle(finalX, finalY) {
    if (this.hasMoved) return false;

    let curr;
    if (this.colour === "white") {
      curr = this.board.white;
    } else {
      curr = this.board.black;
    }

    for (let piece of curr) {
      if (piece.name === "R" && piece.yGrid == this.yGrid && !piece.hasMoved) {
        if (finalX < piece.x) {
          // Right castle
          let isEmpty = true;
          for (let i = this.xGrid + 1; i < dimensions - 1; i++) {
            if (this.board.boardState[this.yGrid][i].colour !== "") {
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
        } else {
          // Left castle
          let isEmpty = true;
          for (let i = this.xGrid - 1; i > 1; i--) {
            if (this.board.boardState[this.yGrid][i].colour !== "") {
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
        }
      }
    }

    return false;
  }
}

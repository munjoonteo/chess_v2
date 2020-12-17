class Rook extends Piece {
  constructor(x, y, board, colour) {
    super(x, y, board, colour);
    this.code = "\uF074";
    this.name = "R";
  }

  updateMoveset() {
    let moveset = [];

    for (let i = 1; i < dimensions; i++) {
      // Down
      let move = [this.xGrid, this.yGrid + i];
      if (this.withinBounds(move)) {
        if (this.board.boardState[move[1]][move[0]].colour === this.colour) {
          break;
        } else {
          if (this.board.boardState[move[1]][move[0]].colour === "") {
            moveset.push(move);
          } else {
            moveset.push(move);
            break;
          }
        }
      }
    }

    for (let i = 1; i < dimensions; i++) {
      // Up
      let move = [this.xGrid, this.yGrid - i];
      if (this.withinBounds(move)) {
        if (this.board.boardState[move[1]][move[0]].colour === this.colour) {
          break;
        } else {
          if (this.board.boardState[move[1]][move[0]].colour === "") {
            moveset.push(move);
          } else {
            moveset.push(move);
            break;
          }
        }
      }
    }

    for (let i = 1; i < dimensions; i++) {
      // Right
      let move = [this.xGrid + i, this.yGrid];
      if (this.withinBounds(move)) {
        if (this.board.boardState[move[1]][move[0]].colour === this.colour) {
          break;
        } else {
          if (this.board.boardState[move[1]][move[0]].colour === "") {
            moveset.push(move);
          } else {
            moveset.push(move);
            break;
          }
        }
      }
    }

    for (let i = 1; i < dimensions; i++) {
      // Left
      let move = [this.xGrid - i, this.yGrid];
      if (this.withinBounds(move)) {
        if (this.board.boardState[move[1]][move[0]].colour === this.colour) {
          break;
        } else {
          if (this.board.boardState[move[1]][move[0]].colour === "") {
            moveset.push(move);
          } else {
            moveset.push(move);
            break;
          }
        }
      }
    }

    this.moveset = moveset;
  }
}

class Bishop extends Piece {
  constructor(x, y, board, colour) {
    super(x, y, board, colour);
    this.code = "\uf076";
    this.name = "B";
  }

  updateMoveset() {
    let moveset = [];

    for (let i = 1; i < dimensions; i++) {
      // Bottom right diagonal
      let move = [this.xGrid + i, this.yGrid + i];
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
      // Top left diagonal
      let move = [this.xGrid - i, this.yGrid - i];
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
      // Top right diagonal
      let move = [this.xGrid + i, this.yGrid - i];
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
      // Bottom left diagonal
      let move = [this.xGrid - i, this.yGrid + i];
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

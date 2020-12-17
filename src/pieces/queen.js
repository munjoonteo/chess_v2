class Queen extends Piece {
  constructor(x, y, board, colour) {
    super(x, y, board, colour);
    this.code = "\uf077";
    this.name = "Q";
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

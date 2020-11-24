class Queen extends Piece {
  constructor(x, y, board, colour) {
    super(x, y, board, colour);
    this.name = "Q";
  }

  updateMoveset() {
    let moveset = [];

    for (let i = 1; i < 7; i++) {
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

    for (let i = 1; i < 7; i++) {
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

    for (let i = 1; i < 7; i++) {
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

    for (let i = 1; i < 7; i++) {
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

    for (let i = 1; i < 7; i++) {
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

    for (let i = 1; i < 7; i++) {
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

    for (let i = 1; i < 7; i++) {
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

    for (let i = 1; i < 7; i++) {
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

class Pawn extends Piece {
  constructor(x, y, board, colour) {
    super(x, y, board, colour);
    this.name = "p";
  }

  updateMoveset() {
    let moveset = [];
    if (this.colour === "white" && this.yGrid != 0) {
      if (board.boardState[this.yGrid - 1][this.xGrid].colour === "") {
        // Forward 1
        moveset.push([this.xGrid, this.yGrid - 1]);
      }
      if (
        !this.hasMoved &&
        board.boardState[this.yGrid - 2][this.xGrid].colour === ""
      ) {
        //Forward 2
        moveset.push([this.xGrid, this.yGrid - 2]);
      }
    } else if (this.colour === "black" && this.yGrid != 7) {
      if (board.boardState[this.yGrid + 1][this.xGrid].colour === "") {
        //Forward 1
        moveset.push([this.xGrid, this.yGrid + 1]);
      }
      if (
        !this.hasMoved &&
        board.boardState[this.yGrid + 2][this.xGrid].colour === ""
      ) {
        //Forward 2
        moveset.push([this.xGrid, this.yGrid + 2]);
      }
    }
    this.moveset = moveset;
  }
}

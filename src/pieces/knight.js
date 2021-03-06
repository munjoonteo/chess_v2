class Knight extends Piece {
  constructor(x, y, board, colour) {
    super(x, y, board, colour);
    this.code = "\uf06d";
    this.name = "N"
  }

  updateMoveset() {
    let moveset = [];
    for (let i of [2, -2]) {
      for (let j of [1, -1]) {
        let move = [this.xGrid + i, this.yGrid + j]; // left/right then up/down (left/right Ls)
        let move1 = [this.xGrid + j, this.yGrid + i]; // up/down then left/right (up/down Ls)
        if (
          this.withinBounds(move) &&
          this.board.boardState[this.yGrid + j][this.xGrid + i].colour !=
            this.colour
        ) {
          moveset.push(move);
        }
        if (
          this.withinBounds(move1) &&
          this.board.boardState[this.yGrid + i][this.xGrid + j].colour !=
            this.colour
        ) {
          moveset.push(move1);
        }
      }
    }

    this.moveset = moveset;
  }
}

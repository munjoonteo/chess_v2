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
}

class Board {
  constructor() {
    // array for white pieces
    this.white = [];

    // array for black pieces
    this.black = [];

    // array to keep track of the current game state
    this.boardState = [];
    for (let i = 0; i < dimensions; i++) {
      this.boardState[i] = [];
      for (let j = 0; j < dimensions; j++) {
        this.boardState[i][j] = {
          piece: "",
          colour: "",
        };
      }
    }
    this.currentTurn = "white";
    this.initialise();
  }

  initialise() {
    // Pawns
    for (let i = 0; i < dimensions; i++) {
      this.white.push(
        new Pawn(
          squareWidth / 2 + squareWidth * i,
          squareWidth / 2 + squareWidth * 6,
          this,
          "white"
        )
      );
      this.black.push(
        new Pawn(
          squareWidth / 2 + squareWidth * i,
          squareWidth / 2 + squareWidth,
          this,
          "black"
        )
      );
      this.boardState[1][i] = {
        piece: "p",
        colour: "black",
      };
      this.boardState[6][i] = {
        piece: "p",
        colour: "white",
      };
    }

    // Bishop
    this.white.push(
      new Bishop(
        squareWidth / 2 + squareWidth * 2,
        squareWidth / 2 + squareWidth * 7,
        this,
        "white"
      )
    );
    this.white.push(
      new Bishop(
        squareWidth / 2 + squareWidth * 5,
        squareWidth / 2 + squareWidth * 7,
        this,
        "white"
      )
    );
    this.black.push(
      new Bishop(
        squareWidth / 2 + squareWidth * 2,
        squareWidth / 2,
        this,
        "black"
      )
    );
    this.black.push(
      new Bishop(
        squareWidth / 2 + squareWidth * 5,
        squareWidth / 2,
        this,
        "black"
      )
    );
    this.boardState[0][2] = {
      piece: "B",
      colour: "black",
    };
    this.boardState[0][5] = {
      piece: "B",
      colour: "black",
    };
    this.boardState[7][2] = {
      piece: "B",
      colour: "white",
    };
    this.boardState[7][5] = {
      piece: "B",
      colour: "white",
    };

    // Knight
    this.white.push(
      new Knight(
        squareWidth / 2 + squareWidth * 1,
        squareWidth / 2 + squareWidth * 7,
        this,
        "white"
      )
    );
    this.white.push(
      new Knight(
        squareWidth / 2 + squareWidth * 6,
        squareWidth / 2 + squareWidth * 7,
        this,
        "white"
      )
    );
    this.black.push(
      new Knight(
        squareWidth / 2 + squareWidth * 1,
        squareWidth / 2,
        this,
        "black"
      )
    );
    this.black.push(
      new Knight(
        squareWidth / 2 + squareWidth * 6,
        squareWidth / 2,
        this,
        "black"
      )
    );
    this.boardState[0][1] = {
      piece: "N",
      colour: "black",
    };
    this.boardState[0][6] = {
      piece: "N",
      colour: "black",
    };
    this.boardState[7][1] = {
      piece: "N",
      colour: "white",
    };
    this.boardState[7][6] = {
      piece: "N",
      colour: "white",
    };

    // Rook
    this.white.push(
      new Rook(
        squareWidth / 2,
        squareWidth / 2 + squareWidth * 7,
        this,
        "white"
      )
    );
    this.white.push(
      new Rook(
        squareWidth / 2 + squareWidth * 7,
        squareWidth / 2 + squareWidth * 7,
        this,
        "white"
      )
    );
    this.black.push(new Rook(squareWidth / 2, squareWidth / 2, this, "black"));
    this.black.push(
      new Rook(
        squareWidth / 2 + squareWidth * 7,
        squareWidth / 2,
        this,
        "black"
      )
    );
    this.boardState[0][0] = {
      piece: "R",
      colour: "black",
    };
    this.boardState[0][7] = {
      piece: "R",
      colour: "black",
    };
    this.boardState[7][0] = {
      piece: "R",
      colour: "white",
    };
    this.boardState[7][7] = {
      piece: "R",
      colour: "white",
    };

    // Queen
    this.white.push(
      new Queen(
        squareWidth / 2 + squareWidth * 3,
        squareWidth / 2 + squareWidth * 7,
        this,
        "white"
      )
    );
    this.black.push(
      new Queen(
        squareWidth / 2 + squareWidth * 4,
        squareWidth / 2,
        this,
        "black"
      )
    );
    this.boardState[0][4] = {
      piece: "Q",
      colour: "black",
    };
    this.boardState[7][3] = {
      piece: "Q",
      colour: "white",
    };

    // King
    this.white.push(
      new King(
        squareWidth / 2 + squareWidth * 4,
        squareWidth / 2 + squareWidth * 7,
        this,
        "white"
      )
    );
    this.black.push(
      new King(
        squareWidth / 2 + squareWidth * 3,
        squareWidth / 2,
        this,
        "black"
      )
    );
    this.boardState[0][3] = {
      piece: "K",
      colour: "black",
    };
    this.boardState[7][4] = {
      piece: "K",
      colour: "white",
    };
  }

  nextTurn() {
    if (board.currentTurn === "white") {
      board.currentTurn = "black";
      for (let piece of this.black) {
        piece.movedTwo = false;
      }
    } else {
      board.currentTurn = "white";
      for (let piece of this.white) {
        piece.movedTwo = false;
      }
    }
  }

  updateAndShow(mouseX, mouseY) {
    for (let piece of this.white) {
      piece.update(mouseX, mouseY);
      piece.show();
    }

    for (let piece of this.black) {
      piece.update(mouseX, mouseY);
      piece.show();
    }
  }

  updateMovesets() {
    for (let piece of this.white) {
      piece.updateMoveset();
    }

    for (let piece of this.black) {
      piece.updateMoveset();
    }
  }

  pressed(mouseX, mouseY) {
    for (let piece of this.white) {
      piece.pressed(mouseX, mouseY);
    }

    for (let piece of this.black) {
      piece.pressed(mouseX, mouseY);
    }
  }

  released() {
    for (let piece of this.white) {
      piece.released();
    }

    for (let piece of this.black) {
      piece.released();
    }
  }

  capture() {
    let capturer, captured;
    if (this.currentTurn === "white") {
      capturer = this.white;
      captured = this.black;
    } else {
      capturer = this.black;
      captured = this.white;
    }

    for (let i = 0; i < capturer.length; i++) {
      for (let j = 0; j < captured.length; j++) {
        let piece = capturer[i];
        let target = captured[j];
        if (piece.xGrid === target.xGrid && piece.yGrid === target.yGrid) {
          captured.splice(j, 1);
          return;
        }
      }
    }
  }
}

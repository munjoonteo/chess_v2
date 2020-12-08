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
        this.boardState[i][j] = new Piece(0, 0, null, "");
      }
    }
    this.currentTurn = "white";
    this.initialise();

    // Position of kings
    this.whiteKingX = 4;
    this.whiteKingY = 7;
    this.blackKingX = 3;
    this.blackKingY = 0;

    // If anyone is in check
    this.whiteInCheck = false;
    this.blackInCheck = false;
  }

  initialise() {
    // Pawns
    for (let i = 0; i < dimensions; i++) {
      let whitePawn = new Pawn(
        squareWidth / 2 + squareWidth * i,
        squareWidth / 2 + squareWidth * 6,
        this,
        "white"
      );
      let blackPawn = new Pawn(
        squareWidth / 2 + squareWidth * i,
        squareWidth / 2 + squareWidth,
        this,
        "black"
      );
      this.white.push(whitePawn);
      this.black.push(blackPawn);
      this.boardState[1][i] = blackPawn;
      this.boardState[6][i] = whitePawn;
    }

    // Bishop
    let whiteLBishop = new Bishop(
      squareWidth / 2 + squareWidth * 2,
      squareWidth / 2 + squareWidth * 7,
      this,
      "white"
    );

    let whiteRBishop = new Bishop(
      squareWidth / 2 + squareWidth * 5,
      squareWidth / 2 + squareWidth * 7,
      this,
      "white"
    );

    let blackLBishop = new Bishop(
      squareWidth / 2 + squareWidth * 2,
      squareWidth / 2,
      this,
      "black"
    );

    let blackRBishop = new Bishop(
      squareWidth / 2 + squareWidth * 5,
      squareWidth / 2,
      this,
      "black"
    );

    this.white.push(whiteLBishop);
    this.white.push(whiteRBishop);
    this.black.push(blackLBishop);
    this.black.push(blackRBishop);

    this.boardState[0][2] = blackLBishop;
    this.boardState[0][5] = blackRBishop;
    this.boardState[7][2] = whiteLBishop;
    this.boardState[7][5] = whiteRBishop;

    // Knight
    let whiteLKnight = new Knight(
      squareWidth / 2 + squareWidth * 1,
      squareWidth / 2 + squareWidth * 7,
      this,
      "white"
    );

    let whiteRKnight = new Knight(
      squareWidth / 2 + squareWidth * 6,
      squareWidth / 2 + squareWidth * 7,
      this,
      "white"
    );

    let blackLKnight = new Knight(
      squareWidth / 2 + squareWidth * 1,
      squareWidth / 2,
      this,
      "black"
    );

    let blackRKnight = new Knight(
      squareWidth / 2 + squareWidth * 6,
      squareWidth / 2,
      this,
      "black"
    );

    this.white.push(whiteLKnight);
    this.white.push(whiteRKnight);
    this.black.push(blackLKnight);
    this.black.push(blackRKnight);
    this.boardState[0][1] = blackLKnight;
    this.boardState[0][6] = blackRKnight;
    this.boardState[7][1] = whiteLKnight;
    this.boardState[7][6] = whiteRKnight;

    // Rook
    let whiteLRook = new Rook(
      squareWidth / 2,
      squareWidth / 2 + squareWidth * 7,
      this,
      "white"
    );

    let whiteRRook = new Rook(
      squareWidth / 2 + squareWidth * 7,
      squareWidth / 2 + squareWidth * 7,
      this,
      "white"
    );

    let blackLRook = new Rook(squareWidth / 2, squareWidth / 2, this, "black");

    let blackRRook = new Rook(
      squareWidth / 2 + squareWidth * 7,
      squareWidth / 2,
      this,
      "black"
    );

    this.white.push(whiteLRook);
    this.white.push(whiteRRook);
    this.black.push(blackLRook);
    this.black.push(blackRRook);
    this.boardState[0][0] = blackLRook;
    this.boardState[0][7] = blackRRook;
    this.boardState[7][0] = whiteLRook;
    this.boardState[7][7] = whiteRRook;

    // Queen
    let whiteQueen = new Queen(
      squareWidth / 2 + squareWidth * 3,
      squareWidth / 2 + squareWidth * 7,
      this,
      "white"
    );

    let blackQueen = new Queen(
      squareWidth / 2 + squareWidth * 4,
      squareWidth / 2,
      this,
      "black"
    );

    this.white.push(whiteQueen);
    this.black.push(blackQueen);
    this.boardState[0][4] = blackQueen;
    this.boardState[7][3] = whiteQueen;

    // King
    let whiteKing = new King(
      squareWidth / 2 + squareWidth * 4,
      squareWidth / 2 + squareWidth * 7,
      this,
      "white"
    );

    let blackKing = new King(
      squareWidth / 2 + squareWidth * 3,
      squareWidth / 2,
      this,
      "black"
    );
    this.white.push(whiteKing);
    this.black.push(blackKing);
    this.boardState[0][3] = blackKing;
    this.boardState[7][4] = whiteKing;
  }

  nextTurn() {
    if (this.currentTurn === "white") {
      this.currentTurn = "black";
      for (let piece of this.black) {
        piece.movedTwo = false;
      }
      this.whiteInCheck = false;
    } else {
      this.currentTurn = "white";
      for (let piece of this.white) {
        piece.movedTwo = false;
      }
      this.blackInCheck = false;
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
    for (let i = 0; i < this.white.length; i++) {
      if (this.white[i].captured) {
        this.white.splice(i, 1);
        return;
      }
    }

    for (let i = 0; i < this.black.length; i++) {
      if (this.black[i].captured) {
        this.black.splice(i, 1);
        return;
      }
    }
  }

  updateKings() {
    for (let piece of this.white) {
      if (piece.name === "K") {
        this.whiteKingX = piece.xGrid;
        this.whiteKingY = piece.yGrid;
      }
    }

    for (let piece of this.black) {
      if (piece.name === "K") {
        this.blackKingX = piece.xGrid;
        this.blackKingY = piece.yGrid;
      }
    }
  }
}
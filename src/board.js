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
    this.blackKingX = 4;
    this.blackKingY = 0;

    // If anyone is in check
    this.whiteInCheck = false;
    this.blackInCheck = false;

    // Used to restore a piece if it is captured with an illegal move
    this.recentCapture = null;

    this.checkmate = false;
    this.stalemate = false;
  }

  initialise() {
    // Pawns
    // for (let i = 0; i < dimensions; i++) {
    //   let whitePawn = new Pawn(
    //     squareWidth / 2 + squareWidth * i,
    //     squareWidth / 2 + squareWidth * 6,
    //     this,
    //     "white"
    //   );
    //   let blackPawn = new Pawn(
    //     squareWidth / 2 + squareWidth * i,
    //     squareWidth / 2 + squareWidth,
    //     this,
    //     "black"
    //   );
    //   this.white.push(whitePawn);
    //   this.black.push(blackPawn);
    //   this.boardState[1][i] = blackPawn;
    //   this.boardState[6][i] = whitePawn;
    // }

    // // Bishops
    // let whiteLBishop = new Bishop(
    //   squareWidth / 2 + squareWidth * 2,
    //   squareWidth / 2 + squareWidth * 7,
    //   this,
    //   "white"
    // );

    // let whiteRBishop = new Bishop(
    //   squareWidth / 2 + squareWidth * 5,
    //   squareWidth / 2 + squareWidth * 7,
    //   this,
    //   "white"
    // );

    // let blackLBishop = new Bishop(
    //   squareWidth / 2 + squareWidth * 2,
    //   squareWidth / 2,
    //   this,
    //   "black"
    // );

    // let blackRBishop = new Bishop(
    //   squareWidth / 2 + squareWidth * 5,
    //   squareWidth / 2,
    //   this,
    //   "black"
    // );

    // this.white.push(whiteLBishop);
    // this.white.push(whiteRBishop);
    // this.black.push(blackLBishop);
    // this.black.push(blackRBishop);

    // this.boardState[0][2] = blackLBishop;
    // this.boardState[0][5] = blackRBishop;
    // this.boardState[7][2] = whiteLBishop;
    // this.boardState[7][5] = whiteRBishop;

    // // Knights
    // let whiteLKnight = new Knight(
    //   squareWidth / 2 + squareWidth * 1,
    //   squareWidth / 2 + squareWidth * 7,
    //   this,
    //   "white"
    // );

    // let whiteRKnight = new Knight(
    //   squareWidth / 2 + squareWidth * 6,
    //   squareWidth / 2 + squareWidth * 7,
    //   this,
    //   "white"
    // );

    // let blackLKnight = new Knight(
    //   squareWidth / 2 + squareWidth * 1,
    //   squareWidth / 2,
    //   this,
    //   "black"
    // );

    // let blackRKnight = new Knight(
    //   squareWidth / 2 + squareWidth * 6,
    //   squareWidth / 2,
    //   this,
    //   "black"
    // );

    // this.white.push(whiteLKnight);
    // this.white.push(whiteRKnight);
    // this.black.push(blackLKnight);
    // this.black.push(blackRKnight);
    // this.boardState[0][1] = blackLKnight;
    // this.boardState[0][6] = blackRKnight;
    // this.boardState[7][1] = whiteLKnight;
    // this.boardState[7][6] = whiteRKnight;

    // // Rooks
    // let whiteLRook = new Rook(
    //   squareWidth / 2,
    //   squareWidth / 2 + squareWidth * 7,
    //   this,
    //   "white"
    // );

    // let whiteRRook = new Rook(
    //   squareWidth / 2 + squareWidth * 7,
    //   squareWidth / 2 + squareWidth * 7,
    //   this,
    //   "white"
    // );

    // let blackLRook = new Rook(squareWidth / 2, squareWidth / 2, this, "black");

    // let blackRRook = new Rook(
    //   squareWidth / 2 + squareWidth * 7,
    //   squareWidth / 2,
    //   this,
    //   "black"
    // );

    // this.white.push(whiteLRook);
    // this.white.push(whiteRRook);
    // this.black.push(blackLRook);
    // this.black.push(blackRRook);
    // this.boardState[0][0] = blackLRook;
    // this.boardState[0][7] = blackRRook;
    // this.boardState[7][0] = whiteLRook;
    // this.boardState[7][7] = whiteRRook;

    // Queens
    let whiteQueen = new Queen(
      squareWidth / 2 + squareWidth * 3,
      squareWidth / 2 + squareWidth * 7,
      this,
      "white"
    );

    let blackQueen = new Queen(
      squareWidth / 2 + squareWidth * 3,
      squareWidth / 2,
      this,
      "black"
    );

    this.white.push(whiteQueen);
    this.black.push(blackQueen);
    this.boardState[0][3] = blackQueen;
    this.boardState[7][3] = whiteQueen;

    // Kings
    let whiteKing = new King(
      squareWidth / 2 + squareWidth * 4,
      squareWidth / 2 + squareWidth * 7,
      this,
      "white"
    );

    let blackKing = new King(
      squareWidth / 2 + squareWidth * 4,
      squareWidth / 2,
      this,
      "black"
    );
    this.white.push(whiteKing);
    this.black.push(blackKing);
    this.boardState[0][4] = blackKing;
    this.boardState[7][4] = whiteKing;
  }

  nextTurn() {
    this.capture();
    this.setCheck();

    if (this.currentTurn === "white") {
      this.currentTurn = "black";
      for (let piece of this.black) {
        piece.movedTwo = false;
      }
    } else {
      this.currentTurn = "white";
      for (let piece of this.white) {
        piece.movedTwo = false;
      }
    }

    this.updateMovesets();
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
    if (this.isCheckmate()) return;

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

    this.checkmate = this.isCheckmate();
    this.stalemate = this.isStalemate();
  }

  capture() {
    // Remove any pieces marked as to be captured
    // Save the piece in recentCapture just in case it's an illegal move
    for (let i = 0; i < this.white.length; i++) {
      if (this.white[i].captured) {
        this.recentCapture = this.white[i];
        this.white.splice(i, 1);
        return;
      }
    }

    for (let i = 0; i < this.black.length; i++) {
      if (this.black[i].captured) {
        this.recentCapture = this.black[i];
        this.black.splice(i, 1);
        return;
      }
    }
  }

  setCheck() {
    // Is black or white currently in check
    let currWhite = false;
    let currBlack = false;

    for (let piece of this.white) {
      piece.updateMoveset();
      for (let move of piece.moveset) {
        if (move[0] == this.blackKingX && move[1] == this.blackKingY) {
          currBlack = true;
        }
      }
    }

    for (let piece of this.black) {
      piece.updateMoveset();
      for (let move of piece.moveset) {
        if (move[0] == this.whiteKingX && move[1] == this.whiteKingY) {
          currWhite = true;
        }
      }
    }

    this.blackInCheck = currBlack;
    this.whiteInCheck = currWhite;
  }

  moveIntoCheck(gridX, gridY) {
    // Check if a given king move results in the king moving into check
    let curr;
    if (this.currentTurn === "white") {
      curr = this.black;
    } else {
      curr = this.white;
    }

    for (let piece of curr) {
      for (let move of piece.moveset) {
        if (move[0] == gridX && move[1] == gridY) return true;
      }
    }

    return false;
  }

  stillInCheck(piece, finalX, finalY) {
    // True if not in check and moved a piece so that it's check
    // Or in check and still in check after move

    let isStillCheck = false;

    // Save original position
    let oldX = piece.originalX;
    let oldY = piece.originalY;

    // Save original board state
    let oldBoardState = [];
    for (let i = 0; i < dimensions; i++) {
      oldBoardState[i] = [];
      for (let j = 0; j < dimensions; j++) {
        oldBoardState[i][j] = this.boardState[i][j];
      }
    }

    // Move the piece to see if the current player is in check
    piece.movePiece(finalX, finalY);

    if (this.currentTurn === "white") {
      isStillCheck = this.blackInCheck;
    } else {
      isStillCheck = this.whiteInCheck;
    }

    // Move the piece back and restore the old board
    piece.movePiece(oldX, oldY);
    this.boardState = oldBoardState;

    // Restore the piece which was captured
    if (this.recentCapture != null && this.recentCapture.colour !== "") {
      if (this.recentCapture.colour === "white") {
        this.white.push(this.recentCapture);
      } else {
        this.black.push(this.recentCapture);
      }

      let restoreX = this.recentCapture.xGrid;
      let restoreY = this.recentCapture.yGrid;
      this.boardState[restoreY][restoreX] = this.recentCapture;

      this.recentCapture.captured = false;
      this.recentCapture = null;
    }

    piece.hasMoved = false;
    piece.movedTwo = false;
    piece.updateMoveset();

    return isStillCheck;
  }

  hasLegalMove() {
    let curr;
    if (this.currentTurn === "white") {
      curr = this.white;
    } else {
      curr = this.black;
    }
    
    let hasLegalMove = false;
    for (let piece of curr) {
      for (let move of piece.moveset) {
        let moveX = move[0] * squareWidth + squareWidth / 2;
        let moveY = move[1] * squareWidth + squareWidth / 2;
        if (!this.stillInCheck(piece, moveX, moveY)) {
          hasLegalMove = true;
        }
      }
    }

    return hasLegalMove;
  }

  isCheckmate() {
    let currInCheck;
    if (this.currentTurn === "white") {
      currInCheck = this.whiteInCheck;
    } else {
      currInCheck = this.blackInCheck;
    }

    return currInCheck && !this.hasLegalMove();
  }

  isStalemate() {
    let currInCheck;
    if (this.currentTurn === "white") {
      currInCheck = this.whiteInCheck;
    } else {
      currInCheck = this.blackInCheck;
    }

    if (!currInCheck && !this.hasLegalMove()) {
      return true;
    } else {
      return false;
    }
  }
}

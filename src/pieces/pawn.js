class Pawn extends Piece {
  constructor(x, y, board, colour) {
    super(x, y, board, colour);
    this.code = "\uf06f";
    this.name = "p";
  }

  updateMoveset() {
    let moveset = [];

    // Basic movement
    if (this.colour === "white" && this.yGrid != 0) {
      if (this.board.boardState[this.yGrid - 1][this.xGrid].colour === "") {
        // Forward 1
        moveset.push([this.xGrid, this.yGrid - 1]);
      }
      if (
        !this.hasMoved &&
        this.board.boardState[this.yGrid - 2][this.xGrid].colour === ""
      ) {
        //Forward 2
        moveset.push([this.xGrid, this.yGrid - 2]);
      }
    } else if (this.colour === "black" && this.yGrid != 7) {
      if (this.board.boardState[this.yGrid + 1][this.xGrid].colour === "") {
        //Forward 1
        moveset.push([this.xGrid, this.yGrid + 1]);
      }
      if (
        !this.hasMoved &&
        this.board.boardState[this.yGrid + 2][this.xGrid].colour === ""
      ) {
        //Forward 2
        moveset.push([this.xGrid, this.yGrid + 2]);
      }
    }

    // Capturing
    if (this.colour === "white" && this.yGrid != 0) {
      if (
        this.xGrid != 0 &&
        this.board.boardState[this.yGrid - 1][this.xGrid - 1].colour === "black"
      ) {
        // Left capture - piece not on left edge of board
        moveset.push([this.xGrid - 1, this.yGrid - 1]);
      }
      if (
        this.xGrid != 7 &&
        this.board.boardState[this.yGrid - 1][this.xGrid + 1].colour === "black"
      ) {
        // Right capture - piece not on right edge of board
        moveset.push([this.xGrid + 1, this.yGrid - 1]);
      }
    } else if (this.colour === "black" && this.yGrid != 7) {
      if (
        this.xGrid != 0 &&
        this.board.boardState[this.yGrid + 1][this.xGrid - 1].colour === "white"
      ) {
        // Left capture - piece not on left edge of board
        moveset.push([this.xGrid - 1, this.yGrid + 1]);
      }
      if (
        this.xGrid != 7 &&
        this.board.boardState[this.yGrid + 1][this.xGrid + 1].colour === "white"
      ) {
        // Right capture - piece not on right edge of board
        moveset.push([this.xGrid + 1, this.yGrid + 1]);
      }
    }

    // en Passant
    if (this.colour === "white" && this.yGrid != 0) {
      let target = this.board.boardState[this.yGrid][this.xGrid - 1];
      if (
        this.xGrid != 0 &&
        this.yGrid === 3 &&
        target.colour === "black" &&
        target.movedTwo
      ) {
        // Left en passant - piece not on left edge of board
        moveset.push([this.xGrid - 1, this.yGrid - 1]);
      }

      target = this.board.boardState[this.yGrid][this.xGrid + 1];
      if (
        this.xGrid != 7 &&
        this.yGrid === 3 &&
        target.colour === "black" &&
        target.movedTwo
      ) {
        // Right en passant - piece not on right edge of board
        moveset.push([this.xGrid + 1, this.yGrid - 1]);
      }
    } else if (this.colour === "black" && this.yGrid != 7) {
      let target = this.board.boardState[this.yGrid][this.xGrid - 1];
      if (
        this.xGrid != 0 &&
        this.yGrid === 4 &&
        target.colour === "white" &&
        target.movedTwo
      ) {
        // Left en passant - piece not on Left edge of board
        moveset.push([this.xGrid - 1, this.yGrid + 1]);
      }

      target = this.board.boardState[this.yGrid][this.xGrid + 1];
      if (
        this.xGrid != 7 &&
        this.yGrid === 4 &&
        target.colour === "white" &&
        target.movedTwo
      ) {
        // Right en passant - piece not on right edge of board
        moveset.push([this.xGrid + 1, this.yGrid + 1]);
      }
    }

    this.moveset = moveset;
  }

  promotion() {
    let modal = document.createElement("div");
    modal.setAttribute("class", "modal");

    let content = document.createElement("div");
    content.setAttribute("class", "modal-content");

    let words = document.createElement("div");
    words.setAttribute("class", "promote");
    words.innerText = "Promotion";

    let nButton = document.createElement("button");
    nButton.setAttribute("class", "button");
    nButton.innerText = "\uf06d";
    nButton.onclick = () => {
      this.board.promote(this, "N");
    };

    let bButton = document.createElement("button");
    bButton.setAttribute("class", "button");
    bButton.innerText = "\uf076";
    bButton.onclick = () => {
      this.board.promote(this, "B");
    };

    let rButton = document.createElement("button");
    rButton.setAttribute("class", "button");
    rButton.innerText = "\uF074";
    rButton.onclick = () => {
      this.board.promote(this, "R");
    };

    let qButton = document.createElement("button");
    qButton.setAttribute("class", "button");
    qButton.innerText = "\uf077";
    qButton.onclick = () => {
      this.board.promote(this, "Q");
    };

    content.appendChild(words);
    content.appendChild(nButton);
    content.appendChild(bButton);
    content.appendChild(rButton);
    content.appendChild(qButton);

    modal.appendChild(content);
    let stuff = document.body.getElementsByClassName("stuff");
    stuff[0].appendChild(modal);
  }
}

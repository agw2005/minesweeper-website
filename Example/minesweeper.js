let board = [];
let rows = 8;
let columns = 8;

let minesCount = 5;
let minesLocation = []; //Is the class of the tile, ex: "3-4" = [3][4]

let tilesClicked = 0; //Goal: Click all tiles except the one containing mines
let flagEnabled = false;

let gameOver = false;

window.onload = function () {
  startGame();
};

function setMines() {
  //Add coordinates (Ex: "3-4") that represents the tile's id then add it into the minesLocation array

  //For testing
  //   minesLocation.push("2-2");
  //   minesLocation.push("2-3");
  //   minesLocation.push("5-6");
  //   minesLocation.push("3-4");
  //   minesLocation.push("1-1");

  //Randomized
  let minesLeft = minesCount;
  while (minesLeft > 0) {
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * columns);
    let id = r.toString() + "-" + c.toString();

    if (!minesLocation.includes(id)) {
      minesLocation.push(id);
      minesLeft -= 1;
    }
  }
}

function startGame() {
  //Set the text of mines-count span into minesCount variable
  document.getElementById("mines-count").innerText = minesCount;

  //Set an event listener for when the flag button is pressed
  //When the "flag-button" is clicked, run setFlag()
  document.getElementById("flag-button").addEventListener("click", setFlag);

  setMines();

  //Populate the board
  for (let r = 0; r < rows; r++) {
    let row = [];

    for (let c = 0; c < columns; c++) {
      //Creates <div></div> into the HTML
      let tile = document.createElement("div");

      //Assign the class
      tile.id = r.toString() + "-" + c.toString();

      //Runs clickTile() everytime a tile is clicked
      tile.addEventListener("click", clickTile);

      //Append a tile into the board div
      document.getElementById("board").append(tile);

      //Push the tile into the row array
      row.push(tile);
    }
    //Push the row-array into the board
    board.push(row);
  }
  console.log(board);
}

function setFlag() {
  if (flagEnabled) {
    flagEnabled = false;
    document.getElementById("flag-button").style.backgroundColor = "lightgray";
  } else {
    flagEnabled = true;
    document.getElementById("flag-button").style.backgroundColor = "darkgray";
  }
}

function clickTile() {
  if (gameOver || this.classList.contains("tile-clicked")) {
    return;
  }

  let tile = this;

  //Clicking event when flagging is enabled
  if (flagEnabled) {
    if (tile.innerText == "") {
      tile.innerText = "🚩";
    } else if (tile.innerText == "🚩") {
      tile.innerText = "";
    }
    return;
  }

  //Reveal the mines if a tile with a mines is clicked
  if (minesLocation.includes(tile.id)) {
    gameOver = true;
    revealMines();
    return;
  }

  //If didnt hit a mine, check how many mines are nearby
  let coords = tile.id.split("-"); // "0-0" -> ["0", "0"]
  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);
  checkMine(r, c);
}

//Reveal the mines
function revealMines() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = board[r][c];
      if (minesLocation.includes(tile.id)) {
        tile.innerText = "💣";
        tile.style.backgroundColor = "red";
      }
    }
  }
}

function checkMine(r, c) {
  if (r < 0 || r >= rows || c < 0 || c >= columns) {
    return;
  }
  if (board[r][c].classList.contains("tile-clicked")) {
    return;
  }

  board[r][c].classList.add("tile-clicked");
  tilesClicked += 1;

  //Check if there is a mine relative to the tile that is pressed
  let minesFound = 0;

  //top 3
  minesFound += checkTile(r - 1, c - 1); //top left
  minesFound += checkTile(r - 1, c); //top
  minesFound += checkTile(r - 1, c + 1); //top right

  minesFound += checkTile(r, c - 1); //left
  minesFound += checkTile(r, c + 1); //right

  //bottom 3
  minesFound += checkTile(r + 1, c - 1); //bottom left
  minesFound += checkTile(r + 1, c); //bottom
  minesFound += checkTile(r + 1, c + 1); //bottom right

  if (minesFound > 0) {
    board[r][c].innerText = minesFound;
    board[r][c].classList.add("x" + minesFound.toString());
  } else {
    //top 3
    checkMine(r - 1, c - 1); //top left
    checkMine(r - 1, c); //top
    checkMine(r - 1, c + 1); //top right

    checkMine(r, c - 1); //left
    checkMine(r, c + 1); //right

    //bottom 3
    checkMine(r + 1, c - 1); //bottom left
    checkMine(r + 1, c); //bottom
    checkMine(r + 1, c + 1); //bottom right
  }
  if (tilesClicked == rows * columns - minesCount) {
    document.getElementById("mines-count").innerText = "Cleared";
    gameOver = true;
  }
}

function checkTile(r, c) {
  if (r < 0 || r >= rows || c < 0 || c >= columns) {
    return 0;
  }

  if (minesLocation.includes(r.toString() + "-" + c.toString())) {
    return 1;
  }
  return 0;
}

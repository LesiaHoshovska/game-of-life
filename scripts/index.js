const lifeArr = initializeGrids();
const deathArr = initializeGrids();
console.log(lifeArr);
console.log(deathArr);

function initializeGrids() {
  const initArr = [];
  for (let i = 0; i < 64; i++) {
    initArr.push([]);
    for (let j = 0; j < 64; j++) {
      initArr[i][j] = 0;
    }
  }

  return initArr;
}

function createField() {
  const rowNum = 64;
  const colNum = 64;
  const parentDiv = document.getElementById("gameField");
  const table = document.createElement("table");
  table.setAttribute("id", "gameTable");
  parentDiv.appendChild(table);
  for (let i = 0; i < rowNum; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < colNum; j++) {
      const td = document.createElement("td");
      td.setAttribute("id", i + "-" + j);
      td.setAttribute("class", "dead");
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
}

function fillCellsWithColor() {
  for (let i = 0; i < lifeArr.length; i++) {
    for (let j = 0; j < lifeArr[i].length; j++) {
      let live = Math.round(Math.random());
      if (live === 1) {
        let td = document.getElementById(i + "-" + j);
        td.setAttribute("class", "life");
        lifeArr[i][j] = 1;
      }
    }
  }
}

function updateView() {
  for (let i = 0; i < lifeArr.length; i++) {
    for (let j = 0; j < lifeArr[i].length; j++) {
      let td = document.getElementById(i + "-" + j);
      if (lifeArr[i][j] == 0) {
        td.setAttribute("class", "dead");
      } else {
        td.setAttribute("class", "life");
      }
    }
  }
}

function resetArr() {
  for (let i = 0; i < lifeArr.length; i++) {
    for (let j = 0; j < lifeArr[i].length; j++) {
      lifeArr[i][j] = deathArr[i][j];
      deathArr[i][j] = 0;
    }
  }
}

function computeNextGen() {
  for (var i = 0; i < lifeArr.length; i++) {
    for (var j = 0; j < lifeArr[i].length; j++) {
      applyRules(i, j);
    }
  }

  // copy NextGrid to grid, and reset nextGrid
  resetArr();
  // copy all 1 values to "live" in the table
  updateView();
}

// RULES
// Any live cell with fewer than two live neighbours dies, as if caused by under-population.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any live cell with more than three live neighbours dies, as if by overcrowding.
// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

function applyRules(row, col) {
  let numNeighbors = countNeighbors(row, col);
  if (lifeArr[row][col] === 1) {
    if (numNeighbors < 2) {
      deathArr[row][col] = 0;
    } else if (numNeighbors == 2 || numNeighbors == 3) {
      deathArr[row][col] = 1;
    } else if (numNeighbors > 3) {
      deathArr[row][col] = 0;
    }
  } else if (lifeArr[row][col] === 0) {
    if (numNeighbors === 3) {
      deathArr[row][col] = 1;
    }
  }
}

function countNeighbors(row, col) {
  let count = 0;

  if (row - 1 >= 0) {
    if (lifeArr[row - 1][col] == 1) count++;
  }
  if (row - 1 >= 0 && col - 1 >= 0) {
    if (lifeArr[row - 1][col - 1] == 1) count++;
  }
  if (row - 1 >= 0 && col + 1 < 64) {
    if (lifeArr[row - 1][col + 1] == 1) count++;
  }
  if (col - 1 >= 0) {
    if (lifeArr[row][col - 1] == 1) count++;
  }
  if (col + 1 < 64) {
    if (lifeArr[row][col + 1] == 1) count++;
  }
  if (row + 1 < 64) {
    if (lifeArr[row + 1][col] == 1) count++;
  }
  if (row + 1 < 64 && col - 1 >= 0) {
    if (lifeArr[row + 1][col - 1] == 1) count++;
  }
  if (row + 1 < 64 && col + 1 < 64) {
    if (lifeArr[row + 1][col + 1] == 1) count++;
  }
  return count;
}

function startGame() {}

window.onload = function () {
  createField();
  initializeGrids();
  fillCellsWithColor();
  window.setInterval(() => {
    computeNextGen();
  }, 1000);
};

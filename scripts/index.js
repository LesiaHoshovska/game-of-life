const initCoordinatesArr = generateCellCoordinates();
// const futherGenCoord = generateCellCoordinates();

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

      td.setAttribute("id", i + 1 + "" + (j + 1));
      td.setAttribute("class", "dead");
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
}

function generateCellCoordinates() {
  const cellNum = parseInt(document.getElementById("userCellNumber").value);
  // console.log(cellNum);
  const initCoordinateArr = [];
  for (let i = 0; i < cellNum; i++) {
    const coordinate = {};
    const x = 1 + Math.floor(Math.random() * 64);
    coordinate.x = x;
    const y = 1 + Math.floor(Math.random() * 64);
    coordinate.y = y;
    // console.log(coordinate);
    initCoordinateArr.push(coordinate);
  }
  return initCoordinateArr;
}

function fillCellsWithColor() {
  for (let i = 0; i < initCoordinatesArr.length; i++) {
    let coordinate =
      String(initCoordinatesArr[i].x) + String(initCoordinatesArr[i].y);
    let liveCell = document.getElementById(coordinate);
    liveCell.setAttribute("class", "life");
  }
}

function playGame(coordinateArr) {
  const arr = [];
  for (let i = 0; i < coordinateArr.length; i++) {
    let coordinate = parseInt(
      String(coordinateArr[i].x) + String(coordinateArr[i].y)
    );
    arr.push(coordinate);
  }
  console.log(arr);
  const neighborsCountArr = [];
  for (let i = 0; i < arr.length; i++) {
    const cellNeighbor = arr.reduce((sum, currentVal) => {
      if (Math.abs(currentVal - arr[i]) === 1) {
        sum++;
      }
      return sum;
    });
    neighborsCountArr.push(cellNeighbor);
  }
  console.log(neighborsCountArr);
  return neighborsCountArr;
}

function startGame() {
  fillCellsWithColor();
  // window.setInterval(() => {
  //   playGame();
  // }, 1000);
  updateCell(initCoordinatesArr);
}

window.onload = function () {
  createField();
};

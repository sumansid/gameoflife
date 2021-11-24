const canvas = document.querySelector("canvas");
const clearBtn = document.getElementById("clearBtn");
const startBtn = document.getElementById("startBtn");
const endBtn = document.getElementById("endBtn");
const context = canvas.getContext("2d");
const block = 40;
canvas.width = 800;
canvas.height = 800;
const ROW = canvas.width / block;
const COL = canvas.height / block;
let stopped = false;

function buildGrid(){
    const grid = [];

    for (let y = 0; y < ROW; y++) {
        var col = []
        for (let x = 0; x < COL; x++) {
            col.push(0)
        }
        grid.push(col);
    }
    return grid;
}



function update() {
    if (isCanvasBlank(grid) || stopped == true) {
        stopped = true;
        clearGrid()
    }
    if (stopped == false){
        grid = nextGen(grid);
        plotGrid(grid);
        setTimeout(() => {  console.log(); }, 3000);
        requestAnimationFrame(update);
    }  
}


canvas.addEventListener("click", evt => {
  
  const tileX = ~~(evt.offsetX / block);
  const tileY = ~~(evt.offsetY / block);
  console.log("clicked ", tileX, tileY);
  grid[tileX][tileY] = grid[tileX][tileY] ? 0 : 1;
  console.log(grid);

  plotGrid(grid);

});

clearBtn.onclick = function(){
    console.log("cleared")
    clearGrid()  
}

startBtn.onclick = function(){
    stopped = false;
    if (isCanvasBlank(grid)) {
        stopped = true
        clearGrid()
        
    }
    if (stopped == false) {
        requestAnimationFrame(update);
    }     
}

endBtn.onclick = function(){
    stopped = true;
}

function nextGen(grid) {
  const nextGen = grid.map(arr => [...arr]);

  for (let col = 0; col < grid.length; col++) {
    for (let row = 0; row < grid[col].length; row++) {
      const cell = grid[col][row];
      let numNeighbours = 0;
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          if (i === 0 && j === 0) {
            continue;
          }
          const x_cell = col + i;
          const y_cell = row + j;

          if (x_cell >= 0 && y_cell >= 0 && x_cell < COL && y_cell < ROW) {
            const currentNeighbour = grid[col + i][row + j];
            numNeighbours += currentNeighbour;
          }
        }
      }
      if (cell === 1 && numNeighbours < 2) {
        nextGen[col][row] = 0;
      } else if (cell === 1 && numNeighbours > 3) {
        nextGen[col][row] = 0;
      } else if (cell === 0 && numNeighbours === 3) {
        nextGen[col][row] = 1;
      }
    }
  }
  return nextGen;
}


function plotGrid(grid){
       for (let i = 0; i < ROW; i++) {
        for (let j = 0; j < COL; j++) {
            const cell = grid[i][j];
            context.beginPath();
            context.rect(i * block, j* block, block, block);
            context.fillStyle = cell ? "black" : "white";
            context.fill();
            context.stroke();
        }
    }
}

function nextSteps() {
    let newGrid = grid;
    for (let i = 0; i < alive_idx.length(); i++) {
        console.log(alive_idx[i])
    } 
}

grid = buildGrid();
plotGrid(grid);


function isCanvasBlank(grid) {
  
  const arr = grid;
  const result = arr.flat().reduce((a,b) => a+b);

  console.log(result);
  return result==0;
}



function clearGrid(){
    let newGrid = buildGrid();
    grid = newGrid;
    plotGrid(newGrid);
}



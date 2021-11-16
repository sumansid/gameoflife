const canvas = document.querySelector("canvas");
const clearBtn = document.getElementById("clearBtn");
const context = canvas.getContext("2d");
const block = 40;
canvas.width = 400;
canvas.height = 400;
const ROW = canvas.width / block;
const COL = canvas.height / block;

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

let grid = buildGrid();
console.log(grid)

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

plotGrid(grid);

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
    let newGrid = buildGrid();
    grid = newGrid;
    plotGrid(newGrid);
}

const cellElements = document.querySelectorAll('[data-cell]')

class Cell {
    constructor(x, y,html_number,value) {
        this.x = x;
        this.y = y;
        this.html_number = html_number;
        this.value = value;
    }
}

let cellCoordinates =[];

for(let i = 0; i<=3; i++) {
    for(let j =0; j<=3; j++){
        cellCoordinates[ 4*i +j ] = new Cell(j, i, 4*i +j, '')
    }
}

console.log(cellCoordinates)


startGame()


function startGame() {
    spawningNumbers()
    handleArrowKeys()
    //checking for win
    //checking for lose
}


function handleArrowKeys() {
    document.addEventListener("keydown", function(event) {
        event.preventDefault();
        const key = event.key; 
        switch (key) { 
          case "ArrowLeft":
            movingRowColumn('x','y','backwards')
            spawningNumbers()
            break;
          case "ArrowRight":
            movingRowColumn('x','y','forward')
            spawningNumbers()
            break;
          case "ArrowUp":
            movingRowColumn('y','x','backwards')
            spawningNumbers()
            break;
          case "ArrowDown":
            movingRowColumn('y','x','forward')
            spawningNumbers()
            break;
        }
      });
}

function parsingValues() {
    let cellNumber=0;
    cellCoordinates.forEach(cell => {
        cellElements[cellNumber].innerHTML = String(cellCoordinates[cellNumber].value);
        cellNumber++;
    })
}

function spawningNumbers() {
    let cellNumber = 0;
    let freeCells = []
    cellCoordinates.forEach(cell => {
        if(cell.value == '') {
            freeCells.push(cellNumber)
        } 
        ++cellNumber
        
    })

    let randomCell =Math.floor(Math.random()* freeCells.length) 
    let randomNumber = Math.floor(Math.random()* 5)

    if(randomNumber == 1) {
        cellCoordinates[freeCells[randomCell]].value = '4';
        console.log(randomCell)
    } 
    else {
        cellCoordinates[freeCells[randomCell]].value = '2'; 
        }
    freeCells =[]
    parsingValues()
}


function movingRowColumn(axis1,axis2,direction) {
    console.log('function passed')
    if(direction == 'forward') {
        console.log('if forward passed')
        for(let i = 2; i>=0; i--) {
            for(let j=0; j<=3; j++) {
                let cell = cellCoordinates.find(cell => (cell[axis1] == i && cell[axis2] == j))
                let nextCell = cellCoordinates.find(nextCell => (nextCell[axis1] > i && nextCell[axis2] == j && nextCell.value.length != 0))
                if(typeof(nextCell) == 'undefined') {
                    nextCell = cellCoordinates.find(nextCell => (nextCell[axis1] == 3 && nextCell[axis2] ==j))
                }
                let nextCellPos = nextCell[axis1]
                console.log(cell)
                console.log(nextCell)
                if(!(cell.value.length == 0)) { 
                    if(nextCell.value == '') {
                        nextCell.value = cell.value;
                        cell.value = '';
                    }
                    else if(cell.value == nextCell.value) {
                        nextCell.value = String(Number(nextCell.value) *2)
                        cell.value = '';
                    }
                    else {
                        nextCell = cellCoordinates.find(nextCell => (nextCell[axis1] == nextCellPos -1 && nextCell[axis2] ==j))
                        if(nextCell.value != cell.value) {
                            nextCell.value = cell.value;
                            cell.value = '';
                        }
                    }
                    
                }
            }
    
        }
    }
    if(direction == 'backwards') {
        console.log('if backwards passed')
        for(let i = 1; i<=3; i++) {
            for(let j=0; j<=3; j++) {
                let cell = cellCoordinates.find(cell => (cell[axis1] == i && cell[axis2] == j))
                let nextCell = cellCoordinates.find(nextCell => (nextCell[axis1] < i && nextCell[axis2] == j && nextCell.value.length != 0))
                if(typeof(nextCell) == 'undefined') {
                    nextCell = cellCoordinates.find(nextCell => (nextCell[axis1] == 0 && nextCell[axis2] ==j))
                }
                let nextCellPos = nextCell[axis1]
                console.log(cell)
                console.log(nextCell)
                if(!(cell.value.length == 0)) { 
                    if(nextCell.value == '') {
                        nextCell.value = cell.value;
                        cell.value = '';
                    }
                    else if(cell.value == nextCell.value) {
                        nextCell.value = String(Number(nextCell.value) *2)
                        cell.value = '';
                    }
                    else {
                        nextCell = cellCoordinates.find(nextCell => (nextCell[axis1] == nextCellPos +1 && nextCell[axis2] ==j))
                        if(nextCell.value != cell.value) {
                            nextCell.value = cell.value;
                            cell.value = '';
                        }
                    }
                    
                }
            }
    
        }
    }
    parsingValues()
}


   

    



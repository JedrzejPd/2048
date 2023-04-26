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

startGame()

function startGame() {
    spawningNumbers()
    handleArrowKeys()
    checkingIfWin()
    //checking for lose
}

function handleArrowKeys() {
    document.addEventListener("keydown", function(event) {
        event.preventDefault();
        const key = event.key; 
        switch (key) { 
          case "ArrowLeft":
            movingNumbers('x','y','backwards')
            break;
          case "ArrowRight":
            movingNumbers('x','y','forward')
            break;
          case "ArrowUp":
            movingNumbers('y','x','backwards')
            break;
          case "ArrowDown":
            movingNumbers('y','x','forward')
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
        cellElements[cellCoordinates[freeCells[randomCell]].html_number].classList.add('n4')
    } 
    else {
        cellCoordinates[freeCells[randomCell]].value = '2';
        cellElements[cellCoordinates[freeCells[randomCell]].html_number].classList.add('n2') 
        }
    freeCells =[]
    parsingValues()
}


function movingNumbers(axis1,axis2,direction) {
    let moveCounter = 0;
    const increment = direction == 'forward' ? -1 : 1;
    const lastCell = direction == 'forward' ? 3 : 0;
    const startColumn = direction == 'forward' ? 2 : 1;
    const stopColumn = direction == 'forward' ? 0 : 3;
    for(let i = startColumn; i * increment <= stopColumn; i += increment) {
        for(let j=0; j<=3; j++) {
            let cell = cellCoordinates.find(cell => (cell[axis1] == i && cell[axis2] == j))
            let currentRow = cellCoordinates.filter((entry) => entry[axis2] == j)
            if (direction == 'backwards')
                currentRow.sort((a, b) => b[axis1] - a[axis1])
            let nextCell = currentRow.find(nextCell => (nextCell[axis1] * increment < i * increment && (nextCell.value || nextCell[axis1] == lastCell)))
            let nextCellPos = nextCell[axis1]
            if(!cell.value)
                continue
            if (nextCell.value && cell.value != nextCell.value) {
                nextCell = currentRow.find(nextCell => (nextCell[axis1] == (nextCellPos + increment)));
            }
            if (nextCell == cell) continue
            let newValue = cell.value;
            if (cell.value == nextCell.value) {
                newValue = String(Number(nextCell.value) * 2);
            }
            cellElements[nextCell.html_number].classList.remove('n'+String(nextCell.value));
            nextCell.value = newValue;
            cellElements[nextCell.html_number].classList.add('n'+String(nextCell.value));
            cellElements[cell.html_number].classList.remove('n'+String(cell.value));
            cell.value = '';
            moveCounter++;
        }
    }

    parsingValues()
    if(moveCounter !=0) {spawningNumbers()}
} 

function checkingIfWin() {
    if(cellCoordinates.value = '2048') {

    }

}


   

    



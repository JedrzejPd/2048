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
    if(direction == 'forward') {
        for(let i = 2; i>=0; i--) {
            for(let j=0; j<=3; j++) {
                let cell = cellCoordinates.find(cell => (cell[axis1] == i && cell[axis2] == j))
                let nextCell = cellCoordinates.find(nextCell => (nextCell[axis1] > i && nextCell[axis2] == j && nextCell.value.length != 0))
                if(typeof(nextCell) == 'undefined') {
                    nextCell = cellCoordinates.find(nextCell => (nextCell[axis1] == 3 && nextCell[axis2] ==j))
                }
                let nextCellPos = nextCell[axis1]
                if(!(cell.value.length == 0)) { 
                    if(nextCell.value == '') {
                        cellElements[nextCell.html_number].classList.remove('n'+String(nextCell.value));
                        nextCell.value = cell.value;
                        cellElements[nextCell.html_number].classList.add('n'+String(nextCell.value));
                        cellElements[cell.html_number].classList.remove('n'+String(cell.value));
                        cell.value = '';
                        moveCounter++;
                    }
                    else if(cell.value == nextCell.value) {
                        cellElements[nextCell.html_number].classList.remove('n'+String(nextCell.value));
                        nextCell.value = String(Number(nextCell.value) *2)
                        cellElements[nextCell.html_number].classList.add('n'+String(nextCell.value));
                        cellElements[cell.html_number].classList.remove('n'+String(cell.value));
                        cell.value = '';
                        moveCounter++;
                    }
                    else {
                        nextCell = cellCoordinates.find(nextCell => (nextCell[axis1] == (nextCellPos-1) && nextCell[axis2] ==j))
                        if(nextCell.value != cell.value) {
                            cellElements[nextCell.html_number].classList.remove('n'+String(nextCell.value));
                            nextCell.value = cell.value;
                            cellElements[nextCell.html_number].classList.add('n'+String(nextCell.value));
                            cellElements[cell.html_number].classList.remove('n'+String(cell.value));
                            cell.value = '';
                            moveCounter++;
                        }
                    }
                    
                }
            }
    
        }
    }
    if(direction == 'backwards') {
        for(let i = 1; i<=3; i++) {
            for(let j=0; j<=3; j++) {
                let cell = cellCoordinates.find(cell => (cell[axis1] == i && cell[axis2] == j))
                let nextCell = cellCoordinates.find(nextCell => (nextCell[axis1] < i && nextCell[axis2] == j && nextCell.value.length != 0))
                if(typeof(nextCell) == 'undefined') {
                    nextCell = cellCoordinates.find(nextCell => (nextCell[axis1] == 0 && nextCell[axis2] == j))
                }
                let nextCellPos = nextCell[axis1]
                if(!(cell.value.length == 0)) { 
                    if(nextCell.value == '') {
                        cellElements[nextCell.html_number].classList.remove('n'+String(nextCell.value));
                        nextCell.value = cell.value;
                        cellElements[nextCell.html_number].classList.add('n'+String(nextCell.value));
                        cellElements[cell.html_number].classList.remove('n'+String(cell.value));
                        cell.value = '';
                        moveCounter++;
                    }
                    else if(cell.value == nextCell.value) {
                        cellElements[nextCell.html_number].classList.remove('n'+String(nextCell.value));
                        nextCell.value = String(Number(nextCell.value) *2)
                        cellElements[nextCell.html_number].classList.add('n'+String(nextCell.value));
                        cellElements[cell.html_number].classList.remove('n'+String(cell.value));
                        cell.value = '';
                        moveCounter++;
                    }
                    else {
                        nextCell = cellCoordinates.find(nextCell => (nextCell[axis1] == (nextCellPos+1) && nextCell[axis2] ==j))
                        if(nextCell.value != cell.value) {
                            cellElements[nextCell.html_number].classList.remove('n'+String(nextCell.value));
                            nextCell.value = cell.value;
                            cellElements[nextCell.html_number].classList.add('n'+String(nextCell.value));
                            cellElements[cell.html_number].classList.remove('n'+String(cell.value));
                            cell.value = '';
                            moveCounter++;
                        }
                    }
                    
                }
            }
    
        }
    }

    parsingValues()
    if(moveCounter !=0) {spawningNumbers()}
} 

function checkingIfWin() {
    if(cellCoordinates.value = '2048') {

    }

}


   

    



const handleTextChanged = (event) => {
    const target = event.target;
    console.log('newText', target.value);
    window.xcv = event.target;
};

const handleButtonClicked = (event) => {
    const text = document.getElementById('text').value;
    console.log('clicked', text);
    console.log(isNaN(text));
};

function generateMatrix(size) {
    var matrix = [];
    for (let i=0;i<size;i++) {
        matrix[i] = [];
        for (let j=0;j<size;j++) {

            x = Math.floor(Math.random() + 0.5);
            matrix[i][j] = x;
        }
    }
    return matrix;
}

function fillWithBombs(matrixToFill,numberOfBombs) {
    var bombY = 0;
    var bombX = 0;
    var bombCounter = 0;
    var len = matrixToFill.length;
    var filledMatrix = generateMatrix(len+2);
    for (let i=0;i<len+2;i++) {
        for (let j=0;j<len+2;j++) {
            filledMatrix[i][j] = 0;
        }
    }
    while (bombCounter < numberOfBombs) {
        bombX = Math.floor(Math.random()*(len)+1);
        bombY = Math.floor(Math.random()*(len)+1);
        if (filledMatrix[bombX][bombY]===0) {
            filledMatrix[bombX][bombY] = 1;
            bombCounter++;
        }
    }
    /*for (let i=0;i<numberOfBombs;i++) {
        bombX = Math.floor(Math.random()*(len+2));
        bombY = Math.floor(Math.random()*(len+2));

        filledMatrix[bombX][bombY]=1;
    }*/
    return filledMatrix;
}

const isOnField = (x,y,size) => (0<x) && (x<size+1) && (0<y) && (y<size+1);

const hasWon = (bombslayer,field,numberofbombs) => {
    var counter = 0;
    var notBombs = 0;
    for (let i=1;i<bombslayer.length-1;i++) {
        for (let j=1;j<bombslayer.length-1;j++) {
            if (bombslayer[i][j] === 0){
                notBombs++;
                if (field[i][j].classList.contains("revealed")) {
                    console.log(counter);
                    counter++;
                }
            }
        }
    }
    if (counter == notBombs) {
        return true;
    }
};



function reveal(x,y,matrix,element) {
    var size = matrix.length;
    if (isOnField(x,y,size)) {
        if (!element[x][y].classList.contains("revealed")) {
            element[x][y].classList.add('revealed');

            console.log("yay");
            switch (matrix[x-1][y-1]) {
                case 0:
                    element[x][y].classList.add('neutral', 'zero');
                    element[x][y].innerText = 0;
                    reveal(x-1,y-1, matrix, element);
                    reveal(x,y-1, matrix, element);
                    reveal(x+1,y-1, matrix, element);

                    reveal(x-1,y, matrix, element);
                    reveal(x+1,y, matrix, element);

                    reveal(x-1,y+1, matrix, element);
                    reveal(x, y+1, matrix, element);
                    reveal(x+1,y+1, matrix, element);
                    break;
                case 1:
                    element[x][y].classList.add('neutral', 'one');
                    element[x][y].innerText = 1;
                    break;
                case 2:
                    element[x][y].classList.add('neutral', 'two');
                    element[x][y].innerText = 2;
                    break;
                case 3:
                    element[x][y].classList.add('neutral', 'three');
                    element[x][y].innerText = 3;
                    break;
                case 4:
                    element[x][y].classList.add('neutral', 'four');
                    element[x][y].innerText = 4;
                    break
                case 5:
                    element[x][y].classList.add('neutral', 'five');
                    element[x][y].innerText = 5;
                    break;
                case 6:
                    element[x][y].classList.add('neutral', 'six');
                    element[x][y].innerText = 6;
                    break;
                case 7:
                    element[x][y].classList.add('neutral', 'seven');
                    element[x][y].innerText = 7;
                    break;
                case 8:
                    element[x][y].classList.add('neutral', 'eight');
                    element[x][y].innerText = 8;
                    break;
                case 9:
                    element[x][y].classList.add('bomb');
                    break;
            }
        }
    }
}

function calculateAdjacent(matrix) {
    var size = matrix.length-2;
    var board= generateMatrix(size);

    for (let i=1; i<size+1; i++) {
        for (let j=1; j<size+1; j++) {
            k = matrix[i-1][j-1]+matrix[i-1][j]+matrix[i-1][j+1]+
                matrix[i][j-1]                 +matrix[i][j+1]+
                matrix[i+1][j-1]+matrix[i+1][j]+matrix[i+1][j+1];
            if (matrix[i][j]==0) {
                board[i-1][j-1] = k;
            } else {
                board[i-1][j-1] = 9;
            }
        }
    }
    return board;
}


/*
*const game = (size) => {

    var almafa = document.getElementById('almafa');
    var mezo = [];
    var field = generateMatrix(size);
    var bombsLayer = fillWithBombs(field,20);

    for(let i=0;i<bombsLayer.length;i++) {
        for(let j=0;j<bombsLayer.length;j++) {
            console.log(i,j, bombsLayer[i][j]);
        }

    }
    for(let i=1;i<bombsLayer.length-1;i++) {
        for(let j=1;j<bombsLayer.length-1;j++) {
            console.log(i,j, bombsLayer[i][j]);
        }

    }

    almafa.classList.add('table');
    for(let i=1;i<bombsLayer.length-1;i++) {
        mezo[i] = [];
        const row = document.createElement('div');
        almafa.append(row);
        row.classList.add('row');
        for(let j=1;j<bombsLayer.length-1;j++) {
            mezo[i][j] = document.createElement('div');
            mezo[i][j].classList.add('cell');
            row.append(mezo[i][j]);
            //mezo[i][j].innerText = bombsLayer[i][j];

            mezo[i][j].addEventListener('click', function(event) {
                mezo[i][j].innerText = bombsLayer[i][j];
            });
        }

    };
    console.log(mezo);
    field = calculateAdjacent(bombsLayer);
    console.log("field: ");
    console.log(field);
    console.log(isOnField(0,1,size));
    reveal(1,1,field,mezo[1][1]);
}
*/

document.addEventListener("DOMContentLoaded", function () {
    var almafa = document.getElementById('almafa');
    var resultField = document.getElementById('result');
    var mezo = [];
    var field = generateMatrix(5);
    var size = 6;
    var bombsLayer = fillWithBombs(field,6);
    var flag = document.createElement("img");
    flag.src = 'flag.png';

    almafa.classList.add('table');
    field = calculateAdjacent(bombsLayer);
    for(let i=1;i<bombsLayer.length-1;i++) {
        mezo[i] = [];
        const row = document.createElement('div');
        almafa.append(row);
        row.classList.add('row');
        for(let j=1;j<bombsLayer.length-1;j++) {
            mezo[i][j] = document.createElement('div');
            mezo[i][j].classList.add('cell');
            row.append(mezo[i][j]);
            //mezo[i][j].innerText = bombsLayer[i][j];

            mezo[i][j].addEventListener('click', function(event) {
                reveal(i,j,field,mezo);
                mezo[i][j].classList.add('revealed');
                if (mezo[i][j].classList.contains('bomb')) {
                    resultField.innerText = 'konyec';
                };
                if (hasWon(bombsLayer,mezo,20)) {
                    resultField.innerText = 'nyertel';
                };
            });

            mezo[i][j].addEventListener('contextmenu', function(event) {

                event.preventDefault();
                mezo[i][j].classList.add('flagged');
                //mezo[i][j].append(flag);

            });
        }

    };
    console.log(mezo);

    console.log("field: ");
    console.log(field);
    console.log(isOnField(0,1,size));
    //reveal(1,1,field,mezo[1][1]);
});
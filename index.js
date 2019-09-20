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
        if (filledMatrix[bombX][bombY]==0) {
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

document.addEventListener("DOMContentLoaded", function() {
    var almafa = document.getElementById('almafa');
    var mezo = [];
    var field = generateMatrix(6);
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

    for(let i=1;i<bombsLayer.length-1;i++) {
        mezo[i] = document.createElement('div');
        almafa.append(mezo[i]);
        for(let j=1;j<bombsLayer.length-1;j++) {
            mezo[i][j] = document.createElement('div');
            mezo[i][j].classList.add('mezo');
            mezo[i].append(mezo[i][j]);
            mezo[i][j].innerText = bombsLayer[i][j];
        }

    };

});
function handleMiddleClick(idx) {
    return function(event) {
        if(event.which === 2) {
            console.log(event, event.target);
            event.target.innerText = idx;
            event.target.classList.remove('zold');
            event.target.classList.remove('piros');
            event.target.classList.add('sarga');
        }
    };
}
/*
const handleMiddleClick = (idx) => (event) => {
    if(event.which === 2) {
        console.log(event, event.target);
        event.target.innerText = idx;
        event.target.classList.remove('zold');
        event.target.classList.remove('piros');
        event.target.classList.add('sarga');
    } else {

    }
};*/

function printArray(arrayName){
    var aLen = arrayName.length;
    for(let i=0;i<aLen;i++) {
        for(let j=0;j<aLen;j++) {
            console.log(arrayName[i][j])
        }
    }
    console.log("valami")
}
// var almafa = document.getElementById('almafa');
// almafa.innerText = '123';

document.addEventListener("DOMContentLoaded", function() {
    /*
    console.log('Your document is ready!');
    var almafa = document.getElementById('almafa');

    var elozoDoboz = almafa;
    for(let i=0;i<5;i++) {
        var doboz = document.createElement('div');
        doboz.style.border = '1px dashed blue';
        doboz.style.backgroundColor = 'fuchsia';
        doboz.style.padding = '5px';
        doboz.innerText = i;
        elozoDoboz.append(doboz);
        elozoDoboz = doboz;
    }
     */
    var szamok = [[1,2,3],[4,5,6],[7,8,9]];
    printArray(szamok);
    var almafa = document.getElementById('almafa');
    var mezo = [];
    window.mezo = mezo;
    for(let i=0;i<64;i++) {
        mezo[i] = document.createElement('div');
        mezo[i].classList.add('mezo');
        almafa.append(mezo[i]);

        mezo[i].addEventListener('click', function(event) {
            if(event.ctrlKey) {
                mezo[i].innerText = 'X';
            } else {
                mezo[i].innerText = i;
            }
            mezo[i].classList.remove('zold');
            mezo[i].classList.remove('sarga');
            mezo[i].classList.add('piros');
        });

        mezo[i].addEventListener('auxclick', handleMiddleClick(i));

        mezo[i].addEventListener('contextmenu', function(ev) {
            ev.preventDefault();
            mezo[i].innerText = i;
            mezo[i].classList.remove('piros');
            mezo[i].classList.remove('sarga');
            mezo[i].classList.add('zold');
        });
    }

});
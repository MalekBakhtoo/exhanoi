

const number = prompt('number of the blocks');

// coulmns

var c1 = document.getElementById('A');
var c2 = document.getElementById('B');
var c3 = document.getElementById('C');

// btns

const bstart = document.getElementById('start');
const bNext = document.getElementById('next');
const bstop = document.getElementById('stop');
const bcontinue = document.getElementById('continue');
const brestart = document.getElementById('restart');
const bgoto = document.getElementById('gotoEnd');




let diskes = [];
for (i = 0; i < 3 * number; i++) {
    let block = document.createElement("div");
    block.setAttribute('class', 'block');
    block.style.width = `calc(3rem + ${3 * number - i}rem`;
    diskes.push(block);
}

let diskc1 = [];
let diskc2 = [];
let diskc3 = [];

for (i = 3 * number - 1; i >= 0; i--) {
    if ((i) % 3 == 0) {
        c1.appendChild(diskes[i]);
        diskc1.push(diskes[i]);
    }
    if ((i - 1) % 3 == 0) {
        c2.appendChild(diskes[i]);
        diskc2.push(diskes[i]);
    }
    if ((i - 2) % 3 == 0) {
        c3.appendChild(diskes[i]);
        diskc3.push(diskes[i]);
    }
}

function move(c1Arr, c2Arr, to) {

    let block = c1Arr.shift();
    c2Arr.unshift(block);
    to.insertBefore(block, to.children[1]);
}

var moves = [];
function recordMove(f, e) {
    let name1 = f.id;
    let name2 = e.id;

    moves.push([name1, name2]);
}

function Hanoi(n, a, b, c) {
    if (n == 1) {
        recordMove(a, c);
    } else {
        Hanoi(n - 1, a, c, b);
        recordMove(a, c);
        Hanoi(n - 1, b, a, c);
    }
}

function exHanoi(n, a, b, c) {

    if (n == 1) {
        recordMove(c, b);
        recordMove(a, c);
        recordMove(b, a);
        recordMove(b, c);
        recordMove(a, c);
    } else {
        exHanoi(n - 1, a, b, c);
        Hanoi(3 * n - 2, c, a, b);
        recordMove(a, c);
        Hanoi(3 * n - 1, b, a, c);
    }
}

var counter = 0;

function blockSetter(movesArr, c1Arr, c2Arr, c3Arr, coul1, coul2, coul3) {

    if (movesArr[counter][0] == 'A' && movesArr[counter][1] == 'B') {
        move(c1Arr, c2Arr, coul2);
    }
    else if (movesArr[counter][0] == 'A' && movesArr[counter][1] == 'C') {
        move(c1Arr, c3Arr, coul3);
    }
    else if (movesArr[counter][0] == 'B' && movesArr[counter][1] == 'A') {
        move(c2Arr, c1Arr, coul1);
    }
    else if (movesArr[counter][0] == 'B' && movesArr[counter][1] == 'C') {
        move(c2Arr, c3Arr, coul3);
    }
    else if (movesArr[counter][0] == 'C' && movesArr[counter][1] == 'B') {
        move(c3Arr, c2Arr, coul2);
    }
    else if (movesArr[counter][0] == 'C' && movesArr[counter][1] == 'A') {
        move(c3Arr, c1Arr, coul1);
    }
    // event handling
    if (counter == moves.length - 1) {
        bNext.disabled = true;
        bstart.disabled = true;

    }
    counter++;
}

var pause = false;
function timingBlockSetter() {
    var interval = setInterval(() => {
        if (!pause) {
            blockSetter(moves, diskc1, diskc2, diskc3, c1, c2, c3);
            if (counter >= moves.length) {
                clearInterval(interval);
            }
        }
    }, 2000)
}
/// calc moves 
exHanoi(number, c1, c2, c3);
console.log(moves);

// btn events 

bstart.addEventListener("click", () => timingBlockSetter());
bNext.addEventListener('click', () => blockSetter(moves, diskc1, diskc2, diskc3, c1, c2, c3));
bstop.addEventListener('click', () => pause = true);
bcontinue.addEventListener('click', () => pause = false);
brestart.addEventListener('click' , () => location.reload());
bgoto.addEventListener('click' , () => {
    for ( i= diskes.length -1 ; i>=0 ; i--){
        c3.appendChild(diskes[i]);
    }
});
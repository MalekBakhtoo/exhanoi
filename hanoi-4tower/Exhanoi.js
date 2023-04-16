document.body.style.zoom = "67%";
const number = prompt('number of the blocks');

// coulmns

var c1 = document.getElementById('A');
var c2 = document.getElementById('B');
var c3 = document.getElementById('C');
var c4 = document.getElementById('D');


// btns

const bstart = document.getElementById('start');
const bNext = document.getElementById('next');
const bstop = document.getElementById('stop');
const bcontinue = document.getElementById('continue');
const brestart = document.getElementById('restart');
const bgoto = document.getElementById('gotoEnd');


const diskesW = [];
const diskesB = [];


for (i = 0; i < number; i++) {
    let block = document.createElement("div");
    block.setAttribute('class', 'blockW');
    block.style.width = `calc(3rem + ${3 * number - i}rem`;
    diskesW.push(block);
    let block1 = document.createElement("div");
    block1.setAttribute('class', 'blockB');
    block1.style.width = `calc(3rem + ${3 * number - i}rem`;
    diskesB.push(block1);
}

const diskc1 = [];
const diskc2 = [];
const diskc3 = [];
const diskc4 = [];

for (i = number - 1; i >= 0; i--) {

    c1.appendChild(diskesW[i]);
    diskc1.push(diskesW[i]);
    c3.appendChild(diskesB[i]);
    diskc3.push(diskesB[i]);

}

function move(c1Arr, c2Arr, to) {

    let block = c1Arr.shift();
    c2Arr.unshift(block);
    to.insertBefore(block, to.children[1]);
    
}

var fmoves = [];
var smoves = [];
var thmoves = [];

function recordMove(f, e, arr) {
    let name1 = f.id;
    let name2 = e.id;

    arr.push([name1, name2]);
}


function Hanoi(n, a, b, c, arr) {
    if (n == 1) {
        recordMove(a, c, arr);
    } else {
        Hanoi(n - 1, a, c, b, arr);
        recordMove(a, c, arr);
        Hanoi(n - 1, b, a, c, arr);
    }
}
let moves = [];

function exHanoi(number, c1, c2, c3, c4, moves) {
    Hanoi(number, c1, c2, c4, moves);
    Hanoi(number, c3, c2, c1, moves);
    Hanoi(number, c4, c2, c3, moves);
}
exHanoi(number, c1, c2, c3, c4, moves);

console.log(moves);
var counter = 0;

function blockSetter(movesArr, c1Arr, c2Arr, c3Arr, c4Arr, coul1, coul2, coul3, coul4) {

    if (movesArr[counter][0] == 'A' && movesArr[counter][1] == 'B') {
        move(c1Arr, c2Arr, coul2);
    }
    else if (movesArr[counter][0] == 'A' && movesArr[counter][1] == 'C') {
        move(c1Arr, c3Arr, coul3);
    }
    else if (movesArr[counter][0] == 'A' && movesArr[counter][1] == 'D') {
        move(c1Arr, c4Arr, coul4);
    }
    else if (movesArr[counter][0] == 'B' && movesArr[counter][1] == 'A') {
        move(c2Arr, c1Arr, coul1);
    }
    else if (movesArr[counter][0] == 'B' && movesArr[counter][1] == 'C') {
        move(c2Arr, c3Arr, coul3);
    }
    else if (movesArr[counter][0] == 'B' && movesArr[counter][1] == 'D') {
        move(c2Arr, c4Arr, coul4);
    }
    else if (movesArr[counter][0] == 'C' && movesArr[counter][1] == 'B') {
        move(c3Arr, c2Arr, coul2);
    }
    else if (movesArr[counter][0] == 'C' && movesArr[counter][1] == 'A') {
        move(c3Arr, c1Arr, coul1);
    }
    else if (movesArr[counter][0] == 'C' && movesArr[counter][1] == 'D') {
        move(c3Arr, c4Arr, coul4);
    }
    else if (movesArr[counter][0] == 'D' && movesArr[counter][1] == 'A') {
        move(c4Arr, c1Arr, coul1);
    }
    else if (movesArr[counter][0] == 'D' && movesArr[counter][1] == 'B') {
        move(c4Arr, c2Arr, coul2);
    }
    else if (movesArr[counter][0] == 'D' && movesArr[counter][1] == 'C') {
        move(c4Arr, c3Arr, coul3);
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
            blockSetter(moves, diskc1, diskc2, diskc3, diskc4, c1, c2, c3, c4);
            if (counter >= moves.length) {
                clearInterval(interval);
            }
        }
    }, 1000)
}
// btn events 

bstart.addEventListener("click", () => timingBlockSetter());
bNext.addEventListener('click', () => blockSetter(moves, diskc1, diskc2, diskc3,diskc4, c1, c2, c3, c4));
bstop.addEventListener('click', () => pause = true);
bcontinue.addEventListener('click', () => pause = false);
brestart.addEventListener('click', () => location.reload());
bgoto.addEventListener('click', () => {
    for (i = diskes.length - 1; i >= 0; i--) {
        c3.appendChild(diskes[i]);
    }
});


//animation moves


// function goanimated(block, to) {

//     let pos = 3;
//     block.style.backgroundColor = 'rgb(163, 30, 10)';
//     var loop = setInterval(() => {
//         if (pos == 100) {
//             clearInterval(loop);
//             to.insertBefore(block, to.children[1]);
//             godownanimated(block)

//         } else {
//             pos++;
//             block.style.marginBottom = pos + 'px';

//         }
//     }, 10);

// }
// function godownanimated(block) {
//     let pos = 100;
//     var looper = setInterval(() => {
//         if (pos == 3) {
//             clearInterval(looper);
//             block.style.backgroundColor = 'rgb(41, 26, 202';
//             if (counter == moves.length - 1) {
//                 document.getElementsByTagName('body')[0].style.backgroundColor = 'rgb(50, 167, 11)';
//             }
//         } else {
//             pos--;
//             block.style.marginBottom = pos + 'px';
//         }
//     }, 10);
// }





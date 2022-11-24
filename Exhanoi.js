

const number = prompt('number of the blocks');

var c1 = document.getElementById('A');
var c2 = document.getElementById('B');
var c3 = document.getElementById('C');

const bstart = document.getElementById('start');



let diskes = [];
for (i = 0; i < 3 * number; i++) {
    let block = document.createElement("div");
    block.setAttribute('class', 'block');
    block.style.width = `calc(3rem + ${3 * number - i}rem`;
    //block.setAttribute('width', '`calc(3rem + ${number - i}rem`');
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


function move(c1Arr,c2Arr, to) {

    let block = c1Arr.shift();
    c2Arr.push(block);
    to.insertBefore(block);
}

var moves = [];
function recordMove ( f , e){
    let name1 = f.id;
    let name2 = e.id;

    moves.push([name1 , name2]);
}



function Hanoi(n ,a , b ,c ) {
    if (n == 1) {
        recordMove(a, c);
    } else {
        Hanoi(n - 1 , a , c ,b);
        recordMove(a, c);
        Hanoi(n - 1 ,b, a , c);
    }
}

function exHanoi(n , a , b , c ) {

    if (n == 1) {
        recordMove(c, b);
        recordMove(a, c);
        recordMove(b, a);
        recordMove(b, c);
        recordMove(a, c);
    } else {
        exHanoi(n - 1 , a , b ,c);
        Hanoi(3 * n - 2 ,c , a ,b);
        recordMove(a, c);
        Hanoi(3 * n - 1 , b , a ,c);
        console.log(moves)
    }
}
bstart.addEventListener("click", () => exHanoi(number , c1 , c2 ,c3));


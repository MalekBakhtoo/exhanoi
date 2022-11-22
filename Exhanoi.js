const number = prompt('number of the blocks');

const c1 = document.getElementById('A');
const c2 = document.getElementById('B');
const c3 = document.getElementById('C');

const bstart = document.getElementById('start');



let diskes = [];
for (i = 0; i < 3 * number; i++) {
    let block = document.createElement("div");
    block.setAttribute('class', 'block');
    block.style.width = `calc(3rem + ${3 * number - i}rem`;
    //block.setAttribute('width', '`calc(3rem + ${number - i}rem`');
    diskes.push(block);
}
for (i = 3 * number - 1; i >= 0; i--) {
    if ((i ) % 3==0) {
        c1.appendChild(diskes[i]);
    }
    if ((i - 1) % 3==0) {
        c2.appendChild(diskes[i]);
    }if ((i - 2) % 3==0) {
        c3.appendChild(diskes[i]);
    }
}


function move( from , to) {

    let block = from.firstChild;
    to.appendChild(block);
}



function Hanoi (n){
    if (n ==1){
        move(c1 , c3);
    }else{
        Hanoi(n-1);
        move(c1 , c3);
        Hanoi(n-1);
    }
}


// function exHanoi (n){

//     if(n == 1){
//         move(c3 , c2);
//         move(c1 , c3);
//         move(c2 , c1);
//         move(c2 , c3);
//         move(c1 , c3);
//     }else{
//         exHanoi(n - 1);
//         Hanoi(3*n - 2);
//         move(c1 , c3);
//         Hanoi(3*n - 1);
//     }
// }
bstart.addEventListener("click" , Hanoi(number) , true );


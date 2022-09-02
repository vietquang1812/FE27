'use strict';

const $ = (id)=> {return document.getElementById(id);}

const n = parseInt(prompt('please enter a number 1 <= n <= 12 :'));
// let name = '';
// if(n == 1) {
//     name = 'Jan'
// } else if (n== 2) {
//     name = 'Feb';
// } else if( n == 3) {

// }
let name = '';
switch (n) {
    case 1:
        name += 'Jan';
        break;
    case 2:
        name += 'Feb';
        break;
    case 3 :
        break;
    case 6:
    case 7: 
    case 8: 
        name = 'Summer';
        break;

    case 10: 
        name +="Oct"
        break;
    case 11: 
        name += 'Nov';
        break;
    case  12:
        name += 'Dec';
        break;    
    default:
        name += 'number is not a month';
        break;
}
// if(n === 6 || n === 7 || n === 8) {

// }
// let message = '';
// if(n >= 18) {
//     message = 'valid';

// } else {
//      message = 'invalid';
// }
const message = n >= 18 && n < 40 ? 'valid' : 'invalid';

const has_class = '1' == 1;
$('app').innerHTML = has_class;

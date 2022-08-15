'use strict';
const $ = id => (document.getElementById(id));
let ar = [1,2,3,4,3];
// ar.shift();
let ar2 = ar.slice(1, 3);
let ar3 = 'ar.concat(ar2)';
// $('app').innerHTML = ar3.join(' - ');
for(let i = 0; i< ar.length; i++) {
    let item = ar[i];
    //
}
ar.forEach(item => {

})


// $('app').innerHTML = ar.some(item => {
//     return item >= 4;
// });
// $('app').innerHTML = ar.map(item => Math.pow(item, 3));
$('app').innerHTML = ar.filter(item => item > 2);
function sortDesc(a, b) {
    return b - a;
}
// alert(sessionStorage.getItem('data'))
// localStorage.setItem('data', 'Hello Web Storage');

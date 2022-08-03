const $ = (id) => {
    return document.getElementById(id);
}
let ar = [2,1,3,4,6,5];
let i = 0;
let is_continue= false;
// do {
//     const n = prompt(`please enter item ${++i}`);
//     // ar.push(n);
//     ar[ar.length] = n;
//     is_continue = confirm('do u want to continue?');
// } while(is_continue);
// ar.push('item');
// ar[ar.length] = 'new';
ar.sort();
$('app').innerHTML = ar.join(' - ');
'use strict';
const $ = id => (document.getElementById(id));
const handleClick = function(name, str2) {
    alert('click  '+ name +' ' + str2)
}
// $('btn').onclick = handleClick;

// $('btn').addEventListener('click', handleClick.bind(this, 'Hello', 'JavaScript'));
$('form').onsubmit = function(e) {
    e.preventDefault();
    alert('pree')
}

const img = new Image();
img.src = '../images/event1.png';
img.className = 'rounder rounder-circle';
img.alt = 'Event 1';
img.onmouseover = function() {
    img.src = '../images/event3.png';
}
img.onmouseout = function() {
    img.src = '../images/event1.png';
}
$('app').appendChild(img);
// const timer1 = setTimeout(function() {
//     $('app').innerHTML = '';
//     $('app').appendChild(img)
// }, 3000)
// $('app').onclick = function() {
//     clearTimeout(timer1);
// }
$('time').innerHTML = new Date().toLocaleString();
setInterval(function() {
    $('time').innerHTML = new Date().toLocaleString();
}, 1000)
const timer2 = setInterval(function() {
    console.log(img.src)
    if(img.src.indexOf('event3.png') > 0 ) {
        img.src = '../images/event1.png'
    } else {
        img.src = '../images/event3.png'
    }
}, 3000);
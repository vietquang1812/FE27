'use strict';
const $ = id => (document.getElementById(id));

function countNumber() {
    let count = 0;
    const handleClick = function(name) {
        $('app').innerHTML = name + ': '+(++count);
    }
    $('add').addEventListener('click',handleClick.bind(this,'Javascript') )
    // $('add').onclick = handleClick;
}
countNumber();
function slider(id, autoplay, delay, callback) {
    const srcs = ['../images/event1.png','../images/event2.png','../images/event3.png'];
    let current = 0;
    const img = new Image();


    const gotoSlide = function(num) {
        img.src = srcs[num];
        if(typeof callback == 'function') {
            callback(num);
        }
    }

    const nextSlide = function() {
        if(current == srcs.length - 1) {
            current = 0;
        } else {
            current++;
        }
        gotoSlide(current);
    }
    const prevSlide = function() {
        current = current == 0 ? srcs.length - 1 : --current;
        gotoSlide(current);
    }
    if(autoplay) {
        const timer = setInterval(function() {
            nextSlide();
        }, delay);
    }

    const next = document.createElement('button');
    next.setAttribute('type','button');
    const textNext = document.createTextNode('Next');
    next.appendChild(textNext);
    next.addEventListener('click', nextSlide);

    const prev = document.createElement('button');
    prev.setAttribute('type', 'button');
    const textPrev = document.createTextNode('Prev');
    prev.addEventListener('click', prevSlide);

    prev.appendChild(textPrev);
    $(id).appendChild(prev);
    $(id).appendChild(img);
    $(id).appendChild(next);
    gotoSlide(current);
}
slider('slider', true, 3000,
function(currentSlide) {
    console.log('currentSlide',currentSlide);
});


function giaithua(n) {
    if(n == 0) {
        return 1;
    }
    return n*giaithua(n-1);
}
// alert(giaithua(5));

let str = 'Hello module';

// let module = (function module(name) {
//     alert(name);
// })('module');

let obj = {
    "name":"Ng van A",
    "age": 30,
    fullname: function() {

    },
    "skills": ["Javascript","HTML", "React"]
};
let json_obj = JSON.stringify(obj);
console.log(json_obj);
let new_obj = JSON.parse(json_obj);
console.log(new_obj);
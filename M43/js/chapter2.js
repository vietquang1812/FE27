// document.getElementById('app').innerHTML = 'Hello JavaScript';

// var str1 = 'Hello Script';
// str1toString();

// function str1toString() {
//     document.getElementById('app').innerHTML = str1;
// }

// for(let i = 0; i< 3; i++) {
//     document.getElementById('app').innerHTML += i;
// }
// console.log(i);
// var str1 = 'Hello Script';
// var str1 = 'javascript';
// document.getElementById('app').innerHTML =myfunc2();

// const myfunc = function() {
//     return 'Hello JavaScript My function';
// }

// function myfunc2() {
//     return 'Function 2';
// }

// str2 = 'javascript';

let $ = function(id) {
    return document.getElementById(id);
}
$('app').innerHTML = 'Javascript';
$('card-header').innerHTML = '<h3 class="h3">Hello JavaScript</h3>';

// let students = ['HTML5 & CSS3', 'JavaScript', 'ReactJs'];
// const student = {
//     'name': 'Quang',
//     'age': 30,
//     className: 'FE27',
//     html_css: 9,
//     javascript: 10,
//     reactjs: 8,
//     avg: function() {
//         return (this.html_css + this.javascript + this.reactjs)/3;
//     }
// };
let students = [
    {
        'name': 'Quang',
        'age': 30,
        className: 'FE27',
        html_css: 9,
        javascript: 10,
        reactjs: 8,
        avg: function() {
            return (this.html_css + this.javascript + this.reactjs)/3;
        }
    },
    {
        'name': 'Hung',
        'age': 20,
        className: 'FE27',
        html_css: 7,
        javascript: 8,
        reactjs: 8,
        avg: function() {
            return (this.html_css + this.javascript + this.reactjs)/3;
        }
    },
    {
        'name': 'Hai',
        'age': 23,
        className: 'FE27',
        html_css: 6,
        javascript: 9,
        reactjs: 8,
        avg: function() {
            return (this.html_css + this.javascript + this.reactjs)/3;
        }
    },
    {
        'name': 'Thinh',
        'age': 23,
        className: 'FE27',
        html_css: 9,
        javascript: 8,
        reactjs: 8,
        avg: function() {
            return (this.html_css + this.javascript + this.reactjs)/3;
        }
    },
    {
        'name': 'Vu',
        'age': 25,
        className: 'FE27',
        html_css: 9,
        javascript: 6,
        reactjs: 8,
        avg: function() {
            return (this.html_css + this.javascript + this.reactjs)/3;
        }
    },
];
let html = `<table class="table table-striped">
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Age</td>
                        <td>Class</td>
                        <td>HTML5 & CSS3</td>
                        <td>JS</td>
                        <td>ReactJS</td>
                        <td>AVG</td>
                    </tr>
                </thead>
                <tbody>
            `;
for(let i = 0; i< students.length; i++) {
    html += `<tr>
                <td>${students[i].name}</td>
                <td>${students[i].age}</td>
                <td>${students[i].className}</td>
                <td>${students[i].html_css}</td>
                <td>${students[i].javascript}</td>
                <td>${students[i].reactjs}</td>
                <td>${students[i].avg().toFixed(2)}</td>
            </tr>`;
}
html += '</tbody></table>';
$('card-body').innerHTML = html;

let img =new Image();
const url = '../images/event1.png';
const url_hover = '../images/event3.png';
img.src = url;
img.onmouseover = function() {
    img.src = url_hover;
}
img.onmouseleave = function() {
    img.src = url;
}
$('card-body').appendChild(img);

const num = prompt('Please enter a Number', 10);
const num_float = parseFloat(num);
if(num_float > 0 && !isNaN(num_float)) {
    const chu_vi = 2*Math.PI*num_float;
    alert('chu vi hinh tron:\' '+chu_vi);
} else {
    alert('day k phai la 1 so lon hon 0')
}


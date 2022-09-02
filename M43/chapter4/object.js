"use strict";
const $ = (id) => {
    return document.getElementById(id);
}
// let object = {};
function showStudent(student) {
    let htmlSkill = `<table class="table"><tbody>`
    for(let i = 0; i < student.skills.length; i++) {
        htmlSkill += `<tr>
            <th>${student.skills[i].name}</th>
            <td>${student.skills[i].math}</td>        
        </tr>`
    }
    htmlSkill += '</tbody></table>';


    let html = '<tr>';
    html += `<td>${student.fullname()}</td>`;
    html += `<td>${student.gender}</td>`;
    html += `<td>${htmlSkill}</td>`;
    html += `<td>${student.project}</td>`;
    html += `<td>${student.avg()}</td>`;
    html += `<td>${student.rank()}</td>`;

    html += '</tr>';
    $('app').innerHTML = html;
}

// const str1 = 'Nguyen Van';
// let str2 = str1;
// str2 += ' A';
// let student2 = {...student};
// let student2 = student;
// student2.last_name = 'B';
// $('app').innerHTML = student.last_name;
// $('first_name').onchange = function() {
//     $('app').innerHTML = $('first_name').value;
// }
$('submit').onclick = function() {
    let student = {
        first_name: $('first_name').value,
        last_name: $('last_name').value,
    
    };
    student.gender = $('gender').checked ? 'Male' : 'Female';
    // student.age = 20;
    student.fullname = function() {
        return this.first_name + ' ' + this.last_name;
    }
    student.skills = [
        {
            name: "HTML5 & CSS3",
            math: parseFloat($('html5_css3').value)
        },
        {
            name: 'Javascript',
            math: parseFloat($('javascript').value)
        },
        {
            name: 'ReactJS',
            math: parseFloat($('reactjs').value)
        }
    ];
    
    
    student.avgSkills = function() {
        if(this.skills.length == 0) {
            return 0;
        }
        let sum = 0;
        for(let i =0; i< this.skills.length; i++) {
            sum += this.skills[i].math;
        }
        return (sum / this.skills.length).toFixed(1);
    } 
    
    student.project = parseFloat($('project').value);
    
    student.avg = function() {
        const avgSkills = this.avgSkills();
        return (0.6* this.project + 0.4*avgSkills).toFixed(1);
    }
    student.rank = function() {
        const avg = this.avg();
        if(avg >= 8.5) {
            return 'A';
        } else if (avg >= 7.5) {
            return 'B';
    
        }else if (avg >= 6.5) {
            return 'C';
        } else if (avg >= 5) {
            return 'D';
        } else {
            return 'F';
        }
    }
    showStudent(student);
    // $('app').innerHTML = $('first_name').value;
}

const today = new Date('12/31/2020 12:00');
const str1 = 'nguyen van a';
const arStr = str1.split(' ');
for(let i = 0; i< arStr.length; i++) {
    arStr[i] = arStr[i].substr(0,1).toUpperCase() + arStr[i].substr(1).toLowerCase();
}
// $('app').innerHTML = arStr.join(' ');

// const parag = document.createElement('p');
// parag.classList.add('text-danger');
// const text = document.createTextNode('Hello DOM');
// parag.appendChild(text);
// $('app').appendChild(parag);
const getData = (a1, a2='abc') => {
    return 'Hello World'+ a1 + ' '+ a2;
}
// $('app').innerHTML = htmlSkill;


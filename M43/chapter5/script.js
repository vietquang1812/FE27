'use strict';

const $ = id => {return document.getElementById(id);}

const quesions = document.getElementsByClassName('quesion');

for(let i = 0; i< quesions.length; i++) {
    let $quesion = quesions[i];
    $quesion.onclick = function() {
        // const classes = $quesion.getAttribute('class');
        // if(classes.indexOf('cl-green') >=0) 
        if($quesion.classList.contains('is-active'))
        {
            $quesion.classList.remove('is-active');
            $quesion.classList.remove('cl-green');
            $quesion.nextElementSibling.style.display = 'none';
        } else {
            $quesion.classList.add('is-active');
            $quesion.classList.add('cl-green');
            $quesion.nextElementSibling.style.display = 'block';
        }
        // $quesion.classList.toggle('cl-green');
        
    }
}

$('form').onsubmit = function(e) {
    e.preventDefault();
    let skillChecked = [];
    const skills = document.getElementsByName('skills');
    // for(let i = 0; i< skills.length; i++) {
    //     let skill = skills[i];
    //     //
    //     //
    // } 
    skills.forEach((skill, i) => {
        if(skill.checked) {
            skillChecked.push(skill.value);
        }
    })
    console.log(skillChecked);

    if(!checkValidate()) {
        e.preventDefault();
    }
}
$('fullname').onkeydown = () => {
    const fullname = $('fullname').value;
    if(fullname == '') {
        $('fullname_error').firstChild.nodeValue = 'Name is required';
    } else {
        $('fullname_error').firstChild.nodeValue = '';
    }
}

$('password').onkeydown = () => {
    const password = $('password').value;
    if(password.length < 6) {
        $('password').classList.add('is-invalid');
        $('password_error').firstChild.nodeValue = 'Password length < 6';
    } else {
        $('password').classList.remove('is-invalid');

        $('password_error').firstChild.nodeValue = '';
    }
}

function checkValidate() {
    const fullname = $('fullname').value;
    const email = $('email').value;
    let is_valid = true;
    if(fullname == '') {
        is_valid = false;
        $('fullname_error').firstChild.nodeValue = 'Name is required';
    } else {
        $('fullname_error').firstChild.nodeValue = '';
    }
    if(email == '') {
        is_valid = false;
        $('email_error').innerHTML = 'Email is required';
    } else {
        $('email_error').innerHTML = '';
    }
    return is_valid;
}

let h3 = document.createElement('h3');
h3.className = 'text-info h3 text-center';

// const textH3 = document.createTextNode('Hello DOM');
// h3.appendChild(textH3);
// h3.onclick = () => {
//     alert('h3 event');
// }
// $('app').appendChild(h3);
const html = '<h3 class="text-info h3 text-center" id="h3">Hello DOM</h3>';

$('app').innerHTML = html;
$('h3').onclick = () => {
    alert('event html inner');
}
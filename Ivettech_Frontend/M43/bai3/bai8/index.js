'use strict'

const $ = (id) => {
  return document.getElementById(id)
}

function ageCalculator() {
  let userInput = $('dateOfBirth').value
  let dateOfBirth = new Date(userInput);
  if (userInput == null || userInput == '') {
    $('message').innerHTML = 'Please choose a date!!**'
    return false
  } else {
    let month = Date.now() - dateOfBirth.getTime();
    let age_dt = new Date(month);
    let year = age_dt.getUTCFullYear();
    let age = Math.abs(year - 1970);
    return $('result').innerHTML = 'Your age is: ' + age;
  }
}

$('form').onsubmit = function(e) {
  ageCalculator()
  e.preventDefault();
}
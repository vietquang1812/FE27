'use strict'

const $ = (id) => {
  return document.getElementById(id)
}

function nameCapitalize() {
  let userInput = $('name').value
  if (userInput == null || userInput == '') {
    $('message').innerHTML = 'Please enter value name valid'
    return false
  } else {
    let array = userInput.split(' ');
    for (let i = 0; i < array.length; i++) {
      array[i] = array[i].charAt(0).toUpperCase() + array[i].slice(1)
      console.log(array[i].slice(1))
    }
    userInput = array.join(' ');
    console.log(userInput)
    $('result').innerHTML = userInput
  }
}

$('form').onsubmit = function(e) {
  nameCapitalize();
  e.preventDefault();
}
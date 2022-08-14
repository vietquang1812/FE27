'use strict'

const $ = (id) => {
  return document.getElementById(id)
}

function randomNumber() {
    let number = Math.floor(Math.random() * 1001);
    number = parseInt(number);
    console.log(number);
    $('number').innerHTML = number;
    if (number == 1000) {
        $('result').innerHTML = 'Giải đặc biệt'
    } else if (number >= 990 && number <= 999) {
        $('result').innerHTML = 'Giải 1'
    } else if (number >= 950 && number <= 989) {
        $('result').innerHTML = 'Giải 2'
    } else if (number >= 870 && number <= 949) {
        $('result').innerHTML = 'Giải 3'
    } else if (number >= 750 && number <= 869) {
        $('result').innerHTML = 'Giải 4'
    } else if (number >= 550 && number <= 749) {
        $('result').innerHTML = 'Giải 5'
    } else if (number >= 350 && number <= 549) {
        $('result').innerHTML = 'Giải 6'
    } else {
        $('result').innerHTML = 'Giải 7'
    }
}
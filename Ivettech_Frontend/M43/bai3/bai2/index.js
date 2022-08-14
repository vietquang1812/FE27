let num = prompt("Please enter number")
num = parseInt(num);

'use strict'

function convertToBinary(num) {
  if(isNaN(num)) {
    alert('Value is not a number')
  } 
  else if (num < 0) {
    alert('Number must > 0');
  } 
  else if (num > 0) {
      return convertToBinary(parseInt(num / 2))  +  (num % 2);
  }
  return '';
}

document.write('Ket qua chuyen doi la: ' + convertToBinary(num));
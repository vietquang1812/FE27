'use strict'

let n = prompt('Please enter number')
n = parseInt(n)

function checkNguyenTo(n) {
  if (n <= 1) {
    return false
  }
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i == 0) {
      return false
    }
  }
  return true
}

function printNguyenTo(n) {
  if (isNaN(n)) {
    alert('Value is not a number')
  } else if (n < 0) {
    alert('Number must > 0')
  } else {
    let result;
    for (let i = 1; i < n; i++) {
      if (checkNguyenTo(i)) {
        result = document.write( + i + ' ' + '&nbsp; \t')
      }
    }
    return result
  }
}

printNguyenTo(n);


'use strict'

let n = prompt('Please enter length of array')
n = parseInt(n)
let arr = []

for (let i = 0; i < n; i++) {
  arr[i] = prompt(`Enter array element: ${i + 1}`);
}

function checkNumberDivide7(arr, n) {
  for(let i = 0; i < n; i++) {
    if (arr[i] > 0 && arr[i] % 7 === 0) {
      return 1;
    }
  }
  return -1;
}

function countNumber(arr, n) {
  if(isNaN(n)) {
    alert('Value is not a number')
  } else if (n < 0) {
    alert('Number must > 0')
  } else {
    let dem = 0;
    for (let i = 0; i < n ; i++) {
      if(checkNumberDivide7(arr[i], n) == 1) {
        document.write(+ arr[i])
        document.write('<br>')
        dem++;
      }
    }
    document.write('Cac so duong chia het cho 7 la: ' + dem);
  }
}

countNumber(arr, n);
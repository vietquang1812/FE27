'use strict'

let n = prompt('Please enter length of array')
n = parseInt(n)
let arr = []

for (let i = 0; i < n; i++) {
  arr[i] = prompt(`Enter array element: ${i + 1}`);
}

function chanCuoi(arr, n) {
  for (let i = n - 1; i >= 0; i--) {
    if (arr[i] % 2 == 0) {
      return arr[i];
    }
  }
  return -1;
}

function printChan(arr, n) {
  if (isNaN(n)) {
    alert('Value is not a number')
  } else if (n < 0) {
    alert('Number must > 0')
  } else {
    document.write('So chan cuoi cung cu mang la: ' + chanCuoi(arr, n));
  }
}

printChan(arr, n);

"use strict"

function bai1() {
  let n = prompt('Please enter number n');
  n = parseInt(n);
  let S = 0;
  if(isNaN(n)) {
    alert('Value is not a number')
  } else if(n <= 0) {
    alert('Number must > 0')
  } else {
    for(let i = 1; i <= n; i++) {
      S += (1 / (2 * i));
    }
    alert("S(n) = " + S.toFixed(3));
  }
}

bai1();
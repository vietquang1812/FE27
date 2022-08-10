"use strict"

const app = document.getElementById('app');

let a = prompt('Please enter a: ');
let b = prompt('Please enter b: ');
a = parseInt(a);
b = parseInt(b);

function greatestCommonDivisor(a, b) {
  if(isNaN(a) || isNaN(b)) {
    alert("Value is not a number")
  } else if (a < 0 || b < 0) {
    alert("Number is not < 0");
  } else {
    a = Math.abs(a);
    b = Math.abs(b);
    if (a !=0 && b == 0) return a;
    else {
      if (a == b) return a;
      else {
        if(a > b) return greatestCommonDivisor(a - b, b);
        else return greatestCommonDivisor(a, b - a);
      }
    }
  }
  alert('Uoc chung lon nhat cua a va b la: ' + greatestCommonDivisor(a,b));
}

document.write('Uoc chung lon nhat la: ' + greatestCommonDivisor(a,b))
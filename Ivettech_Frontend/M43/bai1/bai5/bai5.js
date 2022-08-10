"use strict"

let a = prompt('Please enter number a');
let b = prompt('Please enter number b');
let c = prompt('Please enter number c');
a = parseInt(a);
b = parseInt(b);
c = parseInt(c);
let delta = (b * b) - (4 * a * c);

function ptbac2(a, b, c) {
  if(isNaN(a) || isNaN(b) || isNaN(c)) {
    alert('Value is not a number');
  } else if (a < 0 || b < 0 || c < 0) {
    alert('Number is not < 0');
  } else {
    if(delta < 0) {
      alert('Phuong trinh vo nghiem')
    } else if (delta == 0) {
      let x = parseFloat((-b) / (2 * a)).toFixed(1);
      alert('Phuong trinh co nghiem kep: ' + x);
    } else if (delta > 0){
      let canDelta = Math.sqrt(delta);
      let x1 = parseFloat((-b + canDelta) / (2 * a)).toFixed(1);
      let x2 = parseFloat((-b - canDelta) / (2 * a)).toFixed(1);
      alert('Phuong trinh co 2 nghiem phan biet: ' + 'x1 = ' + x1 + ', ' + 'x2 = ' + x2);
    }
  }
}

ptbac2(a, b, c);

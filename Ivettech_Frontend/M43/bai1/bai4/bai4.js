'use strict'

const $ = (id) => {
  document.getElementById(id)
}

let a = prompt('Please enter number a')
let b = prompt('Please enter number b')

function ptbac1(a, b) {
  a = parseInt(a)
  b = parseInt(b)
  if (isNaN(a) || isNaN(b)) {
    alert('Value is not a number')
  } else if (a < 0 || b < 0) {
    alert('Number is not < 0')
  } else {
    if (a == 0) {
      if (b == 0) {
        return 'Phuong trinh vo so nghiem'
      } else {
        return 'Phuong trinh vo nghiem'
      }
    } else {
      let x = parseFloat(-b / a).toFixed(1)
      alert('Nghiem cua phuong trinh la: ' + x)
    }
  }
}

ptbac1(a, b)

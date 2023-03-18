

let a = prompt('Nhap a: ')
let b = prompt('Nhap b: ')

function swap(a, b) {
  if (isNaN(a) || isNaN(b)) {
    alert('Your value is not a number')
  }
  else {
    let temp = a
    a = b
    b = temp
    alert(`a after swap: ${a}`)
    alert(`b after swap: ${b}`)
  } 
}

swap(a, b)

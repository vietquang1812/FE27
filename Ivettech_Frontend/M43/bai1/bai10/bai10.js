const app = document.getElementById('app')

let num = prompt('Please enter a number: ')
num = parseInt(num)

function triangle(num) {
  if (isNaN(num)) {
    alert('Value is not a number')
  } else if (num < 0) {
    alert('Number is not < 0')
  } else {
    let string = ''
    for (let i = 1; i <= num; i++) {
      for (let j = 1; j <= i; j++) {
        string = string + '*&nbsp'
      }
      string += '<br>'
    }
    app.innerHTML = string
  }
}
triangle(num)

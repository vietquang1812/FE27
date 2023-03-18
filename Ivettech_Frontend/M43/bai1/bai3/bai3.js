'use strictt'

const $ = (id) => {
  return document.getElementById(id)
}

let is_continue = false
let averages = []

do {
  let math = prompt('Please enter math score: ')
  math = parseInt(math)
  let physics = prompt('Please enter physics score: ')
  physics = parseInt(physics)
  let chemistry = prompt('please enter chemistry score: ')
  chemistry = parseInt(chemistry)
  math = parseInt(math)
  physics = parseInt(physics)
  chemistry = parseInt(chemistry)
  let average = ((math + physics + chemistry) / 3).toFixed(1)
  console.log(average)

  if (isNaN(math) || isNaN(physics) || isNaN(chemistry)) {
    alert('Value is not a number')
  } else {
    averages[averages.length] = {
      average: average,
      rank: aveRage(average),
    }
  }
  is_continue = confirm('do u want to continue?')
} while (is_continue)

function aveRage(avg) {
  if (avg >= 8.0) {
    return 'A'
  } else if (avg >= 6.5) {
    return 'B'
  } else if (avg >= 5) {
    return 'C'
  } else {
    return 'D'
  }
}

showResult()

function showResult() {
  let html = ''
  for (let i = 0; i < averages.length; i++) {
    html += `<tr>
        <td>${averages[i].average}</td>
        <td>${averages[i].rank}</td>
    </tr>`
  }
  $('app').innerHTML = html
}

"use strictt"

const $ = (id) => {
  return document.getElementById(id)
}

let is_continue = false
let averages = []

let math = prompt('Please enter math score: ')
let physics = prompt('Please enter physics score: ')
let chemistry = prompt('please enter chemistry score: ')

let average = (parseFloat(math + physics + chemistry) / 3).toFixed(1)

do {
  math = parseInt(math)
  physics = parseInt(physics)
  chemistry = parseInt(chemistry)

  if (isNaN(math) || isNaN(physics) || isNaN(chemistry)) {
    alert('Value is not a number')
  } else {
    averages[averages.length] = {
      avg: average,
      rank: aveRage(avg)
    }
  }
  is_continue = confirm('do u want to continue?');
} while (is_continue)


function aveRage(avg) {
  let rank = document.getElementById('rank')
  if (avg >= 8.0) {
    rank.innerHTML = 'A'
  } else if (avg >= 6.5) {
    rank.innerHTML = 'B'
  } else if (avg >= 5) {
    rank.innerHTML = 'C'
  } else {
    rank.innerHTML
  }
}

showResult();

function showResult() {
  let html = '';
  for (let i = 0; i < averages.length; i++) {
    html =  `<tr>
        <td>${averages[i].avg}</td>
        <td>${averages[i].rank}</td>
    </tr>`
  }
  $('app').innerHTML = html;
}
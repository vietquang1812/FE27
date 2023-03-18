"use strict"

const app = document.getElementById('app');

let num = prompt('Please enter a number');
num = parseInt(num);


function fibonacci(num) {
  if(isNaN(num) || num < 0) {
    alert('Value is not valid')
  }
  else {
    if(num == 0 || num == 1) {
      return 1;
    } else {
      return fibonacci(num - 1) + fibonacci(num - 2);
    }
  }
}

function printFibonaci(num) {
  let html = '';
  for(let i = 0; i < num; i++) {
    fibonacci(i)
    html += fibonacci(i) + ' - ';
  }
  app.innerHTML = html;

}

printFibonaci(num)
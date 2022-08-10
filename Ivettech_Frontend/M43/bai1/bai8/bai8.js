"use strict"

const app = document.getElementById('app');

let month = prompt('Please enter month');
month = parseInt(month);

function checkMonth(month) {
  if(isNaN(month)) {
    alert("Value is not a number");
  } else if(month < 0) {
    alert("Month is not < 0");
  } else {
    switch(month) {
      case 1: 
        app.innerHTML = 'January';
        break;
      case 2:
        app.innerHTML = 'February';
        break;
      case 3:
        app.innerHTML = 'March';
        break;
      case 4:
        app.innerHTML = 'April';
        break;
      case 5:
        app.innerHTML = 'May';
        break;
      case 6:
        app.innerHTML = 'June';
        break;
      case 7:
        app.innerHTML = 'July';
        break;
      case 8:
        app.innerHTML = 'August';
        break;
      case 9:
        app.innerHTML = 'September';
        break;
      case 10:
        app.innerHTML = 'October';
        break;
      case 11:
        app.innerHTML = 'November';
        break;
      case 12:
        app.innerHTML = 'December';
        break;
      default:
        app.innerHTML = 'Input a number between 1 to 12';      
    }
  }
}

checkMonth(month);
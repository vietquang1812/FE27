let num = prompt('Please enter a number: ', 10);
num = parseInt(num);
if(!isNaN(num) && num > 0) {
    alert(checkLeapYear(num));
} else if(!isNaN(num) && num <= 0) {
    alert('This is a Integer number <= 0');
} else {
    alert('This is not a Integer number');
}

function checkLeapYear(year) {
    if(year % 4 > 0 || year % 100 == 0) {
        return 'This is not a leap year';
    } else {
        return 'This is a leap year';
    }
}
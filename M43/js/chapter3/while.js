const $ = function(id) {
    return document.getElementById(id);
}
// let num = prompt('please enter a number');
// num = parseInt(num);
// if(!isNaN(num) && num > 0) {
//     alert(checkLeapYear(num));
// } else if(!isNaN(num) && num <= 0) {
//     alert('This is a Integer number <= 0');
// } else {
//     alert('This is not a Integer number');
// }
// let is_continue = confirm('do u want to continue?');
let is_continue = true;
do {
    let num = prompt('please enter a number');
    num = parseInt(num);
    if(!isNaN(num) && num > 0) {
        alert(checkLeapYear(num));
    } else if(!isNaN(num) && num <= 0) {
        alert('This is a Integer number <= 0');
    } else {
        alert('This is not a Integer number');
    }
    is_continue = confirm('do u want to continue?');
    
} while(is_continue);

function checkLeapYear(year) {
    if(year % 4 > 0 || year % 100 == 0) {
        return 'This is not a leap year';
    } else {
        return 'This is a leap year';
    }
}
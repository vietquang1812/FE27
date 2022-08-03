const $ = id => {
    return document.getElementById(id);
}
let salaries = [];
let is_continue = false;
do {
    let sell = prompt('Please enter sell: ', 1000);
    sell = parseInt(sell);
    if(!isNaN(sell) && sell > 0) {
        salaries[salaries.length] = {
            sell: sell,
            salary: calcSalary(sell)
        };
        
    } else if(!isNaN(sell) && sell <= 0) {
        alert('This is a Integer number <= 0');
    } else {
        alert('This is not a Integer number');
    }
    is_continue = confirm('do u want to continue?');
} while(is_continue);

salaries.sort(function(a, b) {
    return b.salary - a.salary;
});
showSalaries();

function showSalaries() {
    console.log(salaries);
    let html = '';
    for(let i = 0; i< salaries.length; i++) {
        html += `<tr>
            <td>${salaries[i].sell}</td>
            <td>${salaries[i].salary}</td>
        </tr>`;
    } 
    $('app').innerHTML = html;  
}
function calcSalary(sell) {
    let salary = sell/10;
    if(salary > 1000) {
        return salary - (salary - 1000 )/10;
    } else {
         return salary;
    }
}
'use strict';
const $ = id => (document.getElementById(id));

const $tr = ($items) => {
    const tr = document.createElement('tr');
    $items.forEach($item => {
        tr.appendChild($item);
    });
    return tr;
}

const $td = text => {
    const td = document.createElement('td');
    const $text = document.createTextNode(text);
    td.appendChild($text);
    return td;
}


// Employee.prototype.salary = function() {
//     return this.sell/10;
// }
// Employee.prototype.tax = function() {
//     if(this.salary() <= 1000) return 0;
    
//     return (this.salary() - 1000) / 10;
// }
// Employee.prototype.amount = function() {
//     return this.salary() - this.tax();
// }
// Employee.prototype.initRowData = function() {
//     const $name = $td(this.name);
//     const $sell = $td(this.sell);
//     const $salary = $td(this.salary());
//     const $tax = $td(this.tax());
//     const $amount = $td(this.amount());
//     const $row = $tr([$name, $sell, $salary, $tax, $amount]);
//     return $row;
// }


var employeePrototype = {
    salary: function() {
        return this.sell/10;
    },
    tax: function() {
        if(this.salary() <= 1000) return 0;
        return (this.salary() - 1000) / 10;
    },
    amount: function() {
        return this.salary() - this.tax();
    },
    initRowData: function() {
        const $name = $td(this.name);
        const $sell = $td(this.sell);
        const $salary = $td(this.salary());
        const $tax = $td(this.tax());
        const $amount = $td(this.amount());
        const $row = $tr([$name, $sell, $salary, $tax, $amount]);
        return $row;
    },
    
}
let Employee = function(name, sell) {
    let employee = Object.create(employeePrototype);
    employee.name = name;
    employee.sell = sell;
    return employee;
}
// Object.prototype.toString = function() {
//     return this.name
// }

const nv1 = new Employee('ng van a', 20000);
alert(nv1.toString())
$('app').appendChild(nv1.initRowData());
var  objprototype = {
    get: function() {},
    set: function() {}
}
var ob2 = Object.create(objprototype);
console.log(ob2);

String.prototype.toCapitalize = function() {
    console.log('toCapitalize')   
}

var str = 'abc';
str.toCapitalize();
'use strict';

let str = '123456789';
const hauto = ['', ' nghin ', ' trieu ', ' ty '];
const chuso = ['khong', 'mot', 'hai', 'ba', 'bon', 'nam', 'sau', 'bay', 'tam', 'chin'];

let n = str.length;
let ar = [];
do{
    if(n >=3) {
        let newstr = str.substr(n-3, 3);
        str = str.substr(0, n - 3);
        n -= 3;
        ar.push(newstr);
    } else {
        ar.push(str);
        str = '';
    }
} while(str != '');
let html = '';
ar.forEach((item, i) => {
    html = docso(item, i) + html;
})
alert(html);


function docso(num, i) {
    num = parseInt(num);
    if(num == 0) return 'Khong' + hauto[i];
    const hangTram = Math.floor(num /100);
    const hangChuc = Math.floor(num / 10 ) - hangTram*10;
    const hangDonvi = num % 10;

    return chuso[hangTram] +' Tram ' + chuso[hangChuc] + ' Muoi ' + chuso[hangDonvi] + ' ' + hauto[i];
}
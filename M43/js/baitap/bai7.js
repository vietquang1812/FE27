
// const number = parseInt(prompt('Enter the number of terms: '));
// let n1=0, n2=1, nextTerm;
// console.log('Fibonacci Series:');
// show();
// function show(){
//     let html = '';
//     for(let i =1; i<=number; i++){
//         html += n1 + ' ,';
//         nextTerm = n1+n2;
//         n1=n2;
//         n2=nextTerm;
//     }
//     $('app').innerHTML = html;
// }

function bai7(){
    let fibo = $('fibo').value;
    fibo = parseInt(fibo);
    let n1=0, n2=1, nextTerm;
    let html = '';
    if(isNaN(fibo)){
        alert('Value not a number');
    }else{
        for(let i=1; i<=fibo; i++){
            html += n1 + ' ,';
            nextTerm = n1+n2;
            n1=n2;
            n2=nextTerm;
        }
        $('result7').innerHTML = html;
    }
}

// let number = parseInt(prompt('Please enter a number: ',4));
// function show(){
//     let html = '';
//     let a = number+50;
//     let sum=0;
//     console.log(a);
//     for(let i=number; i<=a; i++){
//         sum += i;
//     }
//     $('app').innerHTML = sum;
// }
// show();
function bai6(){
    let num = $('sumnum').value;
    num = parseInt(num);
    if(isNaN(num)){
        alert('Value not a number!');
    }else {
        let a = num+50;
        let sum = 0
        for(let i=num; i<=a; i++){
        sum += i;
    }
        $('result6').innerHTML = sum;
    }
}
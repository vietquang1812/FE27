
// let a = prompt('Please enter a: ',1);
// let b = prompt('Please enter b:' ,2);
// a = parseInt(a);
// show();
// function show(){
//     let c = b;
//     b = a;
//     let html = c + "," +b;
//     $('app').innerHTML = html
// }

function checkForm(){
    let num1 = $('t1').value;
    let num2 = $('t2').value;
    num1 = parseInt(num1);
    num2 = parseInt(num2);
    if(isNaN(num1) || isNaN(num2)){
        alert('Value not a number');
    }else{
        let c = num2;
        num2 = num1;
        let html = c+","+num2;
        $('result').innerHTML = html
    }
}

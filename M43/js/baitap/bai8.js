
// let number1 = parseInt(prompt('Please enter a number 1:',1));
// let number2 = parseInt(prompt('Please enter a number 2:',2));
// while(number1!=number2){
//     if(number1>number2){
//         number1 = number1 - number2;
//     }else{
//         number2 = number2 - number1;
//     }
// }
// console.log(number2);
// $('app').innerHTML = number2;

function bai9(){
    let num1 = $('ucln1').value;
    let num2 = $('ucln2').value;
    num1 = parseInt(num1);
    num2 = parseInt(num2);
    if(isNaN(num1)||isNaN(num2)){
        alert('Value not a number!');
    }else{
        while(num1!=num2){
            if(num1>num2){
                num1 = num1 - num2;
            }else{
                num2 = num2 - num1;
            }
        }
        console.log(num2);
        $('result9').innerHTML = num2;
    }

}
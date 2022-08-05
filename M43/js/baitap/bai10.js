const $ = id => {
    return document.getElementById(id);
}
// let number = parseInt(prompt('Please enter a number:',10));
// let string="";
// for(let i=1; i<=number; i++){
//     for(let j=1; j<=i; j++){
//         string += "*&nbsp";
//     }
//     string += "<br>"; 
// }
// console.log(string);
// $('app').innerHTML = string;

function bai10(){
    let num = $('tg1').value;
    num = parseInt(num);
    if(isNaN(num)){
        alert('Value not a number!');
    }else{
        let string="";
        for(let i=1; i<=num; i++){
            for(let j=1; j<=i; j++){
                string += "*&nbsp";
            }
            string += "<br>"; 
        }
        console.log(string);
        $('result10').innerHTML = string;
    }
}
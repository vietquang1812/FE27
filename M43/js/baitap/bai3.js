
// let math = prompt('Please enter math:',5);
// math = parseInt(math);
// let physics = prompt('Please enter math:',5);
// physics = parseInt(physics);
// let chemistry = prompt('Please enter math:',5);
// chemistry = parseInt(chemistry);
function aver(av){
    if(av>=8){
        console.log('A');
        $('result3').innerHTML = 'A';
    } else if(av>=6.5){
        $('result3').innerHTML = 'B';
    } else if(av>=5){
        $('result3').innerHTML = 'C';
    } else{
        $('result3').innerHTML = 'D';
    }
    console.log(av);
}
function bai3(){
    let math = $('math').value;
    let physics = $('physics').value;
    let chemistry = $('chemistry').value;
    math = parseInt(math);
    physics = parseInt(physics);
    chemistry = parseInt(chemistry);
    const average = (math + physics + chemistry)/3; 
    if(isNaN(math)||isNaN(chemistry||isNaN(physics))){
        alert('Value not a number');
    }else{
        aver(average);
    }
}

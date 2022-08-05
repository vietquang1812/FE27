
// let a = prompt('Please enter a:', 4);
// a = parseFloat(a);
// let b = prompt('Please enter b:', 4);
// b = parseFloat(b);
// let c = prompt('Please enter c:', 4);
// c = parseFloat(c);
// let delta = b*b - 4*a*c;
// console.log(delta);
// if(delta < 0){
//     $('app').innerHTML = 'Impossible equation';
// }
// if(delta==0){
//     let x = -b/(2*a);
//     $('app').innerHTML = x;
// }
// if(delta>0){
//     let deta = Math.sqrt(delta);
//     let x1 = (-b + deta) / (2*a);
//     let x2 = (-b - deta) / (2*a);
//     $('app').innerHTML = 'x1: '+x1+' ;x2: '+x2;
// }
function bai5(){
    let numa = $('numa').value;
    let numb = $('numb').value;
    let numc = $('numc').value;
    numa = parseInt(numa);
    numb = parseInt(numb);
    numc = parseInt(numc);
    let delta = numb*numb - 4*numa*numc;
    if(isNaN(numa) || isNaN(numb) || isNaN(numc)){
        alert('Value not a number');
    }else{
        if(delta < 0){
            $('result5').innerHTML = 'Impossible equation';
        }
        if(delta==0){
            let x = -numb/(2*numa);
            $('result5').innerHTML = x;
        }
        if(delta>0){
            let deta = Math.sqrt(delta);
            let x1 = (-numb + deta) / (2*numa);
            let x2 = (-numb - deta) / (2*numa);
            $('result5').innerHTML = 'x1: '+x1+' ;x2: '+x2;
        }
    }
}

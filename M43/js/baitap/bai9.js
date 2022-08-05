
// let number = parseInt(prompt("Please enter a number: ",1));
// switch(number){
//     case 1:
//         $('app').innerHTML='January';
//         break;
//     case 2:
//         $('app').innerHTML='February';
//         break;
//     case 3:
//         $('app').innerHTML='March';
//         break;
//     case 4:
//         $('app').innerHTML='April';
//         break;
//     case 5:
//         $('app').innerHTML='May';
//         break;
//     case 6:
//         $('app').innerHTML='June';
//         break;
//     case 7:
//         $('app').innerHTML='July';
//         break;
//     case 8:
//         $('app').innerHTML='August';
//         break;
//     case 9:
//         $('app').innerHTML='September';
//         break;
//     case 10:
//         $('app').innerHTML='October';
//         break;
//     case 11:
//         $('app').innerHTML='November';
//         break;
//     case 12:
//         $('app').innerHTML='December';
//         break;
//     default:
//         $('app').innerHTML='Input a number between 1 to 12.';         
// }
function bai8(){
    let month = $('month').value;
    month = parseInt(month);
    if(isNaN(month)){
        alert('Value not a number!')
    }else{
        switch(month){
            case 1:
                $('result8').innerHTML='January';
                break;
            case 2:
                $('result8').innerHTML='February';
                break;
            case 3:
                $('result8').innerHTML='March';
                break;
            case 4:
                $('result8').innerHTML='April';
                break;
            case 5:
                $('result8').innerHTML='May';
                break;
            case 6:
                $('result8').innerHTML='June';
                break;
            case 7:
                $('result8').innerHTML='July';
                break;
            case 8:
                $('result8').innerHTML='August';
                break;
            case 9:
                $('result8').innerHTML='September';
                break;
            case 10:
                $('result8').innerHTML='October';
                break;
            case 11:
                $('result8').innerHTML='November';
                break;
            case 12:
                $('result8').innerHTML='December';
                break;
            default:
                $('result8').innerHTML='Input a number between 1 to 12.';         
        }
    }
}
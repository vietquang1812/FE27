
// let a = prompt('Please enter a',5);
// a = parseInt(a);
// let b = prompt('Please enter a',5);
// b = parseInt(b);
// if(a==0){
//     if(b==0){
//         $('app').innerHTML = 'Phuong trinh co vo so nghiem.';
//     }else{
//         $('app').innerHTML = 'Phuong trinh vo nghiem';
//     }
// }else{
//     let nghiem = -b/a;
//     $('app').innerHTML = nghiem;
// }

function bai4(){
    let numa = $('na').value;
    let numb = $('nb').value;
    numa = parseInt(numa);
    numb = parseInt(numb);
    if(isNaN(numa) || isNaN(numb)){
        alert('Value not a number');
    }else{
        if(numa==0){
            if(numb==0){
                $('result4').innerHTML = 'Phuong trinh co vo so nghiem.';
            }else{
                $('result4').innerHTML = 'Phuong trinh vo nghiem';
            }
        }else{
            let nghiem = -numb/numa;
            $('result4').innerHTML = nghiem;
        }
    }
}
// const $ = id => {
//     return document.getElementById(id);
// }
let ar = [2,1,3,4,6,5];
function bubbleSort(array){
    let size = array.length;
    // let haveSwap = Boolean(true);
    for(let i=0; i<size-1; i++){
        for(let j=0; j<size-i-1; j++){
            // haveSwap = false;
            if(array[j]>array[j+1]){
                let temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
                // haveSwap = false;
            }
            // if(haveSwap == true){
            //     break;
            // }
        }
    }
    $('result2').innerHTML = array.join('-');
}
function bai2(){
    bubbleSort(ar);
}
// bubbleSort(ar);
console.log(ar);
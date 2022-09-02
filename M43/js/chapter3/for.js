const $ = function(id) {
    return document.getElementById(id);
}
let num = prompt('please enter a number');
num = parseInt(num);
if(isNaN(num)) {
    alert('this is not a number');
} else {
    if(num <= 0) {
        alert('this is a number < 0');

    } else {
        for(let i = 0; i< num; i ++) {
            if(i == 5) continue;
            $('app').innerHTML += i +' - ';
            // if(i > 5) break;

        }
        $('app').innerHTML += num
    }
}

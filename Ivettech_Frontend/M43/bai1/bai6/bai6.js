let num = prompt('Please a number');
num = parseInt(num);

function sumNumber(num) {
  if(isNaN(num) && num < 0) {
    alert('Number is not valid');
  } else {
    let n = num + 50;
    console.log(n);
    let sum = 0;
    for (let i = num; i <= n; i++) {
      sum = sum + i;
    }
    console.log(sum)
    alert('Tong cua 50 so tiep theo la: ' + sum);
  }
}

sumNumber(num);
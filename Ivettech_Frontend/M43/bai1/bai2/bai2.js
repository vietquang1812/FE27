const $ = (id) => {
  return document.getElementById(id);
}

const arr = [1, 4, 5, 6, 6, 3];
const n = arr.length;

for (let i = 0; i < n; i++) {
  arr[i] = prompt(`Enter array element: ${i + 1}`);
}

function bubbleSort(arr) {
  let dem = 0;
  for(let i = 0; i < n - 1; i++) {
    for(let j = n - 1; j > i; j--) {
      if (arr[j] < arr[j - 1]) {
        let temp = arr[j];
        arr[j] = arr[j - 1];
        arr[j - 1] = temp;
        dem++;
      }
    }
    console.log(`Number change: ${dem}`);
    $('app').innerHTML = arr.join(' - ');
  }
}

bubbleSort(arr);

console.log(arr);

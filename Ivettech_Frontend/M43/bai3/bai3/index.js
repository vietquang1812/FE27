'use strict'

function bangcuuchuong() {
  document.write('<div style="width: 100%; text-align: center;">')
  for (let i = 1; i <= 9; i++) {
    document.write('<div style="width: 9%; float: left; padding: 5px; margin: 8px; border: 1px solid red"');
    for(let j = 0; j <= 10; j++) {
      document.write(i + ' x ' + j + ' = ' + (i * j) + "<br>");
    }
    document.write('</div>')
  }
  document.write('</div>')
}

bangcuuchuong();
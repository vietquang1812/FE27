'use strict';

const str = 'badgea@gmail.c';
// const pattern = new RegExp('Badge', 'i');
const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

try {
a = 4;
} catch(e) {
    throw new Error('a chua khai bao');
}
// alert(pattern.test(str));
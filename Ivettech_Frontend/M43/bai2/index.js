'use strict'

const $ = (id) => {
  return document.getElementById(id)
}

let orderIdArr = [];

$('form').onsubmit = function(e) {
  e.preventDefault();
  if(!checkedValidate()) {
    e.preventDefault();
  }
}

$('orderId').onkeydown = () => {
  const orderId = $('orderId').value;
  if (orderId == '') {
    $('orderId_error').firstChild.nodeValue = 'Order Id can not be blank'
  }
  else if (orderId != '') {
    for (let i = 0; i < orderIdArr.length - 1; i++) {
      for (let j = i + 1; j < orderIdArr.length; j++) {
        if(orderIdArr[j] == orderIdArr[i]) {
          $('orderId_error').firstChild.nodeValue = 'Order Id can not be duplicated'
        }
      }
    }
  } 
  else {
    $('orderId_error').firstChild.nodeValue = '';
  }
}

$('name').onkeydown = () => {
  const name = $('name').value;
  if (name == '') {
    $('name_error').firstChild.nodeValue = 'Name can not be blank';
  } else {
    $('name_error').firstChild.nodeValue = '';
  }
}

$('price').onkeydown = () => {
  const price = $('price').value;
  if (price == '') {
    $('price_error').firstChild.nodeValue = 'Price can not be blank';
  } 
  else if (price <= 0){
    $('price_error').firstChild.nodeValue = 'Price must be > 0';
  } else {
    $('price_error').firstChild.nodeValue = '';
  }
}

$('quantity').onkeydown = () => {
  const quantity = $('quantity').value;
  quantity = parseInt(quantity);
  if (quantity == '') {
    $('quantity_error').firstChild.nodeValue = 'Quantity is not be blank';
  } else if (quantity <= 0) {
    $('quantity_error').firstChild.nodeValue = 'Quantity must be > 0';
  } else {
    $('quantity_error').firstChild.nodeValue = '';
  }
}

function checkedValidate() {
  const orderId = $('orderId').value;
  const name = $('name').value;
  const price = $('price').value;
  const quantity = $('quantity').value;
  let is_valid = true;
  if (orderId == '') {
    is_valid = false
    $('orderId_error').firstChild.nodeValue = 'Order Id can not be blank'
  }
  else if (orderId != '') {
    for (let i = 0; i < orderIdArr.length - 1; i++) {
      for (let j = i + 1; j < orderIdArr.length; j++) {
        if(orderIdArr[j] == orderIdArr[i]) {
          is_valid = false
          $('orderId_error').innerHTML = 'Order Id can not be duplicated'
        }
      }
    }
  } 
  else {
    $('orderId_error').innerHTML = '';
  }
  
  if (name == '') {
    is_valid = false;
    $('name_error').innerHTML = 'Name can not be blank';
  } else {
    $('name_error').innerHTML = '';
  }

  if (price == '') {
    is_valid = false
    $('price_error').innerHTML = 'Price can not be blank';
  } 
  else if (price <= 0){
    is_valid = false
    $('price_error').innerHTML = 'Price must be > 0';
  } else {
    $('price_error').innerHTML = '';
  }
  
  if (quantity == '') {
    is_valid = false
    $('quantity_error').innerHTML = 'Quantity is not be blank';
  } else if (quantity <= 0) {
    is_valid = false
    $('quantity_error').innerHTML = 'Quantity must be > 0';
  } else {
    $('quantity_error').innerHTML = '';
  }

  return is_valid;
}
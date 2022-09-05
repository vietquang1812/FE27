'use strict'

const $ = (id) => {
  return document.getElementById(id)
}

let data = [];

function addProduct() {
  let order_id = $('orderId').value;
  let name = $('name').value;
  let price = $('price').value;
  price = parseInt(price);
  let quantity = $('quantity').value;
  quantity = parseInt(quantity);
  let amount = price * quantity;
  let item = {
    Id: order_id,
    Name: name,
    Price: price,
    Quantity: quantity,
    Amount: amount,
  }

  let index = data.findIndex((c)=>c.Id == item.id);

  if (index >= 0) {
    data.splice(index, 1, item);
  } else {
    data.push(item);
    console.log(data);
  }
  renderData();
  totalAmount();
  clearData();
}

function renderData() {
  let table = `<tr>
    <th>Order ID</th>
    <th>Name</th>
    <th>Price</th>
    <th>Quantity</th>
    <th>Total</th>
    <th>Actions</th>
  </tr>`
  for(let i = 0; i < data.length; i++) {
    table += `<tr>
      <th>${data[i].Id}</th>
      <th>${data[i].Name}</th>
      <th>${data[i].Price}</th>
      <th>${data[i].Quantity}</th>
      <th>${data[i].Amount}</th>
      <th>
        <button onclick="deleteItem(${data[i].Id})>Delete</button>
        <button type="button" onclick="editItem(${data[i].Id})>Edit</button>
      </th>
    </tr>`
  }
  $('render').innerHTML = table;
}

function clearData() {
  $('orderId').value = "";
  $('name').value = "";
  $('price').value = "";
  $('quantity').value = "";
}

function deleteItem(id) {
  for(let i = 0; i < data.length; i++) {
    if(data[i].Id == id) {
      data.splice(i, 1);
      renderData();
      totalAmount();
    }
  }
}

function editItem(id) {
  for(let i = 0; i < data.length; i++) {
    if(data[i].Id == id) {
      $('orderId').value = data[i].Id;
      $('name').value = data[i].Name;
      $('price').value = data[i].Price;
      $('quantity').value = data[i].Quantity;
    }
  }
} 

function totalAmount() {
  let sum = 0;
  for(let i = 0; i < data.length; i++) {
    let total = data[i].Amount;
    sum += total;
  }
  $('resultTotal').innerHTML = sum;
  console.log(sum);
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
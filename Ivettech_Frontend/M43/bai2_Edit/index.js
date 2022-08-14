'use strict';

const $ = id => {
  return document.getElementById(id);
}

const $tr = ($items) => {
  let tr = document.createElement('tr');
  $items.forEach(item => {
    tr.appendChild(item);
  })
  return tr;
}

const $td = (text) => {
  const $text = document.createTextNode(text);
  const td = document.createElement('td');
  td.appendChild($text);
  return td;
}

const $btn = (text, classes, handerEvent) => {
  const btn = document.createElement('button');
  btn.setAttribute('type', 'button');
  btn.className = classes;
  const $text = document.createTextNode(text);
  btn.appendChild($text);
  btn.addEventListener('click', handerEvent);
  return btn;
}

const managerBill = {
  bills: [],
  add: function(order_id, product_name, price, quantity) {
    const item = {
      order_id,
      product_name,
      price,
      quantity,
      amount: function() {
        return this.price * this.quantity;
      }
    };
    this.bills.push(item);
  },

  update: function(old_order_id, order_id, product_name, price, quantity) {
    const item = this.bills.find(t => t.order_id == old_order_id);
    if (item == null) {
      alert('Item is no exist');
      return;
    }
    item.order_id = order_id;
    item.product_name = product_name;
    item.price = price;
    item.quantity = quantity;
    $('submit').classList.remove('d-none');
    $('update').classList.add('d-none');
  },
  
  total: function() {
    let sum = 0;
    for (let i = 0; i < this.bills.length; i++) {
      sum += this.bills[i].amount();
    }
    return sum;
  },

  setForm: function(id) {
    const item = this.bills.find(item => item.order_id == id);
    if(item == null) return;
    $('order_id').value = item.order_id;
    $('product_name').value = item.product_name;
    $('price').value = item.price;
    $('quantity').value = item.quantity;

    $('update').value = item.order_id;
    $('update').classList.remove('d-none');
    $('submit').classList.add('d-none');
  },

  show: function() {
    $('bills').innerHTML = '';
    for(let i = 0; i < this.bills.length; i++) {
      const $order_id = $td(this.bills[i].order_id);
      const $name = $td(this.bills[i].product_name);
      const $price = $td(this.bills[i].price);
      const $quantity = $td(this.bills[i].quantity);
      const $amount = $td(this.bills[i].amount());

      const $action = document.createElement('td');
      const $edit = $btn('Edit', 'btn btn-info', this.setForm.bind(this, this.bills[i].order_id));
      $action.appendChild($edit);
      const $row = $tr([$order_id, $name, $price, $quantity, $amount, $edit]);
      $('bills').appendChild($row);
    }
    $('total').innerHTML = this.total();
  },

  checkExistId: function(id) {
    let is_exist = false;
    for(let i = 0; i < this.bills.length; i++) {
      if(id == this.bills[i].order_id) {
        is_exist = true;
        break;
      }
    }
    return is_exist;
  }
}

$('submit').onclick = () => {
  const order_id = $('order_id').value;
  const product_name = $('product_name').value;
  const price = $('price').value;
  const quantity = $('quantity').value;

  if(managerBill.checkExistId(order_id) || order_id == '') {
    alert('Order ID not null or has exist');
    return;
  }
  if(product_name == '') {
    alert('Product name is required');
    return;
  }
  if(isNaN(price) || price <= 0) {
    alert('Price is invlaid');
    return;
  }
  if(isNaN(quantity) || parseInt(quantity) != quantity) {
    alert('Quantity is invalid');
    return;
  }
  managerBill.add(order_id, product_name, price, quantity);
  managerBill.show();
  $('order_id').value = '';
  $('product_name').value = '';
  $('price').value = '';
  $('quantity').value = '';
}


$('update').onclick = () => {
  const order_id = $('order_id').value;
  const product_name = $('product_name').value;
  const price = $('price').value;
  const quantity = $('quantity').value;
  const old_order_id = $('update').value;

  if(order_id == '') {
    alert('Order ID not null');
    return;
  }
  if(product_name == '') {
    alert('Product name is required');
    return;
  }
  if(isNaN(price) || price <= 0) {
    alert('Price is invlaid');
    return;
  }
  if(isNaN(quantity) || parseInt(quantity) != quantity) {
    alert('Quantity is invalid');
    return;
  }
  managerBill.update(old_order_id, order_id, product_name, price, quantity);
  managerBill.show();
  $('order_id').value = '';
  $('product_name').value = '';
  $('price').value = '';
  $('quantity').value = '';
}
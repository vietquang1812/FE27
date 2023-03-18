'use strict'

const managerOrder = {
  orders: [],
  store: {
    get: null,
    set: null
  },
  add: null,
  validate: null,
  auto_increase_id: 1,
}

managerOrder.Order = function(id = 0, name = '', email = '', mobile = '', address = '', line_items = []) {
  this.id = id;
  this.name = name;
  this.email = email;
  this.mobile = mobile;
  this.address = address;
  this.line_items = line_items;
}

managerOrder.Order.prototype.itemsTable = function() {
  if(this.line_items.length == 0) return document.createElement('table');

  const $thead = pubLic.$titles(['No.', 'Name', 'Price', "Quantity"]);
  let $rows = [];
  this.line_items.forEach((item, index) => {
      const p = managerProduct.find(item.id);
      if(p != null) {
          const $no = pubLic.$cells(index + 1);
          const $name = pubLic.$cells(p.name);
          const $price = pubLic.$cells(p.price + ' VNĐ ');
          const $quantity = pubLic.$cells(item.quantity);
          const $row = pubLic.$rows([$no, $name, $price, $quantity]);
          $rows.push($row);
      }
      
  })

  const $table = pubLic.$table($thead, $rows);
  return $table;
}

managerOrder.add = function(name, email, mobile, address) {
  this.orders.push(
    new managerOrder.Order(this.auto_increase_id++, name, email, mobile, address, managerCart.line_items)
  );
  this.store.set();
  managerCart.line_items.length = 0;
  managerCart.store.set();
  managerCart.show();
  alert('Order has completed');
  window.location.href = 'index.html'
}

managerOrder.store.get = function() {
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  managerOrder.orders = orders.map(o => new managerOrder.Order(o.id, o.name,o.email, o.mobile, o.address, o.line_items))
  managerOrder.auto_increate_id = Math.max(...orders.map(o => o.id), 0) + 1;
}

managerOrder.store.set = function() {
  localStorage.setItem('orders', JSON.stringify(managerOrder.orders));
}

managerOrder.find = function(id) {
  this.store.set();
  return this.orders.find(o => o.id == id)
}


managerOrder.validate = function(name, email, mobile, address) {
  if(name == '') {
      alert('name is required');
      return false;
  }
  if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) || email =='') {
      alert('email invalid');
      return false;
  }

  if(mobile == '' || !/\d{10}/.test(mobile)) {
      alert('mobile invalid');
      return false;
  }
  if(address == '') {
      alert('address in required');
      return false;
  }
  return true;
}

managerOrder.store.get();

$('submit').onclick = function() {
  const name = $('name').value;
  const email = $('email').value;
  const mobile = $('mobile').value;
  const address = $('address').value;
  const is_valid = managerOrder.validate(name, email, mobile, address);
  if(is_valid) {
    managerOrder.add(name, email, mobile, address)
  }
}


managerCart.show()
'use strict'

const managerOrders = {
  order: [],
  store: {
    get: null,
    set: null
  },
  auto_increase_id: 1,
  show: null,
  delete: null
}

managerOrders.store.get = function() {
  const jsondata = localStorage.getItem('orders') || '[]';
  console.log(jsondata);
  managerOrders.order = JSON.parse(jsondata) 
}

managerOrders.store.set = function() {
  localStorage.setItem('order', JSON.stringify(managerOrders.order))
}

managerOrders.delete = function(id) {
  const index = this.order.findIndex(p => p.id == id);
  if(index >= 0) {
    this.order.splice(index, 1);
    this.store.set();
    this.show();
  }
}


managerOrders.show = function() {
  $('order').innerHTML = '';
  let titles = ['No', 'Name', 'Email', 'Mobile', 'Address', 'Detail', 'Total', 'Action']
  let $rows = [];
  const $thead = pubLic.$titles(titles);
  console.log(this.order);
  this.order.forEach((item, i) => {
    let sum = 0;
    const o = managerOrder.find(item.id);
    const $no = pubLic.$cells(i + 1);
    const $name = pubLic.$cells(o.name);
    const $email = pubLic.$cells(o.email);
    const $mobile = pubLic.$cells(o.mobile);
    const $address = pubLic.$cells(o.address);
    const $detail = pubLic.$cells(o.itemsTable())

    item.line_items.forEach(item => {
      const p = managerProduct.find(item.id);
      sum += item.quantity * p.price;
    })
    const $action = document.createElement('td');
    const $delete = pubLic.$btn('Delete', 'ms-2 btn btn-sm btn-danger', this.delete.bind(this, item.id));
    $action.appendChild($delete);
    const $total = pubLic.$cells(pubLic.formatPrice(sum) + ' VNĐ ');
    let $row = [$no, $name, $email, $mobile, $address, $detail, $total, $action];
    $rows.push(pubLic.$rows($row));
  })
  $('order').appendChild(pubLic.$table($thead, $rows));
}

managerOrders.store.get();

managerOrders.show();
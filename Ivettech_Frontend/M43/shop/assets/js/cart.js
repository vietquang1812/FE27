'use strict'
const managerCart = {
  line_items: [],
  add_to_card: null,
  remove_item: null,
  change_quantity: null,
  show: null,
  store: {
    get: null,
    set: null,
  },
}

managerCart.store.get = function () {
  const jsondata = localStorage.getItem('cart') || '[]'
  managerCart.line_items = JSON.parse(jsondata)
}

managerCart.store.set = function () {
  localStorage.setItem('cart', JSON.stringify(managerCart.line_items))
}

managerCart.add_to_card = function (id) {
  const index = this.line_items.findIndex((item) => item.id == id)
  if (index == -1) {
    this.line_items.push({
      id,
      quantity: 1,
    })
  } else {
    this.change_quantity(id, 1)
  }

  this.show()
  this.store.set()
}

managerCart.show = function () {
  const has_image = location.pathname.indexOf('payment.html') >= 0
  let titles = ['No.', 'Name', 'Quantity', 'Amount'];
  if(has_image) {
    titles.splice(2, 0, 'Image');
  }

  const $thead = pubLic.$titles(titles);
  let $rows = [];
  let sum = 0;
  this.line_items.forEach((item, i) => {
    const p = managerProduct.find(item.id)
    sum += item.quantity * p.price
    const $no = pubLic.$cells(i + 1)
    const $name = pubLic.$cells(p.name)
    const $quantity = pubLic.$cells(item.quantity)
    const $amount = pubLic.$cells(item.quantity * p.price + ' VNĐ', 'text-end')
    const $dec = pubLic.$btn('-', 'btn btn-sm btn-outline-danger', this.change_quantity.bind(this, item.id, -1));
    const $inc = pubLic.$btn('+', 'btn btn-sm btn-outline-success', this.change_quantity.bind(this, item.id, 1));
    const $div = pubLic.$div('d-flex justify-content-between', [$dec, $quantity, $inc]);
    const $cell_quantity = pubLic.$cells($div)

    let $row = [$no, $name, $cell_quantity, $amount]
    if(has_image) {
      const $image = pubLic.$cellImage(p.url);
      $row.splice(2, 0, $image);
    }
    $rows.push(pubLic.$rows($row))
  })
  $('cart').innerHTML = ''
  $('total').innerHTML = `${sum}&nbspVNĐ`
  $('cart').appendChild(pubLic.$table($thead, $rows))
}

managerCart.change_quantity = function (id, num) {
  const item = this.line_items.find((t) => t.id == id)
  if (item != null) {
    if (item.quantity + num <= 0) {
      const confirm_delete = confirm(
        `do you want to delete ${item.name} in cart`,
      )
      if (confirm_delete) {
        this.line_items = this.line_items.filter((t) => t.id != id)
      }
    } else {
      item.quantity += num
    }
    this.store.set()
    this.show()
  }
  // if (item.quantity <= 0) {
  //   this.line_items = this.line_items.filter((t) => t.id != id)
  // }
}

managerCart.store.get()

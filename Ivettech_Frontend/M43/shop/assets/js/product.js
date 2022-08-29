'use strict'

const managerProduct = {
  store: {
    get: null,
    set: null,
  },
  products: [],
  auto_increase_id: 1,
  add: null,
  update: null,
  cancel: null,
  show: null,
  setForm: null,
  delete: null,
  validate: null,
}

managerProduct.Product = function (
  id = 0,
  name = '',
  url = '',
  price = 0,
  quantity = 0,
) {
  this.id = id
  this.name = name
  ;(this.url = url), (this.price = price)
  this.quantity = quantity
}

managerProduct.Product.prototype.initRowTable = function ($action) {
  const $id = pubLic.$cells(this.id)
  const $name = pubLic.$cells(this.name)
  const $url = pubLic.$cellImage(this.url)
  const $price = pubLic.$cells(this.price)
  const $quantity = pubLic.$cells(this.quantity)
  const $row = pubLic.$rows([$id, $name, $url, $price, $quantity, $action])
  return $row
}

managerProduct.store.set = function () {
  localStorage.setItem('products', JSON.stringify(managerProduct.products))
}

managerProduct.store.get = function () {
  const data_json = localStorage.getItem('products') || '[]'
  const data = JSON.parse(data_json)

  managerProduct.products = data.map(
    (item) =>
      new managerProduct.Product(
        item.id,
        item.name,
        item.url,
        item.price,
        item.quantity,
      ),
  )

  managerProduct.auto_increase_id =
    Math.max(...data.map((item) => item.id), 0) + 1
  // managerProduct.show();
  return managerProduct.products
}

managerProduct.add = function (name, url, price, quantity) {
  const product = new this.Product(
    this.auto_increase_id++,
    name,
    url,
    price,
    quantity,
  )
  this.products.push(product)
  this.store.set()
  this.show()
}

managerProduct.update = function (id, name, url, price, quantity) {
  const pr = this.products.find((p) => p.id == id)
  if (pr == null) {
    alert('Product is not exist')
    return
  }
  pr.name = name
  pr.url = url
  pr.price = price
  pr.quantity = quantity
  this.store.set()
  this.setForm(new this.Product())
  this.show()
}

managerProduct.delete = function (id) {
  const index = this.products.findIndex((p) => p.id == id)
  if (index >= 0) {
    this.products.splice(index, 1)
    this.store.set()
    this.setForm(new this.Product())
    this.show()
  }
}

managerProduct.cancel = function () {
  this.setForm(new this.Product())
}

managerProduct.show = function (products = this.products) {
  $('products').innerHTML = ''
  if (products.length == 0) {
    $('products').innerHTML = '<p class="text-center">No Product in store</p>'
    return
  }
  const $thead = pubLic.$titles([
    'ID',
    'Name',
    'URL',
    'Price',
    'Quantity',
    'Action',
  ])
  let $rows = []
  products.forEach((p) => {
    const $action = document.createElement('td')
    const $edit = pubLic.$btn(
      'Edit',
      'btn btn-warning',
      this.setForm.bind(this, p),
    )
    const $delete = pubLic.$btn(
      'Delete',
      'btn btn-danger ms-2',
      this.delete.bind(this, p.id),
    )
    $action.appendChild($edit)
    $action.appendChild($delete)
    $rows.push(p.initRowTable($action))
  })
  const $table = pubLic.$table($thead, $rows)
  $('products').appendChild($table)
}

managerProduct.setForm = function (p) {
  $('product_name').value = p.name
  $('product_image').value = p.url
  $('price').value = parseFloat(p.price)
  $('quantity').value = parseInt(p.quantity)
  if (p.id != 0) {
    $('update_product').value = p.id
    $('update_product').classList.remove('d-none')
    $('cancel').classList.remove('d-none')
    $('add_product').classList.add('d-none')
  } else {
    $('update_product').classList.add('d-none')
    $('cancel').classList.add('d-none')
    $('add_product').classList.remove('d-none')
  }
}

managerProduct.validate = function (name, url, price, quantity) {
  if (name == '') {
    alert('Name is required')
    return false
  }
  if (url == '') {
    alert('Url is required')
    return false
  }
  if (price == '' || isNaN(price) || parseFloat(price) <= 0) {
    alert('Price is invalid')
    return false
  }
  if (quantity == '' || isNaN(quantity) || parseInt(quantity) <= 0) {
    alert('Quantity is invalid')
    return fasle
  }
  return true
}

managerProduct.productExist = function () {
  return this.products.filter((p) => p.quantity > 0)
}

managerProduct.find = function (id) {
  this.store.get()
  return this.products.find((p) => p.id == id)
}

managerProduct.store.get();

$('add_product').onclick = function () {
  const name = $('product_name').value
  const url = $('product_image').value
  let price = $('price').value
  price = parseFloat(price)
  let quantity = $('quantity').value
  quantity = parseInt(quantity)
  if (managerProduct.validate(name, url, price, quantity)) {
    managerProduct.add(name, url, price, quantity)
  }
}

$('update_product').onclick = function () {
  const id = this.value
  const name = $('product_name').value
  const url = $('product_image').value
  let price = $('price').value
  price = parseFloat(price)
  let quantity = $('quantity').value
  quantity = parseInt(quantity)
  if (managerProduct.validate(name, url, price, quantity)) {
    managerProduct.update(id, name, url, price, quantity)
  }
}
$('cancel').onclick = function () {
  managerProduct.cancel()
}

managerProduct.show();



'use strict'

const $ = (id) => {
  return document.getElementById(id)
}

import { pubLic } from './public.js'

const product = function () {
  const Product = function (
    id = 0,
    name = '',
    url = '',
    price = 0,
    quantity = 0,
  ) {
    this.id = id
    this.name = name
    this.url = url
    this.price = parseFloat(price)
    this.quantity = parseInt(quantity)
  }

  Product.prototype.initRowTable = function (index, $action) {
    const $id = pubLic.$cells(this.id)
    const $name = pubLic.$cells(this.name)
    const $url = pubLic.$cells(this.url)
    const $price = pubLic.$cells(this.price)
    const $quantity = pubLic.$cells(this.quantity)
    const $row = pubLic.$rows([$id, $name, $url, $price, $quantity, $action])
    return $row
  }

  const managerProduct = {
    getStorage: null,
    setStorage: null,
    products: [],
    auto_increase_id: 1,
    add: null,
    update: null,
    cancel: null,
    show: null,
    setForm: null,
    delete: null,
    validate: null,
    initTable: null,
  }

  managerProduct.setStorage = function () {
    localStorage.setItem('products', JSON.stringify(this.products))
  }

  managerProduct.getStorage = function () {
    this.products = JSON.parse(localStorage.getItem('products') || '[]').map(
      (p) => new Product(p.id, p.name, p.url, p.price, p.quantity),
    )
    this.show()
    this.auto_increase_id = Math.max(...this.products.map((p) => p.id), 0) + 1
  }

  managerProduct.add = function (name, url, price, quantity) {
    const product = new Product(
      this.auto_increase_id++,
      name,
      url,
      price,
      quantity,
    )
    this.products.push(product)
    this.setStorage()
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
    this.setStorage()
    this.setForm(new Product())
    this.show()
  }

  managerProduct.delete = function (id) {
    const index = this.products.findIndex((p) => p.id == id)
    if (index == 1) return
    this.products.splice(index, 1)
    this.setStorage()
    this.show()
  }

  managerProduct.cancel = function () {
    this.setStorage()
    this.setForm(new Product())
    this.show()
  }

  managerProduct.show = function () {
    $('products').innerHTML = ''
    this.products.forEach((p, i) => {
      const $action = document.createElement('td')
      const $edit = pubLic.$btn(
        'Edit',
        'btn btn-warning ml-2',
        this.setForm.bind(this, p),
      )
      const $delete = pubLic.$btn(
        'Delete',
        'btn btn-danger',
        this.delete.bind(this, p.id),
      )
      $action.appendChild($edit)
      $action.appendChild($delete)
      $('products').appendChild(p.initRowTable(i, $action))
    })
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
    if (price == '' || isNaN(price) || price < 0) {
      alert('Price is invalid')
      return false
    }
    if (quantity == '' || isNaN(quantity) || quantity < 0) {
      alert('Quantity is invalid')
      return fasle
    }
    return true
  }

  managerProduct.getStorage()

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
}
product()

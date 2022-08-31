'use strict';

const managerOrder = {
    orders: [],
    store: {
        get: null,
        set: null
    },
    add: null,
    validate: null,
    init: null,
    DOM: {
        $add: null
    },
    auto_increate_id: 1,
}

managerOrder.Order = function(id=0, name="", email = '', mobile='', address='', line_items = []) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.mobile = mobile;
    this.address = address;
    this.line_items = line_items;

}
managerOrder.Order.prototype.itemsTable = function() {
    if(this.line_items.length == 0) return document.createElement('table');

    const $thead = common.$titles(['No.', 'Name', 'Price', "Quantity"]);
    let $rows = [];
    this.line_items.forEach((item, index) => {
        const product = managerProduct.find(item.id);
        if(product != null) {
            const $no = common.$cell(index+1);
            const $name = common.$cell(product.name);
            const $price = common.$cell('$'+product.price);
            const $quantity = common.$cell(item.quantity);
            const $row = common.$row([$no, $name, $price, $quantity]);
            $rows.push($row);
        }
        
    })

    const $table = common.$table($thead, $rows);
    return $table;
}
managerOrder.Order.prototype.total = function() {
    let sum = 0;
    this.line_items.forEach(item => {
        const product = managerProduct.find(item.id);
        if(product != null)
            sum += item.quantity*product.price;
    })
    return sum;
}

managerOrder.Order.prototype.search = function(s = '') {
    const pattern = new RegExp(s, 'i');
    if(pattern.test(this.name)) {
        return true;
    }
    if(pattern.test(this.email)) {
        return true;
    }
    if(pattern.test(this.mobile)) {
        return true;
    }
    if(pattern.test(this.address)) {
        return true;
    }
    let has_product = false;

    this.line_items.forEach(t => {
        const p = managerProduct.find(t.id);
        if(p != null && pattern.test(p.name)) {
            has_product = true;
        }
    })

    return has_product;
}

managerOrder.Order.prototype.initRowTable = function($action) {
    const $id = common.$cell(this.id);
    const $name = common.$cell(this.name);
    const $email = common.$cell(this.email);
    const $mobile = common.$cell(this.mobile);
    const $address = common.$cell(this.address);
    const $detail = common.$cell(this.itemsTable());
    const $sum = common.$cell('$'+common.formatPrice(this.total()));
    const $row = common.$row([$id, $name, $email, $mobile, $address, $detail, $sum, $action]);
    return $row;
}
managerOrder.countOrders = function(price = 2000) {
    const orders = this.orders.filter(o => o.total() >= price)
    return orders.length
}
managerOrder.add = function(name, email, mobile, address) {
    this.orders.push(
        new managerOrder.Order(this.auto_increate_id++, name, email, mobile, address, managerCart.line_items)
    );
    managerCart.line_items.forEach(item => {
        const product = managerProduct.find(item.id);
        product.quantity -= item.quantity;
    })
    managerProduct.store.set();
    this.store.set();
    managerCart.line_items.length = 0;
    managerCart.store.set();
    managerCart.show();
    alert('Order has completed');
    window.location.href = 'index.html'
}

managerOrder.show = function(orders = this.orders) {
    if(orders.length == 0) {
        // const p = document.createElement('p');
        // p.className = 'text-center text-secondary';
        // const emptyText = document.createTextNode('Orders is empty');
        // p.appendChild(emptyText);
        // $('orders').appendChild(p);
        $('orders').innerHTML = '<p class="text-center text-secondary">Orders is empty</p>'
        return;
    }
    const $thead = common.$titles(['ID', 'Name','Email', 'Mobile', 'Address', 'Detail', 'Total', 'Action']);
    let $rows = []
    orders.forEach(o => {
        const $dlte = common.$btn('Delete', 'btn btn-sm btn-danger', this.delete.bind(this, o.id));
        const $action = common.$cell($dlte);
        $rows.push(o.initRowTable($action));
    });

    const $table = common.$table($thead, $rows);
    $('orders').innerHTML = '';
    $('orders').appendChild($table);
}
managerOrder.delete = function(id) {
    const index = this.orders.findIndex(o => o.id == id);
    if(index >= 0) {
        this.orders.splice(index, 1);
        this.show();
    }
}
managerOrder.store.get = function() {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    managerOrder.orders = orders.map(o => new managerOrder.Order(o.id, o.name,o.email, o.mobile, o.address, o.line_items))
    managerOrder.auto_increate_id = Math.max(...orders.map(o => o.id), 0) + 1;
}

managerOrder.store.set = function() {
    localStorage.setItem('orders', JSON.stringify(managerOrder.orders));
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
managerOrder.search = function(s) {
    const orders = this.orders.filter(o => o.search(s));
    this.show(orders);
}
managerOrder.init = function($add) {
    managerOrder.DOM.$add = $add;
    $add.onclick = function() {
        const name = $('name').value;
        const email = $('email').value;
        const mobile = $('mobile').value;
        const address = $('address').value;
        const is_valid = managerOrder.validate(name, email, mobile, address)
        if(is_valid) {
            managerOrder.add(name, email, mobile, address)
        }
    }
}

managerOrder.store.get();
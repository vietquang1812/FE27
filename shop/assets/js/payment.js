'use strict';

managerCart.show();

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
managerOrder.add = function(name, email, mobile, address) {
    this.orders.push(
        new managerOrder.Order(this.auto_increate_id++, name, email, mobile, address, managerCart.line_items)
    );
    this.store.set();
    managerCart.line_items.length = 0;
    managerCart.store.set();
    managerCart.show();
    alert('Order has completed');
    window.location.href = 'index.html'
}

managerOrder.store.get = function() {
    managerOrder.orders = JSON.parse(localStorage.getItem('orders') || '[]');

    managerOrder.auto_increate_id = Math.max(...managerOrder.orders.map(o => o.id), 0) + 1;
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
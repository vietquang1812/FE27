'use strict';

const product = (function() {
    
    const managerProduct = {
        auto_increase_id: 1
    };
    managerProduct.Product = function(id=0, name="",url='', price=0, quantity=0) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.price = parseFloat(price);
        this.quantity = parseInt(quantity);
    }

    managerProduct.Product.prototype.initRowTable = function($action) {
        const $id = common.$cell(this.id);
        const $name = common.$cell(this.name);
        const $price = common.$cell(this.price);
        const $quantity = common.$cell(this.quantity);
        const $row = common.$row([$id, $name, $price, $quantity, $action]);
        return $row;
    }

    managerProduct.add = function(name, url, price, quantity) {

    }
})()
product();
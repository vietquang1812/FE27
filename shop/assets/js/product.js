'use strict';

// const product = (function() {
    
    const managerProduct = {
        auto_increase_id: 1,
        products: [],
        store: {},
        DOM: {},
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
        const $url = common.$cellImage(this.url);
        const $price = common.$cell(this.price);
        const $quantity = common.$cell(this.quantity);
        const $row = common.$row([$id, $name, $url, $price, $quantity, $action]);
        return $row;
    }

    managerProduct.add = function(name, url, price, quantity) {
        // this.products[this.products.length] = new this.Product(this.auto_increase_id++, name, url, price, quantity)
        this.products.push(new this.Product(this.auto_increase_id++, name, url, price, quantity));
        this.store.set();
        this.show();
    }

    managerProduct.update = function(id, name, url, price, quantity) {
        let product = this.products.find(p => p.id == id);
        if(product == null) {
            alert('Product is not exist!');
        }

        product.name = name;
        product.url = url;
        product.price = price;
        product.quantity = quantity;

        managerProduct.store.set();
        this.show();
    }

    managerProduct.delete = function(id) {
        const index = this.products.findIndex(p => p.id == id);
        if(index >=0) {
            this.products.splice(index, 1);
            this.store.set();
        }
    }


    managerProduct.setForm = function(product) {
        this.DOM.$name.value = product.name;
        this.DOM.$url.value = product.url;
        this.DOM.$price.value = product.price;
        this.DOM.$quantity.value = product.quantity;
        
        this.DOM.$update.value = product.id;

        if(product.id == 0) {
            this.DOM.$add.classList.remove('d-none');
            this.DOM.$update.classList.add('d-none');
            this.DOM.$cancel.classList.add('d-none');
        } else {
            this.DOM.$add.classList.add('d-none');
            this.DOM.$update.classList.remove('d-none');
            this.DOM.$cancel.classList.remove('d-none');
        }
    }
    
    managerProduct.initSort = function() {
        const $sortid = document.createElement('button');
        $sortid.className = 'btn btn-sm btn-info';
        $sortid.setAttribute('type','button');
        const $text = document.createTextNode('ID');
        $sortid.appendChild($text);

        $sortid.value = 'asc';

        $sortid.onclick = function() {
            if(this.value == 'asc') {
                this.value = 'desc';
                managerProduct.products = managerProduct.products.sort(
                    (a, b) => a.id -b.id
                )
            } else {
                this.value = 'asc';
                managerProduct.products = managerProduct.products.sort(
                    (a, b) => b.id - a.id
                )
            }
            managerProduct.show();
        }
        $('sorts').appendChild($sortid);
    }

    managerProduct.show = function(products = this.products) {
        this.DOM.$app.innerHTML = '';
        if(products.length == 0) {
            this.DOM.$app.innerHTML = '<p class="text-center">No Product in store</p>'
            return;
        }
        // const titles = ['ID', 'Name', 'URL','Price', "Quantity"];
        const $thead = common.$titles(['ID', 'Name', 'URL','Price', "Quantity", 'Action']);
        let $rows = [];
        products.forEach(p => {
            const $action = document.createElement('td');
            const $edit = common.$btn('Edit', 'btn btn-sm btn-info', this.setForm.bind(this, p));
            const $dlte = common.$btn('Delete', 'ms-2 btn btn-sm btn-danger', this.delete.bind(this, p.id));
            $action.appendChild($edit);
            $action.appendChild($dlte);
            $rows.push(p.initRowTable($action));
        });
        const $table = common.$table($thead, $rows);
        this.DOM.$app.appendChild($table);
        
    }

    managerProduct.validate = function(name, url, price, quantity) {
        // const name = this.DOM.$name.value;
        if(name == '') {
            alert('Name is required');
            return false;
        }

        // const url = this.DOM.$url.value;

        if(url == '') {
            alert('URL is required');
            return false;
        }
        // const price = this.DOM.$price.value;

        if(price == '' || isNaN(price) || parseFloat(price) <= 0) {
            alert('Price is required');
            return false;
        }

        // const quantity = this.DOM.$quantity.value;
        if(quantity == '' || isNaN(quantity) || parseInt(quantity) <= 0) {
            alert('Quantity is required');
            return false;
        }
        return true;
    }

    managerProduct.getData = function() {
        return {
            name: this.DOM.$name.value,
            url: this.DOM.$url.value,
            price: this.DOM.$price.value,
            quantity: this.DOM.$quantity.value,
        }
    }

    managerProduct.search = function(s) {
        const pattern = new RegExp(s, 'i');
        return this.products.filter(p => pattern.test(p.name));
    }
    
    managerProduct.store.set = function() {
        localStorage.setItem('products', JSON.stringify(managerProduct.products));
    }
    managerProduct.store.get = function() {
        const data_json = localStorage.getItem('products') || '[]';
        const data = JSON.parse(data_json);

        managerProduct.products = data.map(item => new managerProduct.Product(item.id, item.name, item.url, item.price, item.quantity));
        
        managerProduct.auto_increase_id = Math.max(...data.map(item => item.id), 0) + 1;
        return managerProduct.products;
    }

    managerProduct.productExist = function() {
        return this.products.filter(p => p.quantity > 0) 
    }
    managerProduct.find = function(id) {
        this.store.get();
        return this.products.find(p => p.id == id);
    } 

    managerProduct.init = function({$app, $add, $update, $cancel, $name, $url, $price, $quantity, $search}) {
        managerProduct.DOM.$app = $app
        managerProduct.DOM.$add = $add;
        managerProduct.DOM.$update = $update;
        managerProduct.DOM.$cancel = $cancel;
        managerProduct.DOM.$name = $name;
        managerProduct.DOM.$url = $url;
        managerProduct.DOM.$price = $price;
        managerProduct.DOM.$quantity = $quantity;


        $add.onclick = function() {
            const {name, url, price, quantity } = managerProduct.getData();
            if(managerProduct.validate(name, url, price, quantity)) {
                managerProduct.add(name, url, price, quantity);
                managerProduct.setForm(new managerProduct.Product());
            }
        }
        $update.onclick = function() {
            const id = this.value;
            const {name, url, price, quantity } = managerProduct.getData();
            if(managerProduct.validate(name, url, price, quantity)) {
                managerProduct.update(id,name, url, price, quantity);
                managerProduct.setForm(new managerProduct.Product());
            }
        }
        $cancel.onclick = function() {
            managerProduct.setForm(new managerProduct.Product());
        }

        $search.onkeydown = function() {
            const s = this.value;
            const ps = managerProduct.search(s);
            managerProduct.show(ps);
        }


        managerProduct.store.get();
        managerProduct.show();
        managerProduct.initSort();
    }



//     return {
//         init: managerProduct.init.bind(managerProduct),
//         get: managerProduct.productExist.bind(managerProduct),
//         update: managerProduct.update,
//         products: managerProduct.products,
//         find: managerProduct.find.bind(managerProduct)
//     }
// })()
managerProduct.store.get();

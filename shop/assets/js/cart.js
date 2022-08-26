'use strict';
const managerCart = {
    line_items: [],
    add_to_card: null,
    remove_item: null,
    change_quantity: null,
    show: null,
    store: {
        get: null,
        set: null,
    }
}

managerCart.store.get = function() {
    const jsondata = localStorage.getItem('cart') || '[]';
    managerCart.line_items = JSON.parse(jsondata);
}

managerCart.store.set = function() {
    localStorage.setItem('cart', JSON.stringify(managerCart.line_items));
}

managerCart.add_to_card = function(id) {
    const index = this.line_items.findIndex(item => item.id == id);
    if(index == -1) {
        this.line_items.push({
            id,
            quantity: 1,
        })
    } else {
        this.change_quantity(id, 1);
    }
    
    this.show();
    this.store.set();
}
managerCart.show = function() {
    const has_image = location.pathname.indexOf('payment.html') >=0
    let titles = ['No.', 'Name', 'Quantity', 'Amount'];
    if(has_image) titles.splice(2,0,'Image');

    const $thead = common.$titles(titles);
    let $rows = [];
    let sum = 0;
    this.line_items.forEach((item, i) => {
        const p = managerProduct.find(item.id);

        sum += item.quantity*p.price;

        const $no = common.$cell(i+1);
        const $name = common.$cell(p.name);
        const $quantity = common.$cell(item.quantity);
        const $amount = common.$cell('$'+item.quantity*p.price, 'text-end');

        const $dec = common.$btn('-', 'btn btn-sm btn-outline-danger', 
                                this.change_quantity.bind(this, item.id, -1)
                            );
        const $inc = common.$btn('+', 'btn btn-sm btn-outline-success',
                            this.change_quantity.bind(this, item.id, 1));

        const $div = common.$div('d-flex justify-content-between', [$dec, $quantity, $inc]);
        const $cell_quatity = common.$cell($div);
        
        let $row = [$no, $name,$cell_quatity,$amount];
        if(has_image) {
            const $image = common.$cellImage(p.url);
            $row.splice(2, 0, $image);
        }
        $rows.push(common.$row($row));

    })
    $('cart').innerHTML = '';
    $('total').innerHTML = `$${sum}`;
    $('cart').appendChild(common.$table($thead, $rows))
}

managerCart.change_quantity = function(id, num) {
    const item = this.line_items.find(t => t.id == id);
    if(item != null) {
        // item.quantity += num;
        if(item.quantity + num <= 0) {
            const confirm_dlte = confirm(`do u Want to delete ${item.name} in cart`);
            if(confirm_dlte) {
                this.line_items = this.line_items.filter(t => t.id != id);
            }
        } else {
            item.quantity += num;
        }
        this.store.set();
        this.show();
    }

    // if(item.quantity <= 0) {
    //     this.line_items = this.line_items.filter(t => t.id != id);
    // }
    
}
managerCart.store.get();

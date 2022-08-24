'use strict';
const managerCart = {
    line_items: [],
    add_to_card: null,
    remove_item: null,
    change_quantity: null,
    show: null,
    set: null,
    get: null,
}
managerCart.add_to_card = function(id) {
    this.line_items.push({
        id,
        quantity: 1,
    })
    this.show()
}
managerCart.show = function() {
    const $thead = common.$titles(['No.', 'Name', 'Quantity', 'Amount']);
    let $rows = [];
    this.line_items.forEach((item, i) => {
        const p = managerProduct.find(item.id);
        const $no = common.$cell(i+1);
        const $name = common.$cell(p.name);
        const $quantity = common.$cell(item.quantity);
        const $amount = common.$cell(item.quantity*p.price);

        $rows.push(common.$row([$no, $name,$quantity,$amount]));

    })
    $('cart').innerHTML = '';
    $('cart').appendChild(common.$table($thead, $rows))
}

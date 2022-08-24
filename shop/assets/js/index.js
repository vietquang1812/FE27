'use strict';

const managerHome = {
    show: null,
    
}

managerHome.show = function() {
    const products = managerProduct.productExist();
        products.forEach(p => {
        const $col = common.$colProduct(p, managerCart.add_to_card.bind(managerCart, p.id));
        $('products').appendChild($col);
    })
}

managerHome.show();
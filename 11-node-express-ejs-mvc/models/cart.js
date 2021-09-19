const fs = require('fs');
const path = require('path');

const prodFPath = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);

module.exports = class Cart {
    static addProduct(id, productPrice) {
        // Fetch the previous cart
        //let cart = {products: [], totalPrice: 0};
        fs.readFile(prodFPath, (err, fileContent) => {
            let cart = {
                products: [],
                totalPrice: 0
            };
            if (!err) {
                cart = JSON.parse(fileContent);
            }

            //Analyse the cart => find existing product
            const existingProdInd = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProdInd];
            let updatedProduct;
            if (existingProduct) {
                updatedProduct = {
                    ...existingProduct
                };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProdInd] = updatedProduct;
            } else {
                updatedProduct = {
                    id: id,
                    qty: 1
                };
                cart.products = [...cart.products, updatedProduct]
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(prodFPath, JSON.stringify(cart), (err) => {
                console.log(err);
            });
            // Add new product / increase quantity
        });
    }

}
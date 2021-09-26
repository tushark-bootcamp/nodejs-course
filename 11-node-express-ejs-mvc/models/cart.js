const fs = require('fs');
const path = require('path');
const {
    createBrotliCompress
} = require('zlib');

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

    static deleteProduct(id, productPrice) {
        // Fetch the previous cart
        //let cart = {products: [], totalPrice: 0};
        fs.readFile(prodFPath, (err, fileContent) => {
            if (err) {
                return;
            }
            // let cart = {
            //     products: [],
            //     totalPrice: 0
            // };
            let cart = {...JSON.parse(fileContent)};
            //Analyse the cart => find existing product
            const existingProductInd = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductInd];
            let deletedProduct;
            if (existingProduct && existingProduct.qty > 1) {
                deletedProduct = {
                    ...existingProduct
                };
                deletedProduct.qty = deletedProduct.qty - 1;
                cart.products = [...cart.products];
                cart.products[existingProductInd] = deletedProduct;
            } else {
                console.log('There s only one item to be removed');
                const updatedProducts = cart.products.filter(prod => prod.id !== id);
                //console.log(updatedProducts);
                cart.products = [...updatedProducts];
            }
            cart.totalPrice = cart.totalPrice - +productPrice;
            fs.writeFile(prodFPath, JSON.stringify(cart), (err) => {
                console.log(err);
            });
            // Add new product / increase quantity
        });
    }

    static getCart(cb) {
        fs.readFile(prodFPath, (err, fileContent) => {
            if (err) {
                cb(null);
            } else {
                const cart = JSON.parse(fileContent);
                cb(cart);
            }
        });
    }
}
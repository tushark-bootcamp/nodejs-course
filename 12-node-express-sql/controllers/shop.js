const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    //console.log(products);
    Product.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('shop/product-list', {
                prods: rows,
                pageTitle: 'All Products',
                path: '/products'
            });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getProduct = (req, res, next) => {
    // The 'productId' in req.params.productId should match the param name used in your route i.e. routes/shop.js
    // router.get('/products/:productId', shopController.getProduct);
    const prodId = req.params.productId;
    console.log(prodId);
    Product.findById(prodId)
    .then(([product]) => {
        console.log(product);
        res.render('shop/product-detail', {
            product: product[0],
            pageTitle: product[0].title,
            path: '/products'
        });
    })
    .catch(err => {console.log(err)});
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('shop/index', {
                prods: rows,
                pageTitle: 'Shop',
                path: '/'
            });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getCart = (req, res, next) => {
    Cart.getCart((cart) => {
        if (cart) {
            Product.fetchAll(products => {
                const cartProducts = [];
                for (product of products) {
                    const cartProdData = cart.products.find(prod => prod.id === product.id);
                    if (cartProdData) {
                        cartProducts.push({
                            productData: product,
                            qty: cartProdData.qty
                        });
                    }
                }
                res.render('shop/cart', {
                    pageTitle: 'Your Cart',
                    path: '/cart',
                    cartProds: cartProducts
                });
            });
        } else {
            res.render('shop/cart', {
                pageTitle: 'Your Cart',
                path: '/cart',
                cartProds: []
            });
        }

    });
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (product) => {
        Cart.addProduct(prodId, product.price);
    });
    console.log(prodId);
    res.redirect('/cart');
}

exports.postCartDeleteItem = (req, res, next) => {
    console.log(req.body);
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    });
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        prods: products,
        pageTitle: 'Checkout',
        path: '/checkout'
    });
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: 'Your Orders',
        path: '/orders'
    });
}
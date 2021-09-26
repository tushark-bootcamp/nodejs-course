const fs = require('fs');
const path = require('path');
const prodFPath = path.join(path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);

const getProductsFromFile = cb => {
    fs.readFile(prodFPath, (err, fileContent) => {
        if (err) {
            console.log(err);
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
}

module.exports = class Product {
        constructor(id, title, imageUrl, description, price) {
            this.id = id;
            this.title = title;
            this.imageUrl = imageUrl;
            this.description = description;
            this.price = price;
        }
        save() {
            getProductsFromFile(products => {
                if (!this.id) {
                    this.id = Math.random().toString();
                    // the 'this' in line below refers to the Product class (which was instantiated using the constructor by the caller for this function) 
                    // Its context is retained by the arrow function and hence 'this' refers to the class; 
                    // without the arrow function, 'this' will loose its context and will not refer to the class anymore.
                    products.push(this);
                    fs.writeFile(prodFPath, JSON.stringify(products), (err) => {
                        console.log(err);
                    });
                } else {
                    console.log('Update mode of product.save()');
                    const updatedProdInd = products.findIndex(prod => prod.id === this.id);
                    const updatedProducts = [...products];
                    updatedProducts[updatedProdInd] = this;
                    fs.writeFile(prodFPath, JSON.stringify(updatedProducts), (err) => {
                        console.log(err);
                    });
                }

            });
        }

        static fetchAll(cb) {
            getProductsFromFile(cb);
        }

        static findById(id, productCB) {
            getProductsFromFile(products => {
                const product = products.find(p => {
                    if (p.id === id) {
                        return p;
                    }
                });
                //const product = products.find(p => p.id === id);
                productCB(product);
            });
        }

        static deleteById(id) {
            getProductsFromFile(products => {
                console.log('Deleting a product in product.delete()');
                // const deletedProdInd = products.findIndex(prod => prod.id === id);
                // const updatedProducts = [...products];
                // updatedProducts.splice(deletedProdInd);
                const updatedProducts = products.filter(prod => prod.id !== id);
                fs.writeFile(prodFPath, JSON.stringify(updatedProducts), (err) => {
                    if(!err) {
                        // The below TODO comment not to be implemented here; its just a reminder.
                        console.log('TODO: When the customer logs in, their cart should show the product is unavailable with a proper reason');
                    } else {
                        console.log(err);
                    }
                });
            });
        };
    }
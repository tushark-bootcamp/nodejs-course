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
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        getProductsFromFile(products => {
            // the 'this' in line below refers to the Product class (which was instantiated using the constructor by the caller for this function) 
            // Its context is retained by the arrow function and hence 'this' refers to the class; 
            // without the arrow function, 'this' will loose its context and will not refer to the class anymore.
            products.push(this);
            fs.writeFile(prodFPath, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
}
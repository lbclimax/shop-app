
var Datastore = require('nedb');
db = new Datastore({ filename: 'product.db', autoload: true });
let i =0
function addProduct(product){
    console.log("product added",product);
    product.id=i++;
    return product;
}

exports.addProduct=addProduct;
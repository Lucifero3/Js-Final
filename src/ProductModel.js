// Assuming you have a file named `ProductModel.js`
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  code: String,
  name: String,
  qty: Number,
  price: Number,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

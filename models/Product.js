// models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: String },
  image: { type: String },
  rating: {
    rate: { type: Number },
    count: { type: Number }
  },
  itemsInStock: { type: Number }
}, { collection: 'products' });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;

const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    require: [true, "Cart must have a user"]
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    require: [true, "Cart must have a product"]
  },
  color: {
    type: String,
    required: [true, 'Cart must have a color.']
  },
  size: {
    type: String,
    required: [true, 'Cart must have a size.']
  },
  quantity: {
    type: Number,
    default: 1
  }
})

cartSchema.pre(/^find/, function(next) {
  this.populate({
    path: "product",
    select: ["urlPicture", "colors", "sizes", "price", "title"]
  });
  next();
})

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
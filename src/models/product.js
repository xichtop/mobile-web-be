const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Product must have a title"],
    unique: [true, "Title must be unique"]
  },
  description: {
    type: String,
    required: [true, "Product must have a description"]
  },
  urlPicture: {
    type: String,
    required: [true, "Product must have a urlPicture"]
  },
  sold: {
    type: Number,
    default: 0,
    min: 0
  },
  quantity: {
    type: Number,
    default: 1,
    min: 0
  },
  price: {
    type: Number,
    required: [true, 'Product must have a price'],
    min: 0
  },
  discountPercent: {
    type: Number,
    default: 0
  },
  currentPrice: {
    type: Number,
    default: 0
  },
  colors: [{
    color: String,
    price: Number,
    urlPicture: [String]
  }],
  sizes: [{
    size: String,
    price: Number
  }],
  ratingAverage: {
    type: Number,
    default: 5,
    min: 1,
    max: 5,
    set: val => Math.round(val * 2) / 2
  },
  ratingQuantity: {
    type: Number,
    default: 0,
    min: 0
  },
  pin: {
    capacity: String,
    chargeTime: String,
    typePin: String,
    chargeSupports: String,
  },
  screen: {
    technology: String,
    size: String,
    resolution: String
  },
  configuration: {
    ram: String,
    cpu: String,
    system: String
  },
  connection: {
    connect: [String],
    network: [String],
    sim: [String],
    others: [String]
  },
  otherInfo: {
    from: String,
    langguage: String,
    release: String,
  },
  createAt: {
    type: Date,
    default: Date.now,
    select: false
  },
  modifyAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: Boolean,
    default: true
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category'
  }
}, 
{
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
})

// Indexes to improve reading performance
productSchema.index({ price: 1, ratingAverage: -1});

productSchema.index({title: 'text', 'sizes.size': 'text', 'colors.color': 'text'});

// Virtual Populate
productSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'product',
  localField: '_id'
})

productSchema.pre('save', async function(next) {
  this.modifyAt = Date.now() - 1000;
})

productSchema.pre('save', async function(next) {
  this.currentPrice = this.price - (this.price * this.discountPercent) / 100;
})

productSchema.pre('findOneAndUpdate', async function(next) {
  const updateField =this.getUpdate();
  let price = 0, discount = 0;
  if (updateField.hasOwnProperty('discountPercent') && updateField.hasOwnProperty('price')) {
    price = updateField.price;
    discount = updateField.discountPercent;
    const currentPrice = price - (price * discount) / 100;
    this.set('currentPrice', currentPrice);
  } else if (updateField.hasOwnProperty('discountPercent')){
    const docToUpdate = await this.model.findOne(this.getQuery());
    price = docToUpdate.price;
    discount = updateField.discountPercent;
    const currentPrice = price - (price * discount) / 100;
    this.set('currentPrice', currentPrice);
  } else if (updateField.hasOwnProperty('price')) {
    const docToUpdate = await this.model.findOne(this.getQuery());
    price = updateField.price;
    discount = docToUpdate.discountPercent;
    const currentPrice = price - (price * discount) / 100;
    this.set('currentPrice', currentPrice);
  } else {
    next();
  }
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
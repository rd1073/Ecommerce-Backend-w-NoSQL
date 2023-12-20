const mongoose = require("mongoose")

const conn = mongoose.createConnection('mongodb://0.0.0.0:27017/Ecommerce');
conn.on('connected', () => {
  console.log('Mongoose connected mongodb');
});
conn.on('error', (err) => {
  console.error(`Mongoose connection error: ${err}`);
});


const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    userType: { type: String, enum: ['buyer', 'seller'], required: true },
  });
  
  const User = conn.model('User', userSchema);



  const catalogSchema = new mongoose.Schema({
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
      }
    ]
  });
  
  const Catalog = conn.model('Catalog', catalogSchema);


  const orderSchema = new mongoose.Schema({
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    
    orderDate: {
      type: Date,
      default: Date.now,
    },
  });
  
  const Order = conn.model('Order', orderSchema);

   
  module.exports = { User, Catalog, conn, Order };



 
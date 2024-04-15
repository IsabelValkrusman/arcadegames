import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import tickets from './data/tickets.js'; // Lisa import tickets.js
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    const orders = [];

    // Iterate over each ticket and create an order for it
    for (const ticket of tickets) {
      const orderItems = ticket.cartItems.map((cartItem) => {
        // Find the product associated with the ticket item
        const product = sampleProducts.find((product) => product.name === cartItem.name);
        return {
          name: cartItem.name,
          qty: cartItem.quantity || 1,
          price: cartItem.price,
          product: product._id, // Use the product's ObjectId
        };
      });

      const newOrder = new Order({
        user: adminUser,
        orderItems,
        shippingAddress: {}, // Add suitable address data here
        paymentMethod: 'Credit Card', // Add suitable payment method
        paymentResult: {}, // Add suitable payment result data here
        itemsPrice: orderItems.reduce((acc, item) => acc + item.qty * item.price, 0),
        taxPrice: 0, // Add suitable tax data here
        totalPrice: 0, // Add suitable total price data here
        isPaid: true, // Add suitable payment status here
      });

      orders.push(newOrder);
    }

    // Insert all orders into the database
    const createdOrders = await Order.insertMany(orders);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}

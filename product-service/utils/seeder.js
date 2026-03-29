const mongoose = require('mongoose');
const Product = require('../models/Product');

const seedProducts = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      console.log('No products found, seeding 25 sample products...');
      const products = [];
      const categories = ['Electronics', 'Clothing', 'Home', 'Sports', 'Books'];
      const brands = ['Sony', 'Nike', 'Ikea', 'Adidas', 'Penguin'];
      
      for (let i = 1; i <= 25; i++) {
        products.push({
          name: `Premium Product ${i}`,
          description: `This is a detailed description for Premium Product ${i}. Crafted with excellence.`,
          price: Math.floor(Math.random() * 500) + 50,
          discount: Math.floor(Math.random() * 20),
          category: categories[i % categories.length],
          stock: Math.floor(Math.random() * 100) + 10,
          ratings: (Math.random() * 2 + 3).toFixed(1), // 3.0 to 5.0
          brand: brands[i % brands.length],
          images: [
            `https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80`,
            `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80`
          ]
        });
      }
      
      await Product.insertMany(products);
      console.log('25 Products seeded successfully.');
    }
  } catch (err) {
    console.error('Error seeding products:', err);
  }
};

module.exports = seedProducts;

const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

const products = [
  {
    name: "Premium Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.",
    price: 299.99,
    discount: 15,
    category: "Electronics",
    stock: 50,
    ratings: 4.5,
    brand: "AudioTech",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
      "https://images.unsplash.com/photo-1484704849701-f40256c4a05e?w=800"
    ]
  },
  {
    name: "Smart Watch Pro",
    description: "Advanced fitness tracking, heart rate monitoring, and smartphone integration in a sleek design.",
    price: 399.99,
    discount: 10,
    category: "Electronics",
    stock: 30,
    ratings: 4.7,
    brand: "TechWatch",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"
    ]
  },
  {
    name: "Organic Cotton T-Shirt",
    description: "Comfortable and sustainable organic cotton t-shirt. Perfect for everyday wear.",
    price: 29.99,
    discount: 0,
    category: "Clothing",
    stock: 100,
    ratings: 4.2,
    brand: "EcoWear",
    images: [
      "https://images.unsplash.com/photo-1521572163464-5c9995264758?w=800"
    ]
  },
  {
    name: "Professional Yoga Mat",
    description: "Non-slip, eco-friendly yoga mat with extra cushioning for comfort during practice.",
    price: 49.99,
    discount: 20,
    category: "Sports",
    stock: 75,
    ratings: 4.6,
    brand: "FitGear",
    images: [
      "https://images.unsplash.com/photo-1506629905607-48e3ec82abeb?w=800"
    ]
  },
  {
    name: "Stainless Steel Water Bottle",
    description: "Insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours.",
    price: 34.99,
    discount: 5,
    category: "Sports",
    stock: 150,
    ratings: 4.4,
    brand: "HydroMax",
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542b6d4b?w=800"
    ]
  },
  {
    name: "Wireless Charging Pad",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices. Sleek and minimalist design.",
    price: 39.99,
    discount: 15,
    category: "Electronics",
    stock: 60,
    ratings: 4.3,
    brand: "ChargeTech",
    images: [
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800"
    ]
  },
  {
    name: "Leather Crossbody Bag",
    description: "Genuine leather crossbody bag with multiple compartments. Perfect for daily essentials.",
    price: 89.99,
    discount: 10,
    category: "Accessories",
    stock: 40,
    ratings: 4.5,
    brand: "LeatherCraft",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800"
    ]
  },
  {
    name: "Running Shoes",
    description: "Lightweight and breathable running shoes with advanced cushioning technology.",
    price: 129.99,
    discount: 25,
    category: "Sports",
    stock: 80,
    ratings: 4.6,
    brand: "RunFast",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"
    ]
  },
  {
    name: "Ceramic Plant Pot Set",
    description: "Set of 3 handmade ceramic plant pots with drainage holes. Perfect for indoor plants.",
    price: 44.99,
    discount: 0,
    category: "Home",
    stock: 35,
    ratings: 4.7,
    brand: "PotteryStudio",
    images: [
      "https://images.unsplash.com/photo-1485955900006-10b4e2476394?w=800"
    ]
  },
  {
    name: "Bluetooth Speaker",
    description: "Portable waterproof Bluetooth speaker with 360-degree sound and 20-hour battery life.",
    price: 79.99,
    discount: 30,
    category: "Electronics",
    stock: 55,
    ratings: 4.4,
    brand: "SoundWave",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800"
    ]
  },
  {
    name: "Denim Jacket",
    description: "Classic denim jacket with modern fit. Timeless style for any wardrobe.",
    price: 79.99,
    discount: 20,
    category: "Clothing",
    stock: 45,
    ratings: 4.3,
    brand: "DenimCo",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800"
    ]
  },
  {
    name: "Coffee Maker Deluxe",
    description: "Programmable coffee maker with thermal carafe and customizable brew strength.",
    price: 149.99,
    discount: 15,
    category: "Home",
    stock: 25,
    ratings: 4.5,
    brand: "BrewMaster",
    images: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800"
    ]
  },
  {
    name: "Fitness Resistance Bands Set",
    description: "Complete set of resistance bands for full-body workouts. Includes 5 resistance levels.",
    price: 29.99,
    discount: 10,
    category: "Sports",
    stock: 90,
    ratings: 4.2,
    brand: "FitGear",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800"
    ]
  },
  {
    name: "Sunglasses Classic",
    description: "Polarized UV protection sunglasses with classic aviator style. Lightweight and durable.",
    price: 59.99,
    discount: 5,
    category: "Accessories",
    stock: 70,
    ratings: 4.4,
    brand: "SunShade",
    images: [
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800"
    ]
  },
  {
    name: "Tablet Stand Adjustable",
    description: "Aluminum tablet stand with adjustable height and angle. Compatible with all tablet sizes.",
    price: 34.99,
    discount: 0,
    category: "Electronics",
    stock: 65,
    ratings: 4.3,
    brand: "StandPro",
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800"
    ]
  },
  {
    name: "Wool Sweater",
    description: "Cozy merino wool sweater perfect for cold weather. Soft and breathable.",
    price: 89.99,
    discount: 20,
    category: "Clothing",
    stock: 30,
    ratings: 4.6,
    brand: "WoolCraft",
    images: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800"
    ]
  },
  {
    name: "Essential Oil Diffuser",
    description: "Ultrasonic essential oil diffuser with LED mood lighting and timer function.",
    price: 44.99,
    discount: 15,
    category: "Home",
    stock: 50,
    ratings: 4.5,
    brand: "AromaZen",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800"
    ]
  },
  {
    name: "Gaming Mouse RGB",
    description: "High-precision gaming mouse with customizable RGB lighting and programmable buttons.",
    price: 69.99,
    discount: 10,
    category: "Electronics",
    stock: 40,
    ratings: 4.7,
    brand: "GamePro",
    images: [
      "https://images.unsplash.com/photo-1615630271227-78a8c9cf2a58?w=800"
    ]
  },
  {
    name: "Canvas Backpack",
    description: "Durable canvas backpack with laptop compartment and multiple pockets.",
    price: 59.99,
    discount: 0,
    category: "Accessories",
    stock: 35,
    ratings: 4.4,
    brand: "BagCraft",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800"
    ]
  },
  {
    name: "Mechanical Keyboard",
    description: "RGB mechanical keyboard with blue switches and programmable keys.",
    price: 129.99,
    discount: 25,
    category: "Electronics",
    stock: 25,
    ratings: 4.8,
    brand: "KeyMaster",
    images: [
      "https://images.unsplash.com/photo-1598948618504-2a99922a350c?w=800"
    ]
  },
  {
    name: "Yoga Block Set",
    description: "Set of 2 high-density yoga blocks for support and alignment in yoga practice.",
    price: 19.99,
    discount: 10,
    category: "Sports",
    stock: 100,
    ratings: 4.3,
    brand: "FitGear",
    images: [
      "https://images.unsplash.com/photo-1506629905607-48e3ec82abeb?w=800"
    ]
  },
  {
    name: "Silk Scarf",
    description: "Luxurious silk scarf with elegant floral pattern. Perfect accessory for any outfit.",
    price: 49.99,
    discount: 15,
    category: "Accessories",
    stock: 25,
    ratings: 4.6,
    brand: "SilkLux",
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b29ccd1?w=800"
    ]
  },
  {
    name: "Smart LED Bulbs (4-pack)",
    description: "WiFi-enabled smart LED bulbs with color changing and dimming capabilities.",
    price: 79.99,
    discount: 20,
    category: "Home",
    stock: 45,
    ratings: 4.4,
    brand: "SmartHome",
    images: [
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800"
    ]
  },
  {
    name: "Wireless Earbuds",
    description: "True wireless earbuds with charging case and premium sound quality.",
    price: 149.99,
    discount: 10,
    category: "Electronics",
    stock: 60,
    ratings: 4.5,
    brand: "AudioTech",
    images: [
      "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=800"
    ]
  },
  {
    name: "Cotton Shorts",
    description: "Comfortable 100% cotton shorts perfect for summer and casual wear.",
    price: 34.99,
    discount: 30,
    category: "Clothing",
    stock: 80,
    ratings: 4.2,
    brand: "EcoWear",
    images: [
      "https://images.unsplash.com/photo-1586790170033-76a4e13518fb?w=800"
    ]
  },
  {
    name: "Foam Roller",
    description: "High-density foam roller for muscle recovery and massage therapy.",
    price: 24.99,
    discount: 0,
    category: "Sports",
    stock: 70,
    ratings: 4.3,
    brand: "FitGear",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800"
    ]
  },
  {
    name: "Leather Wallet",
    description: "Genuine leather bifold wallet with RFID blocking technology.",
    price: 39.99,
    discount: 10,
    category: "Accessories",
    stock: 55,
    ratings: 4.5,
    brand: "LeatherCraft",
    images: [
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800"
    ]
  },
  {
    name: "Desk Lamp LED",
    description: "Adjustable LED desk lamp with multiple brightness levels and USB charging port.",
    price: 44.99,
    discount: 15,
    category: "Home",
    stock: 40,
    ratings: 4.4,
    brand: "LightPro",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800"
    ]
  },
  {
    name: "Sports Water Bottle",
    description: "BPA-free sports water bottle with time markers and carrying strap.",
    price: 19.99,
    discount: 25,
    category: "Sports",
    stock: 120,
    ratings: 4.1,
    brand: "HydroMax",
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542b6d4b?w=800"
    ]
  },
  {
    name: "Cotton Hoodie",
    description: "Comfortable cotton blend hoodie with kangaroo pocket and adjustable hood.",
    price: 59.99,
    discount: 20,
    category: "Clothing",
    stock: 50,
    ratings: 4.5,
    brand: "EcoWear",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a5f6d590284?w=800"
    ]
  },
  {
    name: "Phone Stand",
    description: "Adjustable phone stand for desk and tabletop use. Compatible with all phones.",
    price: 14.99,
    discount: 0,
    category: "Electronics",
    stock: 90,
    ratings: 4.2,
    brand: "StandPro",
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800"
    ]
  },
  {
    name: "Meditation Cushion",
    description: "Comfortable meditation cushion with buckwheat filling for proper posture.",
    price: 39.99,
    discount: 10,
    category: "Sports",
    stock: 35,
    ratings: 4.6,
    brand: "ZenGear",
    images: [
      "https://images.unsplash.com/photo-1506629905607-48e3ec82abeb?w=800"
    ]
  },
  {
    name: "Canvas Tote Bag",
    description: "Heavy-duty canvas tote bag perfect for shopping and daily use.",
    price: 24.99,
    discount: 15,
    category: "Accessories",
    stock: 75,
    ratings: 4.3,
    brand: "BagCraft",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800"
    ]
  },
  {
    name: "Bamboo Cutting Board",
    description: "Eco-friendly bamboo cutting board with juice groove and handles.",
    price: 34.99,
    discount: 5,
    category: "Home",
    stock: 60,
    ratings: 4.7,
    brand: "EcoHome",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800"
    ]
  },
  {
    name: "Wireless Gaming Headset",
    description: "Surround sound gaming headset with noise cancellation and 20-hour battery.",
    price: 119.99,
    discount: 30,
    category: "Electronics",
    stock: 30,
    ratings: 4.6,
    brand: "GamePro",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"
    ]
  },
  {
    name: "Linen Shorts",
    description: "Breathable linen shorts perfect for warm weather and casual occasions.",
    price: 44.99,
    discount: 20,
    category: "Clothing",
    stock: 40,
    ratings: 4.4,
    brand: "EcoWear",
    images: [
      "https://images.unsplash.com/photo-1586790170033-76a4e13518fb?w=800"
    ]
  },
  {
    name: "Jump Rope",
    description: "Speed jump rope with ball bearings and adjustable length.",
    price: 14.99,
    discount: 0,
    category: "Sports",
    stock: 100,
    ratings: 4.2,
    brand: "FitGear",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800"
    ]
  },
  {
    name: "Sunglasses Sport",
    description: "Polarized sport sunglasses designed for active lifestyles with secure fit.",
    price: 79.99,
    discount: 15,
    category: "Accessories",
    stock: 45,
    ratings: 4.5,
    brand: "SunShade",
    images: [
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800"
    ]
  }
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/product_service');
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    await Product.insertMany(products);
    console.log(`Inserted ${products.length} products`);

    console.log('Products seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();

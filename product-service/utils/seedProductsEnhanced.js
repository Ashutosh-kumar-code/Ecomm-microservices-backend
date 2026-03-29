const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

const products = [
  // Electronics
  {
    name: "Sony WH-1000XM4 Wireless Headphones",
    description: "Industry-leading noise canceling with Dual Noise Sensor technology. Next-level music with Edge-AI and DSEE Extreme. Up to 30-hour battery life with quick charging. Speak-to-chat technology automatically pauses music when you start talking.",
    price: 349.99,
    discount: 15,
    category: "Electronics",
    stock: 45,
    ratings: 4.8,
    brand: "Sony",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
      "https://images.unsplash.com/photo-1484704849701-f40256c4a05e?w=800",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800"
    ]
  },
  {
    name: "Apple Watch Series 9",
    description: "Advanced health monitoring with blood oxygen and ECG apps. Always-On Retina display with 1000 nits brightness. GPS + Cellular models available. Water resistant to 50 meters. Up to 18 hours battery life.",
    price: 429.99,
    discount: 10,
    category: "Electronics",
    stock: 30,
    ratings: 4.9,
    brand: "Apple",
    images: [
      "https://images.unsplash.com/photo-1523275335684-5c9995264758?w=800",
      "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=800",
      "https://images.unsplash.com/photo-1578952950439-3d8b5b8b4f1c?w=800"
    ]
  },
  {
    name: "Samsung Galaxy Tab S9",
    description: "11-inch Dynamic AMOLED 2X display. Snapdragon 8 Gen 1 processor. 128GB storage with microSD expansion. S Pen included. 8400mAh battery with fast charging.",
    price: 699.99,
    discount: 20,
    category: "Electronics",
    stock: 25,
    ratings: 4.6,
    brand: "Samsung",
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800"
    ]
  },
  {
    name: "Bose QuietComfort Earbuds II",
    description: "World-class noise cancellation and sound. CustomTune technology personalizes sound to your ears. Awareness mode brings surroundings into focus. Up to 6 hours battery + 18 hours with charging case.",
    price: 279.99,
    discount: 5,
    category: "Electronics",
    stock: 40,
    ratings: 4.7,
    brand: "Bose",
    images: [
      "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=800",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"
    ]
  },
  {
    name: "DJI Mini 3 Pro Drone",
    description: "4K HDR video with True Vertical Shooting. 48MP photos. 34-minute flight time. OcuSync 3.0 transmission up to 12km. Under 249g for registration-free flying in most countries.",
    price: 759.99,
    discount: 0,
    category: "Electronics",
    stock: 15,
    ratings: 4.8,
    brand: "DJI",
    images: [
      "https://images.unsplash.com/photo-1473968512647-3ddc7d3f7474?w=800",
      "https://images.unsplash.com/photo-1620729418342-db6f0d4b3dd1?w=800",
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800"
    ]
  },
  {
    name: "Logitech MX Master 3S Mouse",
    description: "MagSpeed electromagnetic scrolling. 8,000 DPI precision sensor. Multi-device workflow with Easy-Switch. 70-day battery life. Customizable buttons with Logi Options+ software.",
    price: 99.99,
    discount: 15,
    category: "Electronics",
    stock: 60,
    ratings: 4.5,
    brand: "Logitech",
    images: [
      "https://images.unsplash.com/photo-1615630806746-32b0c00b6e88?w=800",
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800"
    ]
  },
  {
    name: "Kindle Paperwhite Signature",
    description: "6.8\" display with adjustable warm light. Waterproof IPX8 rating. 32GB storage. Wireless charging. Auto-adjusting front light. Up to 10 weeks battery life.",
    price: 189.99,
    discount: 25,
    category: "Electronics",
    stock: 35,
    ratings: 4.6,
    brand: "Amazon",
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800"
    ]
  },
  {
    name: "Google Nest Hub Max",
    description: "10\" HD screen with Google Assistant. Built-in Nest Cam for video calling. Stereo speakers with 30W bass. Smart home control center. Compatible with thousands of smart devices.",
    price: 229.99,
    discount: 10,
    category: "Electronics",
    stock: 20,
    ratings: 4.4,
    brand: "Google",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
      "https://images.unsplash.com/photo-1515372039744-b8e02a3ae952?w=800"
    ]
  },

  // Clothing
  {
    name: "Nike Air Max 270",
    description: "Large Max Air unit for soft cushioning. Mesh upper for breathability. Rubber outsole with flex grooves. Foam midsole for lightweight comfort. Classic silhouette with modern updates.",
    price: 150.00,
    discount: 30,
    category: "Clothing",
    stock: 80,
    ratings: 4.5,
    brand: "Nike",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800"
    ]
  },
  {
    name: "Levi's 501 Original Fit Jeans",
    description: "The original straight fit jean. Button fly styling. Classic 5-pocket design. 100% cotton denim. Sits at waist with regular seat and thigh. Iconic leather patch at back waist.",
    price: 89.99,
    discount: 20,
    category: "Clothing",
    stock: 120,
    ratings: 4.6,
    brand: "Levi's",
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
      "https://images.unsplash.com/photo-1594633312681-4cb2f99b2d8b?w=800"
    ]
  },
  {
    name: "Patagonia Better Sweater Fleece Jacket",
    description: "100% recycled polyester fleece. Full-zip front with stand-up collar. Zippered handwarmer pockets. Hip-length fit. Fair Trade Certified sewn. Easy-care machine wash.",
    price: 139.00,
    discount: 15,
    category: "Clothing",
    stock: 45,
    ratings: 4.8,
    brand: "Patagonia",
    images: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
      "https://images.unsplash.com/photo-1556821840-3a5f6d590284?w=800"
    ]
  },
  {
    name: "Adidas Ultraboost 22",
    description: "Responsive Boost midsole. Primeknit textile upper. Continental rubber outsole. Linear energy push. Torsion system for midfoot support. Regular fit.",
    price: 190.00,
    discount: 25,
    category: "Clothing",
    stock: 60,
    ratings: 4.7,
    brand: "Adidas",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800"
    ]
  },
  {
    name: "Ralph Lauren Classic Polo Shirt",
    description: "100% cotton mesh fabric. Two-button placket. Ribbed polo collar and armbands. Embroidered pony logo. Regular fit. Machine washable.",
    price: 98.00,
    discount: 10,
    category: "Clothing",
    stock: 75,
    ratings: 4.4,
    brand: "Ralph Lauren",
    images: [
      "https://images.unsplash.com/photo-1521572163464-5c9995264758?w=800",
      "https://images.unsplash.com/photo-1594633312681-4cb2f99b2d8b?w=800"
    ]
  },
  {
    name: "The North Face Denali 2 Jacket",
    description: "Recycled polyester fleece body. Nylon overlay at chest. Zippered hand pockets. Elastic-bound cuffs. Standard fit. Abrasion-resistant panels.",
    price: 199.00,
    discount: 0,
    category: "Clothing",
    stock: 35,
    ratings: 4.9,
    brand: "The North Face",
    images: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800",
      "https://images.unsplash.com/photo-1556821840-3a5f6d590284?w=800",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800"
    ]
  },

  // Sports & Fitness
  {
    name: "Lululemon Yoga Mat 5mm",
    description: "Natural rubber base. Polyurethane top layer. Sweat-absorbing, non-slip surface. Antimicrobial additive prevents mold. 5mm thickness for cushioning. Includes carrying strap.",
    price: 78.00,
    discount: 0,
    category: "Sports",
    stock: 90,
    ratings: 4.8,
    brand: "Lululemon",
    images: [
      "https://images.unsplash.com/photo-1506629905607-48e3ec82abeb?w=800",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800"
    ]
  },
  {
    name: "Bowflex SelectTech 552 Dumbbells",
    description: "Adjustable from 5 to 52.5 lbs per dumbbell. 15 weight settings. Durable molding around metal plates. Compact storage. Includes stand for easy access.",
    price: 429.99,
    discount: 20,
    category: "Sports",
    stock: 25,
    ratings: 4.6,
    brand: "Bowflex",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
      "https://images.unsplash.com/photo-1517965537931-354a40c9b177?w=800",
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800"
    ]
  },
  {
    name: "Hydro Flask 21oz Standard Mouth",
    description: "18/8 pro-grade stainless steel. TempShield insulation. Keeps cold up to 24 hours, hot up to 12 hours. BPA-free. Powder coat for durability. Wide mouth for ice cubes.",
    price: 32.95,
    discount: 5,
    category: "Sports",
    stock: 150,
    ratings: 4.7,
    brand: "Hydro Flask",
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542b6d4b?w=800",
      "https://images.unsplash.com/photo-1549497543-1a192c56576a?w=800",
      "https://images.unsplash.com/photo-1523275335684-5c9995264758?w=800"
    ]
  },
  {
    name: "Wilson Pro Staff Tennis Racket",
    description: "Carbon fiber construction. 97 square inch head size. 315 gram weight. 16x19 string pattern. Amplifeel handle technology. Used by professional players.",
    price: 249.99,
    discount: 15,
    category: "Sports",
    stock: 40,
    ratings: 4.5,
    brand: "Wilson",
    images: [
      "https://images.unsplash.com/photo-1599435757293-955f4d26c599?w=800",
      "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=800",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800"
    ]
  },
  {
    name: "Fitbit Charge 5",
    description: "Advanced heart rate monitoring. Built-in GPS. Stress management tools. Sleep tracking with Sleep Score. 7-day battery life. Water resistant to 50m.",
    price: 179.95,
    discount: 10,
    category: "Sports",
    stock: 55,
    ratings: 4.4,
    brand: "Fitbit",
    images: [
      "https://images.unsplash.com/photo-1551816234-5c94b0a0c9a5?w=800",
      "https://images.unsplash.com/photo-1523275335684-5c9995264758?w=800",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800"
    ]
  },
  {
    name: "Theraband Resistance Bands Set",
    description: "5 resistance levels from extra light to extra heavy. Latex-free material. Includes door anchor and ankle straps. Compact storage. Full-body workout possibilities.",
    price: 24.99,
    discount: 0,
    category: "Sports",
    stock: 200,
    ratings: 4.3,
    brand: "Theraband",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
      "https://images.unsplash.com/photo-1517965537930-84222b0b9a6a?w=800",
      "https://images.unsplash.com/photo-1506629905607-48e3ec82abeb?w=800"
    ]
  },

  // Home & Living
  {
    name: "IKEA POÄNG Armchair",
    description: "Bentwood frame in layer-glued birch. High-resilience foam cushions. Machine-washable cover. Ergonomic design follows body contours. Easy to assemble.",
    price: 249.00,
    discount: 0,
    category: "Home",
    stock: 30,
    ratings: 4.5,
    brand: "IKEA",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800"
    ]
  },
  {
    name: "Nespresso Vertuo Next Coffee Machine",
    description: "Centrifusion extraction technology. 4 cup sizes. 30-second heat up time. 1L removable water tank. Used capsule container. Automatic off after 9 minutes.",
    price: 199.99,
    discount: 25,
    category: "Home",
    stock: 45,
    ratings: 4.6,
    brand: "Nespresso",
    images: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800",
      "https://images.unsplash.com/photo-1517707496582-8f8f0b6571a3?w=800",
      "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800"
    ]
  },
  {
    name: "Philips Hue White and Color Ambiance",
    description: "16 million colors. 50,000 shades of white. Wireless control via Hue app. Voice control compatible. 800 lumen brightness. 25,000 hour lifetime.",
    price: 199.99,
    discount: 15,
    category: "Home",
    stock: 60,
    ratings: 4.7,
    brand: "Philips",
    images: [
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800",
      "https://images.unsplash.com/photo-1558618037-3c8c76ca7d13?w=800",
      "https://images.unsplash.com/photo-1513506000688-3e5c8e5b6a7e?w=800"
    ]
  },
  {
    name: "Dyson V15 Detect Vacuum",
    description: "Laser dust detection. Piezo sensor. 230AW suction power. 60-minute runtime. HEPA filtration. LCD screen shows real-time data.",
    price: 749.99,
    discount: 10,
    category: "Home",
    stock: 20,
    ratings: 4.8,
    brand: "Dyson",
    images: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800",
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800",
      "https://images.unsplash.com/photo-1558618037-3c8c76ca7d13?w=800"
    ]
  },
  {
    name: "West Elm Mid-Century Modern Sofa",
    description: "Kiln-dried hardwood frame. High-density foam cushions. Performance fabric upholstery. Tapered wood legs. Made in USA. 84\" wide.",
    price: 1299.00,
    discount: 20,
    category: "Home",
    stock: 15,
    ratings: 4.6,
    brand: "West Elm",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800"
    ]
  },
  {
    name: "Calphalon Premier Hard-Anodized Cookware Set",
    description: "13-piece set. Hard-anodized aluminum construction. Three-layer nonstick coating. Cool-touch handles. Oven safe to 450°F. Dishwasher safe.",
    price: 399.99,
    discount: 30,
    category: "Home",
    stock: 25,
    ratings: 4.5,
    brand: "Calphalon",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800"
    ]
  },

  // Accessories
  {
    name: "Ray-Ban Wayfarer Classic",
    description: "Classic black frame. G-15 green lenses. 100% UV protection. Crystal lenses. Scratch-resistant coating. Made in Italy.",
    price: 179.00,
    discount: 5,
    category: "Accessories",
    stock: 70,
    ratings: 4.7,
    brand: "Ray-Ban",
    images: [
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800",
      "https://images.unsplash.com/photo-1511499767150-a1a7223d5e72?w=800",
      "https://images.unsplash.com/photo-1572560479782-c79227a8efc4?w=800"
    ]
  },
  {
    name: "Michael Kors Jet Set Tote",
    description: "Saffiano leather. Top zip closure. Gold-tone hardware. Multiple interior pockets. Removable shoulder strap. 12\" x 8\" x 6\".",
    price: 298.00,
    discount: 15,
    category: "Accessories",
    stock: 40,
    ratings: 4.4,
    brand: "Michael Kors",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800"
    ]
  },
  {
    name: "Fossil Gen 6 Smartwatch",
    description: "Wear OS by Google. Heart rate tracking. GPS. 3ATM water resistance. SpO2 sensor. 24-hour battery. Customizable dials.",
    price: 299.00,
    discount: 25,
    category: "Accessories",
    stock: 35,
    ratings: 4.3,
    brand: "Fossil",
    images: [
      "https://images.unsplash.com/photo-1523275335684-5c9995264758?w=800",
      "https://images.unsplash.com/photo-1551816234-5c94b0a0c9a5?w=800",
      "https://images.unsplash.com/photo-1544431891-36e2b6c6b6a7?w=800"
    ]
  },
  {
    name: "Samsonite Omni PC Hardside Luggage",
    description: "Scratch-resistant polycarbonate. 360-degree spinner wheels. TSA-approved lock. Expandable up to 1.5 inches. 10-year warranty.",
    price: 189.99,
    discount: 0,
    category: "Accessories",
    stock: 50,
    ratings: 4.6,
    brand: "Samsonite",
    images: [
      "https://images.unsplash.com/photo-1553877522-43269d4a98da?w=800",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800"
    ]
  },
  {
    name: "Coach Leather Belt",
    description: "Genuine leather. Single-prong buckle. 1.5\" width. Made in USA. Lifetime warranty. Available in black and brown.",
    price: 125.00,
    discount: 10,
    category: "Accessories",
    stock: 80,
    ratings: 4.5,
    brand: "Coach",
    images: [
      "https://images.unsplash.com/photo-1594633312681-4cb2f99b2d8b?w=800",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800"
    ]
  },

  // Beauty & Personal Care
  {
    name: "Dyson Airwrap Styler Complete",
    description: "Multi-styler complete set. Coanda air styling. No extreme heat damage. 3 heat settings. Cool shot. Storage case included.",
    price: 599.99,
    discount: 0,
    category: "Beauty",
    stock: 20,
    ratings: 4.8,
    brand: "Dyson",
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37ce?w=800",
      "https://images.unsplash.com/photo-1596462502278-279c943d528e?w=800",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37ce?w=800"
    ]
  },
  {
    name: "SK-II Facial Treatment Essence",
    description: "90% Pitera essence. Improves skin texture. Reduces appearance of wrinkles. 2.5 oz bottle. Dermatologist tested. Made in Japan.",
    price: 185.00,
    discount: 5,
    category: "Beauty",
    stock: 45,
    ratings: 4.7,
    brand: "SK-II",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37ce?w=800",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800"
    ]
  },
  {
    name: "Oral-B Pro 1000 Electric Toothbrush",
    description: "3D cleaning action. 2 cleaning modes. Pressure sensor. 2-minute timer. Rechargeable battery. Includes 2 brush heads.",
    price: 49.99,
    discount: 20,
    category: "Beauty",
    stock: 100,
    ratings: 4.4,
    brand: "Oral-B",
    images: [
      "https://images.unsplash.com/photo-1607619056574-7b466a8b9a7a?w=800",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800"
    ]
  },
  {
    name: "Crest 3D Whitestrips Professional",
    description: "20 treatments. Removes 14 years of stains. Advanced seal technology. No-slip grip. Enamel-safe. ADA accepted.",
    price: 54.99,
    discount: 15,
    category: "Beauty",
    stock: 120,
    ratings: 4.3,
    brand: "Crest",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37ce?w=800"
    ]
  },
  {
    name: "Philips Norelco Shaver 9000",
    description: "V-Track precision blades. Nano precision heads. 8-direction contour following. Wet/dry use. 60-minute battery. SmartClean system.",
    price: 279.99,
    discount: 10,
    category: "Beauty",
    stock: 30,
    ratings: 4.6,
    brand: "Philips",
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37ce?w=800",
      "https://images.unsplash.com/photo-1596462502278-279c943d528e?w=800",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800"
    ]
  },

  // Kitchen & Dining
  {
    name: "Vitamix 5200 Blender",
    description: "2 peak HP motor. Variable speed control. 64-oz container. Aircraft-grade stainless steel blades. 7-year warranty. Made in USA.",
    price: 449.99,
    discount: 0,
    category: "Kitchen",
    stock: 25,
    ratings: 4.9,
    brand: "Vitamix",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
      "https://images.unsplash.com/photo-1558618037-3c8c76ca7d13?w=800"
    ]
  },
  {
    name: "KitchenAid Artisan Stand Mixer",
    description: "5-quart stainless steel bowl. 10 speeds. 325-watt motor. Power hub for attachments. 59 touchpoints. Available in 20+ colors.",
    price: 379.99,
    discount: 15,
    category: "Kitchen",
    stock: 35,
    ratings: 4.8,
    brand: "KitchenAid",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800",
      "https://images.unsplash.com/photo-1558618037-3c8c76ca7d13?w=800"
    ]
  },
  {
    name: "Le Creuset Dutch Oven",
    description: "5.5 quart capacity. Enameled cast iron. Tight-fitting lid. Oven safe to 500°F. Lifetime warranty. Made in France.",
    price: 349.99,
    discount: 20,
    category: "Kitchen",
    stock: 20,
    ratings: 4.9,
    brand: "Le Creuset",
    images: [
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
      "https://images.unsplash.com/photo-1558618037-3c8c76ca7d13?w=800"
    ]
  },
  {
    name: "Breville Barista Express Espresso Machine",
    description: "15 bar Italian pump. 54mm portafilter. Integrated conical burr grinder. Thermocoil heating system. Steam wand. 67oz water tank.",
    price: 699.99,
    discount: 10,
    category: "Kitchen",
    stock: 15,
    ratings: 4.7,
    brand: "Breville",
    images: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800"
    ]
  },
  {
    name: "Cuisinart 14-Cup Food Processor",
    description: "720-watt motor. 14-cup work bowl. Stainless steel blades. 3 slicing discs. Dough blade. Dishwasher safe parts.",
    price: 199.99,
    discount: 25,
    category: "Kitchen",
    stock: 40,
    ratings: 4.5,
    brand: "Cuisinart",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800",
      "https://images.unsplash.com/photo-1558618037-3c8c76ca7d13?w=800"
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

const Product = require('../models/Product');

// GET /products - Get all products
exports.getProducts = async (req, res) => {
  try {
    const { category, brand, minPrice, maxPrice, sort = 'createdAt', page = 1, limit = 12 } = req.query;
    
    // Build filter
    const filter = {};
    if (category) filter.category = category;
    if (brand) filter.brand = brand;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    // Build sort options
    const sortOptions = {};
    switch (sort) {
      case 'price-low':
        sortOptions.price = 1;
        break;
      case 'price-high':
        sortOptions.price = -1;
        break;
      case 'rating':
        sortOptions.ratings = -1;
        break;
      case 'newest':
      default:
        sortOptions.createdAt = -1;
        break;
    }

    const skip = (page - 1) * limit;
    
    const products = await Product.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      products,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// GET /products/:id - Get single product
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    console.error('Get product error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid product ID' });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// GET /products/categories - Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.status(200).json({
      success: true,
      categories
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// GET /products/brands - Get all brands
exports.getBrands = async (req, res) => {
  try {
    const brands = await Product.distinct('brand');
    res.status(200).json({
      success: true,
      brands
    });
  } catch (error) {
    console.error('Get brands error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

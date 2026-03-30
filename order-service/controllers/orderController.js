const Order = require('../models/Order');
const Product = require('../models/Product'); // Add Product model

// POST /orders - Create new order
exports.createOrder = async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress, paymentMethod, status } = req.body;

    console.log('Received order data:', JSON.stringify(req.body, null, 2));
    console.log('User ID from auth:', req.userId);

    if (!items || !shippingAddress || totalAmount === undefined || totalAmount === null) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Check if user is authenticated
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }

    // Fetch product details for each item
    const orderItems = [];
    for (const item of items) {
      if (!item.product) {
        return res.status(400).json({
          success: false,
          message: 'Product ID is missing for one or more items'
        });
      }

      orderItems.push({
        product: item.product,
        name: item.name || 'Product',
        price: item.price || 0,
        image: item.image || '',
        quantity: item.quantity || 1
      });
    }

    console.log('Mapped order items:', JSON.stringify(orderItems, null, 2));

    // Create new order
    const order = new Order({
      user: req.userId,
      items: orderItems,
      totalAmount: totalAmount,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
      status: status || 'pending'
    });

    await order.save();

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// GET /orders - Get user orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId })
      .sort({ createdAt: -1 })
      .populate('items');

    res.status(200).json({
      success: true,
      orders
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// GET /orders/:id - Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items');
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
